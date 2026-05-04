import React, { useState, useMemo } from 'react';
import FigureTable from '../../FigureTable';
import '../../../assets/css/emp_View.css';

const Emp_VacReg_Viewer = () => {
  // Datos simulados para la vista de la Empresa
  const [datosVacantes, setDatosVacantes] = useState([
    {
      id: 1,
      nombreReclutador: 'Ana Silvia',
      nombreVacante: 'Desarrollador Frontend Web',
      fechaPublicacion: '15/04/2026',
      empresa: 'Tech Solutions S.A. de C.V.',
      salario: '$20,000 - $25,000 MXN',
      ubicacion: 'CDMX, México',
      perfil: 'ISC',
      modalidad: 'Híbrida',
      contratacion: 'Tiempo Completo',
      horario: 'Lunes a Viernes, 9:00 AM - 6:00 PM',
      descripcion: 'Creación de interfaces de usuario escalables usando React y consumo de APIs.',
      softSkills: ['Trabajo en equipo', 'Proactividad', 'Resolución de problemas'],
      hardSkills: ['HTML', 'CSS', 'JavaScript', 'Reactjs'],
      status: 'Activa',
      reportes: []
    },
    {
      id: 2,
      nombreReclutador: 'Carlos Mendoza',
      nombreVacante: 'Analista de Datos',
      fechaPublicacion: '20/04/2026',
      empresa: 'Logística Avanzada de México',
      salario: '$18,000 - $22,000 MXN',
      ubicacion: 'Monterrey, NL',
      perfil: 'LCD',
      modalidad: 'Home-Office',
      contratacion: 'Medio Tiempo',
      horario: 'Lunes a Viernes, 9:00 AM - 1:00 PM',
      descripcion: 'Análisis de bases de datos de envíos, creación de dashboards y reportes.',
      softSkills: ['Pensamiento analítico', 'Comunicación asertiva'],
      hardSkills: ['SQL', 'Python', 'PowerBI', 'Excel Avanzado'],
      status: 'Activa',
      reportes: [
        { nombre: 'Salario irreal', descripcion: 'Durante la entrevista mencionaron que el salario era mucho menor al publicado.' }
      ]
    }
  ]);

  const [sortConfig, setSortConfig] = useState({ clave: null, direccion: 'asc' });
  const [busqueda, setBusqueda] = useState('');
  
  const [modalInfoAbierto, setModalInfoAbierto] = useState(false);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '', tipo: '', saliendo: false });

  const handleSort = (clave) => {
    let direccion = 'asc';
    if (sortConfig.clave === clave && sortConfig.direccion === 'asc') direccion = 'desc';
    setSortConfig({ clave, direccion });
  };

  const datosFiltrados = useMemo(() => {
    if (!busqueda) return datosVacantes;
    const busquedaLower = busqueda.toLowerCase();
    
    return datosVacantes.filter(reg => 
      reg.nombreReclutador.toLowerCase().includes(busquedaLower) ||
      reg.nombreVacante.toLowerCase().includes(busquedaLower) ||
      reg.status.toLowerCase().includes(busquedaLower) ||
      reg.fechaPublicacion.includes(busquedaLower)
    );
  }, [datosVacantes, busqueda]);

  const datosOrdenados = useMemo(() => {
    let datosOrdenables = [...datosFiltrados];
    if (sortConfig.clave) {
      datosOrdenables.sort((a, b) => {
        let valA = a[sortConfig.clave];
        let valB = b[sortConfig.clave];
        
        if (sortConfig.clave === 'numReportes') {
          valA = a.reportes.length;
          valB = b.reportes.length;
        }
        
        if (sortConfig.clave === 'fechaPublicacion') {
           valA = a.fechaPublicacion.split('/').reverse().join('');
           valB = b.fechaPublicacion.split('/').reverse().join('');
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

  // --- MANEJADORES DE MODAL Y ACCIONES ---
  const abrirModalInfo = (registro) => {
    setVacanteSeleccionada(registro);
    setModalInfoAbierto(true);
  };

  const handleToggleEstatus = () => {
    if (!vacanteSeleccionada) return;
    const nuevoEstatus = vacanteSeleccionada.status === 'Activa' ? 'Suspendida' : 'Activa';
    
    setDatosVacantes(prevDatos => 
      prevDatos.map(vac => vac.id === vacanteSeleccionada.id ? { ...vac, status: nuevoEstatus } : vac)
    );
    
    setModalInfoAbierto(false);
    mostrarNotificacion(`La vacante ahora se encuentra ${nuevoEstatus.toLowerCase()}.`, nuevoEstatus === 'Activa' ? 'exito' : 'advertencia');
  };

  const handleBorrarVacante = () => {
    if (!vacanteSeleccionada) return;

    setDatosVacantes(prev => prev.filter(vac => vac.id !== vacanteSeleccionada.id));
    setModalInfoAbierto(false);
    mostrarNotificacion('La vacante ha sido eliminada permanentemente.', 'error');
  };

  const columnas = [
    { clave: 'nombreReclutador', encabezado: 'Nombre Reclutador', width: '18%' },
    { 
      clave: 'nombreVacante', 
      encabezado: 'Nombre de Publicación', 
      width: '20%',
      render: (fila) => <span style={{ fontWeight: '600', color: '#1e293b' }}>{fila.nombreVacante}</span>
    },
    { clave: 'fechaPublicacion', encabezado: 'Fecha de Publicación', width: '12%' },
    { 
      clave: 'numReportes', 
      encabezado: 'Reportes', 
      width: '12%',
      render: (fila) => {
        const cantidad = fila.reportes.length;
        const claseVal = cantidad > 0 ? 'val-orange' : 'val-gray';
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className={`ux-metric-value ${claseVal}`} style={{ fontSize: '0.85rem' }}>
              {cantidad}
            </span>
          </div>
        )
      }
    },
    { 
      clave: 'status', 
      encabezado: 'Status', 
      width: '10%',
      render: (fila) => {
        const claseBadge = fila.status === 'Activa' ? 'badge-activa' : 'badge-suspendida';
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
          <button className="btn-accion btn-blue-outline" title="Acciones" onClick={() => abrirModalInfo(fila)}>
            <i className="fi fi-rr-settings"></i> Acciones
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="contenedor-empresa">
      <h2 className="titulo-empresa">Registro de Vacantes</h2>
      
      <div className="acciones-top-container">
        <div className="barra-busqueda-container">
          <i className="fi fi-rr-search"></i>
          <input 
            type="text" 
            className="input-busqueda" 
            placeholder="Buscar por reclutador, vacante, fecha o status..." 
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
        mensajeVacio={busqueda ? "No se encontraron vacantes para tu búsqueda." : "No hay vacantes registradas."}
      />

      {modalInfoAbierto && vacanteSeleccionada && (
        <div className="modal-overlay" onClick={() => setModalInfoAbierto(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <h2 style={{ color: '#0f172a' }}><i className="fi fi-rr-briefcase"></i> Gestión de la Vacante</h2>
              <p className="modal-subtitle">Visualiza la información completa de la vacante y toma acciones sobre su disponibilidad en la plataforma.</p>
              <button onClick={() => setModalInfoAbierto(false)} className="close-btn">&times;</button>
            </div>

            <div className="modal-body">
              <div className="resume-box" style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="data-label">Status Actual:</span>
                    <span className="data-value" style={{ display: 'block', fontSize: '1.1rem', marginTop: '4px' }}>
                      <span className={`badge-estatus ${vacanteSeleccionada.status === 'Activa' ? 'badge-activa' : 'badge-suspendida'}`} style={{ padding: '2px 8px' }}>
                        <span className="status-dot"></span>{vacanteSeleccionada.status}
                      </span>
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="data-label">Reclutador Asignado:</span>
                    <span className="data-value" style={{ display: 'block', fontSize: '1.1rem', fontWeight: 'bold' }}>
                      {vacanteSeleccionada.nombreReclutador}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="section-title">Detalles Generales</h3>
              <div className="grid-2-col" style={{ marginBottom: '24px' }}>
                <div className="data-group">
                  <span className="data-label">Nombre de la Vacante</span>
                  <span className="data-value">{vacanteSeleccionada.nombreVacante}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Empresa</span>
                  <span className="data-value">{vacanteSeleccionada.empresa}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Ubicación</span>
                  <span className="data-value">{vacanteSeleccionada.ubicacion}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Perfil Profesional</span>
                  <span className="data-value">{vacanteSeleccionada.perfil}</span>
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
                  <span className="data-label">Tipo de Contratación</span>
                  <span className="data-value">{vacanteSeleccionada.contratacion}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Horario Laboral</span>
                  <span className="data-value">{vacanteSeleccionada.horario}</span>
                </div>
                <div className="data-group col-span-2">
                  <span className="data-label">Descripción de la Vacante</span>
                  <p className="data-text">{vacanteSeleccionada.descripcion}</p>
                </div>
                <div className="data-group col-span-2">
                  <span className="data-label">Competencias</span>
                  <div className="grid-2-col" style={{ marginTop: '8px' }}>
                    <div>
                      <strong style={{ fontSize: '0.85rem' }}>Interpersonales (Soft):</strong>
                      <ul className="skills-list">
                        {vacanteSeleccionada.softSkills.map((skill, idx) => <li key={idx}><i className="fi fi-rr-check"></i> {skill}</li>)}
                      </ul>
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.85rem' }}>Técnicas (Hard):</strong>
                      <ul className="skills-list">
                        {vacanteSeleccionada.hardSkills.map((skill, idx) => <li key={idx}><i className="fi fi-rr-check"></i> {skill}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              <h3 className="section-title" style={{ color: '#ea580c' }}>
                <i className="fi fi-rr-exclamation"></i> Número de reportes: {vacanteSeleccionada.reportes.length}
              </h3>
              
              {vacanteSeleccionada.reportes.length === 0 ? (
                <div className="empty-state-box">Esta vacante se encuentra libre de reportes por el momento.</div>
              ) : (
                <div className="reportes-list">
                  {vacanteSeleccionada.reportes.map((rep, idx) => (
                    <div key={idx} className="reporte-card">
                      <strong className="reporte-title">{rep.nombre}</strong>
                      <p className="reporte-desc">{rep.descripcion}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-footer flex-right">
              {vacanteSeleccionada.status === 'Suspendida' && (
                <button 
                  className="btn-modal btn-modal-rojo" 
                  style={{ marginRight: 'auto' }} 
                  onClick={handleBorrarVacante}
                >
                  <i className="fi fi-rr-trash"></i> Borrar
                </button>
              )}
              
              <button className="btn-modal btn-modal-gris" onClick={() => setModalInfoAbierto(false)}>
                Cancelar
              </button>

              <button 
                className={`btn-modal ${vacanteSeleccionada.status === 'Activa' ? 'btn-modal-naranja' : 'btn-modal-verde'}`} 
                onClick={handleToggleEstatus}
              >
                <i className={`fi ${vacanteSeleccionada.status === 'Activa' ? 'fi-rr-ban' : 'fi-rr-play'}`}></i> 
                {vacanteSeleccionada.status === 'Activa' ? 'Suspender Vacante' : 'Reactivar Vacante'}
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

export default Emp_VacReg_Viewer;