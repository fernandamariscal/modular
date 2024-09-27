import React, { useState, useEffect } from 'react';
import './Jubilacion.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Jubilacion = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPrediction, setShowPrediction] = useState(false);

    // Función para obtener los datos y predicciones ARMA del backend
    const fetchArmaData = async () => {
        try {
            const response = await fetch('http://localhost:8000/arma-predictions');  // URL del backend
            const result = await response.json();

            // Formatear los datos (solo datos reales, sin predicciones)
            const chartData = result.dates.map((date, index) => ({
                date: date,
                value: result.values[index] || null,       // Valor real
                prediction: null  // No hay predicción para estas fechas
            }));

            // Crear un nuevo arreglo de datos solo para las predicciones
            const predictionStartDate = new Date(chartData[chartData.length - 1].date);
            const predictionsData = [];

            for (let i = 0; i < 10; i++) {
                predictionStartDate.setDate(predictionStartDate.getDate() + 1);
                predictionsData.push({
                    date: predictionStartDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
                    value: null, // No hay valor real para los días de predicción
                    prediction: result.predictions[i] || null // Usar las predicciones
                });
            }

            // Combinar datos reales y predicciones
            setData([...chartData, ...predictionsData]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching ARMA data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArmaData();  // Llamar a la función cuando el componente se monte
    }, []);

    // Función para alternar la visibilidad de las predicciones
    const togglePrediction = () => {
        setShowPrediction(!showPrediction);
    };

    return (
        <div className="jubilacion-container">
            <h1 className="jubilacion-title">Predicción de Moneda usando ARMA</h1>
            <div className="jubilacion-content">
                <p>Este gráfico muestra el precio del dólar frente al peso mexicano (MXN) y las predicciones del modelo ARMA.</p>

                {loading ? (
                    <p>Cargando datos...</p>
                ) : (
                    <>
                        <button onClick={togglePrediction}>
                            {showPrediction ? 'Ocultar predicción' : 'Mostrar predicción'}
                        </button>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis ticks={[12, 18, 24]} domain={[12, 24]} />
                                <Tooltip />
                                {/* Línea para los datos reales */}
                                <Line type="monotone" dataKey="value" stroke="#007bff" />
                                {/* Línea para las predicciones futuras, solo si se activa */}
                                {showPrediction && (
                                    <Line type="monotone" dataKey="prediction" stroke="#ff0000" />
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    </>
                )}
            </div>
        </div>
    );
};

export default Jubilacion;
