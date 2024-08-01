import React, { useState } from 'react';
import './Content.css'; // Asegúrate de crear y ajustar el CSS si es necesario

const Content = ({ user = {} }) => {
    const [activeTab, setActiveTab] = useState('inicio');

    

    return (
        <div className="content-container">
            {/* Información del usuario */}
            <div className="user-info">
                <h2>{user.Nombres ? `${user.Nombres} ${user.Apellidos}` : 'Nombre del Usuario'}</h2>
                <p>Correo Electrónico: {user.Correo || 'No disponible'}</p>
            </div>
    
            {/* Pestañas */}
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === 'inicio' ? 'active' : ''}`}
                    onClick={() => setActiveTab('inicio')}
                >
                    Inicio
                </button>
                <button
                    className={`tab-button ${activeTab === 'generarAhorro' ? 'active' : ''}`}
                    onClick={() => setActiveTab('generarAhorro')}
                >
                    Generar Ahorro
                </button>
                <button
                    className={`tab-button ${activeTab === 'planJubilacion' ? 'active' : ''}`}
                    onClick={() => setActiveTab('planJubilacion')}
                >
                    Plan de Jubilación
                </button>
                <button
                    className={`tab-button ${activeTab === 'metas' ? 'active' : ''}`}
                    onClick={() => setActiveTab('metas')}
                >
                    Metas Largo/Corto Plazo
                </button>
            </div>
    
            {/* Contenido de las pestañas */}
            <div className="tab-content">
                {activeTab === 'inicio' && <div className="tab-section">Contenido de Inicio</div>}
                {activeTab === 'generarAhorro' && <div className="tab-section">Datos Ahorro</div>}
                {activeTab === 'planJubilacion' && <div className="tab-section">Contenido de Plan de Jubilación</div>}
                {activeTab === 'metas' && <div className="tab-section">Contenido de Metas Largo/Corto Plazo</div>}
            </div>
        </div>
    );
    
};

export default Content;