import React, { useState } from 'react';
import './style.css'; 

const SaveForm = ({ isOpen, onClose, formType }) => {
    // Estados del formulario
    const [hasSpecificGoal, setHasSpecificGoal] = useState(false); // Estado para saber si hay un objetivo específico de ahorro
    const [goalAmount, setGoalAmount] = useState(''); // Estado para la cantidad de la meta de ahorro
    const [weeklySavings, setWeeklySavings] = useState(''); // Estado para el ahorro semanal
    const [retirementPlan, setRetirementPlan] = useState(null); // Estado para el plan de jubilación
    const [spender, setSpender] = useState(null); // Estado para determinar si la persona es gastadora
    const [shortTerm, setShortTerm] = useState(null); // Estado para metas financieras a corto plazo
    const [mediumTerm, setMediumTerm] = useState(null); // Estado para metas financieras a mediano plazo
    const [longTerm, setLongTerm] = useState(null); // Estado para metas financieras a largo plazo
    const [budget, setBudget] = useState(null); // Estado para determinar si se quiere llevar un presupuesto mensual
    const [goalObjective, setGoalObjective] = useState(''); // Estado para el objetivo de la meta financiera seleccionado
    const [showSelectOptionMessage, setShowSelectOptionMessage] = useState(false); // Estado para mostrar mensaje de selección obligatoria
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false); // Estado para mostrar la animación de éxito después de enviar el formulario

    // Manejador de cambio para la pregunta sobre objetivo específico de ahorro
    const handleGoalChange = (event) => {
        const value = event.target.value;
        setHasSpecificGoal(value); // Actualiza el estado de hasSpecificGoal
        setShowSelectOptionMessage(false); // Oculta el mensaje cuando se selecciona una opción válida
    };

    // Manejador de cambio para la cantidad de la meta de ahorro
    const handleGoalAmountChange = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, ''); // Permite solo números
        setGoalAmount(value); // Actualiza el estado de goalAmount
    };

    // Manejador de cambio para el ahorro semanal
    const handleWeeklySavingsChange = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, ''); // Permite solo números
        setWeeklySavings(value); // Actualiza el estado de weeklySavings
    };

    // Manejador de cambio para el plan de jubilación
    const handleRetirementPlanChange = (event) => {
        setRetirementPlan(event.target.value); // Actualiza el estado de retirementPlan
    };

    // Manejador de cambio para determinar si la persona es gastadora
    const handleSpenderChange = (event) => {
        setSpender(event.target.value); // Actualiza el estado de spender
    };

    // Manejador de cambio para metas financieras a corto plazo
    const handleShortTermChange = (event) => {
        setShortTerm(event.target.value); // Actualiza el estado de shortTerm
    };

    // Manejador de cambio para metas financieras a mediano plazo
    const handleMediumTermChange = (event) => {
        setMediumTerm(event.target.value); // Actualiza el estado de mediumTerm
    };

    // Manejador de cambio para metas financieras a largo plazo
    const handleLongTermChange = (event) => {
        setLongTerm(event.target.value); // Actualiza el estado de longTerm
    };

    // Manejador de cambio para determinar si se quiere llevar un presupuesto mensual
    const handleBudgetChange = (event) => {
        setBudget(event.target.value); // Actualiza el estado de budget
    };

    // Manejador de cambio para el objetivo de la meta financiera seleccionado
    const handleGoalObjectiveChange = (event) => {
        setGoalObjective(event.target.value); // Actualiza el estado de goalObjective
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del formulario
        // Validación para formType 'save' y hasSpecificGoal false
        if (formType === 'save' && hasSpecificGoal === false) {
            setShowSelectOptionMessage(true); // Muestra el mensaje si no se selecciona una opción válida
            return;
        }
        // Mostrar la animación de éxito por un corto período de tiempo
        setShowSuccessAnimation(true);
        setTimeout(() => {
            setShowSuccessAnimation(false);
            onClose(); // Cierra el formulario después de la animación de éxito
        }, 3000); // 3 segundos
    };

    // Si isOpen es falso, no muestra el componente
    if (!isOpen) return null;

    // Renderiza el formulario y sus elementos
    return (
        <div className="save-form-overlay" onClick={onClose}>
            <div className="save-form" onClick={(e) => e.stopPropagation()}>
                <span className="close-btn" onClick={onClose}>X</span>
                <h2>
                    {formType === 'save' && 'Generar Ahorro'}
                    {formType === 'retirement' && 'Plan de Jubilación'}
                    {formType === 'goals' && 'Metas Largo/Corto Plazo'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {formType === 'save' && (
                        <>
                            <div className="form-group">
                                <label>¿Tienes algún objetivo de ahorro específico (compra de casa, coche, vacaciones)?</label>
                                <select
                                    value={hasSpecificGoal}
                                    onChange={handleGoalChange}
                                    className={`select-option ${hasSpecificGoal === false ? 'select-prompt' : ''}`}
                                >
                                    <option value="">Seleccione una opción</option> {/* Opción por defecto */}
                                    <option value="si">Sí</option>
                                    <option value="no">No</option>
                                </select>
                                {showSelectOptionMessage && <p className="select-option-message">Seleccione una opción</p>} {/* Mensaje de advertencia */}
                            </div>
                            <div className="form-group">
                                <label>Ingresa la meta a la que quieras llegar:</label>
                                <div className="input-with-icon">
                                    <span className="dollar-sign">$</span>
                                    <input
                                        type="text"
                                        value={goalAmount}
                                        onChange={handleGoalAmountChange}
                                        placeholder="Ingrese la cantidad"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>¿Qué cantidad a la semana deseas ahorrar?</label>
                                <div className="input-with-icon">
                                    <span className="dollar-sign">$</span>
                                    <input
                                        type="text"
                                        value={weeklySavings}
                                        onChange={handleWeeklySavingsChange}
                                        placeholder="Ingrese la cantidad"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {formType === 'retirement' && (
                        <>
                            <div className="form-group">
                                <label>¿Buscas un plan de ahorro para la jubilación?</label>
                                <select
                                    value={retirementPlan}
                                    onChange={handleRetirementPlanChange}
                                    className={`select-option ${retirementPlan === null ? 'select-prompt' : ''}`}
                                >
                                    <option value="" disabled hidden>
                                        Seleccione una opción
                                    </option>
                                    <option value="si">Sí</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>¿Te consideras una persona gastadora?</label>
                                <select
                                    value={spender}
                                    onChange={handleSpenderChange}
                                    className={`select-option ${spender === null ? 'select-prompt' : ''}`}
                                >
                                    <option value="" disabled hidden>
                                        Seleccione una opción
                                    </option>
                                    <option value="si">Sí</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </>
                    )}
                    {formType === 'goals' && (
                        <>
                            <div className="form-group">
                                <label>¿Tu meta financiera es de corto plazo (menos de un año)?</label>
                                <select
                                    value={shortTerm}
                                    onChange={handleShortTermChange}
                                    className={`select-option ${shortTerm === null ? 'select-prompt' : ''}`}
                                >
                                    <option value="" disabled hidden>
                                        Seleccione una opción
                                    </option>
                                    <option value="si">Sí</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>¿Tu meta financiera es de mediano plazo (1-5 años)?</label>
                                <select
                                    value={mediumTerm}
                                    onChange={handleMediumTermChange}
                                    className={`select-option ${mediumTerm === null ? 'select-prompt' : ''}`}
                                >
                                    <option value="" disabled hidden>
                                        Seleccione una opción
                                    </option>
                                    <option value="si">Sí</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>¿Tu meta financiera es de largo plazo (más de 5 años)?</label>
                                <select
                                    value={longTerm}
                                    onChange={handleLongTermChange}
                                    className={`select-option ${longTerm === null ? 'select-prompt' : ''}`}
                                >
                                    <option value="" disabled hidden>
                                        Seleccione una opción
                                    </option>
                                    <option value="si">Sí</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>¿Quieres llevar un presupuesto mensual?</label>
                                <select
                                    value={budget}
                                    onChange={handleBudgetChange}
                                    className={`select-option ${budget === null ? 'select-prompt' : ''}`}
                                >
                                    <option value="" disabled hidden>
                                        Seleccione una opción
                                    </option>
                                    <option value="si">Sí</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>¿Cuál es tu objetivo?</label>
                                <select
                                    value={goalObjective}
                                    onChange={handleGoalObjectiveChange}
                                    className={`select-option ${goalObjective === '' ? 'select-prompt' : ''}`}
                                >
                                    <option value="" disabled hidden>
                                        Seleccione una opción
                                    </option>
                                    <option value="Casa">Casa</option>
                                    <option value="Carro">Carro</option>
                                    <option value="Teléfono nuevo">Teléfono nuevo</option>
                                    <option value="Boda">Boda</option>
                                    <option value="Ropa">Ropa</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </div>
                        </>
                    )}
                    <button type="submit">Guardar</button>
                </form>
                {showSuccessAnimation && (
                    <div className="success-animation">
                        <div className="circle">
                            <div className="fill"></div>
                            <div className="tick-icon">&#10003;</div>
                            <div className="listo-text">¡Listo!</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SaveForm;
