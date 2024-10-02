// src/components/Dolar.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import './Dolar.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Dolar = () => {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(null);
    const apiKey = '7487e94f8f-82434b0371-skncut'; // Tu clave API
    const apiBaseUrl = 'https://api.fastforex.io'; // Cambiar a la URL base de la API Fast Forex

    // Función para obtener el valor actual del dólar
    const fetchCurrentDollarValue = async () => {
        try {
            // Asegúrate de incluir la clave API en la URL
            const response = await axios.get(`${apiBaseUrl}/fetch-one?from=USD&to=MXN&api_key=${apiKey}`);
            console.log("Respuesta de la API:", response.data); // Inspecciona la respuesta

            const currentValue = response.data.result.MXN; // Accede al valor correcto en la respuesta
            console.log("Valor actual:", currentValue); // Muestra el valor actual

            const numericValue = parseFloat(currentValue); 

            if (!isNaN(numericValue)) {
                const currentTime = new Date().toLocaleTimeString();

                setData((prevData) => [...prevData, numericValue]);
                setLabels((prevLabels) => [...prevLabels, currentTime]);
                setCurrentPrice(numericValue);
            } else {
                console.error("El precio actual no es un número:", currentValue);
                setCurrentPrice(0);
            }
        } catch (error) {
            console.error("Error al obtener el precio del dólar:", error);
        }
    };

    useEffect(() => {
        fetchCurrentDollarValue(); 
        const intervalId = setInterval(() => {
            fetchCurrentDollarValue(); 
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Precio del Dólar (MXN)',
                data: data,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: false,
                min: 15,
                max: 25,
            },
        },
    };

    return (
        <div className="dolar-container">
            <h1>Precio del Dólar en Tiempo Real</h1>
            {currentPrice !== null ? (
                <h2 className="current-price">${currentPrice.toFixed(2)}</h2>
            ) : (
                <p>Cargando precio...</p>
            )}
            {data.length > 0 ? (
                <div className="line-chart">
                    <Line data={chartData} options={chartOptions} />
                </div>
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};

export default Dolar;
