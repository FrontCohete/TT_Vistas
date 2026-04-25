import React, { useState, useMemo } from 'react';
import FigureTable from '../../FigureTable';

const Admin_RecReg_Viewer = () => {
  // Datos simulados basados en los requerimientos de columnas
const [datosReclutadores, setDatosReclutadores] = useState([
    // --- Tech Solutions S.A. de C.V. (3 Reclutadores) ---
    {
      id: 1,
      empresaNombre: 'Tech Solutions S.A. de C.V.',
      empresaCorreo: 'contacto@techsolutions.com',
      reclutadorNombre: 'Carlos Mendoza',
      reclutadorCorreo: 'cmendoza@techsolutions.com',
      vacantesHechas: 8,
      vacantesReportadas: 2,
      reportesReclutador: 1
    },
    {
      id: 2,
      empresaNombre: 'Tech Solutions S.A. de C.V.',
      empresaCorreo: 'contacto@techsolutions.com',
      reclutadorNombre: 'Mariana Ríos',
      reclutadorCorreo: 'mrios@techsolutions.com',
      vacantesHechas: 15,
      vacantesReportadas: 0,
      reportesReclutador: 0
    },
    {
      id: 3,
      empresaNombre: 'Tech Solutions S.A. de C.V.',
      empresaCorreo: 'contacto@techsolutions.com',
      reclutadorNombre: 'Jorge Estrada',
      reclutadorCorreo: 'jestrada@techsolutions.com',
      vacantesHechas: 2,
      vacantesReportadas: 1,
      reportesReclutador: 2
    },

    // --- Logística Avanzada de México (2 Reclutadores) ---
    {
      id: 4,
      empresaNombre: 'Logística Avanzada de México',
      empresaCorreo: 'rh@logistica-avanzada.mx',
      reclutadorNombre: 'Ana Silvia López',
      reclutadorCorreo: 'alopez@logistica-avanzada.mx',
      vacantesHechas: 12,
      vacantesReportadas: 0,
      reportesReclutador: 0
    },
    {
      id: 5,
      empresaNombre: 'Logística Avanzada de México',
      empresaCorreo: 'rh@logistica-avanzada.mx',
      reclutadorNombre: 'Felipe Castañeda',
      reclutadorCorreo: 'fcastaneda@logistica-avanzada.mx',
      vacantesHechas: 5,
      vacantesReportadas: 0,
      reportesReclutador: 0
    },

    // --- Corporativo Financiero Global (2 Reclutadores) ---
    {
      id: 6,
      empresaNombre: 'Corporativo Financiero Global',
      empresaCorreo: 'talento@cfg.com',
      reclutadorNombre: 'Roberto García',
      reclutadorCorreo: 'rgarcia@cfg.com',
      vacantesHechas: 4,
      vacantesReportadas: 3,
      reportesReclutador: 2
    },
    {
      id: 7,
      empresaNombre: 'Corporativo Financiero Global',
      empresaCorreo: 'talento@cfg.com',
      reclutadorNombre: 'Valeria Montes',
      reclutadorCorreo: 'vmontes@cfg.com',
      vacantesHechas: 22,
      vacantesReportadas: 1,
      reportesReclutador: 0
    },

    // --- Innovación Digital MX (3 Reclutadores) ---
    {
      id: 8,
      empresaNombre: 'Innovación Digital MX',
      empresaCorreo: 'reclutamiento@innovaciondigital.mx',
      reclutadorNombre: 'Laura Torres',
      reclutadorCorreo: 'ltorres@innovaciondigital.mx',
      vacantesHechas: 25,
      vacantesReportadas: 1,
      reportesReclutador: 0
    },
    {
      id: 9,
      empresaNombre: 'Innovación Digital MX',
      empresaCorreo: 'reclutamiento@innovaciondigital.mx',
      reclutadorNombre: 'Héctor Navarro',
      reclutadorCorreo: 'hnavarro@innovaciondigital.mx',
      vacantesHechas: 30,
      vacantesReportadas: 4,
      reportesReclutador: 1
    },
    {
      id: 10,
      empresaNombre: 'Innovación Digital MX',
      empresaCorreo: 'reclutamiento@innovaciondigital.mx',
      reclutadorNombre: 'Samantha Cruz',
      reclutadorCorreo: 'scruz@innovaciondigital.mx',
      vacantesHechas: 7,
      vacantesReportadas: 0,
      reportesReclutador: 0
    },

    // --- Constructora Alfa (2 Reclutadores) ---
    {
      id: 11,
      empresaNombre: 'Constructora Alfa',
      empresaCorreo: 'contacto@alfa-construcciones.com',
      reclutadorNombre: 'Miguel Ángel Ruiz',
      reclutadorCorreo: 'mruiz@alfa-construcciones.com',
      vacantesHechas: 3,
      vacantesReportadas: 0,
      reportesReclutador: 0
    },
    {
      id: 12,
      empresaNombre: 'Constructora Alfa',
      empresaCorreo: 'contacto@alfa-construcciones.com',
      reclutadorNombre: 'Karen Velasco',
      reclutadorCorreo: 'kvelasco@alfa-construcciones.com',
      vacantesHechas: 9,
      vacantesReportadas: 2,
      reportesReclutador: 1
    }
  ]);

  const [sortConfig, setSortConfig] = useState({ clave: null, direccion: 'asc' });
  const [busqueda, setBusqueda] = useState('');
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '', tipo: '', saliendo: false });
  
  // Estado del Modal y Formulario
  const [modalAbierto, setModalAbierto] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [formularioReporte, setFormularioReporte] = useState({
    titulo: 'Suspensión de Reclutador',
    cuerpo: ''
  });

  const handleSort = (clave) => {
    let direccion = 'asc';
    if (sortConfig.clave === clave && sortConfig.direccion === 'asc') direccion = 'desc';
    setSortConfig({ clave, direccion });
  };

  const datosFiltrados = useMemo(() => {
    if (!busqueda) return datosReclutadores;
    const busquedaLower = busqueda.toLowerCase();
    
    return datosReclutadores.filter(reg => 
      reg.empresaNombre.toLowerCase().includes(busquedaLower) ||
      reg.reclutadorNombre.toLowerCase().includes(busquedaLower) ||
      reg.reclutadorCorreo.toLowerCase().includes(busquedaLower)
    );
  }, [datosReclutadores, busqueda]);

  const datosOrdenados = useMemo(() => {
    let datosOrdenables = [...datosFiltrados];
    if (sortConfig.clave) {
      datosOrdenables.sort((a, b) => {
        if (a[sortConfig.clave] < b[sortConfig.clave]) return sortConfig.direccion === 'asc' ? -1 : 1;
        if (a[sortConfig.clave] > b[sortConfig.clave]) return sortConfig.direccion === 'asc' ? 1 : -1;
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

  const abrirModal = (registro) => {
    setRegistroSeleccionado(registro);
    setFormularioReporte({ titulo: 'Reporte de Reclutador', cuerpo: '' }); 
    setModalAbierto(true);
  };

  const handleEnviarReporte = () => {
    if (!formularioReporte.cuerpo.trim()) {
      mostrarNotificacion('Ingrese el motivo del reporte para el reclutador', 'advertencia');
      return;
    }
    
    // Aquí iría la lógica de API para enviar el correo y registrar el reporte
    console.log("Enviando correo a:", registroSeleccionado.reclutadorCorreo);
    console.log("Asunto:", formularioReporte.titulo);
    console.log("Mensaje:", formularioReporte.cuerpo);

    setModalAbierto(false);
    mostrarNotificacion('Reporte emitido y correo enviado exitosamente.', 'exito');
  };

  const columnas = [
    { 
      clave: 'empresaNombre', 
      encabezado: 'Empresa', 
      width: '25%',
      render: (fila) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontWeight: '600', color: '#1e293b' }}>{fila.empresaNombre}</span>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}><i className="fi fi-rr-envelope"></i> {fila.empresaCorreo}</span>
        </div>
      )
    },
    { 
      clave: 'reclutadorNombre', 
      encabezado: 'Reclutador', 
      width: '25%',
      render: (fila) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontWeight: '600', color: '#3b82f6' }}>{fila.reclutadorNombre}</span>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}><i className="fi fi-rr-at"></i> {fila.reclutadorCorreo}</span>
        </div>
      )
    },
    { 
      clave: 'vacantes', 
      encabezado: 'Num. Vacantes', 
      sortable: false, 
      width: '18%',
      render: (fila) => (
        <div className="ux-metric-container">
          <div className="ux-metric-row">
            <span className="ux-metric-label">Hechas</span>
            <span className="ux-metric-value val-blue">{fila.vacantesHechas}</span>
          </div>
          <div className="ux-metric-row">
            <span className="ux-metric-label">Reportadas</span>
            <span className={`ux-metric-value ${fila.vacantesReportadas > 0 ? 'val-orange' : 'val-gray'}`}>
              {fila.vacantesReportadas}
            </span>
          </div>
        </div>
      )
    },
    { 
      clave: 'reportesReclutador', 
      encabezado: 'Reportes del Reclutador', 
      width: '17%',
      render: (fila) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span className={`ux-metric-value ${fila.reportesReclutador > 0 ? 'val-red' : 'val-gray'}`} style={{ fontSize: '0.9rem', padding: '4px 12px' }}>
            {fila.reportesReclutador} {fila.reportesReclutador === 1 ? 'Reporte' : 'Reportes'}
          </span>
        </div>
      )
    },
    { 
      clave: 'acciones', 
      encabezado: 'Opciones', 
      sortable: false, 
      width: '15%',
      render: (fila) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="btn-animado btn-rojo-outline" onClick={() => abrirModal(fila)}>
            <i className="fi fi-rr-triangle-warning"></i> Reportar
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="contenedor-principal">
      <h2 className="titulo-principal">Gestión y Reporte de Reclutadores</h2>
      
      <div className="barra-busqueda-container">
        <i className="fi fi-rr-search"></i>
        <input 
          type="text" 
          className="input-busqueda" 
          placeholder="Buscar por empresa o reclutador..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <FigureTable 
        columnas={columnas} 
        datos={datosOrdenados} 
        onSort={handleSort} 
        sortConfig={sortConfig}
        mensajeVacio={busqueda ? "No se encontraron reclutadores para tu búsqueda." : "No hay reclutadores registrados en el sistema."}
      />

      {/* MODAL DE REPORTE */}
      {modalAbierto && registroSeleccionado && (
        <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* HEADER */}
            <div className="modal-header">
              <div>
                <p className="modal-subtitle" style={{ color: '#3b82f6', fontWeight: 'bold', marginBottom: '4px' }}>
                  <i className="fi fi-rr-building"></i> {registroSeleccionado.empresaNombre}
                </p>
                <h2><i className="fi fi-rr-user"></i> {registroSeleccionado.reclutadorNombre}</h2>
              </div>
              <button onClick={() => setModalAbierto(false)} className="close-btn">&times;</button>
            </div>

            {/* BODY */}
            <div className="modal-body">
              <div className="stats-grid" style={{ marginBottom: '24px' }}>
                <div className="stat-card">
                  <i className="fi fi-rr-briefcase stat-icon stat-blue"></i>
                  <span className="stat-label">Vacantes Hechas</span>
                  <strong className="stat-value">{registroSeleccionado.vacantesHechas}</strong>
                </div>
                <div className="stat-card">
                  <i className="fi fi-rr-exclamation stat-icon stat-orange"></i>
                  <span className="stat-label">Vacantes con Reporte</span>
                  <strong className="stat-value">{registroSeleccionado.vacantesReportadas}</strong>
                </div>
              </div>

              <h3 className="section-title">Redactar Reporte</h3>
              <p>Completa la siguiente información para reportar reclutador y notificar a la empresa</p>
              <div className="formulario-reporte">
                <div className="form-group">
                  <label>Título del correo</label>
                  <input 
                    type="text" 
                    className="input-form"
                    value={formularioReporte.titulo}
                    onChange={(e) => setFormularioReporte({...formularioReporte, titulo: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Cuerpo del mensaje</label>
                  <textarea 
                    className="textarea-form"
                    rows="5"
                    placeholder="Detalla los motivos de la suspensión o el reporte..."
                    value={formularioReporte.cuerpo}
                    onChange={(e) => setFormularioReporte({...formularioReporte, cuerpo: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button className="btn-modal btn-modal-gris" onClick={() => setModalAbierto(false)}>
                Cancelar
              </button>
              
              <button className="btn-modal btn-modal-rojo" onClick={handleEnviarReporte}>
                <i className="fi fi-rr-envelope-ban"></i> Reportar Reclutador
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
        .contenedor-principal { padding: 20px; max-width: 1200px; margin: 0 auto; }
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

        .custom-table th > div { 
          justify-content: center !important; 
          text-align: center; 
        }
        .ux-metric-container { display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 160px; }
        .ux-metric-row { display: flex; justify-content: space-between; align-items: center; width: 100%; }
        .ux-metric-label { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #6b7280; }
        .ux-metric-value { font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; min-width: 24px; text-align: center; }

        .val-blue   { background-color: #eff6ff; color: #2563eb; }
        .val-orange { background-color: #fff7ed; color: #ea580c; }
        .val-gray   { background-color: #f3f4f6; color: #6b7280; }
        .val-red    { background-color: #fef2f2; color: #dc2626; }

        .btn-animado {
          display: inline-flex; align-items: center; gap: 6px; justify-content: center;
          padding: 6px 12px; border: none; border-radius: 6px;
          cursor: pointer; font-weight: 600; transition: all 0.2s ease-in-out; 
          box-shadow: 0 1px 2px rgba(0,0,0,0.05); font-size: 0.85rem;
        }
        .btn-rojo-outline { background-color: transparent; color: #ef4444; border: 1px solid #ef4444; }
        .btn-rojo-outline:hover { background-color: #ef4444; color: white; }

        /* ================= ESTILOS DEL MODAL ================= */
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.6); display: flex; justify-content: center; align-items: center;
          z-index: 1000; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease-out;
        }
        .modal-content { 
          background: white; border-radius: 12px; width: 90%; max-width: 650px; 
          max-height: 90vh; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); 
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex; flex-direction: column; overflow: hidden;
        }
        
        .modal-header { display: flex; justify-content: space-between; align-items: flex-start; padding: 20px 24px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9; flex-shrink: 0; }
        .modal-header h2 { margin: 0; font-size: 1.5rem; color: #0f172a; }
        .modal-subtitle { margin: 4px 0 0 0; color: #64748b; display: flex; alignItems: center; gap: 6px; font-size: 0.95rem; }
        .close-btn { background: none; border: none; font-size: 1.8rem; cursor: pointer; color: #94a3b8; transition: color 0.2s; line-height: 1; }
        .close-btn:hover { color: #ef4444; }

        .modal-body { padding: 24px; background-color: #f8fafc; overflow-y: auto; }
        .section-title { margin: 0 0 16px 0; font-size: 1.1rem; color: #334155; font-weight: 600; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .stat-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .stat-icon { font-size: 1.5rem; margin-bottom: 8px; }
        .stat-blue { color: #3b82f6; } .stat-orange { color: #f59e0b; }
        .stat-label { font-size: 0.85rem; color: #64748b; margin-bottom: 4px; font-weight: 500; }
        .stat-value { font-size: 1.5rem; color: #0f172a; font-weight: 700; }

        .modal-footer { display: flex; justify-content: space-between; padding: 16px 24px; background-color: #ffffff; border-top: 1px solid #f1f5f9; flex-shrink: 0; }
        .btn-modal { display: inline-flex; align-items: center; gap: 8px; justify-content: center; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; font-size: 0.95rem; color: white; transition: all 0.2s; }
        .btn-modal-rojo { background-color: #ef4444; } .btn-modal-rojo:hover { background-color: #dc2626; }
        .btn-modal-gris { background-color: #94a3b8; } .btn-modal-gris:hover { background-color: #64748b; }

        /* ================= ESTILOS ESPECÍFICOS DEL FORMULARIO ================= */
        .formulario-reporte { display: flex; flex-direction: column; gap: 16px; background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 0.85rem; font-weight: 600; color: #475569; }
        .input-form, .textarea-form { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; color: #1e293b; outline: none; transition: border-color 0.2s; font-family: inherit; box-sizing: border-box; }
        .input-form:focus, .textarea-form:focus { border-color: #ef4444; box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1); }
        .textarea-form { resize: vertical; min-height: 100px; }

        /* ================= NOTIFICACIONES ================= */
        .toast-notificacion { position: fixed; bottom: 30px; right: 30px; padding: 16px 24px; border-radius: 8px; color: white; font-weight: bold; z-index: 2000; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); animation: toastEntrada 0.4s forwards; }
        .toast-notificacion.saliendo { animation: toastSalida 0.3s forwards; }
        .toast-notificacion.exito { background-color: #10b981; }
        .toast-notificacion.advertencia { background-color: #f59e0b; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes toastEntrada { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes toastSalida { from { opacity: 1; } to { opacity: 0; transform: translateY(20px); } }
        
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: 1fr; }
          .modal-footer { flex-direction: column-reverse; gap: 12px; }
          .btn-modal { width: 100%; }
        }
      `}</style>
        
    </div>
  );
};

export default Admin_RecReg_Viewer;