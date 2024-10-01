from fastapi import FastAPI
import numpy as np
import pandas as pd
import requests
import statsmodels.api as sm
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
from prophet import Prophet

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia "*" por la URL específica de tu frontend si es necesario
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración del modelo de predicción ARMA
def get_arma_predictions():
    url = 'https://api.fastforex.io/time-series' #Time series
    params = {
        'from': 'USD',
        'to': 'MXN',
        'interval': 'P1D',
        'api_key': '7487e94f8f-82434b0371-skncut'  #API key
    }

    response = requests.get(url, params=params)
    if response.status_code == 200:
        data_json = response.json()
    else:
        raise Exception(f"Error en la solicitud: {response.status_code}")

    data_dict = data_json["results"]["MXN"]
    dates = list(data_dict.keys())
    values = list(data_dict.values())

    df = pd.DataFrame({'Fecha': pd.to_datetime(dates), 'Valor': values})
    df.set_index('Fecha', inplace=True)
    data = df['Valor'].values

    # Ajustar modelo ARMA
    arma_model = sm.tsa.ARIMA(data, order=(2, 0, 2))
    arma_fit = arma_model.fit()

    # Predicciones para 10 días futuros
    predictions = arma_fit.predict(start=len(data), end=len(data) + 9)

    # Devolver datos originales y predicciones
    return {
        'dates': list(df.index.strftime('%Y-%m-%d')),
        'values': values,
        'predictions': list(predictions)
    }

#Prophet metodo 

# Función para obtener datos históricos de moneda y predecir usando Prophet
def get_currency_predictions():
    # Descargar datos históricos del tipo de cambio USD/MXN desde Yahoo Finance
    data = yf.download('USDMXN=X', start='2024-01-01', end='2024-09-30')

    # Formatear los datos para Prophet
    df = data[['Adj Close']].reset_index()  # 'Adj Close' es el precio ajustado de cierre
    df.columns = ['ds', 'y']  # Cambiar nombres de columnas para Prophet (ds: fecha, y: valor)
    
    # Inicializar y entrenar el modelo Prophet
    model = Prophet()
    model.fit(df)

    # Crear DataFrame futuro para predicción (predicción para los próximos 10 días)
    future = model.make_future_dataframe(periods=10)
    forecast = model.predict(future)

    # Extraer las predicciones y fechas
    predicted_dates = forecast['ds'].dt.strftime('%Y-%m-%d').tolist()
    predicted_values = forecast['yhat'].tolist()

    # Obtener los últimos 10 valores del rango de entrenamiento
    last_dates = df['ds'].dt.strftime('%Y-%m-%d').tolist()[-10:]  # Últimas 10 fechas del rango de entrenamiento
    last_values = df['y'].tolist()[-10:]  # Últimos 10 valores del rango de entrenamiento

    # Devolver los datos actuales y las predicciones
    return {
        'dates': last_dates,
        'values': last_values,
        'predictions': predicted_values[-10:]  # Últimos 10 valores son las predicciones futuras
    }

# Endpoint de predicción de moneda usando Prophet
@app.get("/prophet-predictions")
def prophet_predictions():
    result = get_currency_predictions()
    return result

# Endpoint de predicción ARMA
@app.get("/arma-predictions")
def arma_predictions():
    result = get_arma_predictions()
    return result
#
#pip install -r requirements.txt
#uvicorn app:app --reload
