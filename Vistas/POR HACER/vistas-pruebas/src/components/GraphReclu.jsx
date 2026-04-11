import React, { useState, useMemo } from 'react';
import FigureTable from './FigureTable';
import { GraficoBarras } from './FigureGraph'; 
import '../assets/css/graphs_global.css'; 
import '../assets/css/table_global.css'; 

const GraphReclu = () => {
  
  // Datos y estados para el gráfico
  const [filtroVacantesChart, setFiltroVacantesChart] = useState('6m');

  const datosCompletosVacantesReclu = useMemo(() => [
    { mes: 'Abril', activas: 20, reportadas: 1 }, { mes: 'Mayo', activas: 25, reportadas: 2 },
    { mes: 'Junio', activas: 30, reportadas: 3 }, { mes: 'Julio', activas: 35, reportadas: 2 },
    { mes: 'Agosto', activas: 40, reportadas: 4 }, { mes: 'Septiembre', activas: 48, reportadas: 3 },
    { mes: 'Octubre', activas: 55, reportadas: 5 }, { mes: 'Noviembre', activas: 70, reportadas: 6 },
    { mes: 'Diciembre', activas: 60, reportadas: 4 }, { mes: 'Enero', activas: 80, reportadas: 5 },
    { mes: 'Febrero', activas: 95, reportadas: 7 }, { mes: 'Marzo', activas: 110, reportadas: 9 },
  ], []);

  // Filtro del gráfico
  const datosFiltradosChart = useMemo(() => {
    if (filtroVacantesChart === '3m') return datosCompletosVacantesReclu.slice(-3);
    if (filtroVacantesChart === '6m') return datosCompletosVacantesReclu.slice(-6);
    if (filtroVacantesChart === '1y') return datosCompletosVacantesReclu;
    return datosCompletosVacantesReclu;
  }, [filtroVacantesChart, datosCompletosVacantesReclu]);

  // Datos y estados para la tabla
  const [busqueda, setBusqueda] = useState('');
  const [columnaBusqueda, setColumnaBusqueda] = useState('todas');
  const [sortConfig, setSortConfig] = useState({ clave: 'nombre', direccion: 'asc' });
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const datosCandidatosTable = useMemo(() => [
    { id: 1, nombre: 'Laura Mendoza', vacante: 'Desarrollador Frontend', estado: 'Entrevista', afinidad: 85 },
    { id: 2, nombre: 'Carlos Rivera', vacante: 'Científico de Datos', estado: 'Evaluación', afinidad: 92 },
    { id: 3, nombre: 'Sofía Castro', vacante: 'Desarrollador Backend', estado: 'Rechazado', afinidad: 45 },
    { id: 4, nombre: 'Javier Luna', vacante: 'Diseñador UX/UI', estado: 'Contratado', afinidad: 98 },
    { id: 5, nombre: 'Elena Gómez', vacante: 'Desarrollador Frontend', estado: 'Aplicó', afinidad: 60 },
    { id: 6, nombre: 'Miguel Soler', vacante: 'Backend Python', estado: 'Entrevista', afinidad: 75 },
    { id: 7, nombre: 'Ana Belén', vacante: 'Product Manager', estado: 'Contratado', afinidad: 88 },
    { id: 8, nombre: 'Roberto Sanz', vacante: 'QA Tester', estado: 'Evaluación', afinidad: 55 },
    { id: 9, nombre: 'Diana Ruiz', vacante: 'Desarrollador Frontend', estado: 'Aplicó', afinidad: 70 },
    { id: 10, nombre: 'Fernando Ortiz', vacante: 'Diseñador UX/UI', estado: 'Entrevista', afinidad: 82 },
  ], []);

  const columnasTable = useMemo(() => [
    { clave: 'nombre', encabezado: 'Candidato', width: '25%' },
    { clave: 'vacante', encabezado: 'Vacante Aplicada', width: '25%' },
    { 
      clave: 'afinidad', 
      encabezado: 'Afinidad', 
      width: '20%',
      render: (fila) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontWeight: '600', fontSize: '13px', width: '35px' }}>{fila.afinidad}%</span>
          <div style={{ flex: 1, backgroundColor: '#E5E7EB', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${fila.afinidad}%`, 
              backgroundColor: fila.afinidad >= 80 ? '#03543F' : fila.afinidad >= 60 ? '#92400E' : '#9B1C1C',
              height: '100%', borderRadius: '999px'
            }}></div>
          </div>
        </div>
      )
    },
    { 
      clave: 'estado', 
      encabezado: 'Estado', 
      width: '15%',
      render: (fila) => {
        let claseBadge = 'badge-default';
        if (fila.estado === 'Contratado') claseBadge = 'badge-success';
        if (fila.estado === 'Entrevista' || fila.estado === 'Evaluación') claseBadge = 'badge-warning';
        if (fila.estado === 'Rechazado') claseBadge = 'badge-danger';
        return <span className={`badge ${claseBadge}`}>{fila.estado}</span>;
      }
    },
    {
      clave: 'acciones',
      encabezado: 'Acciones',
      width: '15%',
      sortable: false,
      render: (fila) => (
        <div className="table-actions">
          <button className="btn-action btn-view" onClick={() => alert(`Gestionando a ${fila.nombre}`)}>Gestionar</button>
        </div>
      )
    }
  ], []);

  const opcionesDeFiltroTable = useMemo(() => columnasTable.filter(col => col.clave !== 'acciones'), [columnasTable]);
  const { datosPaginados, totalPaginas, totalRegistros } = useMemo(() => {
    let datosProcesados = [...datosCandidatosTable];
    
    // Filtro
    if (busqueda) {
      const textoBuscado = busqueda.toLowerCase();
      datosProcesados = datosProcesados.filter((candidato) => {
        if (columnaBusqueda === 'todas') {
          return opcionesDeFiltroTable.some(col => String(candidato[col.clave] || '').toLowerCase().includes(textoBuscado));
        } else {
          return String(candidato[columnaBusqueda] || '').toLowerCase().includes(textoBuscado);
        }
      });
    }

    // Ordenamiento
    if (sortConfig !== null) {
      datosProcesados.sort((a, b) => {
        let valorA = a[sortConfig.clave];
        let valorB = b[sortConfig.clave];
        if (typeof valorA === 'string') valorA = valorA.toLowerCase();
        if (typeof valorB === 'string') valorB = valorB.toLowerCase();
        if (valorA < valorB) return sortConfig.direccion === 'asc' ? -1 : 1;
        if (valorA > valorB) return sortConfig.direccion === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Paginación
    const total = datosProcesados.length;
    const paginas = Math.ceil(total / registrosPorPagina);
    const indiceInicio = (paginaActual - 1) * registrosPorPagina;
    const paginados = datosProcesados.slice(indiceInicio, indiceInicio + registrosPorPagina);

    return { datosPaginados: paginados, totalPaginas: paginas, totalRegistros: total };
  }, [busqueda, columnaBusqueda, sortConfig, paginaActual, datosCandidatosTable, opcionesDeFiltroTable]);

  const manejarOrden = (clave) => {
    let direccion = 'asc';
    if (sortConfig && sortConfig.clave === clave && sortConfig.direccion === 'asc') direccion = 'desc';
    setSortConfig({ clave, direccion });
    setPaginaActual(1);
  };

  const manejarCambioColumnaTable = (e) => {
    setColumnaBusqueda(e.target.value);
    setBusqueda('');
    setPaginaActual(1);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Resumen de Reclutamiento</h1>
        <p className="dashboard-subtitle">Monitorea vacantes y candidatos con Caspita</p>
      </div>
      <div className="dashboard-grid">
        
        {/* GRÁFICO */}
        <div style={{ gridColumn: '1 / -1' }}>
          <h2 className="section-title">Historial de Vacantes</h2>
          <div className="chart-card">
            <div className="segmented-control">
              <button 
                className={`tab-button ${filtroVacantesChart === '3m' ? 'active' : ''}`} 
                onClick={() => setFiltroVacantesChart('3m')}>3 Meses
              </button>
              <button 
                className={`tab-button ${filtroVacantesChart === '6m' ? 'active' : ''}`} 
                onClick={() => setFiltroVacantesChart('6m')}>6 Meses
              </button>
              <button 
                className={`tab-button ${filtroVacantesChart === '1y' ? 'active' : ''}`} 
                onClick={() => setFiltroVacantesChart('1y')}>1 Año
              </button>
            </div>
            
            <GraficoBarras 
              datos={datosFiltradosChart}
              ejeXClave="mes"
              barras={[
                { clave: 'activas', nombre: 'Vacantes Activas', color: '#132f70' },
                { clave: 'reportadas', nombre: 'Vacantes con Reportes', color: '#d83147' }
              ]}
            />
          </div>
        </div>

        {/* TABLA */}
        <div style={{ gridColumn: '1 / -1' }}>
          <h2 className="section-title">Vista Previa de Candidatos</h2>
          <div className="chart-card"> 
            
            <div className="table-toolbar" style={{ padding: '20px 20px 0 20px' }}>
              <select className="filter-select" value={columnaBusqueda} onChange={manejarCambioColumnaTable}>
                <option value="todas">Cualquier columna</option>
                {opcionesDeFiltroTable.map(col => (
                  <option key={`opt-${col.clave}`} value={col.clave}>{col.encabezado}</option>
                ))}
              </select>

              <input 
                type="text" 
                placeholder={columnaBusqueda === 'todas' ? 'Buscar...' : `Buscar por ${opcionesDeFiltroTable.find(c => c.clave === columnaBusqueda)?.encabezado.toLowerCase()}...`} 
                className="filter-input"
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setPaginaActual(1);
                }}
              />
            </div>

            <FigureTable 
              columnas={columnasTable} 
              datos={datosPaginados} 
              onSort={manejarOrden}
              sortConfig={sortConfig}
              mensajeVacio={busqueda !== '' ? `No hay resultados para "${busqueda}"` : "No hay candidatos disponibles"}
            />

            {totalRegistros > 0 && (
              <div className="pagination-controls">
                <span style={{ fontWeight: '500' }}>
                  Mostrando {datosPaginados.length} de {totalRegistros} registros
                </span>
                <div className="pagination-btn-group">
                  <button className="btn-paginate" disabled={paginaActual === 1} onClick={() => setPaginaActual(p => p - 1)}>Anterior</button>
                  <span style={{ padding: '0 8px', fontWeight: '500' }}>Página {paginaActual} de {totalPaginas}</span>
                  <button className="btn-paginate" disabled={paginaActual === totalPaginas || totalPaginas === 0} onClick={() => setPaginaActual(p => p + 1)}>Siguiente</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphReclu;