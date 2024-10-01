import React, { useState } from 'react';
import './Metas.css';

const Metas = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [calculatedReturn, setCalculatedReturn] = useState(null);
  const [investmentRate, setInvestmentRate] = useState(0);
  const [investmentYears, setInvestmentYears] = useState(1);

  const plans = [
    {
      name: 'Nu (NU)',
      description: 'Una fintech que ofrece cuentas de ahorro e inversión.',
      rate: 0.06,
      pros: 'Bajo riesgo y alta accesibilidad.',
      cons: 'Rendimientos moderados.',
    },
    {
      name: 'GBM (Grupo Bursátil Mexicano)',
      description: 'Una plataforma de inversión que permite a los usuarios invertir en acciones, ETFs y más.',
      rate: 0.07,
      pros: 'Posibilidad de altos rendimientos.',
      cons: 'Mayor riesgo en función del mercado.',
    },
    {
      name: 'Fondos de Inversión',
      description: 'Carteras de inversión que agrupan el capital de múltiples inversores.',
      rate: 0.05,
      pros: 'Diversificación de riesgos.',
      cons: 'Comisiones que pueden reducir rendimientos.',
    },
    {
      name: 'Mercado Pago',
      description: 'Una plataforma que permite realizar pagos y ofrece opciones de ahorro e inversión.',
      rate: 0.045,
      pros: 'Fácil acceso y opciones de inversión integradas.',
      cons: 'Rendimientos menores en comparación con otras opciones.',
    },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setInvestmentRate(plan.rate);
    setCalculatedReturn(null); // Reiniciar el rendimiento calculado
    setInvestmentAmount(''); // Reiniciar el monto de inversión
    setInvestmentYears(1); // Reiniciar años de inversión
  };

  const handleInvestmentChange = (e) => {
    setInvestmentAmount(e.target.value);
  };

  const handleYearsChange = (e) => {
    setInvestmentYears(e.target.value);
  };

  const handleRateChange = (e) => {
    setInvestmentRate(e.target.value);
  };

  const calculateReturn = () => {
    if (investmentAmount && selectedPlan) {
      const totalAmount = investmentAmount * Math.pow(1 + investmentRate, investmentYears);
      setCalculatedReturn(totalAmount.toFixed(2)); // Muestra el resultado con dos decimales
    }
  };

  return (
    <div className="metas-container">
      <h1>Metas de Inversión y Tasas de Interés</h1>

      <section className="investment-plans">
        <h2>Planes de Inversión</h2>
        <div className="plan-cards">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className="plan-card" 
              onClick={() => handlePlanSelect(plan)}
            >
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedPlan && (
        <section className="investment-calculator">
          <h2>Detalles de {selectedPlan.name}</h2>
          <p>Tasa de Interés: {(investmentRate * 100).toFixed(2)}%</p>
          <p><strong>Pros:</strong> {selectedPlan.pros}</p>
          <p><strong>Contras:</strong> {selectedPlan.cons}</p>

          <label>
            Ajustar Tasa de Interés:
            <input
              type="range"
              min="0"
              max="0.1"
              step="0.001"
              value={investmentRate}
              onChange={handleRateChange}
            />
            {(investmentRate * 100).toFixed(2)}%
          </label>

          <input
            type="number"
            value={investmentAmount}
            onChange={handleInvestmentChange}
            placeholder="Monto a invertir"
            min="0"
            step="0.01"
          />
          <label>
            Años de inversión:
            <input
              type="number"
              value={investmentYears}
              onChange={handleYearsChange}
              min="1"
            />
          </label>
          <button onClick={calculateReturn}>Calcular Rendimiento</button>
          {calculatedReturn && (
            <p>El rendimiento esperado de su inversión en {investmentYears} año(s) es: ${calculatedReturn}</p>
          )}
        </section>
      )}
    </div>
  );
};

export default Metas;
