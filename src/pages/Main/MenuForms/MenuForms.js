import React, { useState } from 'react';
import './MenuForms.css'; // Importa tu archivo de estilos
import SaveForm from './SaveForm';
import RetireForm from './RetireForm';
import GoalsForm from './GoalsForm';

const MenuForms = () => {
    const [selectedForm, setSelectedForm] = useState(null); // Estado para controlar qué formulario mostrar

    // Función para seleccionar y mostrar el formulario adecuado
    const selectForm = (formType) => {
        setSelectedForm(formType);
    };

    const handleCloseForm = () => {
        setSelectedForm(null); // Resetear el formulario seleccionado al cerrar
    };

    return (
        <div className="menu-form">
            <h2>¿En qué puede ayudarte FinanTec?</h2>
            <div className="menu-options">
                <div className="saving-box green" onClick={() => selectForm('save')}>
                    <div className="icon">💰</div>
                    <div>Generar Ahorro</div>
                </div>
                <div className="saving-box blue" onClick={() => selectForm('retirement')}>
                    <div className="icon">🏦</div>
                    <div>Plan de Jubilación</div>
                </div>
                <div className="saving-box pink" onClick={() => selectForm('goal')}>
                    <div className="icon">🎯</div>
                    <div>Metas Largo/Corto Plazo</div>
                </div>
            </div>

            {/* Mostrar SaveForm si selectedForm es 'save' */}
            {selectedForm === 'save' && <SaveForm onClose={handleCloseForm} />}
            {selectedForm === 'retirement' && <RetireForm onClose={handleCloseForm} />}
            {selectedForm === 'goal' && <GoalsForm onClose={handleCloseForm} />}
        </div>
    );
}

export default MenuForms;
