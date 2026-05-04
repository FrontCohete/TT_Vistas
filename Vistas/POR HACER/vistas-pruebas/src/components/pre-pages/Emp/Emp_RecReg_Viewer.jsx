import React, { useState, useMemo } from 'react';
import FigureTable from '../../FigureTable';
import '../../../assets/css/emp_View.css';

const Emp_RecReg_Viewer = () => {
  const [datosReclutadores, setDatosReclutadores] = useState([
    {
      id: 1,
      nombre: 'Carlos',
      apellido: 'Mendoza',
      correo: 'cmendoza@techsolutions.com',
      telefono: '5512345678',
      fechaPublicacion: '10/04/2026'
    },
    {
      id: 2,
      nombre: 'Mariana',
      apellido: 'Ríos',
      correo: 'mrios@techsolutions.com',
      telefono: '5587654321',
      fechaPublicacion: '12/04/2026'
    }
  ]);

  const [busqueda, setBusqueda] = useState('');
  const [sortConfig, setSortConfig] = useState({ clave: null, direccion: 'asc' });
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '', tipo: '', saliendo: false });

  // Control de Modales
  const [modalNuevoAbierto, setModalNuevoAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);

  // Estado del Formulario y Errores
  const estadoInicialFormulario = { nombre: '', apellido: '', correo: '', telefono: '' };
  const estadoInicialErrores = { nombre: '', apellido: '', correo: '', telefono: '' };
  
  const [formulario, setFormulario] = useState(estadoInicialFormulario);
  const [errores, setErrores] = useState(estadoInicialErrores);
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
      reg.telefono.includes(busquedaLower)
    );
  }, [datosReclutadores, busqueda]);

  const datosOrdenados = useMemo(() => {
    let datosOrdenables = [...datosFiltrados];
    if (sortConfig.clave) {
      datosOrdenables.sort((a, b) => {
        let valA = a[sortConfig.clave];
        let valB = b[sortConfig.clave];

        if (sortConfig.clave === 'fechaPublicacion') {
          valA = valA.split('/').reverse().join('');
          valB = valB.split('/').reverse().join('');
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

  // --- LÓGICA DE VALIDACIÓN ---
  const validarFormulario = () => {
    let nuevosErrores = { nombre: '', apellido: '', correo: '', telefono: '' };
    let esValido = true;

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
      esValido = false;
    }
    
    if (!formulario.apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es obligatorio.';
      esValido = false;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formulario.correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.';
      esValido = false;
    } else if (!regexCorreo.test(formulario.correo)) {
      nuevosErrores.correo = 'Ingresa un formato de correo válido (ej. usuario@dominio.com).';
      esValido = false;
    }

    if (formulario.telefono.trim()) {
      const regexTelefono = /^\d{10}$/;
      if (!regexTelefono.test(formulario.telefono)) {
        nuevosErrores.telefono = 'El teléfono debe contener exactamente 10 dígitos numéricos.';
        esValido = false;
      }
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  // --- MANEJADORES DE MODALES Y ACCIONES ---
  const abrirModalNuevo = () => {
    setFormulario(estadoInicialFormulario);
    setErrores(estadoInicialErrores);
    setModalNuevoAbierto(true);
  };

  const abrirModalEditar = (registro) => {
    setReclutadorSeleccionado(registro);
    setFormulario({
      nombre: registro.nombre,
      apellido: registro.apellido,
      correo: registro.correo,
      telefono: registro.telefono || '' 
    });
    setErrores(estadoInicialErrores);
    setModalEditarAbierto(true);
  };

  const handleChangeFormulario = (e) => {
    const { name, value } = e.target;
    
    if (name === 'telefono' && value !== '' && !/^\d+$/.test(value)) {
      return; 
    }

    setFormulario(prev => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGuardarNuevo = () => {
    if (!validarFormulario()) {
      mostrarNotificacion('Revisa los errores en el formulario.', 'error');
      return;
    }

    const nuevoReclutador = {
      id: Date.now(),
      ...formulario,
      fechaPublicacion: new Date().toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })
    };

    setDatosReclutadores(prev => [...prev, nuevoReclutador]);
    setModalNuevoAbierto(false);
    mostrarNotificacion('Reclutador agregado exitosamente.', 'exito');
  };

  const handleGuardarEdicion = () => {
    if (!validarFormulario()) {
      mostrarNotificacion('Revisa los errores en el formulario.', 'error');
      return;
    }

    setDatosReclutadores(prev => prev.map(rec => 
      rec.id === reclutadorSeleccionado.id ? { ...rec, ...formulario } : rec
    ));
    setModalEditarAbierto(false);
    mostrarNotificacion('Datos del reclutador actualizados.', 'exito');
  };

  const columnas = [
    { 
      clave: 'nombre', 
      encabezado: 'Nombre de Reclutador', 
      width: '30%',
      render: (fila) => <span style={{ fontWeight: '600', color: '#1e293b' }}>{fila.nombre} {fila.apellido}</span>
    },
    { 
      clave: 'correo', 
      encabezado: 'Correo Electrónico', 
      width: '25%',
      render: (fila) => <span style={{ color: '#64748b' }}><i className="fi fi-rr-envelope"></i> {fila.correo}</span>
    },
    { 
      clave: 'telefono', 
      encabezado: 'Número Telefónico', 
      width: '15%',
      render: (fila) => <span><i className="fi fi-rr-phone-call"></i> {fila.telefono ? fila.telefono : 'N/A'}</span>
    },
    { 
      clave: 'fechaPublicacion', 
      encabezado: 'Fecha de Añadido', 
      width: '15%' 
    },
    { 
      clave: 'acciones', 
      encabezado: 'Opciones', 
      sortable: false, 
      width: '15%',
      render: (fila) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="btn-accion btn-orange-outline" title="Editar" onClick={() => abrirModalEditar(fila)}>
            <i className="fi fi-rr-edit"></i> Editar
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="contenedor-empresa">
      <h2 className="titulo-empresa">Visualización de Reclutadores </h2>
      
      {/* CONTENEDOR UI/UX MEJORADO */}
      <div className="acciones-top-container">
        <div className="barra-busqueda-container">
          <i className="fi fi-rr-search" aria-hidden="true"></i>
          <input 
            type="text" 
            className="input-busqueda" 
            placeholder="Buscar por nombre, correo o teléfono..." 
            aria-label="Buscar reclutador"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        
        <button className="btn-empresa btn-empresa-verde btn-empresa-nuevo" aria-label="Añadir nuevo reclutador" onClick={abrirModalNuevo}>
          <i className="fi fi-rr-user-add" aria-hidden="true"></i> <span className="btn-text">Nuevo Usuario</span>
        </button>
      </div>

      <FigureTable 
        columnas={columnas} 
        datos={datosOrdenados} 
        onSort={handleSort} 
        sortConfig={sortConfig}
        mensajeVacio={busqueda ? "No se encontraron reclutadores." : "Aún no tienes reclutadores registrados."}
      />

      {/* ================= MODAL: NUEVO RECLUTADOR ================= */}
      {modalNuevoAbierto && (
        <div className="modal-overlay" onClick={() => setModalNuevoAbierto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 style={{ color: '#107bb9' }}><i className="fi fi-rr-user-add"></i> Alta de Reclutador</h2>
                <p className="modal-subtitle">Ingresa la información requerida para dar de alta a un usuario en la plataforma 'Caspita'.</p>
              </div>
              <button onClick={() => setModalNuevoAbierto(false)} className="close-btn">&times;</button>
            </div>

            <div className="modal-body">
              <div className="formulario-cuadricula">
                <div className="form-group">
                  <label>Nombre(s)</label>
                  <input 
                    type="text" 
                    className={`input-form ${errores.nombre ? 'input-error' : ''}`} 
                    name="nombre" value={formulario.nombre} onChange={handleChangeFormulario} 
                    placeholder="Ej. Ana Silvia" 
                  />
                  {errores.nombre && <span className="error-text">{errores.nombre}</span>}
                </div>
                
                <div className="form-group">
                  <label>Apellido(s)</label>
                  <input 
                    type="text" 
                    className={`input-form ${errores.apellido ? 'input-error' : ''}`} 
                    name="apellido" value={formulario.apellido} onChange={handleChangeFormulario} 
                    placeholder="Ej. López Cruz" 
                  />
                  {errores.apellido && <span className="error-text">{errores.apellido}</span>}
                </div>
                
                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input 
                    type="email" 
                    className={`input-form ${errores.correo ? 'input-error' : ''}`} 
                    name="correo" value={formulario.correo} onChange={handleChangeFormulario} 
                    placeholder="correo@empresa.com" 
                  />
                  {errores.correo && <span className="error-text">{errores.correo}</span>}
                </div>
                
                <div className="form-group">
                  <label>Número Telefónico <span className="label-opcional">(Opcional)</span></label>
                  <input 
                    type="tel" 
                    className={`input-form ${errores.telefono ? 'input-error' : ''}`} 
                    name="telefono" value={formulario.telefono} onChange={handleChangeFormulario} 
                    placeholder="10 dígitos" maxLength="10" 
                  />
                  {errores.telefono && <span className="error-text">{errores.telefono}</span>}
                </div>
              </div>
            </div>

            <div className="modal-footer flex-right">
              <button className="btn-modal btn-modal-gris" onClick={() => setModalNuevoAbierto(false)}>Cancelar</button>
              <button className="btn-modal btn-modal-verde" onClick={handleGuardarNuevo}>
                <i className="fi fi-rr-disk"></i> Agregar Usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDITAR RECLUTADOR ================= */}
      {modalEditarAbierto && reclutadorSeleccionado && (
        <div className="modal-overlay" onClick={() => setModalEditarAbierto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 style={{ color: '#ea580c' }}><i className="fi fi-rr-edit"></i> Editar Reclutador</h2>
                <p className="modal-subtitle">Modifica la información del usuario reclutador en la plataforma 'Caspita'.</p>
              </div>
              <button onClick={() => setModalEditarAbierto(false)} className="close-btn">&times;</button>
            </div>

            <div className="modal-body">
              <div className="formulario-cuadricula">
                <div className="form-group">
                  <label>Nombre(s)</label>
                  <input 
                    type="text" 
                    className={`input-form ${errores.nombre ? 'input-error' : ''}`} 
                    name="nombre" value={formulario.nombre} onChange={handleChangeFormulario} 
                  />
                  {errores.nombre && <span className="error-text">{errores.nombre}</span>}
                </div>
                
                <div className="form-group">
                  <label>Apellido(s)</label>
                  <input 
                    type="text" 
                    className={`input-form ${errores.apellido ? 'input-error' : ''}`} 
                    name="apellido" value={formulario.apellido} onChange={handleChangeFormulario} 
                  />
                  {errores.apellido && <span className="error-text">{errores.apellido}</span>}
                </div>
                
                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input 
                    type="email" 
                    className={`input-form ${errores.correo ? 'input-error' : ''}`} 
                    name="correo" value={formulario.correo} onChange={handleChangeFormulario} 
                  />
                  {errores.correo && <span className="error-text">{errores.correo}</span>}
                </div>
                
                <div className="form-group">
                  <label>Número Telefónico <span className="label-opcional">(Opcional)</span></label>
                  <input 
                    type="tel" 
                    className={`input-form ${errores.telefono ? 'input-error' : ''}`} 
                    name="telefono" value={formulario.telefono} onChange={handleChangeFormulario} maxLength="10" 
                  />
                  {errores.telefono && <span className="error-text">{errores.telefono}</span>}
                </div>
              </div>
            </div>

            <div className="modal-footer flex-right">
              <button className="btn-modal btn-modal-gris" onClick={() => setModalEditarAbierto(false)}>Cancelar</button>
              <button className="btn-modal btn-modal-naranja" onClick={handleGuardarEdicion}>
                <i className="fi fi-rr-refresh"></i> Modificar Usuario
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

export default Emp_RecReg_Viewer;