import React from 'react';
import './Jubilacion.css'; // Asegúrate de importar el CSS

const Jubilacion = () => {
    return (
        <div className="jubilacion-container">
            <h1 className="jubilacion-title">Predicción de Moneda</h1>
            <div className="jubilacion-content">
                <p>Este es un espacio para agregar contenido relevante sobre la predicción de moneda.</p>
                <h2>Detalles Adicionales</h2>
                <div className="highlight">
                    <p>Información destacada o notas importantes.</p>
                </div>
                {/* Botones circulares */}
                <div className="button-container">
                    <button className="circular-button comprar-button">Comprar</button>
                    <button className="circular-button vender-button">Vender</button>
                </div>
            </div>
        </div>
    );
};

export default Jubilacion;
