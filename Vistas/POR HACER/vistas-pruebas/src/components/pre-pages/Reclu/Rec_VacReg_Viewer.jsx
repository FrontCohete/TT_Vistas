import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import FigureTable from '../../FigureTable';
import '../../../assets/css/rec_View.css';

const Rec_VacReg_Viewer = () => {
  const navigate = useNavigate();

  // Datos simulados actualizados con descripción y competencias
  const [datosVacantes, setDatosVacantes] = useState([
    {
      id: 1,
      empresa: 'Tech Solutions S.A. de C.V.',
      nombreVacante: 'Desarrollador Frontend Web',
      perfil: 'ISC',
      ubicacion: 'Cuauhtémoc, CDMX',
      modalidad: 'Híbrida',
      contratacion: 'Tiempo Completo',
      horario: 'Lunes a Viernes, 9:00 AM - 6:00 PM',
      salario: '$20,000 - $25,000 MXN',
      fechaPublicacion: '15/04/2026',
      status: 'Activa',
      reportes: 0,
      descripcion: 'Buscamos un desarrollador capaz de crear interfaces escalables usando React y conectarse a múltiples APIs REST.',
      softSkills: ['Trabajo en equipo', 'Proactividad', 'Resolución de problemas'],
      hardSkills: ['HTML', 'CSS', 'JavaScript', 'React.js']
    },
    {
      id: 2,
      empresa: 'Tech Solutions S.A. de C.V.',
      nombreVacante: 'Ingeniero de Inteligencia Artificial',
      perfil: 'IIA',
      ubicacion: 'Miguel Hidalgo, CDMX',
      modalidad: 'Home Office',
      contratacion: 'Medio Tiempo',
      horario: 'Lunes a Viernes, 9:00 AM - 2:00 PM',
      salario: '$30,000 - $35,000 MXN',
      fechaPublicacion: '',
      status: 'Revisión',
      reportes: 0,
      descripcion: 'Entrenamiento y optimización de modelos de Machine Learning para análisis de comportamiento.',
      softSkills: ['Pensamiento analítico', 'Autodidacta'],
      hardSkills: ['Python', 'TensorFlow', 'PyTorch']
    },
    {
      id: 3,
      empresa: 'Tech Solutions S.A. de C.V.',
      nombreVacante: 'Especialista en Ciberseguridad',
      perfil: 'LCS',
      ubicacion: 'Naucalpan, Edomex',
      modalidad: 'Presencial',
      contratacion: 'Tiempo Completo',
      horario: 'Lunes a Viernes, 8:00 AM - 5:00 PM',
      salario: '$40,000 MXN',
      fechaPublicacion: '',
      status: 'Requiere Corrección',
      reportes: 0,
      descripcion: 'Protección de infraestructura en la nube y detección temprana de vulnerabilidades del sistema.',
      softSkills: ['Atención al detalle', 'Trabajo bajo presión'],
      hardSkills: ['Hacking ético', 'Linux', 'Redes', 'AWS Security']
    },
    {
      id: 4,
      empresa: 'Tech Solutions S.A. de C.V.',
      nombreVacante: 'Analista de Sistemas',
      perfil: 'ISC',
      ubicacion: 'Tlalnepantla, Edomex',
      modalidad: 'Híbrida',
      contratacion: 'Tiempo Completo',
      horario: 'Lunes a Viernes, 9:00 AM - 6:00 PM',
      salario: '$22,000 MXN',
      fechaPublicacion: '10/03/2026',
      status: 'Suspendida',
      reportes: 3,
      descripcion: 'Documentación y levantamiento de requerimientos para desarrollo de software interno.',
      softSkills: ['Comunicación asertiva', 'Liderazgo'],
      hardSkills: ['UML', 'BPMN', 'Scrum']
    },
    {
      id: 5,
      empresa: 'Tech Solutions S.A. de C.V.',
      nombreVacante: 'Desarrollador Backend',
      perfil: 'ISC',
      ubicacion: 'Benito Juárez, CDMX',
      modalidad: 'Home Office',
      contratacion: 'Tiempo Completo',
      horario: 'Flexible',
      salario: '$35,000 MXN',
      fechaPublicacion: '01/02/2026',
      status: 'Concluida',
      reportes: 0,
      descripcion: 'Desarrollo y mantenimiento de microservicios para la plataforma principal.',
      softSkills: ['Organización', 'Gestión del tiempo'],
      hardSkills: ['Node.js', 'Express', 'MongoDB', 'Docker']
    }
  ]);

  const [sortConfig, setSortConfig] = useState({ clave: null, direccion: 'asc' });
  const [busqueda, setBusqueda] = useState('');
  const [modalInfoAbierto, setModalInfoAbierto] = useState(false);
  const [modalCorregirAbierto, setModalCorregirAbierto] = useState(false);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '', tipo: '', saliendo: false });
  const [formularioCorreccion, setFormularioCorreccion] = useState({
    empresa: '',
    nombreVacante: '',
    perfil: '',
    ubicacion: '',
    modalidad: '',
    contratacion: '',
    horario: '',
    salario: '',
    descripcion: '',
    softSkills: '',
    hardSkills: ''
  });

  const handleSort = (clave) => {
    let direccion = 'asc';
    if (sortConfig.clave === clave && sortConfig.direccion === 'asc') direccion = 'desc';
    setSortConfig({ clave, direccion });
  };

  const datosFiltrados = useMemo(() => {
    if (!busqueda) return datosVacantes;
    const busquedaLower = busqueda.toLowerCase();
    
    return datosVacantes.filter(reg => 
      reg.nombreVacante.toLowerCase().includes(busquedaLower) ||
      reg.ubicacion.toLowerCase().includes(busquedaLower) ||
      reg.status.toLowerCase().includes(busquedaLower)
    );
  }, [datosVacantes, busqueda]);

  const datosOrdenados = useMemo(() => {
    let datosOrdenables = [...datosFiltrados];
    if (sortConfig.clave) {
      datosOrdenables.sort((a, b) => {
        let valA = a[sortConfig.clave];
        let valB = b[sortConfig.clave];
        
        if (sortConfig.clave === 'fechaPublicacion') {
           valA = valA ? valA.split('/').reverse().join('') : '';
           valB = valB ? valB.split('/').reverse().join('') : '';
        }

        if (valA < valB) return sortConfig.direccion === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direccion === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return datosOrdenables;
  }, [datosFiltrados, sortConfig]);

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ visible: true, mensaje, tipo, saliendo: false });
    setTimeout(() => setNotificacion(prev => ({ ...prev, saliendo: true })), 3500);
    setTimeout(() => setNotificacion({ visible: false, mensaje: '', tipo: '', saliendo: false }), 4000);
  };

  //MANEJADORES DE MODAL (INFO)
  const abrirModalInfo = (registro) => {
    setVacanteSeleccionada(registro);
    setModalInfoAbierto(true);
  };

  const handleVerPostulados = () => {
    if (!vacanteSeleccionada) return;
    setModalInfoAbierto(false); 
    // Redirigimos a la ruta dinámica utilizando el ID de la vacante
    navigate(`/vacantes/${vacanteSeleccionada.id}/postulantes`);
  };

  const handleFinalizarProceso = () => {
    if (!vacanteSeleccionada) return;
    setDatosVacantes(prevDatos => 
      prevDatos.map(vac => vac.id === vacanteSeleccionada.id ? { ...vac, status: 'Concluida' } : vac)
    );
    setModalInfoAbierto(false);
    mostrarNotificacion('El proceso de la vacante ha finalizado exitosamente.', 'exito');
  };

  const handleEliminarVacante = () => {
    if (!vacanteSeleccionada) return;
    setDatosVacantes(prevDatos => prevDatos.filter(vac => vac.id !== vacanteSeleccionada.id));
    setModalInfoAbierto(false);
    mostrarNotificacion('La vacante ha sido eliminada permanentemente.', 'error'); 
  };

  // --- MANEJADORES DE MODAL (CORRECCIÓN)
  const abrirModalCorregir = (registro) => {
    setVacanteSeleccionada(registro);
    setFormularioCorreccion({
      empresa: registro.empresa,
      nombreVacante: registro.nombreVacante,
      perfil: registro.perfil,
      ubicacion: registro.ubicacion,
      modalidad: registro.modalidad,
      contratacion: registro.contratacion,
      horario: registro.horario,
      salario: registro.salario,
      descripcion: registro.descripcion || '',
      softSkills: registro.softSkills ? registro.softSkills.join(', ') : '',
      hardSkills: registro.hardSkills ? registro.hardSkills.join(', ') : ''
    });
    setModalCorregirAbierto(true);
  };

  const handleChangeCorreccion = (e) => {
    const { name, value } = e.target;
    setFormularioCorreccion(prev => ({ ...prev, [name]: value }));
  };

  const handleEnviarCorreccion = () => {
    alert("Envío de correo pendiente");
    
    const competenciasBlandas = formularioCorreccion.softSkills.split(',').map(s => s.trim()).filter(Boolean);
    const competenciasTecnicas = formularioCorreccion.hardSkills.split(',').map(s => s.trim()).filter(Boolean);

    setDatosVacantes(prevDatos => 
      prevDatos.map(vac => 
        vac.id === vacanteSeleccionada.id 
          ? { 
              ...vac, 
              ...formularioCorreccion, 
              softSkills: competenciasBlandas,
              hardSkills: competenciasTecnicas,
              status: 'Revisión' 
            } 
          : vac
      )
    );
    
    setModalCorregirAbierto(false);
    mostrarNotificacion('La vacante ha sido corregida y enviada a revisión.', 'exito');
  };

  const columnas = [
    { 
      clave: 'nombreVacante', 
      encabezado: 'Nombre de Vacante', 
      width: '25%',
      render: (fila) => <span style={{ fontWeight: '600', color: '#1e293b' }}>{fila.nombreVacante}</span>
    },
    { clave: 'ubicacion', encabezado: 'Ubicación', width: '15%' },
    { clave: 'salario', encabezado: 'Sueldo', width: '15%' },
    { 
      clave: 'fechaPublicacion', 
      encabezado: 'Fecha de Publicación', 
      width: '15%',
      render: (fila) => (
        <span style={{ color: fila.status === 'Activa' ? '#1e293b' : '#94a3b8' }}>
          {fila.status === 'Activa' ? fila.fechaPublicacion : 'N/A'}
        </span>
      )
    },
    { 
      clave: 'status', 
      encabezado: 'Status', 
      width: '15%',
      render: (fila) => {
        let claseBadge = '';
        switch (fila.status) {
          case 'Activa': claseBadge = 'badge-activa'; break;
          case 'Revisión': claseBadge = 'badge-revision'; break;
          case 'Requiere Corrección': claseBadge = 'badge-correccion'; break;
          case 'Suspendida': claseBadge = 'badge-suspendida'; break;
          case 'Concluida': claseBadge = 'badge-concluida'; break;
          default: claseBadge = 'badge-gray';
        }

        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className={`badge-estatus ${claseBadge}`}>
              <span className="status-dot"></span>
              {fila.status}
            </span>
          </div>
        );
      }
    },
    { 
      clave: 'acciones', 
      encabezado: 'Opciones', 
      sortable: false, 
      width: '15%', 
      render: (fila) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button className="btn-accion btn-blue-outline" title="Visualizar" onClick={() => abrirModalInfo(fila)}>
            <i className="fi fi-rr-eye"></i> Visualizar
          </button>
          
          {fila.status === 'Requiere Corrección' && (
            <button className="btn-accion btn-orange-outline" title="Corregir" onClick={() => abrirModalCorregir(fila)}>
              <i className="fi fi-rr-edit"></i> Corregir
            </button>
          )}
        </div>
      )
    }
  ];

  const permiteBorrar = vacanteSeleccionada?.status === 'Concluida' || vacanteSeleccionada?.status === 'Suspendida';

  return (
    <div className="contenedor-rec">
      <h2 className="titulo-rec">Mis Vacantes Publicadas</h2>
      
      <div className="acciones-top-container">
        <div className="barra-busqueda-container">
          <i className="fi fi-rr-search"></i>
          <input 
            type="text" 
            className="input-busqueda" 
            placeholder="Buscar por vacante, ubicación o status..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <FigureTable 
        columnas={columnas} 
        datos={datosOrdenados} 
        onSort={handleSort} 
        sortConfig={sortConfig}
        mensajeVacio={busqueda ? "No se encontraron vacantes para tu búsqueda." : "No tienes vacantes registradas."}
      />

      {/* MODAL DE VISUALIZACIÓN */}
      {modalInfoAbierto && vacanteSeleccionada && (
        <div className="modal-overlay" onClick={() => setModalInfoAbierto(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <h2 style={{ color: '#0f172a' }}>{vacanteSeleccionada.nombreVacante}</h2>
              <p className="modal-subtitle">Visualiza el estado de tu vacante publicada dentro de Caspita.</p>
              <button onClick={() => setModalInfoAbierto(false)} className="close-btn">&times;</button>
            </div>

            <div className="modal-body">
              <div className="resume-box" style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="data-label">Status Actual:</span>
                    <span className="data-value" style={{ display: 'block', fontSize: '1.1rem', marginTop: '4px' }}>
                      <span className="badge-estatus" style={{ padding: '2px 0', border: 'none', fontWeight: 'bold' }}>
                         {vacanteSeleccionada.status}
                      </span>
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="data-label">Reportes:</span>
                    <span className={`data-value ${vacanteSeleccionada.reportes > 0 ? 'text-danger' : 'text-success'}`} style={{ display: 'block', fontSize: '1.2rem', fontWeight: 'bold' }}>
                      {vacanteSeleccionada.reportes}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="section-title"><i className="fi fi-rr-info"></i> Datos de la vacante</h3>
              <div className="grid-2-col" style={{ marginBottom: '24px', marginTop: '16px' }}>
                <div className="data-group">
                  <span className="data-label">Empresa</span>
                  <span className="data-value">{vacanteSeleccionada.empresa}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Nombre</span>
                  <span className="data-value">{vacanteSeleccionada.nombreVacante}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Perfil Solicitado</span>
                  <span className="data-value">{vacanteSeleccionada.perfil}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Ubicación</span>
                  <span className="data-value">{vacanteSeleccionada.ubicacion}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Modalidad</span>
                  <span className="data-value">{vacanteSeleccionada.modalidad}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Contratación</span>
                  <span className="data-value">{vacanteSeleccionada.contratacion}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Horario</span>
                  <span className="data-value">{vacanteSeleccionada.horario}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Salario</span>
                  <span className="data-value">{vacanteSeleccionada.salario}</span>
                </div>

                <div className="data-group" style={{ gridColumn: '1 / -1' }}>
                  <span className="data-label">Descripción de la Vacante</span>
                  <p className="data-text">{vacanteSeleccionada.descripcion}</p>
                </div>

                <div className="data-group" style={{ gridColumn: '1 / -1' }}>
                  <span className="data-label">Competencias Requeridas</span>
                  <div className="grid-2-col" style={{ marginTop: '8px' }}>
                    <div>
                      <strong style={{ fontSize: '0.85rem' }}>Personales (Soft Skills):</strong>
                      {vacanteSeleccionada.softSkills && vacanteSeleccionada.softSkills.length > 0 ? (
                        <ul className="skills-list">
                          {vacanteSeleccionada.softSkills.map((skill, idx) => <li key={idx}><i className="fi fi-rr-check"></i> {skill}</li>)}
                        </ul>
                      ) : (
                        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>No especificadas.</p>
                      )}
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.85rem' }}>Profesionales (Hard Skills):</strong>
                      {vacanteSeleccionada.hardSkills && vacanteSeleccionada.hardSkills.length > 0 ? (
                        <ul className="skills-list">
                          {vacanteSeleccionada.hardSkills.map((skill, idx) => <li key={idx}><i className="fi fi-rr-check"></i> {skill}</li>)}
                        </ul>
                      ) : (
                        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>No especificadas.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              <h3 className="section-title" style={{ color: vacanteSeleccionada.reportes > 0 ? '#ea580c' : '#10b981' }}>
                <i className={vacanteSeleccionada.reportes > 0 ? "fi fi-rr-exclamation" : "fi fi-rr-check-circle"}></i> 
                Reportes Activos: {vacanteSeleccionada.reportes}
              </h3>
            </div>

            <div className="modal-footer flex-right">
              {permiteBorrar && (
                <button 
                  className="btn-modal btn-modal-rojo" 
                  style={{ marginRight: 'auto' }} 
                  onClick={handleEliminarVacante}
                >
                  <i className="fi fi-rr-trash"></i> Eliminar Vacante
                </button>
              )}

              <button 
                className="btn-modal btn-modal-gris" 
                style={!permiteBorrar ? { marginRight: 'auto' } : {}} 
                onClick={handleVerPostulados}
              >
                <i className="fi fi-rr-users"></i> Ver Postulados
              </button>

              <button 
                className="btn-modal btn-modal-verde" 
                onClick={handleFinalizarProceso}
                disabled={vacanteSeleccionada.status === 'Concluida'}
              >
                <i className="fi fi-rr-checkbox"></i> Finalizar Proceso
              </button>
            </div>
          </div>
        </div>
      )}

      {/*  MODAL DE CORRECCIÓN */}
      {modalCorregirAbierto && vacanteSeleccionada && (
        <div className="modal-overlay" onClick={() => setModalCorregirAbierto(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <h2 style={{ color: '#ea580c' }}><i className="fi fi-rr-edit"></i> Corrección de Vacante</h2>
              <p className="modal-subtitle">
                El administrador del sitio solicita amablemente que realice los cambios pertinentes en su publicación tomando en cuenta los parámetros observados en el correo electrónico enviado.
              </p>
              <button onClick={() => setModalCorregirAbierto(false)} className="close-btn">&times;</button>
            </div>

            <div className="modal-body">
              <div className="formulario-cuadricula">
                <div className="form-group">
                  <label>Empresa</label>
                  <input 
                    type="text" 
                    className="input-form" 
                    name="empresa" 
                    value={formularioCorreccion.empresa} 
                    onChange={handleChangeCorreccion} 
                  />
                </div>
                <div className="form-group">
                  <label>Nombre de la Vacante</label>
                  <input 
                    type="text" 
                    className="input-form" 
                    name="nombreVacante" 
                    value={formularioCorreccion.nombreVacante} 
                    onChange={handleChangeCorreccion} 
                  />
                </div>
                <div className="form-group">
                  <label>Perfil Solicitado</label>
                  <select 
                    className="input-form" 
                    name="perfil" 
                    value={formularioCorreccion.perfil} 
                    onChange={handleChangeCorreccion}
                  >
                    <option value="" disabled>Seleccione el perfil</option>
                    <option value="ISC">ISC</option>
                    <option value="IIA">IIA</option>
                    <option value="LCD">LCD</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Ubicación</label>
                  <select 
                    className="input-form" 
                    name="ubicacion" 
                    value={formularioCorreccion.ubicacion} 
                    onChange={handleChangeCorreccion}
                  >
                    <option value="" disabled>Seleccione una ubicación</option>
                    <optgroup label="Ciudad de México">
                      <option value="Álvaro Obregón, CDMX">Álvaro Obregón, CDMX</option>
                      <option value="Azcapotzalco, CDMX">Azcapotzalco, CDMX</option>
                      <option value="Benito Juárez, CDMX">Benito Juárez, CDMX</option>
                      <option value="Coyoacán, CDMX">Coyoacán, CDMX</option>
                      <option value="Cuauhtémoc, CDMX">Cuauhtémoc, CDMX</option>
                      <option value="Miguel Hidalgo, CDMX">Miguel Hidalgo, CDMX</option>
                      <option value="Tlalpan, CDMX">Tlalpan, CDMX</option>
                    </optgroup>
                    <optgroup label="Estado de México">
                      <option value="Atizapán, Edomex">Atizapán, Edomex</option>
                      <option value="Ecatepec, Edomex">Ecatepec, Edomex</option>
                      <option value="Naucalpan, Edomex">Naucalpan, Edomex</option>
                      <option value="Nezahualcóyotl, Edomex">Nezahualcóyotl, Edomex</option>
                      <option value="Tlalnepantla, Edomex">Tlalnepantla, Edomex</option>
                    </optgroup>
                  </select>
                </div>
                <div className="form-group">
                  <label>Modalidad</label>
                  <select 
                    className="input-form" 
                    name="modalidad" 
                    value={formularioCorreccion.modalidad} 
                    onChange={handleChangeCorreccion}
                  >
                    <option value="" disabled>Seleccione la modalidad</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrida">Híbrida</option>
                    <option value="Home Office">Home Office</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Contratación</label>
                  <select 
                    className="input-form" 
                    name="contratacion" 
                    value={formularioCorreccion.contratacion} 
                    onChange={handleChangeCorreccion}
                  >
                    <option value="" disabled>Seleccione la contratación</option>
                    <option value="Tiempo Completo">Tiempo Completo</option>
                    <option value="Medio Tiempo">Medio Tiempo</option>
                    <option value="Prácticas">Prácticas</option>
                    <option value="Estancia Profesional">Estancia Profesional</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Horario</label>
                  <input 
                    type="text" 
                    className="input-form" 
                    name="horario" 
                    value={formularioCorreccion.horario} 
                    onChange={handleChangeCorreccion} 
                    placeholder="Ej. Lunes a Viernes 9:00 a 18:00"
                  />
                </div>
                <div className="form-group">
                  <label>Salario</label>
                  <input 
                    type="text" 
                    className="input-form" 
                    name="salario" 
                    value={formularioCorreccion.salario} 
                    onChange={handleChangeCorreccion} 
                    placeholder="Ej. $20,000 - $25,000 MXN"
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Descripción de la Vacante</label>
                  <textarea 
                    className="textarea-form" 
                    name="descripcion" 
                    value={formularioCorreccion.descripcion} 
                    onChange={handleChangeCorreccion}
                    placeholder="Describe las actividades, responsabilidades y contexto del puesto..."
                  />
                </div>
                
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Competencias Personales (Soft Skills)</label>
                  <input 
                    type="text" 
                    className="input-form" 
                    name="softSkills" 
                    value={formularioCorreccion.softSkills} 
                    onChange={handleChangeCorreccion} 
                    placeholder="Separa cada competencia con una coma. Ej. Liderazgo, Comunicación asertiva"
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Competencias Profesionales (Hard Skills)</label>
                  <input 
                    type="text" 
                    className="input-form" 
                    name="hardSkills" 
                    value={formularioCorreccion.hardSkills} 
                    onChange={handleChangeCorreccion} 
                    placeholder="Separa cada competencia con una coma. Ej. React.js, Python, AWS"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer flex-right">
              <button 
                className="btn-modal btn-modal-gris" 
                onClick={() => setModalCorregirAbierto(false)}
              >
                Cancelar Corrección
              </button>

              <button 
                className="btn-modal btn-modal-naranja" 
                onClick={handleEnviarCorreccion}
              >
                <i className="fi fi-rr-refresh"></i> Corregir
              </button>
            </div>
          </div>
        </div>
      )}

      {notificacion.visible && (
        <div className={`toast-notificacion ${notificacion.tipo} ${notificacion.saliendo ? 'saliendo' : ''}`}>
          {notificacion.mensaje}
        </div>
      )}
    </div>
  );
};

export default Rec_VacReg_Viewer;