import React, { useState } from 'react';
import './MenuForms.css';

const SaveForm = ({ onClose }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formVisible, setFormVisible] = useState(true);
    const [hasSpecificGoal, setHasSpecificGoal] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormVisible(false);
            onClose(); // Llama a onClose para notificar al componente padre
        }, 2000);
    };

    const handleGoalChange = (e) => {
        setHasSpecificGoal(e.target.value);
    };

    const handleClose = () => {
        setFormVisible(false);
        onClose(); // Llama a onClose para notificar al componente padre
    };

    return (
        <div className={`form-container ${formVisible ? 'visible' : 'hidden'}`}>
            <span className="close-button" onClick={handleClose}>X</span>
            <h2>Formulario de Generar Ahorro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>¿Te gustaría un plan para generar ahorro?</label>
                    <select value={hasSpecificGoal} onChange={handleGoalChange} required>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>¿Qué monto deseas alcanzar?</label>
                    <input type="number" placeholder="$" required />
                </div>
                <div className="form-group">
                    <label>¿Qué cantidad semanal deseas ahorrar?</label>
                    <input type="number" placeholder="$" required />
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

export default SaveForm;
