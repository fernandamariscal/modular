import React, { useState } from 'react';
import fondformImage from '../../assets/fondform_2.png'; // Importa la imagen de fondo
import './Form.css'; // Importa el archivo CSS para los estilos del formulario

const Form = () => {
  const totalSections = 5; // Total de secciones en el formulario

  const [formData, setFormData] = useState({
    // Estado inicial del formulario
    ocupacion: '',
    estadoCivil: '',
    numDependientes: '',
    ingresoMensual: '',
    ingresosAdicionales: false,
    ingresosInversiones: false,
    ayudaSubsidio: false,
    estabilidadLaboral: '',
    gastoVivienda: '',
    gastoServicios: '',
    gastoTransporte: '',
    gastoAlimentos: '',
    gastoEntretenimiento: '',
    gastoEducacion: '',
    gastoSalud: '',
    tieneDeudas: false,
    pagoDeudas: '',
    tieneAhorrosEmergencias: false,
    cuentaAhorros: false,
    porcentajeAhorro: '',
    tieneInversiones: false,
    planJubilacion: false,
    objetivoAhorro: '',
    llevaPresupuesto: false,
    frecuenciaRevisionGastos: '',
    usaHerramientaGestion: false,
    perfilAhorro: '',
    conocimientoFinanciero: '',
    desafioFinanciero: '',
    comprasImpulsivas: false,
    planificaComprasGrandes: false,
    usaTarjetasCredito: false,
    gastoTarjetasCredito: '',
    aprovechaDescuentos: false,
    comprasEnLinea: false,
    metasCortoPlazo: false,
    metasMedianoPlazo: false,
    metasLargoPlazo: false,
    ahorraParaJubilacion: false,
    interesadoGestionFinanciera: false,
  });

  const [section, setSection] = useState(0); // Estado de la sección actual
  const [progress, setProgress] = useState(0); // Estado del progreso actual

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  // Calcular el progreso en porcentaje
  const calculateProgress = () => {
    return ((section + 1) / totalSections) * 100;
  };

  // Función para avanzar a la siguiente sección
  const handleNext = () => {
    setSection(prevSection => prevSection + 1);
    setProgress(calculateProgress());
  };

  // Función para retroceder a la sección anterior
  const handlePrevious = () => {
    setSection(prevSection => prevSection - 1);
    setProgress(calculateProgress());
  };

  return (
    <div className="form-container" style={{ backgroundImage: `url(${fondformImage})` }}>
      <div className="form-content">
        <form onSubmit={handleSubmit}>

          {/* Barra de progreso */}
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          {section === 0 && (
            <>
              <h4>Informacion Personal</h4>
                <div className="mb-3">
                <label htmlFor="ocupacion" className="form-label">
                            Ocupación:
                        </label>
                        <input
                            type="text"
                            id="ocupacion"
                            name="ocupacion"
                            className="form-control"
                            value={formData.ocupacion}
                            onChange={handleChange}
                            required
                        />
                    </div>
              <div className="mb-3">
                <label htmlFor="estadoCivil" className="form-label">Estado civil:</label>
                <select
                    id="estadoCivil"
                    name="estadoCivil"
                    className="form-select"
                    value={formData.estadoCivil}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona tu estado civil</option>
                    <option value="Soltero(a)">Soltero(a)</option>
                    <option value="Casado(a)">Casado(a)</option>
                    <option value="Viudo(a)">Viudo(a)</option>
                </select>
                </div>

              <div className="mb-3">
                <label htmlFor="numDependientes" className="form-label">Número de dependientes:</label>
                <input
                  type="number"
                  id="numDependientes"
                  name="numDependientes"
                  className="form-control"
                  value={formData.numDependientes}
                  onChange={handleChange}
                  required
                />
              </div>
              <h4>Ingresos</h4>
              <div className="mb-3">
                <label htmlFor="ingresoMensual" className="form-label">¿Cuál es tu ingreso mensual promedio?</label>
                <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  id="ingresoMensual"
                  name="ingresoMensual"
                  className="form-control"
                  value={formData.ingresoMensual}
                  onChange={handleChange}
                  required
                />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="ingresosAdicionales" className="form-label">¿Tienes ingresos adicionales?</label>
                <select
                    id="ingresosAdicionales"
                    name="ingresosAdicionales"
                    className="form-select"
                    value={formData.ingresosAdicionales}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Selecciona una opción</option>
                    <option value="bonos">Bonos</option>
                    <option value="comisiones">Comisiones</option>
                    <option value="trabajoIndependiente">Trabajo independiente</option>
                    <option value="otros">Otros</option>
                </select>
                </div>
                <div className="mb-3">
                <label htmlFor="ingresosInversiones" className="form-label">¿Recibes ingresos por inversiones (renta de propiedades, dividendos)?</label>
                <select
                    id="ingresosInversiones"
                    name="ingresosInversiones"
                    className="form-select"
                    value={formData.ingresosInversiones}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="rentaPropiedades">Renta de propiedades</option>
                    <option value="dividendos">Dividendos</option>
                    <option value="Pension">Pension</option>
                    <option value="Otro">Otro</option>
                    <option value="Ninguno">Ninguno</option>
                </select>
                </div>
              <div className="mb-3">
                <label htmlFor="estabilidadLaboral" className="form-label">¿Cómo clasificas tu estabilidad laboral (muy estable, estable, inestable, muy inestable)?</label>
                <select
                  id="estabilidadLaboral"
                  name="estabilidadLaboral"
                  className="form-select"
                  value={formData.estabilidadLaboral}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="muy estable">Muy estable</option>
                  <option value="estable">Estable</option>
                  <option value="inestable">Inestable</option>
                  <option value="muy inestable">Muy inestable</option>
                </select>
              </div>
            </>
          )}
          
          {section === 1 && (
            <>
              <h4>Gastos</h4>
              <div className="mb-3">
                <label htmlFor="gastoVivienda" className="form-label">¿Cuál es tu gasto mensual promedio en vivienda (hipoteca, alquiler)?</label>
                <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  id="gastoVivienda"
                  name="gastoVivienda"
                  className="form-control"
                  value={formData.gastoVivienda}
                  onChange={handleChange}
                  required
                />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="gastoServicios" className="form-label">¿Cuánto gastas mensualmente en servicios públicos (agua, electricidad, gas, internet)?</label>
                <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  id="gastoServicios"
                  name="gastoServicios"
                  className="form-control"
                  value={formData.gastoServicios}
                  onChange={handleChange}
                  required
                />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="gastoTransporte" className="form-label">¿Cuál es tu gasto mensual en transporte (combustible, transporte público, mantenimiento)?</label>
                <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  id="gastoTransporte"
                  name="gastoTransporte"
                  className="form-control"
                  value={formData.gastoTransporte}
                  onChange={handleChange}
                  required
                />
              </div>
              </div>
              <div className="mb-3">
                <label htmlFor="gastoAlimentos" className="form-label">¿Cuánto gastas mensualmente en alimentos (supermercado, restaurantes)?</label>
                <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  id="gastoAlimentos"
                  name="gastoAlimentos"
                  className="form-control"
                  value={formData.gastoAlimentos}
                  onChange={handleChange}
                  required
                />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="gastoEntretenimiento" className="form-label">¿Cuánto gastas mensualmente en entretenimiento (cine, eventos, salidas)?</label>
                <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  id="gastoEntretenimiento"
                  name="gastoEntretenimiento"
                  className="form-control"
                  value={formData.gastoEntretenimiento}
                  onChange={handleChange}
                  required
                />
              </div>
              </div>
              <div className="mb-3">
                <label htmlFor="gastoEducacion" className="form-label">¿Cuáles son tus gastos mensuales en educación (colegio, universidad, cursos)?</label>
                <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                    type="number"
                    id="gastoEducacion"
                    name="gastoEducacion"
                    className="form-control"
                    value={formData.gastoEducacion}
                    onChange={handleChange}
                    required
                    />
                </div>
                </div>
              <div className="mb-3">
                <label htmlFor="gastoSalud" className="form-label">¿Cuánto gastas en salud mensualmente (seguros, consultas, medicamentos)?</label>
                <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  id="gastoSalud"
                  name="gastoSalud"
                  className="form-control"
                  value={formData.gastoSalud}
                  onChange={handleChange}
                  required
                />
              </div>
              </div>
              <div className="mb-3">
                <label htmlFor="tieneDeudas" className="form-label">¿Tienes deudas?</label>
                <select
                    id="tieneDeudas"
                    name="tieneDeudas"
                    className="form-select"
                    value={formData.tieneDeudas}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
                </div>
            </>
          )}

          {section === 2 && (
            <>
              <h4>Ahorros e Inversiones</h4>
              <div className="mb-3">
                <label htmlFor="porcentajeAhorro" className="form-label">¿Qué porcentaje de tus ingresos mensuales destinas al ahorro?</label>
                <div className="input-group">
                <span className="input-group-text">%</span>
                    <input
                    type="number"
                    id="porcentajeAhorro"
                    name="porcentajeAhorro"
                    className="form-control"
                    value={formData.porcentajeAhorro}
                    onChange={handleChange}
                    required
                    />
                </div>
                </div>

              <div className="mb-3">
                <label htmlFor="planJubilacion" className="form-label">¿Participas en un plan de jubilación o pensión?</label>
                <select
                    id="planJubilacion"
                    name="planJubilacion"
                    className="form-select"
                    value={formData.planJubilacion}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                    <option value="me-gustaria">Me gustaría</option>
                </select>
                </div>

                <div className="mb-3">
                <label htmlFor="objetivoAhorro" className="form-label">¿Tienes algún objetivo de ahorro específico (compra de casa, coche, vacaciones)?</label>
                <select
                    id="objetivoAhorro"
                    name="objetivoAhorro"
                    className="form-select"
                    value={formData.objetivoAhorro}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="compra-casa">Compra de casa</option>
                    <option value="compra-coche">Compra de coche</option>
                    <option value="vacaciones">Vacaciones</option>
                    <option value="universidad">Universidad</option>
                    <option value="boda">Boda</option>
                    <option value="moto">Moto</option>
                    <option value="otro">Otro</option>
                </select>
                </div>

            </>
          )}

          {section === 3 && (
            <>
              <h4>Finanzas Personales</h4>
              <div className="mb-3">
                <label htmlFor="llevaPresupuesto" className="form-label">¿Llevas un presupuesto mensual?</label>
                <select
                    id="llevaPresupuesto"
                    name="llevaPresupuesto"
                    className="form-select"
                    value={formData.llevaPresupuesto}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
                </div>
              <div className="mb-3">
                <label htmlFor="frecuenciaRevisionGastos" className="form-label">¿Con qué frecuencia revisas tus gastos e ingresos?</label>
                <select
                    id="frecuenciaRevisionGastos"
                    name="frecuenciaRevisionGastos"
                    className="form-select"
                    value={formData.frecuenciaRevisionGastos}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="mucha">Mucha</option>
                    <option value="regular">Regular</option>
                    <option value="poca">Poca</option>
                    <option value="no-se-hacerlo">No sé hacerlo</option>
                </select>
                </div>

              <div className="mb-3">
                <label htmlFor="form_label" className ="form-label">¿Utilizas alguna herramienta o aplicación para gestionar tus finanzas?</label>
                <div className="form_label">
                  <input
                    type="text"
                    id="usaHerramientaGestion"
                    name="usaHerramientaGestion"
                    className="form-control"
                    checked={formData.usaHerramientaGestion}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="perfilAhorro" className="form-label">¿Te consideras una persona ahorradora o gastadora?</label>
                <select
                    id="perfilAhorro"
                    name="perfilAhorro"
                    className="form-select"
                    value={formData.perfilAhorro}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="gastadora">Gastadora</option>
                    <option value="un_poco_gastadora">Un poco gastadora</option>
                    <option value="irregular">Irregular</option>
                    <option value="ahorradora">Ahorradora</option>
                </select>
                </div>

              <div className="mb-3">
                <label htmlFor="conocimientoFinanciero" className="form-label">¿Cómo calificarías tu conocimiento sobre finanzas personales (básico, intermedio, avanzado)?</label>
                <select
                  id="conocimientoFinanciero"
                  name="conocimientoFinanciero"
                  className="form-select"
                  value={formData.conocimientoFinanciero}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="básico">Básico</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="desafioFinanciero" className="form-label">¿Cuál es tu mayor desafío financiero en este momento?</label>
                <input
                  type="text"
                  id="desafioFinanciero"
                  name="desafioFinanciero"
                  className="form-control"
                  value={formData.desafioFinanciero}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {section === 4 && (
            <>
              <h4>Hábitos de Consumo</h4>
              <div className="mb-3">
                <label htmlFor="comprasImpulsivas" className="form-label">¿Sueles hacer compras impulsivas?</label>
                <select
                    id="comprasImpulsivas"
                    name="comprasImpulsivas"
                    className="form-select"
                    value={formData.comprasImpulsivas}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
                </div>

                <div className="mb-3">
                <label htmlFor="planificaComprasGrandes" className="form-label">¿Planificas tus compras grandes con anticipación?</label>
                <select
                    id="planificaComprasGrandes"
                    name="planificaComprasGrandes"
                    className="form-select"
                    value={formData.planificaComprasGrandes}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
                </div>
                <div className="mb-3">
                <label htmlFor="usaTarjetasCredito" className="form-label">¿Usas tarjetas de crédito?</label>
                <select
                    id="usaTarjetasCredito"
                    name="usaTarjetasCredito"
                    className="form-select"
                    value={formData.usaTarjetasCredito}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
                </div>

                {formData.usaTarjetasCredito === "si" && (
                <div className="mb-3">
                    <label htmlFor="gastoTarjetasCredito" className="form-label">En caso afirmativo, ¿cuánto sueles gastar mensualmente con ellas?</label>
                    <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                    type="number"
                    id="gastoTarjetasCredito"
                    name="gastoTarjetasCredito"
                    className="form-control"
                    value={formData.gastoTarjetasCredito}
                    onChange={handleChange}
                    required
                    />
                  </div>
                </div>
                )}

                <div className="mb-3">
                <label htmlFor="aprovechaDescuentos" className="form-label">¿Sueles aprovechar descuentos y promociones?</label>
                <select
                    id="aprovechaDescuentos"
                    name="aprovechaDescuentos"
                    className="form-select"
                    value={formData.aprovechaDescuentos}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
                </div>

                <div className="mb-3">
                <label htmlFor="comprasEnLinea" className="form-label">¿Realizas compras en línea frecuentemente?</label>
                <select
                    id="comprasEnLinea"
                    name="comprasEnLinea"
                    className="form-select"
                    value={formData.comprasEnLinea}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
                </div>

            </>
          )}

          {section === 5 && (
            <>
              <h4>Planificación y Metas</h4>
              <div className="mb-3">
                <label htmlFor="metasCortoPlazo" className="form-label">¿Tienes metas financieras a corto plazo (menos de un año)?</label>
                <select
                    id="metasCortoPlazo"
                    name="metasCortoPlazo"
                    className="form-select"
                    value={formData.metasCortoPlazo}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
                </div>

                <div className="mb-3">
                <label htmlFor="metasMedianoPlazo" className="form-label">¿Tienes metas financieras a mediano plazo (1-5 años)?</label>
                <select
                    id="metasMedianoPlazo"
                    name="metasMedianoPlazo"
                    className="form-select"
                    value={formData.metasMedianoPlazo}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
                </div>

                <div className="mb-3">
                <label htmlFor="metasLargoPlazo" className="form-label">¿Tienes metas financieras a largo plazo (más de 5 años)?</label>
                <select
                    id="metasLargoPlazo"
                    name="metasLargoPlazo"
                    className="form-select"
                    value={formData.metasLargoPlazo}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
                </div>

                <div className="mb-3">
                <label htmlFor="ahorraParaJubilacion" className="form-label">¿Estás ahorrando para la jubilación?</label>
                <select
                    id="ahorraParaJubilacion"
                    name="ahorraParaJubilacion"
                    className="form-select"
                    value={formData.ahorraParaJubilacion}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
                </div>

                <div className="mb-3">
                <label htmlFor="interesadoGestionFinanciera" className="form-label">¿Estás interesado en aprender más sobre gestión financiera?</label>
                <select
                    id="interesadoGestionFinanciera"
                    name="interesadoGestionFinanciera"
                    className="form-select"
                    value={formData.interesadoGestionFinanciera}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
                </div>

            </>
          )}

          <div className="form-navigation">
            {section > 0 && (
              <button type="button" className="btn btn-secondary" onClick={handlePrevious}>
                Anterior
              </button>
            )}
            {section < 5 ? (
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Siguiente
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
