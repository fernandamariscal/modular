# server/DolarAPI.py

from flask import Flask, jsonify
import requests

app = Flask(__name__)

API_KEY = '7487e94f8f-82434b0371-skncut'
BASE_URL = 'https://api.fastforex.io/fetch-one'

@app.route('/fetch-one', methods=['GET'])
def obtener_precio_dolar():
    try:
        # Parámetros de la solicitud
        params = {
            'from': 'USD',
            'to': 'MXN',
            'api_key': API_KEY  # Incluye la clave API en los parámetros
        }

        # Realizar la solicitud GET
        response = requests.get(BASE_URL, params=params)
        response_data = response.json()

        # Verificar el estado de la respuesta
        if response.status_code == 200:
            # Accede al valor del dólar en 'result'
            precio_dolar = response_data.get('result', {}).get('MXN', None)
            
            if precio_dolar is not None:
                return jsonify({'price': precio_dolar}), 200
            else:
                return jsonify({'error': 'Precio no encontrado en la respuesta'}), 500
        else:
            print(f"Error en la API: {response_data}")  # Para inspeccionar el error
            return jsonify({'error': 'No se pudo obtener el precio del dólar'}), response.status_code

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)  # Cambia el puerto según sea necesario
