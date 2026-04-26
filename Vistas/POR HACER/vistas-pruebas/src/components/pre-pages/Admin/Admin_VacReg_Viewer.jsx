// AllVac_Viewer.jsx
import React, { useState, useMemo } from 'react';
import FigureTable from '../../FigureTable';

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

      <style>{`
        /* ================= ESTILOS BASE COMPARTIDOS ================= */
        .contenedor-principal { padding: 20px; max-width: 1350px; margin: 0 auto; }
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

        /* TABLA Y BADGES */
        .custom-table th > div { justify-content: center !important; text-align: center; }
        .badge { display: inline-block; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; text-align: center; }
        .badge-green { background-color: #dcfce7; color: #166534; }
        .badge-red { background-color: #fee2e2; color: #991b1b; }
        .badge-purple { background-color: #f3e8ff; color: #7e22ce; }
        .badge-blue { background-color: #eff6ff; color: #1e53c7; }
        .badge-orange { background-color: #fff7ed; color: #ea580c; }
        .badge-gray { background-color: #f1f5f9; color: #475569; }

        .ux-metric-value { font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; min-width: 24px; text-align: center; }
        .val-orange { background-color: #fff7ed; color: #ea580c; }
        .val-gray   { background-color: #f1f5f9; color: #64748b; }

        /* BOTONES DE OPCIONES EN TABLA */
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

        /* ================= ESTILOS DEL MODAL ================= */
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
        
        /* GRID Y TEXTOS */
        .grid-2-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .col-span-2 { grid-column: span 2; }
        .data-group { display: flex; flex-direction: column; gap: 4px; }
        .data-label { font-size: 0.8rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .data-value { font-size: 1.05rem; color: #1e293b; font-weight: 500; }
        .data-text { font-size: 0.95rem; color: #334155; line-height: 1.5; margin: 0; }
        .section-title { font-size: 1.1rem; color: #0f172a; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px; }
        .divider { height: 1px; background: #e2e8f0; margin: 24px 0; }
        .resume-box { background: #fff; border: 1px solid #e2e8f0; padding: 12px 16px; border-radius: 8px; display: flex; flex-direction: column; }

        /* LISTA DE REPORTES */
        .reportes-list { display: flex; flex-direction: column; gap: 12px; }
        .reporte-card { background: #fff7ed; border-left: 4px solid #ea580c; padding: 12px; border-radius: 4px; }
        .reporte-title { display: block; color: #9a3412; font-size: 0.95rem; margin-bottom: 4px; }
        .reporte-desc { margin: 0; font-size: 0.85rem; color: #431407; }
        .empty-state-box { background: #f1f5f9; color: #64748b; padding: 16px; text-align: center; border-radius: 8px; font-size: 0.9rem; font-style: italic; }

        /* FORMULARIO DE CORRECCIÓN (CHECKBOXES Y TEXTAREA) */
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { font-size: 0.9rem; font-weight: 600; color: #475569; }
        .checkbox-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: white; padding: 16px; border-radius: 8px; border: 1px solid #cbd5e1; }
        .checkbox-item { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: #334155; cursor: pointer; font-weight: normal !important; }
        .checkbox-item input[type="checkbox"] { width: 16px; height: 16px; accent-color: #ea580c; cursor: pointer; }
        .textarea-form { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; color: #1e293b; outline: none; transition: border-color 0.2s; box-sizing: border-box; resize: vertical; min-height: 80px; font-family: inherit; }
        .textarea-form:focus { border-color: #ea580c; box-shadow: 0 0 0 2px rgba(234, 88, 12, 0.1); }

        .modal-footer { display: flex; padding: 16px 24px; background-color: #ffffff; border-top: 1px solid #f1f5f9; flex-shrink: 0; }
        .flex-right { justify-content: flex-end; gap: 12px; }
        .btn-modal { display: inline-flex; align-items: center; gap: 8px; justify-content: center; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; font-size: 0.95rem; color: white; transition: all 0.2s; }
        .btn-modal:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-modal-rojo { background-color: #ef4444; } .btn-modal-rojo:hover:not(:disabled) { background-color: #dc2626; }
        .btn-modal-verde { background-color: #10b981; } .btn-modal-verde:hover:not(:disabled) { background-color: #059669; }
        .btn-modal-naranja { background-color: #ea580c; } .btn-modal-naranja:hover:not(:disabled) { background-color: #c2410c; }
        .btn-modal-gris { background-color: #94a3b8; } .btn-modal-gris:hover:not(:disabled) { background-color: #64748b; }

        /* ================= NOTIFICACIONES ================= */
        .toast-notificacion { position: fixed; bottom: 30px; right: 30px; padding: 16px 24px; border-radius: 8px; color: white; font-weight: bold; z-index: 2000; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); animation: toastEntrada 0.4s forwards; }
        .toast-notificacion.saliendo { animation: toastSalida 0.3s forwards; }
        .toast-notificacion.exito { background-color: #10b981; }
        .toast-notificacion.advertencia { background-color: #f59e0b; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes toastEntrada { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes toastSalida { from { opacity: 1; } to { opacity: 0; transform: translateY(20px); } }

        /* ADAPTACIÓN MÓVIL */
        @media (max-width: 768px) {
          .grid-2-col, .checkbox-grid { grid-template-columns: 1fr; gap: 16px; }
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

export default AllVac_Viewer;