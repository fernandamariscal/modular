from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import yfinance as yf
import pandas as pd
from prophet import Prophet
from fastapi.middleware.cors import CORSMiddleware
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Función para obtener datos históricos de moneda y predecir usando Prophet
def get_currency_predictions():
    # Descargar datos históricos del tipo de cambio USD/MXN desde Yahoo Finance
    data = yf.download('USDMXN=X', start='2024-01-01', end='2024-09-27')

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

# Endpoint para descargar el CSV
@app.get("/download-csv")
def download_csv():
    # Descargar datos históricos del tipo de cambio USD/MXN desde Yahoo Finance
    data = yf.download('USDMXN=X', start='2024-05-01', end='2024-09-27')

    # Convertir el DataFrame a CSV
    csv_buffer = io.StringIO()
    data.to_csv(csv_buffer, index=True)  # Cambia `index=False` si no deseas incluir el índice
    csv_buffer.seek(0)  # Regresar al principio del StringIO

    # Retornar el CSV como respuesta
    return StreamingResponse(io.BytesIO(csv_buffer.getvalue().encode()), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=historical_data.csv"})
