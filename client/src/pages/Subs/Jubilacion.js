import React, { useState, useEffect } from 'react';
import './Jubilacion.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Jubilacion = () => {
    const [prophetData, setProphetData] = useState([]);
    const [armaData, setArmaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showProphetPrediction, setShowProphetPrediction] = useState(false);
    const [showArmaPrediction, setShowArmaPrediction] = useState(false);

    // Función para obtener los datos y predicciones de Prophet del backend
    const fetchProphetData = async () => {
        try {
            const response = await fetch('http://localhost:8000/prophet-predictions');
            const result = await response.json();

            // Formatear los datos (solo datos reales, sin predicciones)
            const chartData = result.dates.map((date, index) => ({
                date: date,
                value: result.values[index] || null,       // Valor real
                prediction: null  // No hay predicción para estas fechas
            }));

            // Crear un nuevo arreglo de datos solo para las predicciones
            const predictionsData = result.predictions.map((prediction, index) => ({
                date: new Date(chartData[chartData.length - 1].date).setDate(new Date(chartData[chartData.length - 1].date).getDate() + index + 1),
                value: null, // No hay valor real para los días de predicción
                prediction: prediction // Usar las predicciones
            })).map(item => ({
                ...item,
                date: new Date(item.date).toISOString().split('T')[0] // Formato YYYY-MM-DD
            }));

            // Combinar datos reales y predicciones
            setProphetData([...chartData, ...predictionsData]);
        } catch (error) {
            console.error('Error fetching Prophet data:', error);
        }
    };

    // Función para obtener los datos y predicciones de ARMA del backend
    const fetchArmaData = async () => {
        try {
            const response = await fetch('http://localhost:8000/arma-predictions');
            const result = await response.json();

            const chartData = result.dates.map((date, index) => ({
                date: date,
                value: result.values[index] || null,
                prediction: null // No hay predicción para estas fechas
            }));

            const predictionsData = result.predictions.map((prediction, index) => ({
                date: new Date(chartData[chartData.length - 1].date).setDate(new Date(chartData[chartData.length - 1].date).getDate() + index + 1),
                value: null, // No hay valor real para los días de predicción
                prediction: prediction // Usar las predicciones
            })).map(item => ({
                ...item,
                date: new Date(item.date).toISOString().split('T')[0] // Formato YYYY-MM-DD
            }));

            setArmaData([...chartData, ...predictionsData]);
        } catch (error) {
            console.error('Error fetching ARMA data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProphetData();  // Llamar a la función para Prophet cuando el componente se monte
        fetchArmaData();     // Llamar a la función para ARMA cuando el componente se monte
    }, []);

    // Función para alternar la visibilidad de las predicciones de Prophet
    const toggleProphetPrediction = () => {
        setShowProphetPrediction(!showProphetPrediction);
    };

    // Función para alternar la visibilidad de las predicciones de ARMA
    const toggleArmaPrediction = () => {
        setShowArmaPrediction(!showArmaPrediction);
    };

    return (
        <div className="jubilacion-container">
            <h1 className="jubilacion-title">Predicción de Moneda</h1>
            <div className="jubilacion-content">
                <p>Este gráfico muestra el precio del dólar frente al peso mexicano (MXN) y las predicciones de los modelos Prophet y ARMA.</p>

                {loading ? (
                    <p>Cargando datos...</p>
                ) : (
                    <>
                        <button onClick={toggleProphetPrediction}>
                            {showProphetPrediction ? 'Ocultar predicción de Prophet' : 'Mostrar predicción de Prophet'}
                        </button>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={prophetData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                {/* Línea para los datos reales de Prophet */}
                                <Line type="monotone" dataKey="value" stroke="#007bff" />
                                {/* Línea para las predicciones de Prophet, solo si se activa */}
                                {showProphetPrediction && (
                                    <Line type="monotone" dataKey="prediction" stroke="#ff0000" />
                                )}
                            </LineChart>
                        </ResponsiveContainer>

                        <button onClick={toggleArmaPrediction}>
                            {showArmaPrediction ? 'Ocultar predicción de ARMA' : 'Mostrar predicción de ARMA'}
                        </button>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={armaData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                {/* Línea para los datos reales de ARMA */}
                                <Line type="monotone" dataKey="value" stroke="#28a745" />
                                {/* Línea para las predicciones de ARMA, solo si se activa */}
                                {showArmaPrediction && (
                                    <Line type="monotone" dataKey="prediction" stroke="#ff8000" />
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
