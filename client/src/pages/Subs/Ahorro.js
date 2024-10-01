import React, { useState, useEffect } from 'react';
import '../Main/Welcome.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Ahorro = ({ user }) => {
    const [saveForm, setSaveForm] = useState({
        hasSpecificGoal: false,
        targetAmount: 'No especificado',
        weeklySavings: 'No especificado'
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [objectives, setObjectives] = useState([{ amount: '', term: '', quantity: '', isLocked: false, totalAbono: 0 }]);
    const [savingsPlan, setSavingsPlan] = useState([]);
    const [abonoAmount, setAbonoAmount] = useState('');
    const [selectedObjective, setSelectedObjective] = useState(null);

    useEffect(() => {
        const fetchFormData = async () => {
            if (!user || !user._id) {
                console.warn('El usuario no está definido o no tiene un _id');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/forms/save/getSave/${user._id}`);
                if (!response.ok) {
                    throw new Error(`Error en la respuesta: ${response.status}`);
                }
                const result = await response.json();
                setSaveForm({
                    hasSpecificGoal: result.hasSpecificGoal || false,
                    targetAmount: result.targetAmount || 'No especificado',
                    weeklySavings: result.weeklySavings || 'No especificado'
                });
            } catch (error) {
                console.error('Error fetching form data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFormData();
    }, [user]);

    const handleObjectiveChange = (index, event) => {
        const { name, value } = event.target;
        const updatedObjectives = [...objectives];
        updatedObjectives[index][name] = value;
        setObjectives(updatedObjectives);
    };

    const lockObjective = (index) => {
        const updatedObjectives = [...objectives];
        updatedObjectives[index].isLocked = true;
        setObjectives(updatedObjectives);
        calculateSavingsPlan(updatedObjectives);
    };

    const addObjective = () => {
        setObjectives([...objectives, { amount: '', term: '', quantity: '', isLocked: false, totalAbono: 0 }]);
    };

    const removeObjective = (index) => {
        const updatedObjectives = objectives.filter((_, i) => i !== index);
        setObjectives(updatedObjectives);
        calculateSavingsPlan(updatedObjectives);
    };

    const calculateSavingsPlan = (objectives) => {
        const plan = objectives.map((objective) => {
            const { amount, term, quantity } = objective;
            const targetAmount = parseFloat(amount);
            const quantityNumber = parseFloat(quantity);

            if (isNaN(targetAmount) || isNaN(quantityNumber) || quantityNumber <= 0) {
                return null;
            }

            let periods = 0;
            let savingsPerPeriod = 0;

            switch (term) {
                case 'mensual':
                    periods = Math.ceil(targetAmount / quantityNumber);
                    savingsPerPeriod = quantityNumber;
                    break;
                case 'semanal':
                    periods = Math.ceil(targetAmount / (quantityNumber * 4)); 
                    savingsPerPeriod = quantityNumber * 4;
                    break;
                case 'diario':
                    periods = Math.ceil(targetAmount / (quantityNumber * 30));
                    savingsPerPeriod = quantityNumber * 30;
                    break;
                default:
                    return null;
            }

            return { targetAmount, periods, savingsPerPeriod };
        }).filter(Boolean);

        setSavingsPlan(plan);
    };

    const handleAddObjective = () => {
        addObjective();
        calculateSavingsPlan([...objectives, { amount: '', term: '', quantity: '' }]);
    };

    const calculateProgress = (targetAmount, totalAbono) => {
        return Math.min((totalAbono / targetAmount) * 100, 100);
    };

    const handleAbonoClick = (index) => {
        setSelectedObjective(index);
        setAbonoAmount('');
    };

    const handleAbonoSubmit = (event) => {
        event.preventDefault();
        if (selectedObjective !== null && abonoAmount) {
            const updatedObjectives = [...objectives];
            const currentObjective = updatedObjectives[selectedObjective];

            const totalAmount = parseFloat(currentObjective.totalAbono || 0) + parseFloat(abonoAmount);
            updatedObjectives[selectedObjective].totalAbono = totalAmount;
            setObjectives(updatedObjectives);
            setAbonoAmount('');
            setSelectedObjective(null);
            calculateSavingsPlan(updatedObjectives);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="ahorro-container">
            <h1 className="ahorro-title">Ahorro</h1>
            <div className="ahorro-content">
            <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Objetivo Monto</th>
                        <th>Plazo</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {objectives.map((objective, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="number"
                                    name="amount"
                                    value={objective.amount}
                                    onChange={(e) => handleObjectiveChange(index, e)}
                                    placeholder="Monto"
                                    disabled={objective.isLocked}
                                />
                            </td>
                            <td>
                                <select
                                    name="term"
                                    value={objective.term}
                                    onChange={(e) => handleObjectiveChange(index, e)}
                                    disabled={objective.isLocked}
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="semanal">Semanal</option>
                                    <option value="mensual">Mensual</option>
                                    <option value="diario">Diario</option>
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={objective.quantity}
                                    onChange={(e) => handleObjectiveChange(index, e)}
                                    placeholder="Cantidad"
                                    disabled={objective.isLocked}
                                />
                            </td>
                            <td>
                                {objective.isLocked ? (
                                    <>
                                        <button onClick={() => removeObjective(index)}>Eliminar</button>
                                        <button onClick={() => handleAbonoClick(index)}>Abonar</button>
                                    </>
                                ) : (
                                    <button onClick={() => lockObjective(index)}>Bloquear</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Botón "+" al lado de la tabla */}
            <div className="add-objective-button" onClick={handleAddObjective}>
                <i className="add-icon">+</i>
            </div>
        </div>


                {savingsPlan.length > 0 && (
                    <div className="savings-plan">
                        <h2>Plan de Ahorro</h2>
                        <table className="table savings-plan-table">
                            <thead>
                                <tr>
                                    <th>Objetivo</th>
                                    <th>Períodos</th>
                                    <th>Ahorros por Período</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savingsPlan.map((plan, index) => {
                                    const totalAbono = objectives[index].totalAbono || 0;
                                    return (
                                        <tr key={index}>
                                            <td>${plan.targetAmount}</td>
                                            <td>{plan.periods}</td>
                                            <td>${plan.savingsPerPeriod}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Círculos de progreso */}
                <div className="progress-cards">
                    {savingsPlan.map((plan, index) => {
                        const totalAbono = objectives[index].totalAbono || 0;
                        return (
                            <div key={index} className="progress-card">
                                <h3>Objetivo: ${plan.targetAmount}</h3>
                                <CircularProgressbar
                                    value={calculateProgress(plan.targetAmount, totalAbono)}
                                    text={`${Math.round(calculateProgress(plan.targetAmount, totalAbono))}%`}
                                    styles={buildStyles({
                                        textColor: '#fff',
                                        pathColor: '#00bfff',
                                        trailColor: '#d6d6d6',
                                        textSize: '16px',
                                        pathTransitionDuration: 0.5,
                                    })}
                                />
                                <button className="pay-button" onClick={() => handleAbonoClick(index)}>Abonar</button>
                            </div>
                        );
                    })}
                </div>

                {selectedObjective !== null && (
                    <form onSubmit={handleAbonoSubmit}>
                        <h3>Abonar a Objetivo ${objectives[selectedObjective].amount}</h3>
                        <input
                            type="number"
                            value={abonoAmount}
                            onChange={(e) => setAbonoAmount(e.target.value)}
                            placeholder="Cantidad"
                        />
                        <button type="submit">Abonar</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Ahorro;
