import React, { useState, useMemo } from 'react';
import FigureTable from './FigureTable';

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

      <style>{`
        .contenedor-principal { padding: 20px; max-width: 1200px; margin: 0 auto; }
        .titulo-principal { margin-bottom: 20px; color: #333; font-size: 1.8rem; }

        /* BÚSQUEDA */
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

        .ux-metric-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          max-width: 160px; /* Evita que se estire demasiado en pantallas grandes */
        }
        
        .ux-metric-row {
          display: flex;
          justify-content: space-between; /* Texto a la izquierda, número a la derecha */
          align-items: center;
          width: 100%;
        }

        .ux-metric-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #6b7280; /* Gris sutil para no robar atención */
        }

        .ux-metric-label i {
          font-size: 0.85rem;
          color: #9ca3af;
        }

        .ux-metric-value {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 12px; /* Píldora redondeada moderna */
          min-width: 24px;
          text-align: center;
        }

        /* Colores para las píldoras */
        .val-blue   { background-color: #eff6ff; color: #2563eb; }
        .val-purple { background-color: #f3e8ff; color: #9333ea; }
        .val-rose   { background-color: #fff1f2; color: #e11d48; }
        .val-orange { background-color: #fff7ed; color: #ea580c; }
        .val-gray   { background-color: #f3f4f6; color: #6b7280; } /* Para cuando hay 0 reportes */

        /* ================================================== */

        .badge-estatus { 
          font-size: 0.85rem; padding: 4px 12px; border-radius: 20px; font-weight: 600; 
          display: inline-flex; align-items: center; gap: 6px; border: 1px solid transparent;
        }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; }
        .badge-activa { background-color: #f0fdf4; color: #166534; border-color: #bbf7d0; }
        .badge-activa .status-dot { background-color: #22c55e; }
        .badge-suspendida { background-color: #fef2f2; color: #991b1b; border-color: #fecaca; }
        .badge-suspendida .status-dot { background-color: #ef4444; }

        /* BOTONES TABLA */
        .btn-animado {
          display: inline-flex; align-items: center; gap: 6px; justify-content: center;
          padding: 6px 12px; border: none; border-radius: 6px; /* Borde ligeramente más redondo */
          cursor: pointer; font-weight: 600; color: white;
          transition: all 0.2s ease-in-out; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          font-size: 0.85rem;
        }
        .btn-azul { background-color: #3b82f6; } .btn-azul:hover { background-color: #2563eb; }

        /* MODAL */
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.6); /* Overlay más oscuro y moderno */
          display: flex; justify-content: center; align-items: center;
          z-index: 1000; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease-out;
        }
        .modal-content { 
          background: white; border-radius: 12px; width: 90%; max-width: 650px; 
          max-height: 90vh; /* Límite de altura para móviles añadido */
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex; flex-direction: column; /* flex-direction corregido */ overflow: hidden;
        }
        
        .modal-header { 
          display: flex; justify-content: space-between; align-items: flex-start; 
          padding: 20px 24px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9;
          flex-shrink: 0; /* Añadido para evitar que se aplaste */
        }
        .modal-header h2 { margin: 0; font-size: 1.5rem; color: #0f172a; }
        .modal-subtitle { margin: 4px 0 0 0; color: #64748b; display: flex; alignItems: center; gap: 6px; font-size: 0.95rem; }
        .close-btn { background: none; border: none; font-size: 1.8rem; cursor: pointer; color: #94a3b8; transition: color 0.2s; line-height: 1; }
        .close-btn:hover { color: #ef4444; }

        .modal-body { 
          padding: 24px; background-color: #f8fafc; 
          overflow-y: auto; /* Scroll interno añadido */
        }
        .section-title { margin: 0 0 16px 0; font-size: 1.1rem; color: #334155; font-weight: 600; }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        
        .stat-card { 
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
        .stat-icon { font-size: 1.5rem; margin-bottom: 8px; }
        .stat-blue { color: #3b82f6; } .stat-orange { color: #f59e0b; } .stat-red { color: #ef4444; }
        .stat-label { font-size: 0.85rem; color: #64748b; margin-bottom: 4px; font-weight: 500; }
        .stat-value { font-size: 1.5rem; color: #0f172a; font-weight: 700; }

        .modal-footer { 
          display: flex; justify-content: space-between; padding: 16px 24px; 
          background-color: #ffffff; border-top: 1px solid #f1f5f9;
          flex-shrink: 0; /* Añadido para evitar que se aplaste */
        }
        
        .btn-modal {
          display: inline-flex; align-items: center; gap: 8px; justify-content: center;
          padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer;
          font-weight: 600; font-size: 0.95rem; color: white; transition: all 0.2s;
        }
        .btn-modal:hover { transform: translateY(-1px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .btn-modal:active { transform: translateY(0); }
        .btn-modal-rojo { background-color: #ef4444; } .btn-modal-rojo:hover { background-color: #dc2626; }
        .btn-modal-verde { background-color: #10b981; } .btn-modal-verde:hover { background-color: #059669; }
        .btn-modal-naranja { background-color: #f59e0b; } .btn-modal-naranja:hover { background-color: #d97706; }

        .toast-notificacion {
          position: fixed; bottom: 30px; right: 30px; padding: 16px 24px; border-radius: 8px;
          color: white; font-weight: bold; z-index: 2000; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
          animation: toastEntrada 0.4s forwards;
        }
        .toast-notificacion.saliendo { animation: toastSalida 0.3s forwards; }
        .toast-notificacion.error { background-color: #ef4444; }
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

export default EmpresaViewer;