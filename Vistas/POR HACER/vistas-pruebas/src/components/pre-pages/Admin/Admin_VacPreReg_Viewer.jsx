// Admin_VacPreReg_Viewer.jsx
import React, { useState, useMemo } from 'react';
import FigureTable from '../../FigureTable';
import '../../../assets/css/admin_View.css';

const Admin_VacPreReg_Viewer = () => {
  // Datos simulados de pre-registros de vacantes con fecha de envío
  const [datosVacantes, setDatosVacantes] = useState([
    {
      id: 1,
      empresa: 'Tech Solutions S.A. de C.V.',
      ubicacion: 'CDMX, México',
      nombreVacante: 'Desarrollador Frontend Web',
      fechaEnvio: '22/04/2026',
      descripcion: 'Creación de interfaces de usuario escalables usando React y consumo de APIs.',
      salario: '$20,000 - $25,000 MXN',
      modalidad: 'Híbrida',
      perfil: 'ISC',
      softSkills: ['Trabajo en equipo', 'Proactividad', 'Resolución de problemas'],
      hardSkills: ['HTML', 'CSS', 'JavaScript', 'Reactjs']
    },
    {
      id: 2,
      empresa: 'Logística Avanzada de México',
      ubicacion: 'Monterrey, NL',
      nombreVacante: 'Analista de Datos',
      fechaEnvio: '24/04/2026',
      descripcion: 'Análisis de bases de datos de envíos, creación de dashboards y reportes.',
      salario: '$18,000 - $22,000 MXN',
      modalidad: 'Home-Office',
      perfil: 'LCD',
      softSkills: ['Pensamiento analítico', 'Comunicación asertiva'],
      hardSkills: ['SQL', 'Python', 'PowerBI', 'Excel Avanzado', 'Estadística']
    },
    {
      id: 3,
      empresa: 'Innovación Digital MX',
      ubicacion: 'Guadalajara, Jal',
      nombreVacante: 'Ingeniero de Inteligencia Artificial',
      fechaEnvio: '25/04/2026',
      descripcion: 'Entrenamiento de modelos de Machine Learning para visión computacional.',
      salario: '$35,000 - $45,000 MXN',
      modalidad: 'Presencial',
      perfil: 'IIA',
      softSkills: ['Pensamiento crítico', 'Autodidacta', 'Adaptabilidad', 'Liderazgo'],
      hardSkills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision']
    }
  ]);

  const [sortConfig, setSortConfig] = useState({ clave: null, direccion: 'asc' });
  const [busqueda, setBusqueda] = useState('');
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '', tipo: '', saliendo: false });
  
  const [modalVerAbierto, setModalVerAbierto] = useState(false);
  const [modalCorregirAbierto, setModalCorregirAbierto] = useState(false);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);
  const [motivoCorreccion, setMotivoCorreccion] = useState('');

  const handleSort = (clave) => {
    let direccion = 'asc';
    if (sortConfig.clave === clave && sortConfig.direccion === 'asc') direccion = 'desc';
    setSortConfig({ clave, direccion });
  };

  const datosFiltrados = useMemo(() => {
    if (!busqueda) return datosVacantes;
    const busquedaLower = busqueda.toLowerCase();
    
    return datosVacantes.filter(reg => 
      reg.empresa.toLowerCase().includes(busquedaLower) ||
      reg.nombreVacante.toLowerCase().includes(busquedaLower) ||
      reg.perfil.toLowerCase().includes(busquedaLower) ||
      reg.fechaEnvio.includes(busquedaLower)
    );
  }, [datosVacantes, busqueda]);

  const datosOrdenados = useMemo(() => {
    let datosOrdenables = [...datosFiltrados];
    if (sortConfig.clave) {
      datosOrdenables.sort((a, b) => {
        let valA = a[sortConfig.clave];
        let valB = b[sortConfig.clave];
        
        // Ordenamiento especial para fechas DD/MM/YYYY
        if (sortConfig.clave === 'fechaEnvio') {
          valA = a.fechaEnvio.split('/').reverse().join('');
          valB = b.fechaEnvio.split('/').reverse().join('');
        }

        if (Array.isArray(valA)) valA = valA.length;
        if (Array.isArray(valB)) valB = valB.length;

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

  const abrirModalVer = (registro) => {
    setVacanteSeleccionada(registro);
    setModalVerAbierto(true);
  };

  const abrirModalCorregir = (registro) => {
    setVacanteSeleccionada(registro);
    setMotivoCorreccion(''); 
    setModalCorregirAbierto(true);
  };

  const removerVacanteDeLaVista = (idVacante) => {
    setDatosVacantes(prevDatos => prevDatos.filter(vacante => vacante.id !== idVacante));
  };

  const handleAprobarVacante = () => {
    removerVacanteDeLaVista(vacanteSeleccionada.id);
    setModalVerAbierto(false);
    mostrarNotificacion('Vacante aprobada e integrada a la plataforma.', 'exito');
  };

  const handleBorrarVacante = () => {
    removerVacanteDeLaVista(vacanteSeleccionada.id);
    setModalVerAbierto(false);
    mostrarNotificacion('Vacante rechazada y eliminada.', 'advertencia');
  };

  const handleEnviarCorreccion = () => {
    if (!motivoCorreccion) {
      mostrarNotificacion('Selecciona un motivo de corrección.', 'advertencia');
      return;
    }
    removerVacanteDeLaVista(vacanteSeleccionada.id);
    setModalCorregirAbierto(false);
    mostrarNotificacion('Solicitud de corrección enviada al reclutador.', 'exito');
  };

  const columnas = [
    { clave: 'empresa', encabezado: 'Empresa', width: '13%' },
    { clave: 'fechaEnvio', encabezado: 'Fecha de Envío', width: '10%' },
    { 
      clave: 'nombreVacante', 
      encabezado: 'Vacante', 
      width: '16%',
      render: (fila) => <span style={{ fontWeight: '600', color: '#1e293b' }}>{fila.nombreVacante}</span>
    },
    { clave: 'salario', encabezado: 'Salario', width: '10%' },
    { 
      clave: 'modalidad', 
      encabezado: 'Modalidad', 
      width: '9%',
      render: (fila) => {
        const clases = {
          'Home-Office': 'badge-purple',
          'Híbrida': 'badge-blue',
          'Presencial': 'badge-orange'
        };
        return <span className={`badge ${clases[fila.modalidad] || 'badge-gray'}`}>{fila.modalidad}</span>;
      }
    },
    { 
      clave: 'perfil', 
      encabezado: 'Perfil', 
      width: '6%',
      render: (fila) => <span className="badge badge-dark">{fila.perfil}</span>
    },
    { 
      clave: 'softSkills', 
      encabezado: 'C. Inter.', 
      width: '6%',
      render: (fila) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span className="ux-metric-value val-blue" style={{ fontSize: '0.85rem' }}>{fila.softSkills.length}</span>
        </div>
      )
    },
    { 
      clave: 'hardSkills', 
      encabezado: 'C. Téc.', 
      width: '6%',
      render: (fila) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span className="ux-metric-value val-orange" style={{ fontSize: '0.85rem' }}>{fila.hardSkills.length}</span>
        </div>
      )
    },
    { 
      clave: 'acciones', 
      encabezado: 'Opciones', 
      sortable: false, 
      width: '18%', 
      render: (fila) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button className="btn-accion btn-blue-outline" title="Visualizar" onClick={() => abrirModalVer(fila)}>
            <i className="fi fi-rr-eye"></i> Visualizar
          </button>
          <button className="btn-accion btn-orange-outline" title="Corregir" onClick={() => abrirModalCorregir(fila)}>
            <i className="fi fi-rr-edit"></i> Corregir
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="contenedor-principal">
      <h2 className="titulo-principal">Gestión de Pre-registros de Vacantes</h2>
      
      <div className="barra-busqueda-container">
        <i className="fi fi-rr-search"></i>
        <input 
          type="text" 
          className="input-busqueda" 
          placeholder="Buscar por empresa, vacante, perfil o fecha..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <FigureTable 
        columnas={columnas} 
        datos={datosOrdenados} 
        onSort={handleSort} 
        sortConfig={sortConfig}
        mensajeVacio={busqueda ? "No se encontraron vacantes para tu búsqueda." : "No hay pre-registros pendientes."}
      />

      {/* ================= MODAL: VER PRE-REGISTRO ================= */}
      {modalVerAbierto && vacanteSeleccionada && (
        <div className="modal-overlay" onClick={() => setModalVerAbierto(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2><i className="fi fi-rr-document"></i> Validación de vacantes en caspita</h2>
                <p className="modal-subtitle">Consulta la información propuesta por un reclutador y determina si es apta para la plataforma</p>
              </div>
              <button onClick={() => setModalVerAbierto(false)} className="close-btn">&times;</button>
            </div>

            <div className="modal-body">
              <div className="grid-2-col">
                <div className="data-group">
                  <span className="data-label">Empresa</span>
                  <span className="data-value">{vacanteSeleccionada.empresa}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Fecha de Envío</span>
                  <span className="data-value">{vacanteSeleccionada.fechaEnvio}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Nombre de la Vacante</span>
                  <span className="data-value">{vacanteSeleccionada.nombreVacante}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Ubicación</span>
                  <span className="data-value">{vacanteSeleccionada.ubicacion}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Salario</span>
                  <span className="data-value">{vacanteSeleccionada.salario}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Modalidad</span>
                  <span className="data-value">{vacanteSeleccionada.modalidad}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Perfil Requerido</span>
                  <span className="data-value">{vacanteSeleccionada.perfil}</span>
                </div>
                <div className="data-group col-span-2">
                  <span className="data-label">Descripción de la Vacante</span>
                  <p className="data-text">{vacanteSeleccionada.descripcion}</p>
                </div>
                <div className="data-group">
                  <span className="data-label">Competencias Interpersonales ({vacanteSeleccionada.softSkills.length})</span>
                  <ul className="skills-list">
                    {vacanteSeleccionada.softSkills.map((skill, idx) => <li key={idx}><i className="fi fi-rr-check"></i> {skill}</li>)}
                  </ul>
                </div>
                <div className="data-group">
                  <span className="data-label">Competencias Técnicas ({vacanteSeleccionada.hardSkills.length})</span>
                  <ul className="skills-list">
                    {vacanteSeleccionada.hardSkills.map((skill, idx) => <li key={idx}><i className="fi fi-rr-check"></i> {skill}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            <div className="modal-footer flex-right">
              <button className="btn-modal btn-modal-rojo" onClick={handleBorrarVacante}>
                <i className="fi fi-rr-trash"></i> Borrar
              </button>
              <button className="btn-modal btn-modal-verde" onClick={handleAprobarVacante}>
                <i className="fi fi-rr-check-circle"></i> Aprobar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: CORREGIR VACANTE ================= */}
      {modalCorregirAbierto && vacanteSeleccionada && (
        <div className="modal-overlay" onClick={() => setModalCorregirAbierto(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 style={{ color: '#ea580c' }}><i className="fi fi-rr-edit"></i> Corrección de vacantes en caspita</h2>
                <p className="modal-subtitle">De acuerdo a lo ingresado por un reclutador, determina si la vacante es apta para la plataforma y solicita su corrección</p>
              </div>
              <button onClick={() => setModalCorregirAbierto(false)} className="close-btn">&times;</button>
            </div>

            <div className="modal-body">
              <div className="resume-box">
                <span className="data-label">Vacante a corregir (Enviada el {vacanteSeleccionada.fechaEnvio}):</span>
                <span className="data-value">{vacanteSeleccionada.nombreVacante} - {vacanteSeleccionada.empresa}</span>
              </div>

              <div className="grid-2-col" style={{ marginTop: '20px', opacity: '0.8', pointerEvents: 'none' }}>
                <div className="data-group">
                  <span className="data-label">Descripción Actual</span>
                  <p className="data-text" style={{ fontSize: '0.85rem' }}>{vacanteSeleccionada.descripcion}</p>
                </div>
                <div className="data-group">
                  <span className="data-label">Salario & Modalidad</span>
                  <span className="data-value" style={{ fontSize: '0.85rem' }}>{vacanteSeleccionada.salario} | {vacanteSeleccionada.modalidad}</span>
                </div>
              </div>

              <div className="divider"></div>

              <h3 className="section-title">Motivo de Corrección</h3>
              <div className="form-group">
                <label>Selecciona la falta cometida en el registro:</label>
                <select 
                  className="input-form select-form" 
                  value={motivoCorreccion}
                  onChange={(e) => setMotivoCorreccion(e.target.value)}
                >
                  <option value="" disabled>-- Elige una opción --</option>
                  <option value="descripcion_vaga">Descripción vaga o insuficiente</option>
                  <option value="salario_irreal">Salario fuera del estándar de mercado</option>
                  <option value="perfil_incorrecto">El perfil (ISC, IIA, LCD) no coincide con las tareas</option>
                  <option value="exceso_competencias">Exceso o incongruencia en competencias requeridas</option>
                  <option value="errores_ortograficos">Errores ortográficos o gramaticales múltiples</option>
                  <option value="otro">Otro (Revisión manual requerida)</option>
                </select>
              </div>
            </div>

            <div className="modal-footer flex-right">
              <button className="btn-modal btn-modal-gris" onClick={() => setModalCorregirAbierto(false)}>
                Cancelar
              </button>
              <button className="btn-modal btn-modal-naranja" onClick={handleEnviarCorreccion}>
                <i className="fi fi-rr-paper-plane"></i> Enviar a Corregir
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

export default Admin_VacPreReg_Viewer;