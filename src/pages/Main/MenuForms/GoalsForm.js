import React, { useState } from 'react';
import './MenuForms.css';

const GoalsForm = ({ onClose }) => {
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
            <h2>Formulario de Metas Largo/Corto Plazo</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tu meta financiera es de corto plazo? (menos de un año)</label>
                    <select required>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Tu meta financiera es de mediano plazo? (de 1 a 4 años)</label>
                    <select required>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Tu meta financiera es de Largo plazo? (más de 4 años)</label>
                    <select required>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Quieres llevar un presupuesto mensual?</label>
                    <select required>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Cual es tu objetivo?</label>
                    <select required>
                        <option value="">Selecciona una opción</option>
                        <option value="house">Casa</option>
                        <option value="car">Carro</option>
                        <option value="phone">Teléfono nuevo</option>
                        <option value="wedding">Boda</option>
                        <option value="clothes">Ropa</option>
                        <option value="other">Otros</option>
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

export default GoalsForm;
