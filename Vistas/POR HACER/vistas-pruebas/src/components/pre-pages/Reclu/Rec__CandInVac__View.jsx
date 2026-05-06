import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import FigureTable from '../../FigureTable';
import '../../../assets/css/rec_View.css';

const View_Postulantes = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const vacante = location.state?.vacante;

  // Datos dummy
  const [candidatos, setCandidatos] = useState([
    { id: 101, nombre: 'Luis', apellido: 'García', perfil: 'ISC', correo: 'luis.garcia@email.com', telefono: '5512345678', ubicacion: 'Benito Juárez, CDMX', cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', compatibilidad: 85, fechaPostulacion: '16/04/2026', status: 'Por visualizar' },
    { id: 102, nombre: 'Andrea', apellido: 'Martínez', perfil: 'LCD', correo: 'amartinez.dev@email.com', telefono: '5587654321', ubicacion: 'Naucalpan, Edomex', cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', compatibilidad: 92, fechaPostulacion: '17/04/2026', status: 'CV Visto' },
    { id: 103, nombre: 'Jorge', apellido: 'Pérez', perfil: 'ISC', correo: 'jperez@email.com', telefono: '5533221144', ubicacion: 'Cuauhtémoc, CDMX', cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', compatibilidad: 78, fechaPostulacion: '18/04/2026', status: 'Por visualizar' },
    { id: 104, nombre: 'Sofía', apellido: 'López', perfil: 'IIA', correo: 'slopez@email.com', telefono: '5544332211', ubicacion: 'Miguel Hidalgo, CDMX', cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', compatibilidad: 95, fechaPostulacion: '18/04/2026', status: 'CV Visto' },
    { id: 105, nombre: 'Diego', apellido: 'Hernández', perfil: 'ISC', correo: 'dhernandez@email.com', telefono: '5599887766', ubicacion: 'Tlalpan, CDMX', cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', compatibilidad: 60, fechaPostulacion: '19/04/2026', status: 'Por visualizar' },
    { id: 106, nombre: 'Valeria', apellido: 'Gómez', perfil: 'LCD', correo: 'vgomez@email.com', telefono: '5511223344', ubicacion: 'Coyoacán, CDMX', cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', compatibilidad: 88, fechaPostulacion: '19/04/2026', status: 'Preseleccionado' },
    { id: 107, nombre: 'Fernando', apellido: 'Díaz', perfil: 'IIA', correo: 'fdiaz@email.com', telefono: '5566778899', ubicacion: 'Azcapotzalco, CDMX', cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', compatibilidad: 75, fechaPostulacion: '20/04/2026', status: 'Por visualizar' },
    { id: 108, nombre: 'Camila', apellido: 'Ruiz', perfil: 'ISC', correo: 'cruiz@email.com', telefono: '5500112233', ubicacion: 'Ecatepec, Edomex', cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', compatibilidad: 82, fechaPostulacion: '20/04/2026', status: 'Por visualizar' },
    { id: 109, nombre: 'Mateo', apellido: 'Ramírez', perfil: 'LCD', correo: 'mramirez@email.com', telefono: '5577665544', ubicacion: 'Tlalnepantla, Edomex', cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', compatibilidad: 91, fechaPostulacion: '21/04/2026', status: 'CV Visto' },
    { id: 110, nombre: 'Isabella', apellido: 'Torres', perfil: 'IIA', correo: 'itorres@email.com', telefono: '5522334455', ubicacion: 'Álvaro Obregón, CDMX', cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', compatibilidad: 96, fechaPostulacion: '21/04/2026', status: 'Contactado' },
    { id: 111, nombre: 'Sebastián', apellido: 'Flores', perfil: 'ISC', correo: 'sflores@email.com', telefono: '5588990011', ubicacion: 'Atizapán, Edomex', cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', compatibilidad: 65, fechaPostulacion: '22/04/2026', status: 'Preseleccionado' }
  ]);
  const [busqueda, setBusqueda] = useState('');
  const [sortConfig, setSortConfig] = useState({ clave: null, direccion: 'asc' });
  const [seccionActiva, setSeccionActiva] = useState('Bandeja'); // 'Bandeja' | 'Preseleccionados'
  const [seleccionados, setSeleccionados] = useState([]);
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '', tipo: '', saliendo: false });

  const [paginaActual, setPaginaActual] = useState(1);
  const [itemsPorPagina, setItemsPorPagina] = useState(window.innerWidth <= 768 ? 5 : 10);

  useEffect(() => {
    const handleResize = () => {
      setItemsPorPagina(window.innerWidth <= 768 ? 5 : 10);
      setPaginaActual(1); 
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [modalPerfilAbierto, setModalPerfilAbierto] = useState(false);
  const [modalPruebaAbierto, setModalPruebaAbierto] = useState(false);
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState(null);

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ visible: true, mensaje, tipo, saliendo: false });
    setTimeout(() => setNotificacion(prev => ({ ...prev, saliendo: true })), 3500);
    setTimeout(() => setNotificacion({ visible: false, mensaje: '', tipo: '', saliendo: false }), 4000);
  };

  const handleSort = (clave) => {
    let direccion = 'asc';
    if (sortConfig.clave === clave && sortConfig.direccion === 'asc') direccion = 'desc';
    setSortConfig({ clave, direccion });
  };

  const datosFiltrados = useMemo(() => {
    const filtradosPorSeccion = candidatos.filter(cand => {
      if (seccionActiva === 'Bandeja') {
        return cand.status === 'Por visualizar' || cand.status === 'CV Visto';
      } else {
        return cand.status === 'Preseleccionado' || cand.status === 'Contactado';
      }
    });
    
    if (!busqueda) return filtradosPorSeccion;
    const busquedaLower = busqueda.toLowerCase();
    
    return filtradosPorSeccion.filter(cand => 
      `${cand.nombre} ${cand.apellido}`.toLowerCase().includes(busquedaLower) ||
      cand.correo.toLowerCase().includes(busquedaLower) ||
      cand.perfil.toLowerCase().includes(busquedaLower)
    );
  }, [candidatos, busqueda, seccionActiva]);

  const datosOrdenados = useMemo(() => {
    let datosOrdenables = [...datosFiltrados];
    if (sortConfig.clave) {
      datosOrdenables.sort((a, b) => {
        let valA = a[sortConfig.clave];
        let valB = b[sortConfig.clave];
        
        if (sortConfig.clave === 'fechaPostulacion') {
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

  const indexUltimoItem = paginaActual * itemsPorPagina;
  const indexPrimerItem = indexUltimoItem - itemsPorPagina;
  const datosPaginados = datosOrdenados.slice(indexPrimerItem, indexUltimoItem);
  const totalPaginas = Math.ceil(datosOrdenados.length / itemsPorPagina);
  const handleVerCV = (id) => {
    setCandidatos(prev => prev.map(cand => 
      (cand.id === id && cand.status === 'Por visualizar') ? { ...cand, status: 'CV Visto' } : cand
    ));
    
    if (candidatoSeleccionado && candidatoSeleccionado.id === id && candidatoSeleccionado.status === 'Por visualizar') {
      setCandidatoSeleccionado(prev => ({ ...prev, status: 'CV Visto' }));
    }
  };

  const handleSelect = (id) => {
    setSeleccionados(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSeleccionados(datosPaginados.map(cand => cand.id));
    else setSeleccionados([]);
  };

  const ejecutarAccionMasiva = () => {
    const nuevoStatus = seccionActiva === 'Bandeja' ? 'Preseleccionado' : 'Contactado';
    setCandidatos(prev => prev.map(cand => 
      seleccionados.includes(cand.id) ? { ...cand, status: nuevoStatus } : cand
    ));
    setSeleccionados([]);
    mostrarNotificacion(`${seleccionados.length} candidato(s) actualizados a ${nuevoStatus}.`, 'exito');
  };

  const abrirModalPerfil = (candidato) => {
    setCandidatoSeleccionado(candidato);
    setModalPerfilAbierto(true);
  };

  const handleDescartar = () => {
    alert("Proceso de descarte pendiente.");
  };

  const cambiarEstatusIndividual = (nuevoStatus) => {
    setCandidatos(prev => prev.map(cand => 
      cand.id === candidatoSeleccionado.id ? { ...cand, status: nuevoStatus } : cand
    ));
    setModalPerfilAbierto(false);
    mostrarNotificacion(`Candidato actualizado a ${nuevoStatus}.`, 'exito');
  };

  const columnas = [
    { 
      clave: 'seleccion', 
      encabezado: 'Seleccionar',
      width: '5%',
      sortable: false,
      render: (fila) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input 
            type="checkbox" 
            className="custom-checkbox"
            onChange={handleSelectAll} 
            checked={seleccionados.length === datosPaginados.length && datosPaginados.length > 0} 
          />
        </div>
      ), 
      width: '5%',
      sortable: false,
      render: (fila) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input 
            type="checkbox" 
            className="custom-checkbox"
            checked={seleccionados.includes(fila.id)} 
            onChange={() => handleSelect(fila.id)} 
          />
        </div>
      )
    },
    { 
      clave: 'nombre', 
      encabezado: 'Candidato', 
      width: '20%',
      render: (fila) => <span style={{ fontWeight: '600', color: '#1e293b' }}>{fila.nombre} {fila.apellido}</span>
    },
    { 
      clave: 'compatibilidad', 
      encabezado: 'Compatibilidad', 
      width: '15%',
      render: (fila) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span className={`ux-metric-value ${fila.compatibilidad >= 90 ? 'val-green' : 'val-blue'}`}>
            {fila.compatibilidad}%
          </span>
        </div>
      )
    },
    { clave: 'fechaPostulacion', encabezado: 'Postulación', width: '15%' },
    { 
      clave: 'cvUrl', 
      encabezado: 'Currículum', 
      width: '15%',
      sortable: false,
      render: (fila) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a 
            href={fila.cvUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="badge-cv"
            onClick={() => handleVerCV(fila.id)}
          >
            <i className="fi fi-rr-document"></i> Ver CV
          </a>
        </div>
      )
    },
    { 
      clave: 'status', 
      encabezado: 'Status', 
      width: '15%',
      render: (fila) => {
        let claseBadge = '';
        switch (fila.status) {
          case 'Por visualizar': claseBadge = 'badge-por-visualizar'; break;
          case 'CV Visto': claseBadge = 'badge-cv-visto'; break;
          case 'Preseleccionado': claseBadge = 'badge-preseleccionado'; break;
          case 'Contactado': claseBadge = 'badge-contactado'; break;
          default: claseBadge = 'badge-gray';
        }
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
      encabezado: 'Acciones', 
      sortable: false, 
      width: '15%', 
      render: (fila) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button className="btn-accion btn-blue-outline" title="Ver Perfil" onClick={() => abrirModalPerfil(fila)}>
            <i className="fi fi-rr-user"></i> Perfil
          </button>
        </div>
      )
    }
  ];
// Si la vacante no se encuentra, mostramos un mensaje de carga o error
  if (!vacante) {
    return (
      <div className="contenedor-rec">
        <div className="jumbotron-box" style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Cargando información de la vacante...</h2>
          <button className="btn-accion btn-blue-outline" onClick={() => navigate('/vacantes')} style={{ marginTop: '16px' }}>
            <i className="fi fi-rr-arrow-left"></i> Regresar a mis vacantes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contenedor-rec">
      
      {/* VAcInfo */}
      <div className="jumbotron-box">
        <div className="jumbo-header">
          <div className="jumbo-title-wrapper">
            <button className="btn-icon-volver" onClick={() => navigate(-1)} title="Regresar">
              <i className="fi fi-rr-arrow-left"></i>
            </button>
            <div className="jumbo-title-content">
              <h1 className="jumbo-title">{vacante.nombreVacante}</h1>
              <span className="jumbo-empresa"><i className="fi fi-rr-building"></i> {vacante.empresa}</span>
            </div>
          </div>
        </div>
        <div className="jumbo-body">
          <div className="jumbo-grid">
            <div className="jumbo-data">
              <span className="jumbo-label"><i className="fi fi-rr-marker"></i> Ubicación</span>
              <span className="jumbo-value">{vacante.ubicacion}</span>
            </div>
            <div className="jumbo-data">
              <span className="jumbo-label"><i className="fi fi-rr-briefcase"></i> Modalidad</span>
              <span className="jumbo-value">{vacante.modalidad}</span>
            </div>
            <div className="jumbo-data">
              <span className="jumbo-label"><i className="fi fi-rr-money"></i> Salario</span>
              <span className="jumbo-value">{vacante.salario}</span>
            </div>
            <div className="jumbo-data">
              <span className="jumbo-label"><i className="fi fi-rr-calendar-clock"></i> Contratación</span>
              <span className="jumbo-value">{vacante.contratacion}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab postulante */}
      
      <div className="tabs-container">
        <button 
          className={`tab-btn ${seccionActiva === 'Bandeja' ? 'active' : ''}`}
          onClick={() => { setSeccionActiva('Bandeja'); setSeleccionados([]); setPaginaActual(1); }}
        >
          Nuevos Postulantes 
          <span className="tab-badge">{candidatos.filter(c => c.status === 'Por visualizar' || c.status === 'CV Visto').length}</span>
        </button>
        <button 
          className={`tab-btn ${seccionActiva === 'Preseleccionados' ? 'active' : ''}`}
          onClick={() => { setSeccionActiva('Preseleccionados'); setSeleccionados([]); setPaginaActual(1); }}
        >
          Preseleccionados
          <span className="tab-badge-green">{candidatos.filter(c => c.status === 'Preseleccionado' || c.status === 'Contactado').length}</span>
        </button>
      </div>

      <div className="acciones-top-container" style={{ marginTop: '16px' }}>
        <h2 className="titulo-rec" style={{ margin: 0 }}>
          {seccionActiva === 'Bandeja' ? 'Bandeja de Entrada' : 'Candidatos en Proceso'}
        </h2>
        
        <div className="barra-busqueda-container" style={{ maxWidth: '400px' }}>
          <i className="fi fi-rr-search"></i>
          <input 
            type="text" 
            className="input-busqueda" 
            placeholder="Buscar por nombre, correo o perfil..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* Badge para candidatos seleccionados */}
      {seleccionados.length > 0 && (
        <div className="floating-action-bar">
          <span>{seleccionados.length} candidato(s) seleccionado(s)</span>
          <button className="btn-empresa btn-empresa-verde" onClick={ejecutarAccionMasiva}>
            <i className={seccionActiva === 'Bandeja' ? "fi fi-rr-star" : "fi fi-rr-phone-call"}></i> 
            {seccionActiva === 'Bandeja' ? 'Mover a Preseleccionados' : 'Marcar como Contactados'}
          </button>
        </div>
      )}

      <FigureTable 
        columnas={columnas} 
        datos={datosPaginados} 
        onSort={handleSort} 
        sortConfig={sortConfig}
        mensajeVacio={busqueda ? "No se encontraron candidatos." : `No hay candidatos en esta sección.`}
      />

      {/* Controles de Paginación */}
      {datosOrdenados.length > 0 && (
        <div className="pagination-container">
          <span className="pagination-info">
            Mostrando {indexPrimerItem + 1} a {Math.min(indexUltimoItem, datosOrdenados.length)} de {datosOrdenados.length}
          </span>
          <div className="pagination-controls">
            <button 
              className="btn-page" 
              disabled={paginaActual === 1} 
              onClick={() => setPaginaActual(prev => prev - 1)}
            >
              <i className="fi fi-rr-angle-left"></i> Anterior
            </button>
            <span className="page-number">Página {paginaActual} de {totalPaginas}</span>
            <button 
              className="btn-page" 
              disabled={paginaActual === totalPaginas} 
              onClick={() => setPaginaActual(prev => prev + 1)}
            >
              Siguiente <i className="fi fi-rr-angle-right"></i>
            </button>
          </div>
        </div>
      )}

      {/* MODAL ver candidato*/}
      {modalPerfilAbierto && candidatoSeleccionado && (
        <div className="modal-overlay" onClick={() => setModalPerfilAbierto(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fi fi-rr-user"></i> {candidatoSeleccionado.nombre} {candidatoSeleccionado.apellido}
                </h3>
                <p className="modal-subtitle" style={{ margin: '6px 0 0 0', fontWeight: '500' }}>
                  Perfil: {candidatoSeleccionado.perfil}
                </p>
              </div>
              <button onClick={() => setModalPerfilAbierto(false)} className="close-btn">&times;</button>
            </div>

            <div className="modal-body">
              <div className="resume-box" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="data-label">Porcentaje de Afinidad con la Vacante:</span>
                <span 
                  className={`ux-metric-value ${candidatoSeleccionado.compatibilidad >= 90 ? 'val-green' : 'val-blue'}`} 
                  style={{ fontSize: '1.2rem', padding: '6px 12px' }}
                >
                  {candidatoSeleccionado.compatibilidad}%
                </span>
              </div>

              <h4 className="section-title"><i className="fi fi-rr-address-book"></i> Datos de Contacto y Ubicación</h4>
              <div className="grid-2-col" style={{ marginBottom: '24px', marginTop: '16px' }}>
                <div className="data-group">
                  <span className="data-label">Correo Electrónico</span>
                  <span className="data-value">{candidatoSeleccionado.correo}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Número Celular</span>
                  <span className="data-value">{candidatoSeleccionado.telefono}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Ubicación</span>
                  <span className="data-value">{candidatoSeleccionado.ubicacion}</span>
                </div>
                <div className="data-group">
                  <span className="data-label">Curriculum Vitae</span>
                  <a 
                    href={candidatoSeleccionado.cvUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-accion btn-blue-outline"
                    style={{ width: 'fit-content', marginTop: '4px' }}
                    onClick={() => handleVerCV(candidatoSeleccionado.id)}
                  >
                    <i className="fi fi-rr-document"></i> Ver PDF
                  </a>
                </div>
              </div>
            </div>

            <div className="modal-footer flex-right">
              <button 
                className="btn-modal btn-modal-rojo" 
                style={{ marginRight: 'auto' }} 
                onClick={handleDescartar}
              >
                <i className="fi fi-rr-ban"></i> Descartar
              </button>

              <button className="btn-modal btn-modal-naranja" onClick={() => setModalPruebaAbierto(true)}>
                <i className="fi fi-rr-clipboard-list-check"></i> Asignar Prueba
              </button>

              {/* Botón dinámico según el estatus */}
              {(candidatoSeleccionado.status === 'Por visualizar' || candidatoSeleccionado.status === 'CV Visto') && (
                <button className="btn-modal btn-modal-verde" onClick={() => cambiarEstatusIndividual('Preseleccionado')}>
                  <i className="fi fi-rr-star"></i> Preseleccionar
                </button>
              )}

              {candidatoSeleccionado.status === 'Preseleccionado' && (
                <button className="btn-modal btn-modal-verde" onClick={() => cambiarEstatusIndividual('Contactado')}>
                  <i className="fi fi-rr-phone-call"></i> Marcar como Contactado
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL para las pruebas*/}
      {modalPruebaAbierto && (
        <div className="modal-overlay" style={{ zIndex: 1100 }} onClick={() => setModalPruebaAbierto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ color: '#ea580c' }}><i className="fi fi-rr-clipboard-list-check"></i> Asignar Prueba</h2>
              <button onClick={() => setModalPruebaAbierto(false)} className="close-btn">&times;</button>
            </div>
            <div className="modal-body">
              <p>Aquí irá el formulario para seleccionar y enviar una prueba técnica o psicométrica al candidato <strong>{candidatoSeleccionado?.nombre}</strong>.</p>
            </div>
            <div className="modal-footer flex-right">
              <button className="btn-modal btn-modal-gris" onClick={() => setModalPruebaAbierto(false)}>Cancelar</button>
              <button className="btn-modal btn-modal-naranja" onClick={() => {
                alert("Prueba asignada (Pendiente)");
                setModalPruebaAbierto(false);
              }}>
                Enviar Prueba
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

export default View_Postulantes;