import React, { useState } from 'react';
import './Gastos.css';
import { FaTrash } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

const Gastos = () => {
    const [showForm, setShowForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [expenses, setExpenses] = useState([{ type: '', name: '', cost: '' }]);
    const [services, setServices] = useState([{ type: '', amount: '', frequency: '' }]);

    const handleRegisterGasto = () => {
        setShowForm(true);
        setShowServiceForm(false);
    };

    const handleRegisterService = () => {
        setShowServiceForm(true);
        setShowForm(false);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setShowServiceForm(false);
        // Reset form fields
        setExpenses([{ type: '', name: '', cost: '' }]);
        setServices([{ type: '', amount: '', frequency: '' }]);
    };

    const handleChange = (index, field, value, form) => {
        const newForm = form === 'expenses' ? [...expenses] : [...services];
        // Evita valores negativos
        if (field === 'amount') {
            value = Math.max(0, value);
        }
        newForm[index][field] = value;
        form === 'expenses' ? setExpenses(newForm) : setServices(newForm);
    };

    const handleAddExpense = () => {
        setExpenses([...expenses, { type: '', name: '', cost: '' }]);
    };

    const handleRemoveExpense = (index) => {
        setExpenses(expenses.filter((_, i) => i !== index));
    };

    const handleAddService = () => {
        setServices([...services, { type: '', amount: '', frequency: '' }]);
    };

    const handleRemoveService = (index) => {
        setServices(services.filter((_, i) => i !== index));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para manejar el envío del formulario
        console.log(expenses);
        console.log(services);
        handleCloseForm();
    };

    return (
        <div className="gastos-container">
            <h1 className="gastos-title">¿Realizaste algún gasto hoy?</h1>
            <div className="gastos-tabs-container">
                <button className="gastos-tab" onClick={handleRegisterGasto}>
                    Registrar Gasto
                </button>
                <div className="line"></div>
                <button className="gastos-tab" onClick={handleRegisterService}>
                    Registrar pago de servicios
                </button>
            </div>

            {showForm && (
                <div className="register-expense-form-container">
                    <div className="register-expense-form">
                        <button className="close-form-btn" onClick={handleCloseForm}>×</button>
                        <h2>Ingresa tus gastos de hoy</h2>
                        <form onSubmit={handleSubmit}>
                            {expenses.map((expense, index) => (
                                <div key={index} className="form-row">
                                    <div className="form-group">
                                        <label htmlFor={`type-${index}`}>Tipo:</label>
                                        <select
                                            id={`type-${index}`}
                                            value={expense.type}
                                            onChange={(e) => handleChange(index, 'type', e.target.value, 'expenses')}
                                            required
                                        >
                                            <option value="">Selecciona un tipo</option>
                                            <option value="Comida">Comida</option>
                                            <option value="Ropa">Ropa</option>
                                            <option value="Bebida">Bebida</option>
                                            <option value="Escuela">Escuela</option>
                                            <option value="Joyeria">Joyería</option>
                                            <option value="Entretenimiento">Entretenimiento</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={`name-${index}`}>Nombre:</label>
                                        <input
                                            type="text"
                                            id={`name-${index}`}
                                            value={expense.name}
                                            onChange={(e) => handleChange(index, 'name', e.target.value, 'expenses')}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={`cost-${index}`}>Costo:</label>
                                        <input
                                            type="number"
                                            id={`cost-${index}`}
                                            value={expense.cost}
                                            onChange={(e) => handleChange(index, 'cost', Math.max(0, e.target.value), 'expenses')}
                                            min="0" // Evita números negativos
                                            required
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="remove-expense-btn"
                                        onClick={() => handleRemoveExpense(index)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                            <div className="form-actions">
                                <button type="button" className="add-expense-btn" onClick={handleAddExpense}>
                                    +
                                </button>
                                <button type="submit" className="submit-btn">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showServiceForm && (
                <div className="register-service-form-container">
                    <div className="register-service-form">
                        <button className="close-form-btn" onClick={handleCloseForm}>×</button>
                        <h2>Ingresa tus pagos de servicios de hoy</h2>
                        <form onSubmit={handleSubmit}>
                            {services.map((service, index) => (
                                <div key={index} className="form-row">
                                    <div className="form-group">
                                        <label htmlFor={`type-service-${index}`}>Tipo de servicio:</label>
                                        <select
                                            id={`type-service-${index}`}
                                            value={service.type}
                                            onChange={(e) => handleChange(index, 'type', e.target.value, 'services')}
                                            required
                                        >
                                            <option value="">Selecciona un tipo</option>
                                            <option value="Luz">Luz</option>
                                            <option value="Agua">Agua</option>
                                            <option value="Internet">Internet</option>
                                            <option value="Gas">Gas</option>
                                            <option value="Predial">Predial</option>
                                            <option value="Licencia">Licencia</option>
                                            <option value="Refrendo">Refrendo</option>
                                            <option value="Otros">Otros</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={`amount-${index}`}>Monto:</label>
                                        <input
                                            type="number"
                                            id={`amount-${index}`}
                                            value={service.amount}
                                            onChange={(e) => handleChange(index, 'amount', Math.max(0, e.target.value), 'services')}
                                            min="0" // Evita números negativos
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={`frequency-${index}`}>Frecuencia:</label>
                                        <select
                                            id={`frequency-${index}`}
                                            value={service.frequency}
                                            onChange={(e) => handleChange(index, 'frequency', e.target.value, 'services')}
                                            required
                                        >
                                            <option value="">Selecciona una frecuencia</option>
                                            <option value="Mensual">Mensual</option>
                                            <option value="Bimestral">Bimestral</option>
                                            <option value="Anual">Anual</option>
                                        </select>
                                    </div>
                                    <button
                                        type="button"
                                        className="remove-service-btn"
                                        onClick={() => handleRemoveService(index)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                            <div className="form-actions">
                                <button type="button" className="add-service-btn" onClick={handleAddService}>
                                    +
                                </button>
                                <button type="submit" className="submit-btn">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gastos;
