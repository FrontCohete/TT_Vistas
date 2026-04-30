import React, { useState, useMemo } from 'react';
import FigureTable from '../../FigureTable';
import '../../../assets/css/admin_View.css';

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
    </div>
  );
};

export default Admin_RecReg_Viewer;