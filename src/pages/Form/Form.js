import React, { useState } from 'react';
import './Form.css';
import fondfrom from '../../assets/fondform.png';

const Form = () => {
    const [formData, setFormData] = useState({});
    const [page, setPage] = useState(0);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleNext = () => {
        if (validatePage(page)) {
            setPage((prevPage) => prevPage + 1);
        } else {
            alert('Por favor completa todos los campos.');
        }
    };

    const handlePrevious = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    const progressColor = () => {
        // Lógica para determinar el color de la barra de progreso
        return '#4F9B72'; 
    };

    const validatePage = (page) => {
        // Lógica de validación para cada página
        // Devuelve true si todos los campos están llenos, de lo contrario, false
        // Esta es una implementación simplificada
        const requiredFields = {
            0: ['nombreCompleto', 'edad', 'ocupacion', 'estadoCivil', 'numeroDependientes'],
            1: ['ingresoMensual', 'ingresosAdicionales', 'ingresosInversiones', 'estabilidadLaboral'],
            2: ['gastoVivienda', 'gastoServicios', 'gastoTransporte', 'gastoAlimentos', 'gastoEntretenimiento', 'gastoEducacion', 'gastoSalud', 'gastoDeudas'],
            3: ['cuentaAhorros', 'porcentajeAhorro', 'objetivoAhorro'],
            4: ['presupuestoMensual', 'frecuenciaRevision', 'tipoAhorro', 'conocimientoFinanzas'],
            5: ['comprasImpulsivas', 'planificacionCompras', 'tarjetasCredito', 'aprovechamientoDescuentos', 'comprasEnLinea'],
            6: ['metasCortoPlazo', 'metasMedianoPlazo', 'metasLargoPlazo', 'ahorroJubilacion', 'interesGestionFinanciera']
        };

        return requiredFields[page].every(field => formData[field]);
    };

    return (
        <div className='form-container'>
            <img src={fondfrom} alt="Form Background" className="form-background" />
            <div className='progress-bar'>
                <div className='progress' style={{ backgroundColor: progressColor(), width: `${(page + 1) * (100 / 7)}%` }}></div>
            </div>
            <form onSubmit={handleSubmit}>
                {page === 0 && (
                    <>
                        <h3>Información General</h3>
                        <div className='form-group'>
                            <label>Nombre completo:</label>
                            <input type='text' name='nombreCompleto' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>Edad:</label>
                            <input type='text' name='edad' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>Ocupación:</label>
                            <input type='text' name='ocupacion' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>Estado civil:</label>
                            <input type='text' name='estadoCivil' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>Número de dependientes:</label>
                            <input type='text' name='numeroDependientes' className='form-control' onChange={handleChange} />
                        </div>
                    </>
                )}
                {page === 1 && (
                    <>
                        <h4>Ingresos</h4>
                        <div className='form-group'>
                            <label>¿Cuál es tu ingreso mensual promedio?</label>
                            <input type='text' name='ingresoMensual' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Tienes ingresos adicionales (bonos, comisiones, trabajos secundarios)?</label>
                            <input type='text' name='ingresosAdicionales' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Recibes ingresos por inversiones (renta de propiedades, dividendos)?</label>
                            <input type='text' name='ingresosInversiones' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Cómo clasificas tu estabilidad laboral (muy estable, estable, inestable, muy inestable)?</label>
                            <input type='text' name='estabilidadLaboral' className='form-control' onChange={handleChange} />
                        </div>
                    </>
                )}
                {page === 2 && (
                    <>
                        <h4>Gastos</h4>
                        <div className='form-group'>
                            <label>¿Cuál es tu gasto mensual promedio en vivienda (hipoteca, alquiler)?</label>
                            <input type='text' name='gastoVivienda' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Cuánto gastas mensualmente en servicios públicos (agua, electricidad, gas, internet)?</label>
                            <input type='text' name='gastoServicios' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Cuál es tu gasto mensual en transporte (combustible, transporte público, mantenimiento)?</label>
                            <input type='text' name='gastoTransporte' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Cuánto gastas mensualmente en alimentos (supermercado, restaurantes)?</label>
                            <input type='text' name='gastoAlimentos' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Cuánto gastas mensualmente en entretenimiento (cine, eventos, salidas)?</label>
                            <input type='text' name='gastoEntretenimiento' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Cuáles son tus gastos mensuales en educación (colegio, universidad, cursos)?</label>
                            <input type='text' name='gastoEducacion' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Cuánto gastas en salud mensualmente (seguros, consultas, medicamentos)?</label>
                            <input type='text' name='gastoSalud' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Tienes deudas? En caso afirmativo, ¿cuánto pagas mensualmente en deudas?</label>
                            <input type='text' name='gastoDeudas' className='form-control' onChange={handleChange} />
                        </div>
                    </>
                )}
                {page === 3 && (
                    <>
                        <h4>Ahorros e Inversiones</h4>
                        <div className='form-group'>
                            <label>¿Tienes una cuenta de ahorros?</label>
                            <input type='text' name='cuentaAhorros' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Qué porcentaje de tus ingresos mensuales te gustaría ahorrar?</label>
                            <input type='text' name='porcentajeAhorro' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Tienes algún objetivo de ahorro específico (compra de casa, coche, vacaciones)?</label>
                            <input type='text' name='objetivoAhorro' className='form-control' onChange={handleChange} />
                        </div>
                    </>
                )}
                {page === 4 && (
                    <>
                        <h4>Finanzas Personales</h4>
                        <div className='form-group'>
                            <label>¿Llevas un presupuesto mensual?</label>
                            <input type='text' name='presupuestoMensual' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Con qué frecuencia revisas tus gastos e ingresos?</label>
                            <input type='text' name='frecuenciaRevision' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Te consideras una persona ahorradora o gastadora?</label>
                            <input type='text' name='tipoAhorro' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Cómo calificarías tu conocimiento sobre finanzas personales (básico, intermedio, avanzado)?</label>
                            <input type='text' name='conocimientoFinanzas' className='form-control' onChange={handleChange} />
                        </div>
                    </>
                )}
                {page === 5 && (
                    <>
                        <h4>Hábitos de Consumo</h4>
                        <div className='form-group'>
                            <label>¿Sueles hacer compras impulsivas?</label>
                            <input type='text' name='comprasImpulsivas' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Planificas tus compras grandes con anticipación?</label>
                            <input type='text' name='planificacionCompras' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Usas tarjetas de crédito?</label>
                            <input type='text' name='tarjetasCredito' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Sueles aprovechar descuentos y promociones?</label>
                            <input type='text' name='aprovechamientoDescuentos' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Realizas compras en línea frecuentemente?</label>
                            <input type='text' name='comprasEnLinea' className='form-control' onChange={handleChange} />
                        </div>
                    </>
                )}
                {page === 6 && (
                    <>
                        <h4>Planificación y Metas</h4>
                        <div className='form-group'>
                            <label>¿Tienes metas financieras a corto plazo (menos de un año)?</label>
                            <input type='text' name='metasCortoPlazo' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Tienes metas financieras a mediano plazo (1-5 años)?</label>
                            <input type='text' name='metasMedianoPlazo' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Tienes metas financieras a largo plazo (más de 5 años)?</label>
                            <input type='text' name='metasLargoPlazo' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Estás ahorrando para la jubilación?</label>
                            <input type='text' name='ahorroJubilacion' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label>¿Estás interesado en aprender más sobre gestión financiera?</label>
                            <input type='text' name='interesGestionFinanciera' className='form-control' onChange={handleChange} />
                        </div>
                    </>
                )}

                <div className='navigation-buttons'>
                    {page > 0 && <button type='button' className='btn btn-secondary' onClick={handlePrevious}>Anterior</button>}
                    {page < 6 && <button type='button' className='btn btn-primary' onClick={handleNext}>Siguiente</button>}
                    {page === 6 && <button type='submit' className='btn btn-primary'>Enviar</button>}
                </div>
            </form>
        </div>
    );
}

export default Form;
