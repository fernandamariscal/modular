import React, { useState } from 'react';
import './MenuForms.css';

const RetireForm = ({ onClose }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formVisible, setFormVisible] = useState(true); // Estado para controlar la visibilidad del formulario

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true); // Activa la animación de éxito
        setTimeout(() => {
            setSubmitted(false); // Desactiva la animación después de 2 segundos
            setFormVisible(false); // Oculta el formulario después de la animación de éxito
            onClose(); // Llama a onClose para notificar al componente padre
        }, 2000);
    };

    const handleClose = () => {
        setFormVisible(false);
        onClose(); // Llama a onClose para notificar al componente padre
    };

    return (
        <div className={`form-container ${formVisible ? 'visible' : 'hidden'}`}>
            <span className="close-button" onClick={handleClose}>X</span>
            <h2>Formulario de Plan de Jubilación</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Buscas un plan de ahorro para tu jubilación?</label>
                    <select required>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Te consideras una persona Gastadora?</label>
                    <select required>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" value="Enviar" />
                </div>
            </form>
            {submitted && (
                <div className="success-animation">
                    <div className="success-check">✓</div>
                </div>
            )}
        </div>
    );
};

export default RetireForm;
