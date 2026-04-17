import React, { useState, useRef } from 'react';
import FigureTable from './FigureTable';
import '../assets/css/graphs_global.css'; 

const GraphCandi = () => {
  // BÚSQUEDAS RECIENTES
  const [busquedasRecientes, setBusquedasRecientes] = useState([
    { id: 1, vacante: "Desarrollador Frontend React", ubicacion: "Ciudad de México, CDMX" },
    { id: 2, vacante: "UI/UX Designer", ubicacion: "Estado de México, Méx." },
    { id: 3, vacante: "Desarrollador Frontend React", ubicacion: "Ciudad de México, CDMX" },
    { id: 4, vacante: "UI/UX Designer", ubicacion: "Estado de México, Méx." },
    { id: 5, vacante: "Web Developer Trainee", ubicacion: "Remoto" }
  ]);

  const eliminarBusqueda = (id, e) => {
    e.stopPropagation(); 
    const nuevasBusquedas = busquedasRecientes.filter(item => item.id !== id);
    setBusquedasRecientes(nuevasBusquedas);
  };

  const handleReBuscar = (vacante) => {
    console.log(`Buscando de nuevo: ${vacante}`);
  };
  // SUGERENCIAS (Mantenemos el estado por si lo necesitas luego)
  const [sugerencias] = useState([
    { id: 1, vacante: "Senior Frontend Engineer", ubicacion: "CDMX", sueldo: "$35,000 - $45,000", empresa: "Tech Solutions", fecha: "Hace 2 días" },
    { id: 2, vacante: "Desarrollador Web Jr.", ubicacion: "Naucalpan", sueldo: "$15,000 - $20,000", empresa: "Innovación", fecha: "Hace 5 horas" },
    { id: 3, vacante: "React Native Developer", ubicacion: "Híbrido", sueldo: "$28,000 - $35,000", empresa: "AppMakers", fecha: "Hoy" },
    { id: 4, vacante: "Fullstack Developer", ubicacion: "Remoto", sueldo: "$40,000", empresa: "DevCorp", fecha: "Hace 1 día" },
    { id: 5, vacante: "Backend Node.js", ubicacion: "Guadalajara", sueldo: "$30,000", empresa: "Jalisco IT", fecha: "Hace 3 días" },
    { id: 6, vacante: "Diseñador UI", ubicacion: "Monterrey", sueldo: "$20,000", empresa: "Norte Creative", fecha: "Hace 4 horas" },
    { id: 7, vacante: "QA Engineer Automator", ubicacion: "CDMX", sueldo: "$25,000", empresa: "Testing Hub", fecha: "Ayer" }
  ]);

  // TABLA DE POSTULACIONES
  const [datosPostulaciones, setDatosPostulaciones] = useState([
    { 
      id: 1, 
      vacante: "Frontend Developer (React)", 
      ubicacion: "Ciudad de México, CDMX", 
      sueldo: "$25,000 MXN", 
      estado: "En Revisión", 
      claseEstado: "revision",
      fechaPostulacion: "Hace 2 días" 
    },
    { 
      id: 2, 
      vacante: "Desarrollador Fullstack", 
      ubicacion: "Toluca, Estado de México", 
      sueldo: "$30,000 MXN", 
      estado: "Rechazado", 
      claseEstado: "suspendida",
      fechaPostulacion: "Hace 1 semana" 
    }
  ]);

  const [sortConfig, setSortConfig] = useState({ clave: null, direccion: 'asc' });
  
  const handleSort = (clave) => {
    let direccion = 'asc';
    if (sortConfig.clave === clave && sortConfig.direccion === 'asc') direccion = 'desc';
    const datosOrdenados = [...datosPostulaciones].sort((a, b) => {
      if (a[clave] < b[clave]) return direccion === 'asc' ? -1 : 1;
      if (a[clave] > b[clave]) return direccion === 'asc' ? 1 : -1;
      return 0;
    });
    setDatosPostulaciones(datosOrdenados);
    setSortConfig({ clave, direccion });
  };

  // ==========================================
  // LÓGICA DE CARRUSELES
  // ==========================================
  const carruselRef = useRef(null);
  const scrollCarrusel = (direccion) => {
    if (carruselRef.current) {
      const scrollAmount = direccion === 'izq' ? -320 : 320;
      carruselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const isCarouselActive = sugerencias.length > 6;

  const columnasPostulaciones = [
    { clave: 'vacante', encabezado: 'Vacante', width: '25%' },
    { clave: 'ubicacion', encabezado: 'Ubicación', width: '20%' },
    { clave: 'sueldo', encabezado: 'Sueldo', width: '15%' },
    { 
      clave: 'fechaPostulacion', 
      encabezado: 'Postulado hace', 
      width: '20%',
      render: (fila) => (
        <span style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <i className="fi fi-rr-calendar-clock"></i>
          {fila.fechaPostulacion}
        </span>
      )
    },
    { 
      clave: 'estado', 
      encabezado: 'Estado', 
      width: '20%',
      render: (fila) => (
        <span className={`status-badge ${fila.claseEstado}`}>
          {fila.estado}
        </span>
      ) 
    }
  ];

  return (
    <div className="dashboard-container">
      
      {/* BÚSQUEDAS RECIENTES */}
      <div className="candi-section">
        <div className="section-header-flex">
          <h2 className="section-title">Búsquedas Recientes</h2>
          {busquedasRecientes.length > 0 && (
            <button className="clear-all-btn" onClick={() => setBusquedasRecientes([])}>
              Limpiar historial
            </button>
          )}
        </div>

        {busquedasRecientes.length > 0 ? (
          <div className="cards-row-container">
            {busquedasRecientes.map((item) => (
              <div key={item.id} className="search-card" onClick={() => handleReBuscar(item.vacante)}>
                <div className="card-icon"><i className="fi fi-rr-time-past"></i></div>
                <div className="card-content">
                  <h4>{item.vacante}</h4>
                  <p><i className="fi fi-rr-marker"></i> {item.ubicacion}</p>
                </div>
                <button className="delete-search-btn" onClick={(e) => eliminarBusqueda(item.id, e)}>
                  <i className="fi fi-rr-cross-small"></i>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state-text">No tienes búsquedas recientes.</p>
        )}
      </div>

      {/* SUGERENCIAS (quité el botón para eliminar y me dió flojera buscar sus referencias en la hoja de estilos xd) */}
      <div className="candi-section">
        <div className="carousel-header">
          <h2 className="section-title">Sugerencias para ti</h2>
          {isCarouselActive && (
            <div className="carousel-controls">
              <button className="carousel-btn" onClick={() => scrollCarrusel('izq')}><i className="fi fi-rr-angle-left"></i></button>
              <button className="carousel-btn" onClick={() => scrollCarrusel('der')}><i className="fi fi-rr-angle-right"></i></button>
            </div>
          )}
        </div>
        
        {sugerencias.length > 0 ? (
          <div 
            className={isCarouselActive ? "suggestions-carousel-container" : "suggestions-grid-container"} 
            ref={isCarouselActive ? carruselRef : null}
          >
            {sugerencias.map((item) => (
              <div key={item.id} className="suggestion-card">
                <div className="suggestion-header">
                  <h4 style={{ paddingRight: '0' }}>{item.vacante}</h4>
                  <span className="suggestion-date">{item.fecha}</span>
                </div>
                <p className="suggestion-company"><i className="fi fi-rr-building"></i> {item.empresa}</p>
                <div className="suggestion-details">
                  <span><i className="fi fi-rr-marker"></i> {item.ubicacion}</span>
                  <span className="suggestion-salary"><i className="fi fi-rr-money-bill-wave"></i> {item.sueldo}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state-text">No hay sugerencias disponibles.</p>
        )}
      </div>

      {/* HISTORIAL DE POSTULACIONES */}
      <div className="candi-section">
        <div className="section-header-flex">
          <h2 className="section-title">Historial de Postulaciones</h2>
        </div>
        
        <FigureTable 
          columnas={columnasPostulaciones}
          datos={datosPostulaciones}
          onSort={handleSort}
          sortConfig={sortConfig}
          mensajeVacio="Aún no te has postulado a ninguna vacante."
        />
      </div>
    </div>
  );
};

export default GraphCandi;