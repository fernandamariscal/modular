from fastapi import FastAPI
import numpy as np
import pandas as pd
import requests
import statsmodels.api as sm
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

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
        'api_key': 'c80584cb38-3c1fd2f449-sk8eb7'  #API key
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

# Endpoint de predicción ARMA
@app.get("/arma-predictions")
def arma_predictions():
    result = get_arma_predictions()
    return result
#
#pip install -r requirements.txt
#uvicorn app:app --reload
