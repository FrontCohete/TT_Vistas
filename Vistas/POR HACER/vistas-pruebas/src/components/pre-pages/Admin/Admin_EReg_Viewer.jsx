import React, { useState, useMemo } from 'react';
import FigureTable from '../../FigureTable';
import '../../../assets/css/admin_View.css';

const EmpresaViewer = () => {
  const [datosEmpresas, setDatosEmpresas] = useState([
    { 
      id: 1, 
      razonSocial: 'Tech Solutions S.A. de C.V.', 
      correo: 'contacto@techsolutions.com', 
      numReclutadores: 4, 
      numVacantes: 15, 
      reportesReclutadores: 2, 
      reportesVacantes: 5, 
      activa: true 
    },
    { 
      id: 2, 
      razonSocial: 'Logística Avanzada de México', 
      correo: 'rh@logistica-avanzada.mx', 
      numReclutadores: 12, 
      numVacantes: 8,  
      reportesReclutadores: 0, 
      reportesVacantes: 1, 
      activa: false 
    },
    { 
      id: 3, 
      razonSocial: 'Corporativo Financiero Global', 
      correo: 'talento@cfg.com', 
      numReclutadores: 2, 
      numVacantes: 3,  
      reportesReclutadores: 1, 
      reportesVacantes: 0, 
      activa: true 
    }
  ]);

  const [sortConfig, setSortConfig] = useState({ clave: null, direccion: 'asc' });
  const [busqueda, setBusqueda] = useState('');
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '', tipo: '', saliendo: false });
  const [filasSaliendo, setFilasSaliendo] = useState([]);
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);

  const handleSort = (clave) => {
    let direccion = 'asc';
    if (sortConfig.clave === clave && sortConfig.direccion === 'asc') direccion = 'desc';
    setSortConfig({ clave, direccion });
  };

  const datosFiltrados = useMemo(() => {
    if (!busqueda) return datosEmpresas;
    const busquedaLower = busqueda.toLowerCase();
    
    return datosEmpresas.filter(emp => {
      const estatusTexto = emp.activa ? 'activa' : 'suspendida';
      return (
        emp.razonSocial.toLowerCase().includes(busquedaLower) ||
        emp.correo.toLowerCase().includes(busquedaLower) ||
        estatusTexto.includes(busquedaLower)
      );
    });
  }, [datosEmpresas, busqueda]);

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

  const abrirModal = (empresa) => {
    setEmpresaSeleccionada(empresa);
    setModalAbierto(true);
  };

  const handleToggleEstatus = () => {
    if (!empresaSeleccionada) return;
    const nuevoEstatus = !empresaSeleccionada.activa;
    
    setDatosEmpresas(prevDatos => 
      prevDatos.map(emp => emp.id === empresaSeleccionada.id ? { ...emp, activa: nuevoEstatus } : emp)
    );
    setEmpresaSeleccionada(prev => ({ ...prev, activa: nuevoEstatus }));
    
    const mensaje = nuevoEstatus ? 'La empresa ha sido reactivada.' : 'La empresa ha sido suspendida.';
    mostrarNotificacion(mensaje, 'advertencia');
  };

  const handleEliminar = () => {
    if (!empresaSeleccionada) return;
    const id = empresaSeleccionada.id;
    
    setModalAbierto(false); 
    setFilasSaliendo(prev => [...prev, id]); 
    
    setTimeout(() => {
      setDatosEmpresas(prev => prev.filter(emp => emp.id !== id));
      setFilasSaliendo(prev => prev.filter(fId => fId !== id));
      mostrarNotificacion('La empresa fue eliminada del sistema.', 'error');
    }, 300); 
  };

  const columnas = [
    { clave: 'razonSocial', encabezado: 'Razón Social', width: '20%' },
    { clave: 'correo', encabezado: 'Correo Electrónico', width: '18%' },
    { 
      clave: 'actividad', 
      encabezado: 'Actividad', 
      sortable: false, 
      width: '17%',
      render: (fila) => (
        <div className="ux-metric-container">
          <div className="ux-metric-row">
            <span className="ux-metric-label"><i className="fi fi-rr-users"></i> Reclutadores</span>
            <span className="ux-metric-value val-blue">{fila.numReclutadores}</span>
          </div>
          <div className="ux-metric-row">
            <span className="ux-metric-label"><i className="fi fi-rr-briefcase"></i> Vacantes</span>
            <span className="ux-metric-value val-purple">{fila.numVacantes}</span>
          </div>
        </div>
      )
    },
    { 
      clave: 'reportes', 
      encabezado: 'Reportes', 
      sortable: false, 
      width: '17%',
      render: (fila) => (
        <div className="ux-metric-container">
          <div className="ux-metric-row">
            <span className="ux-metric-label"><i className="fi fi-rr-user-time"></i> Reclutadores</span>
            <span className={`ux-metric-value ${fila.reportesReclutadores > 0 ? 'val-rose' : 'val-gray'}`}>
              {fila.reportesReclutadores}
            </span>
          </div>
          <div className="ux-metric-row">
            <span className="ux-metric-label"><i className="fi fi-rr-exclamation"></i> Vacantes</span>
            <span className={`ux-metric-value ${fila.reportesVacantes > 0 ? 'val-orange' : 'val-gray'}`}>
              {fila.reportesVacantes}
            </span>
          </div>
        </div>
      )
    },
    { 
      clave: 'activa', 
      encabezado: 'Estatus', 
      width: '13%',
      render: (fila) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span className={`badge-estatus ${fila.activa ? 'badge-activa' : 'badge-suspendida'}`}>
            <span className="status-dot"></span>
            {fila.activa ? 'Activa' : 'Suspendida'}
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
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button className="btn-animado btn-azul" onClick={() => abrirModal(fila)}>
            <i className="fi fi-rr-eye"></i> Detalles
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="contenedor-principal">
      <h2 className="titulo-principal">Visualización de Empresas Existentes</h2>
      
      <div className="barra-busqueda-container">
        <i className="fi fi-rr-search"></i>
        <input 
          type="text" 
          className="input-busqueda" 
          placeholder="Buscar por razón social, correo o estatus (activa/suspendida)..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <FigureTable 
        columnas={columnas} 
        datos={datosOrdenados} 
        onSort={handleSort} 
        sortConfig={sortConfig}
        filasSaliendo={filasSaliendo}
        mensajeVacio={busqueda ? "No se encontraron coincidencias para tu búsqueda." : "No hay empresas registradas en el sistema."}
      />

      {/* MODAL */}
      {modalAbierto && empresaSeleccionada && (
        <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{empresaSeleccionada.razonSocial}</h2>
                <p className="modal-subtitle">
                  <i className="fi fi-rr-envelope"></i> {empresaSeleccionada.correo}
                </p>
              </div>
              <button onClick={() => setModalAbierto(false)} className="close-btn">&times;</button>
            </div>

            <div className="modal-body">
              <h3 className="section-title">Estadísticas Generales</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <i className="fi fi-rr-briefcase stat-icon stat-blue"></i>
                  <span className="stat-label">Vacantes Publicadas</span>
                  <strong className="stat-value">{empresaSeleccionada.numVacantes}</strong>
                </div>
                <div className="stat-card">
                  <i className="fi fi-rr-users stat-icon stat-blue"></i>
                  <span className="stat-label">Reclutadores Asociados</span>
                  <strong className="stat-value">{empresaSeleccionada.numReclutadores}</strong>
                </div>
                <div className="stat-card">
                  <i className="fi fi-rr-exclamation stat-icon stat-orange"></i>
                  <span className="stat-label">Vacantes con Reporte</span>
                  <strong className="stat-value">{empresaSeleccionada.reportesVacantes}</strong>
                </div>
                <div className="stat-card">
                  <i className="fi fi-rr-user-time stat-icon stat-red"></i>
                  <span className="stat-label">Reclutadores con Reporte</span>
                  <strong className="stat-value">{empresaSeleccionada.reportesReclutadores}</strong>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal btn-modal-rojo" onClick={handleEliminar}>
                <i className="fi fi-rr-trash"></i> Eliminar
              </button>
              
              <button 
                className={`btn-modal ${empresaSeleccionada.activa ? 'btn-modal-naranja' : 'btn-modal-verde'}`} 
                onClick={handleToggleEstatus}
              >
                <i className={`fi ${empresaSeleccionada.activa ? 'fi-rr-ban' : 'fi-rr-check-circle'}`}></i>
                {empresaSeleccionada.activa ? 'Suspender Empresa' : 'Activar Empresa'}
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

export default EmpresaViewer;