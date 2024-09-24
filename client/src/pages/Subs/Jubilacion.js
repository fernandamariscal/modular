import React, { useState, useEffect } from 'react';
import './Jubilacion.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Jubilacion = () => {
    const [data, setData] = useState([]);
    const [predictions, setPredictions] = useState([]);  // Estado para las predicciones ARMA
    const [loading, setLoading] = useState(true);

    // Función para obtener los datos y predicciones ARMA del backend
    const fetchArmaData = async () => {
        try {
            const response = await fetch('http://localhost:8000/arma-predictions');  // URL del backend
            const result = await response.json();

            // Formatear los datos y las predicciones
            const chartData = result.dates.map((date, index) => ({
                date: date,
                value: result.values[index] || null,       // Valor real
                prediction: result.predictions[index] || null  // Predicción ARMA
            }));
            

            setData(chartData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching ARMA data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArmaData();  // Llamar a la función cuando el componente se monte
    }, []);

    return (
        <div className="jubilacion-container">
            <h1 className="jubilacion-title">Predicción de Moneda usando ARMA</h1>
            <div className="jubilacion-content">
                <p>Este gráfico muestra el precio del dólar frente al peso mexicano (MXN) y las predicciones del modelo ARMA.</p>

                {loading ? (
                    <p>Cargando datos...</p>
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis ticks={[12, 18, 24]} domain={[12, 24]} />
                            <Tooltip />
                            {/* Línea para los datos reales */}
                            <Line type="monotone" dataKey="value" stroke="#007bff" />
                            {/* Línea para las predicciones */}
                            <Line type="monotone" dataKey="prediction" stroke="#ff0000" />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};    

export default Jubilacion;
