// Admin_VacPreReg_Viewer.jsx
import React, { useState, useMemo } from 'react';
import FigureTable from '../../FigureTable';

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

      <style>{`
        /* ================= ESTILOS BASE COMPARTIDOS ================= */
        .contenedor-principal { padding: 20px; max-width: 1400px; margin: 0 auto; }
        .titulo-principal { margin-bottom: 20px; color: #333; font-size: 1.8rem; }

        .barra-busqueda-container {
          display: flex; align-items: center; background-color: #ffffff;
          border: 1px solid #d1d5db; border-radius: 8px; padding: 10px 16px;
          margin-bottom: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .barra-busqueda-container:focus-within { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2); }
        .barra-busqueda-container i { color: #9ca3af; font-size: 1.2rem; margin-right: 12px; }
        .input-busqueda { border: none; outline: none; width: 100%; font-size: 1rem; color: #374151; background: transparent; }
        .input-busqueda::placeholder { color: #9ca3af; }

        .custom-table th > div { justify-content: center !important; text-align: center; }
        .badge { display: inline-block; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; text-align: center; }
        .badge-purple { background-color: #f3e8ff; color: #7e22ce; }
        .badge-blue { background-color: #eff6ff; color: #1e53c7; }
        .badge-orange { background-color: #fff7ed; color: #ea580c; }
        .badge-gray { background-color: #f1f5f9; color: #475569; }
        .badge-dark { background-color: #1e293b; color: #f8fafc; }

        .ux-metric-value { font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; min-width: 24px; text-align: center; }
        .val-blue   { background-color: #6e6e6e; color: #fcfcfc; }
        .val-orange { background-color: #6e6e6e; color: #fcfcfc; }

        .btn-accion { 
          display: inline-flex; align-items: center; gap: 6px; justify-content: center; 
          padding: 6px 12px; border-radius: 6px; border: 1px solid transparent; 
          cursor: pointer; transition: all 0.2s; background: transparent; 
          font-weight: 600; font-size: 0.85rem;
        }
        .btn-blue-outline { color: #3b82f6; border-color: #3b82f6; }
        .btn-blue-outline:hover { background-color: #3b82f6; color: white; }
        .btn-orange-outline { color: #ea580c; border-color: #ea580c; }
        .btn-orange-outline:hover { background-color: #ea580c; color: white; }

        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.6); display: flex; justify-content: center; align-items: center;
          z-index: 1000; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease-out; padding: 20px;
        }
        .modal-content { 
          background: white; border-radius: 12px; width: 100%; 
          max-height: 90vh; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); 
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex; flex-direction: column; overflow: hidden;
        }
        .modal-lg { max-width: 800px; }
        .modal-header { display: flex; justify-content: space-between; align-items: flex-start; padding: 20px 24px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9; flex-shrink: 0; }
        .modal-header h2 { margin: 0; font-size: 1.4rem; color: #0f172a; display: flex; align-items: center; gap: 8px; }
        .modal-subtitle { margin: 4px 0 0 0; color: #64748b; font-size: 0.9rem; line-height: 1.4; }
        .close-btn { background: none; border: none; font-size: 1.8rem; cursor: pointer; color: #94a3b8; transition: color 0.2s; line-height: 1; }
        .close-btn:hover { color: #ef4444; }

        .modal-body { padding: 24px; background-color: #f8fafc; overflow-y: auto; }
        .grid-2-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .col-span-2 { grid-column: span 2; }
        .data-group { display: flex; flex-direction: column; gap: 4px; }
        .data-label { font-size: 0.8rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .data-value { font-size: 1.05rem; color: #1e293b; font-weight: 500; }
        .data-text { font-size: 0.95rem; color: #334155; line-height: 1.5; margin: 0; }
        .skills-list { list-style: none; padding: 0; margin: 8px 0 0 0; display: flex; flex-direction: column; gap: 6px; }
        .skills-list li { font-size: 0.9rem; color: #1e293b; display: flex; align-items: center; gap: 8px; }
        .skills-list li i { color: #10b981; font-size: 0.8rem; }
        .resume-box { background: #fff; border: 1px solid #e2e8f0; padding: 12px 16px; border-radius: 8px; display: flex; flex-direction: column; }
        .divider { height: 1px; background: #e2e8f0; margin: 24px 0; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { font-size: 0.9rem; font-weight: 600; color: #475569; }
        .input-form { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; color: #1e293b; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
        .input-form:focus { border-color: #ea580c; box-shadow: 0 0 0 2px rgba(234, 88, 12, 0.1); }
        .select-form { cursor: pointer; background-color: white; }

        .modal-footer { display: flex; padding: 16px 24px; background-color: #ffffff; border-top: 1px solid #f1f5f9; flex-shrink: 0; }
        .flex-right { justify-content: flex-end; gap: 12px; }
        .btn-modal { display: inline-flex; align-items: center; gap: 8px; justify-content: center; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; font-size: 0.95rem; color: white; transition: all 0.2s; }
        .btn-modal-rojo { background-color: #ef4444; } .btn-modal-rojo:hover { background-color: #dc2626; }
        .btn-modal-verde { background-color: #10b981; } .btn-modal-verde:hover { background-color: #059669; }
        .btn-modal-naranja { background-color: #ea580c; } .btn-modal-naranja:hover { background-color: #c2410c; }
        .btn-modal-gris { background-color: #94a3b8; } .btn-modal-gris:hover { background-color: #64748b; }

        .toast-notificacion { position: fixed; bottom: 30px; right: 30px; padding: 16px 24px; border-radius: 8px; color: white; font-weight: bold; z-index: 2000; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); animation: toastEntrada 0.4s forwards; }
        .toast-notificacion.saliendo { animation: toastSalida 0.3s forwards; }
        .toast-notificacion.exito { background-color: #10b981; }
        .toast-notificacion.advertencia { background-color: #f59e0b; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes toastEntrada { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes toastSalida { from { opacity: 1; } to { opacity: 0; transform: translateY(20px); } }
        
        @media (max-width: 768px) {
          .grid-2-col { grid-template-columns: 1fr; gap: 16px; }
          .col-span-2 { grid-column: span 1; }
          .modal-footer.flex-right { flex-direction: column-reverse; }
          .btn-modal { width: 100%; }
        }
        
        @media (max-width: 416px) {
          .custom-table th > div, .custom-table td, .custom-table td span { font-size: 0.6rem !important; }
          .badge { padding: 2px 4px; font-size: 0.6rem; }
          .ux-metric-value { font-size: 0.7rem !important; padding: 2px 6px !important; min-width: 20px !important; }
          .btn-accion { padding: 4px 8px; font-size: 0.6rem; gap: 4px; }
          .btn-accion i { font-size: 0.6rem; }
        }
      `}</style>
    </div>
  );
};

export default Admin_VacPreReg_Viewer;