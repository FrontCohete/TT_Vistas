import React, { useState, useMemo } from 'react';
import FigureTable from '../../FigureTable';
import '../../../assets/css/emp_View.css';

const Emp_RecGes_Viewer = () => {
  const [datosReclutadores, setDatosReclutadores] = useState([
    {
      id: 1,
      nombre: 'Héctor',
      apellido: 'Navarro',
      correo: 'hnavarro@innovaciondigital.mx',
      telefono: '5512345678',
      status: 'Activo',
      vacantes: [
        { id: 101, nombre: 'Desarrollador Frontend React', fecha: '10/04/2026', reporte: false },
        { id: 102, nombre: 'Ingeniero Backend Node.js', fecha: '12/04/2026', reporte: true },
        { id: 103, nombre: 'Diseñador UI/UX', fecha: '15/04/2026', reporte: false }
      ]
    },
    {
      id: 2,
      nombre: 'Laura',
      apellido: 'Torres',
      correo: 'ltorres@innovaciondigital.mx',
      telefono: '5587654321',
      status: 'Suspendido',
      vacantes: [
        { id: 104, nombre: 'Analista de Datos Jr', fecha: '05/04/2026', reporte: true },
        { id: 105, nombre: 'Data Scientist Sr', fecha: '08/04/2026', reporte: true }
      ]
    },
    {
      id: 3,
      nombre: 'Samantha',
      apellido: 'Cruz',
      correo: 'scruz@innovaciondigital.mx',
      telefono: '5533221144',
      status: 'Activo',
      vacantes: [
        { id: 106, nombre: 'Gerente de Proyectos TI', fecha: '20/04/2026', reporte: false }
      ]
    }
  ]);

  const [busqueda, setBusqueda] = useState('');
  const [sortConfig, setSortConfig] = useState({ clave: null, direccion: 'asc' });
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '', tipo: '', saliendo: false });

  const [modalAccionesAbierto, setModalAccionesAbierto] = useState(false);
  const [reclutadorSeleccionado, setReclutadorSeleccionado] = useState(null);

  const handleSort = (clave) => {
    let direccion = 'asc';
    if (sortConfig.clave === clave && sortConfig.direccion === 'asc') direccion = 'desc';
    setSortConfig({ clave, direccion });
  };

  const datosFiltrados = useMemo(() => {
    if (!busqueda) return datosReclutadores;
    const busquedaLower = busqueda.toLowerCase();
    
    return datosReclutadores.filter(reg => 
      `${reg.nombre} ${reg.apellido}`.toLowerCase().includes(busquedaLower) ||
      reg.correo.toLowerCase().includes(busquedaLower) ||
      reg.telefono.includes(busquedaLower) ||
      reg.status.toLowerCase().includes(busquedaLower)
    );
  }, [datosReclutadores, busqueda]);

  const datosOrdenados = useMemo(() => {
    let datosOrdenables = [...datosFiltrados];
    if (sortConfig.clave) {
      datosOrdenables.sort((a, b) => {
        let valA = a[sortConfig.clave];
        let valB = b[sortConfig.clave];

        if (sortConfig.clave === 'vacantes') {
          valA = a.vacantes.length;
          valB = b.vacantes.length;
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

  const abrirModalAcciones = (registro) => {
    setReclutadorSeleccionado(registro);
    setModalAccionesAbierto(true);
  };

  const handleToggleEstatus = () => {
    if (!reclutadorSeleccionado) return;
    const nuevoEstatus = reclutadorSeleccionado.status === 'Activo' ? 'Suspendido' : 'Activo';
    setDatosReclutadores(prevDatos => 
      prevDatos.map(rec => rec.id === reclutadorSeleccionado.id ? { ...rec, status: nuevoEstatus } : rec)
    );
    setModalAccionesAbierto(false);
    mostrarNotificacion(`El reclutador ahora se encuentra ${nuevoEstatus}.`, nuevoEstatus === 'Activo' ? 'exito' : 'advertencia');
  };

  const handleBorrarReclutador = () => {
    if (!reclutadorSeleccionado) return;
    setDatosReclutadores(prev => prev.filter(rec => rec.id !== reclutadorSeleccionado.id));
    setModalAccionesAbierto(false);
    mostrarNotificacion('El reclutador y su historial han sido eliminados.', 'error');
  };

  const columnas = [
    { 
      clave: 'nombre', 
      encabezado: 'Nombre de Reclutador', 
      width: '20%',
      render: (fila) => <span style={{ fontWeight: '600', color: '#1e293b' }}>{fila.nombre} {fila.apellido}</span>
    },
    { 
      clave: 'correo', 
      encabezado: 'Correo Electrónico', 
      width: '22%',
      render: (fila) => <span style={{ color: '#64748b' }}><i className="fi fi-rr-envelope"></i> {fila.correo}</span>
    },
    { 
      clave: 'telefono', 
      encabezado: 'Teléfono', 
      width: '13%',
      render: (fila) => <span><i className="fi fi-rr-phone-call"></i> {fila.telefono ? fila.telefono : 'N/A'}</span>
    },
    { 
      clave: 'vacantes', 
      encabezado: 'Vacantes Publicadas', 
      sortable: true, 
      width: '18%',
      render: (fila) => {
        const totales = fila.vacantes.length;
        const reportadas = fila.vacantes.filter(v => v.reporte).length;
        return (
          <div className="ux-metric-container metric-vacantes" style={{ margin: '0 auto' }}>
            <div className="ux-metric-row">
              <span className="ux-metric-label">Totales</span>
              <span className="ux-metric-value val-blue">{totales}</span>
            </div>
            <div className="ux-metric-row">
              <span className="ux-metric-label">Con Reporte</span>
              <span className={`ux-metric-value ${reportadas > 0 ? 'val-orange' : 'val-gray'}`}>
                {reportadas}
              </span>
            </div>
          </div>
        );
      }
    },
    { 
      clave: 'status', 
      encabezado: 'Status', 
      width: '12%',
      render: (fila) => {
        const esActivo = fila.status === 'Activo';
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className={`badge-estatus ${esActivo ? 'badge-activa' : 'badge-suspendida'}`}>
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="btn-accion btn-blue-outline" title="Acciones" onClick={() => abrirModalAcciones(fila)}>
            <i className="fi fi-rr-settings"></i> Acciones
          </button>
        </div>
      )
    }
  ];

  const vacantesReportadas = reclutadorSeleccionado?.vacantes.filter(v => v.reporte) || [];
  const vacantesLimpias = reclutadorSeleccionado?.vacantes.filter(v => !v.reporte) || [];

  return (
    <div className="contenedor-empresa">
      <h2 className="titulo-empresa">Gestión de Actividad de Reclutadores</h2>
      
      <div className="acciones-top-container">
        <div className="barra-busqueda-container">
          <i className="fi fi-rr-search" aria-hidden="true"></i>
          <input 
            type="text" 
            className="input-busqueda" 
            placeholder="Buscar reclutador por nombre, correo, teléfono o status..." 
            aria-label="Buscar reclutador"
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
        mensajeVacio={busqueda ? "No se encontraron reclutadores." : "Aún no tienes reclutadores registrados."}
      />

      {/* modal */}
      {modalAccionesAbierto && reclutadorSeleccionado && (
        <div className="modal-overlay" onClick={() => setModalAccionesAbierto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <h2 style={{ color: '#0f172a' }}><i className="fi fi-rr-user-gear"></i> Gestión de Usuario</h2>
              <p className="modal-subtitle">
                Analiza el historial de vacantes y determina las acciones correspondientes en Caspita.
              </p>
              <button onClick={() => setModalAccionesAbierto(false)} className="close-btn">&times;</button>
            </div>

            <div className="modal-body">
              <div className="resume-box" style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="data-label">Status Actual:</span>
                    <span className="data-value" style={{ display: 'block', fontSize: '1.1rem', marginTop: '4px' }}>
                      <span className={`badge-estatus ${reclutadorSeleccionado.status === 'Activo' ? 'badge-activa' : 'badge-suspendida'}`} style={{ padding: '2px 8px' }}>
                        <span className="status-dot"></span>{reclutadorSeleccionado.status}
                      </span>
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="data-label">Total Publicadas:</span>
                    <span className="data-value" style={{ display: 'block', fontSize: '1.2rem', fontWeight: 'bold' }}>
                      {reclutadorSeleccionado.vacantes.length}
                    </span>
                  </div>
                </div>
              </div>

              <h4 className="section-title text-danger" style={{ marginBottom: '12px' }}>
                <i className="fi fi-rr-triangle-warning"></i> Vacantes con Reporte ({vacantesReportadas.length})
              </h4>
              {vacantesReportadas.length > 0 ? (
                <ul className="lista-vacantes">
                  {vacantesReportadas.map(vacante => (
                    <li key={vacante.id} className="item-vacante item-peligro">
                      <span className="vacante-nombre">{vacante.nombre}</span>
                      <span className="vacante-fecha"><i className="fi fi-rr-calendar"></i> {vacante.fecha}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state-box">Este reclutador no tiene vacantes reportadas.</p>
              )}

              <div className="divider" style={{ margin: '20px 0' }}></div>

              <h4 className="section-title text-success" style={{ marginBottom: '12px' }}>
                <i className="fi fi-rr-check-circle"></i> Vacantes sin Reporte ({vacantesLimpias.length})
              </h4>
              {vacantesLimpias.length > 0 ? (
                <ul className="lista-vacantes">
                  {vacantesLimpias.map(vacante => (
                    <li key={vacante.id} className="item-vacante item-seguro">
                      <span className="vacante-nombre">{vacante.nombre}</span>
                      <span className="vacante-fecha"><i className="fi fi-rr-calendar"></i> {vacante.fecha}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state-box">Este reclutador no tiene vacantes activas y limpias.</p>
              )}
            </div>

            <div className="modal-footer flex-right">
              {reclutadorSeleccionado.status === 'Suspendido' && (
                <button 
                  className="btn-modal btn-modal-rojo" 
                  style={{ marginRight: 'auto' }} 
                  onClick={handleBorrarReclutador}
                >
                  <i className="fi fi-rr-trash"></i> Eliminar Usuario
                </button>
              )}
              
              <button className="btn-modal btn-modal-gris" onClick={() => setModalAccionesAbierto(false)}>
                Cancelar
              </button>

              <button 
                className={`btn-modal ${reclutadorSeleccionado.status === 'Activo' ? 'btn-modal-naranja' : 'btn-modal-verde'}`} 
                onClick={handleToggleEstatus}
              >
                <i className={`fi ${reclutadorSeleccionado.status === 'Activo' ? 'fi-rr-ban' : 'fi-rr-play'}`}></i> 
                {reclutadorSeleccionado.status === 'Activo' ? 'Suspender Usuario' : 'Reactivar Usuario'}
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

export default Emp_RecGes_Viewer;