import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './MenuForms.css';

const MenuForms = () => {
    const [info, setInfo] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const scrollToInfo = () => {
        const infoSection = document.getElementById('info-section');
        if (infoSection) {
            infoSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleAhorroClick = () => {
        setInfo('Generar Ahorro');
        scrollToInfo();
    };

    const handleJubilacionClick = () => {
        setInfo('Plan de Jubilación');
        scrollToInfo();
    };

    const handleMetasClick = () => {
        setInfo('Metas Largo/Corto Plazo');
        scrollToInfo();
    };

    const handleNavigateAhorro = () => {
        navigate('/ahorro'); // Redirige a la ruta del componente Ahorro
    };

    return (
        <div className="menu-form">
            <h2>¿En qué puede ayudarte FinanTec?</h2>
            <div className="menu-options">
                <div className="saving-box green" onClick={handleAhorroClick}>
                    <div className="icon">💰</div>
                    <span>Generar Ahorro</span>
                </div>
                <div className="saving-box blue" onClick={handleJubilacionClick}>
                    <div className="icon">🏦</div>
                    <span>Plan de Jubilación</span>
                </div>
                <div className="saving-box pink" onClick={handleMetasClick}>
                    <div className="icon">🎯</div>
                    <span>Metas Largo/Corto Plazo</span>
                </div>
            </div>

            {/* Sección de información */}
            <div id="info-section" className="info-section">
                <h3>Información sobre {info || 'FinanTec'}</h3>
                <p>
                    {info === 'Generar Ahorro' && (
                        'FinanTec es tu aliado en el camino hacia una mejor salud financiera. Aquí te proporcionamos herramientas y recursos para ayudarte a establecer metas de ahorro realistas, crear un presupuesto efectivo que se ajuste a tus necesidades, y planificar tu futuro.'
                    )}
                    {info === 'Plan de Jubilación' && (
                        'El Plan de Jubilación de FinanTec te ofrece la guía necesaria para asegurar tu futuro. Te ayudamos a entender las mejores estrategias para ahorrar y a planificar un retiro confortable.'
                    )}
                    {info === 'Metas Largo/Corto Plazo' && (
                        'Con nuestras herramientas, podrás definir y alcanzar tus metas de ahorro a corto y largo plazo. Te apoyamos en la creación de planes que se adapten a tus objetivos financieros específicos.'
                    )}
                </p>
                {/* Botón para redirigir a Ahorro */}
                {info === 'Generar Ahorro' && (
                    <button onClick={handleNavigateAhorro} className="navigate-button">
                        Ir a Generar Ahorro
                    </button>
                )}
            </div>
        </div>
    );
};

export default MenuForms;
