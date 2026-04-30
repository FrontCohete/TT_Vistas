// AllVac_Viewer.jsx
import React, { useState, useMemo } from 'react';
import FigureTable from '../../FigureTable';
import '../../../assets/css/admin_View.css';

const AllVac_Viewer = () => {
  // Datos simulados de vacantes existentes con status, reportes y fecha de publicación
  const [datosVacantes, setDatosVacantes] = useState([
    {
      id: 1,
      empresa: 'Tech Solutions S.A. de C.V.',
      ubicacion: 'CDMX, México',
      nombreVacante: 'Desarrollador Frontend Web',
      fechaPublicacion: '15/04/2026',
      descripcion: 'Creación de interfaces de usuario escalables usando React y consumo de APIs.',
      salario: '$20,000 - $25,000 MXN',
      modalidad: 'Híbrida',
      perfil: 'ISC',
      softSkills: ['Trabajo en equipo', 'Proactividad', 'Resolución de problemas'],
      hardSkills: ['HTML', 'CSS', 'JavaScript', 'Reactjs'],
      status: 'Activa',
      reportes: []
    },
    {
      id: 2,
      empresa: 'Logística Avanzada de México',
      ubicacion: 'Monterrey, NL',
      nombreVacante: 'Analista de Datos',
      fechaPublicacion: '20/04/2026',
      descripcion: 'Análisis de bases de datos de envíos, creación de dashboards y reportes.',
      salario: '$18,000 - $22,000 MXN',
      modalidad: 'Home-Office',
      perfil: 'LCD',
      softSkills: ['Pensamiento analítico', 'Comunicación asertiva'],
      hardSkills: ['SQL', 'Python', 'PowerBI', 'Excel Avanzado', 'Estadística'],
      status: 'Activa',
      reportes: [
        { nombre: 'Salario irreal', descripcion: 'Durante la entrevista mencionaron que el salario era mucho menor al publicado.' }
      ]
    },
    {
      id: 3,
      empresa: 'Innovación Digital MX',
      ubicacion: 'Guadalajara, Jal',
      nombreVacante: 'Ingeniero de Inteligencia Artificial',
      fechaPublicacion: '22/04/2026',
      descripcion: 'Entrenamiento de modelos de Machine Learning para visión computacional.',
      salario: '$35,000 - $45,000 MXN',
      modalidad: 'Presencial',
      perfil: 'IIA',
      softSkills: ['Pensamiento crítico', 'Autodidacta', 'Adaptabilidad', 'Liderazgo'],
      hardSkills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision'],
      status: 'Suspendida',
      reportes: [
        { nombre: 'Descripción engañosa', descripcion: 'Las tareas reales incluyen dar soporte técnico, no solo entrenar modelos.' },
        { nombre: 'Perfil incorrecto', descripcion: 'Piden IIA pero el examen técnico es exclusivo de redes.' }
      ]
    }
  ]);

  const [sortConfig, setSortConfig] = useState({ clave: null, direccion: 'asc' });
  const [busqueda, setBusqueda] = useState('');
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '', tipo: '', saliendo: false });
  
  // Estado para modales
  const [modalAccionesAbierto, setModalAccionesAbierto] = useState(false);
  const [modalCorregirAbierto, setModalCorregirAbierto] = useState(false);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);
  
  // Estado para el formulario de corrección
  const [formCorreccion, setFormCorreccion] = useState({
    camposSeleccionados: [],
    motivo: ''
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
      reg.empresa.toLowerCase().includes(busquedaLower) ||
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
        
        // Manejo especial para conteo de reportes
        if (sortConfig.clave === 'numReportes') {
          valA = a.reportes.length;
          valB = b.reportes.length;
        }
        
        // Manejo básico de fecha (asumiendo formato DD/MM/YYYY para el ejemplo, 
        // en producción podrías usar Date.parse si lo necesitas más exacto)
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

  const abrirModalAcciones = (registro) => {
    setVacanteSeleccionada(registro);
    setModalAccionesAbierto(true);
  };

  const abrirModalCorregir = (registro) => {
    setVacanteSeleccionada(registro);
    setFormCorreccion({ camposSeleccionados: [], motivo: '' }); // Reiniciar formulario
    setModalCorregirAbierto(true);
  };

  const handleCheckboxChange = (campo) => {
    setFormCorreccion(prev => {
      const seleccionados = prev.camposSeleccionados.includes(campo)
        ? prev.camposSeleccionados.filter(c => c !== campo)
        : [...prev.camposSeleccionados, campo];
      return { ...prev, camposSeleccionados: seleccionados };
    });
  };

  const handleBorrarVacante = () => {
    setDatosVacantes(prev => prev.filter(vac => vac.id !== vacanteSeleccionada.id));
    setModalAccionesAbierto(false);
    mostrarNotificacion('Vacante eliminada del sistema.', 'exito');
  };

  const handleActivarVacante = () => {
    setDatosVacantes(prev => prev.map(vac => 
      vac.id === vacanteSeleccionada.id ? { ...vac, status: 'Activa' } : vac
    ));
    setModalAccionesAbierto(false);
    mostrarNotificacion('La vacante ahora está Activa.', 'exito');
  };

  const handleSuspenderYCorregir = () => {
    if (formCorreccion.camposSeleccionados.length === 0 && !formCorreccion.motivo.trim()) {
      mostrarNotificacion('Debes seleccionar al menos un campo o escribir un motivo.', 'advertencia');
      return;
    }

    const cadenaCorreo = `🚨 SOLICITUD DE CORRECCIÓN DE VACANTE 🚨
Empresa: ${vacanteSeleccionada.empresa}
Vacante: ${vacanteSeleccionada.nombreVacante}
    
Campos que requieren corrección:
${formCorreccion.camposSeleccionados.length > 0 ? formCorreccion.camposSeleccionados.map(c => `- ${c}`).join('\n') : 'Ninguno especificado.'}

Motivo detallado / Instrucciones:
${formCorreccion.motivo || 'Revisar los campos marcados para su corrección urgente.'}`;

    alert(cadenaCorreo);

    setDatosVacantes(prev => prev.map(vac => 
      vac.id === vacanteSeleccionada.id ? { ...vac, status: 'Suspendida' } : vac
    ));

    setModalCorregirAbierto(false);
    mostrarNotificacion('Vacante suspendida y solicitud generada.', 'advertencia');
  };

  const columnas = [
    { clave: 'empresa', encabezado: 'Empresa', width: '18%' },
    { 
      clave: 'nombreVacante', 
      encabezado: 'Nombre de la Vacante', 
      width: '20%',
      render: (fila) => <span style={{ fontWeight: '600', color: '#1e293b' }}>{fila.nombreVacante}</span>
    },
    { clave: 'fechaPublicacion', encabezado: 'Fecha de Publicación', width: '12%' },
    { 
      clave: 'status', 
      encabezado: 'Status', 
      width: '10%',
      render: (fila) => {
        const claseBadge = fila.status === 'Activa' ? 'badge-green' : 'badge-red';
        return <span className={`badge ${claseBadge}`}>{fila.status}</span>;
      }
    },
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
              {cantidad} {cantidad === 1 ? 'Reporte' : 'Reportes'}
            </span>
          </div>
        )
      }
    },
    { 
      clave: 'acciones', 
      encabezado: 'Opciones', 
      sortable: false, 
      width: '28%', 
      render: (fila) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button className="btn-accion btn-blue-outline" title="Visualizar" onClick={() => abrirModalAcciones(fila)}>
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
      <h2 className="titulo-principal">Gestión General de Vacantes</h2>
      
      <div className="barra-busqueda-container">
        <i className="fi fi-rr-search"></i>
        <input 
          type="text" 
          className="input-busqueda" 
          placeholder="Buscar por empresa, vacante, fecha o status..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <FigureTable 
        columnas={columnas} 
        datos={datosOrdenados} 
        onSort={handleSort} 
        sortConfig={sortConfig}
        mensajeVacio={busqueda ? "No se encontraron vacantes para tu búsqueda." : "No hay vacantes en el sistema."}
      />

      {/* ================= MODAL: ACCIONES RÁPIDAS ================= */}
      {modalAccionesAbierto && vacanteSeleccionada && (
        <div className="modal-overlay" onClick={() => setModalAccionesAbierto(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <div>
                <h2><i className="fi fi-rr-bolt"></i> Acciones Rápidas</h2>
                <p className="modal-subtitle">Visualiza la información de la vacante y toma decisiones</p>
              </div>
              <button onClick={() => setModalAccionesAbierto(false)} className="close-btn">&times;</button>
            </div>

            <div className="modal-body">
              {/* SECCIÓN 1: DATOS DE LA VACANTE */}
              <h3 className="section-title"><i className="fi fi-rr-info"></i> Información de la Vacante</h3>
              <div className="grid-2-col" style={{ marginBottom: '24px' }}>
                <div className="data-group">
                  <span className="data-label">Empresa</span>
                  <span className="data-value">{vacanteSeleccionada.empresa}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Nombre de la Vacante</span>
                  <span className="data-value">{vacanteSeleccionada.nombreVacante}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Fecha de Publicación</span>
                  <span className="data-value">{vacanteSeleccionada.fechaPublicacion}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Ubicación</span>
                  <span className="data-value">{vacanteSeleccionada.ubicacion}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Salario & Modalidad</span>
                  <span className="data-value">{vacanteSeleccionada.salario} | {vacanteSeleccionada.modalidad}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Perfil</span>
                  <span className="data-value">{vacanteSeleccionada.perfil}</span>
                </div>
                <div className="data-group col-span-2">
                  <span className="data-label">Descripción de la Vacante</span>
                  <p className="data-text">{vacanteSeleccionada.descripcion}</p>
                </div>
                <div className="data-group col-span-2">
                  <span className="data-label">Competencias</span>
                  <p className="data-text" style={{ fontSize: '0.85rem' }}>
                    <strong>Soft Skills:</strong> {vacanteSeleccionada.softSkills.join(', ')}<br/>
                    <strong>Hard Skills:</strong> {vacanteSeleccionada.hardSkills.join(', ')}
                  </p>
                </div>
              </div>

              <div className="divider"></div>

              {/* SECCIÓN 2: REPORTES */}
              <h3 className="section-title" style={{ color: '#ea580c' }}><i className="fi fi-rr-exclamation"></i> Reportes ({vacanteSeleccionada.reportes.length})</h3>
              {vacanteSeleccionada.reportes.length === 0 ? (
                <div className="empty-state-box">Esta vacante no tiene reportes asociados.</div>
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
              <button className="btn-modal btn-modal-rojo" onClick={handleBorrarVacante}>
                <i className="fi fi-rr-trash"></i> Borrar
              </button>
              <button className="btn-modal btn-modal-verde" onClick={handleActivarVacante} disabled={vacanteSeleccionada.status === 'Activa'}>
                <i className="fi fi-rr-play"></i> {vacanteSeleccionada.status === 'Activa' ? 'Ya está Activa' : 'Activar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: SOLICITUD DE CORRECCIÓN ================= */}
      {modalCorregirAbierto && vacanteSeleccionada && (
        <div className="modal-overlay" onClick={() => setModalCorregirAbierto(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <div>
                <h2 style={{ color: '#ea580c' }}><i className="fi fi-rr-edit"></i> Corregir vacante validada</h2>
                <p className="modal-subtitle">Visualiza la información de la vacante que ha sido aprobada en Caspita y de ser necesario solicita la corrección para que vuelva a ser habilitada.</p>
              </div>
              <button onClick={() => setModalCorregirAbierto(false)} className="close-btn">&times;</button>
            </div>

            <div className="modal-body">
              {/* SECCIÓN 1: RESUMEN DE LA VACANTE */}
              <div className="resume-box" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="data-label">Vacante ({vacanteSeleccionada.fechaPublicacion}):</span>
                    <span className="data-value" style={{ display: 'block' }}>{vacanteSeleccionada.nombreVacante} - {vacanteSeleccionada.empresa}</span>
                  </div>
                  <span className={`badge ${vacanteSeleccionada.status === 'Activa' ? 'badge-green' : 'badge-red'}`}>{vacanteSeleccionada.status}</span>
                </div>
              </div>

              {/* SECCIÓN 2: REPORTES PREVIOS */}
              {vacanteSeleccionada.reportes.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <span className="data-label" style={{ color: '#ea580c' }}><i className="fi fi-rr-exclamation"></i> Alertas detectadas por los usuarios:</span>
                  <ul className="skills-list" style={{ marginTop: '4px' }}>
                    {vacanteSeleccionada.reportes.map((rep, idx) => (
                      <li key={idx} style={{ fontSize: '0.85rem' }}><strong>{rep.nombre}:</strong> {rep.descripcion}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="divider" style={{ margin: '16px 0' }}></div>

              {/* SECCIÓN 3: FORMULARIO DE CORRECCIÓN */}
              <h3 className="section-title">Formulario de Corrección</h3>
              
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Selecciona los campos que el reclutador debe modificar:</label>
                <div className="checkbox-grid">
                  {['Nombre de la Vacante', 'Descripción', 'Salario', 'Modalidad', 'Ubicación', 'Perfil', 'Competencias Interpersonales', 'Competencias Técnicas'].map(campo => (
                    <label key={campo} className="checkbox-item">
                      <input 
                        type="checkbox" 
                        checked={formCorreccion.camposSeleccionados.includes(campo)}
                        onChange={() => handleCheckboxChange(campo)}
                      />
                      <span>{campo}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Motivo de la corrección / Instrucciones detalladas:</label>
                <textarea 
                  className="textarea-form"
                  placeholder="Ej. El salario es incongruente con la descripción de actividades. Por favor ajustar el rango..."
                  value={formCorreccion.motivo}
                  onChange={(e) => setFormCorreccion({...formCorreccion, motivo: e.target.value})}
                ></textarea>
              </div>

            </div>

            <div className="modal-footer flex-right">
              <button className="btn-modal btn-modal-gris" onClick={() => setModalCorregirAbierto(false)}>
                Cancelar
              </button>
              <button className="btn-modal btn-modal-naranja" onClick={handleSuspenderYCorregir}>
                <i className="fi fi-rr-pause-circle"></i> Suspender y Solicitar Corrección
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

export default AllVac_Viewer;