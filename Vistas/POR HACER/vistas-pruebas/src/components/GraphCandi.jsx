import React, { useState } from 'react';
import { GraficoBarras, GraficoPastel } from './FigureGraph';
import '../assets/css/graphs_global.css'; 

const GraphCandi = () => {
  const [filtroEmpresas, setFiltroEmpresas] = useState('6m'); 
  const [filtroVacantes, setFiltroVacantes] = useState('6m');

  //DATOS SIMULADOS
  const datosCompletosEmpresas = [
    { mes: 'Abril', totales: 10, reportadas: 0 }, { mes: 'Mayo', totales: 15, reportadas: 1 },
    { mes: 'Junio', totales: 22, reportadas: 2 }, { mes: 'Julio', totales: 28, reportadas: 1 },
    { mes: 'Agosto', totales: 35, reportadas: 3 }, { mes: 'Septiembre', totales: 42, reportadas: 2 },
    { mes: 'Octubre', totales: 50, reportadas: 4 }, { mes: 'Noviembre', totales: 65, reportadas: 5 },
    { mes: 'Diciembre', totales: 48, reportadas: 2 }, { mes: 'Enero', totales: 75, reportadas: 3 },
    { mes: 'Febrero', totales: 88, reportadas: 6 }, { mes: 'Marzo', totales: 105, reportadas: 8 },
  ];

  let datosFiltradosEmpresas = [];
  if (filtroEmpresas === '3m') datosFiltradosEmpresas = datosCompletosEmpresas.slice(-3);
  else if (filtroEmpresas === '6m') datosFiltradosEmpresas = datosCompletosEmpresas.slice(-6);
  else if (filtroEmpresas === '1y') datosFiltradosEmpresas = datosCompletosEmpresas;

  const datosCompletosVacantes = [
    { mes: 'Abril', totales: 30, conReporte: 2 }, { mes: 'Mayo', totales: 45, conReporte: 5 },
    { mes: 'Junio', totales: 50, conReporte: 3 }, { mes: 'Julio', totales: 60, conReporte: 8 },
    { mes: 'Agosto', totales: 75, conReporte: 4 }, { mes: 'Septiembre', totales: 80, conReporte: 7 },
    { mes: 'Octubre', totales: 45, conReporte: 4 }, { mes: 'Noviembre', totales: 80, conReporte: 12 },
    { mes: 'Diciembre', totales: 65, conReporte: 5 }, { mes: 'Enero', totales: 120, conReporte: 15 },
    { mes: 'Febrero', totales: 150, conReporte: 10 }, { mes: 'Marzo', totales: 210, conReporte: 22 },
  ];

  let datosFiltradosVacantes = [];
  if (filtroVacantes === '3m') datosFiltradosVacantes = datosCompletosVacantes.slice(-3);
  else if (filtroVacantes === '6m') datosFiltradosVacantes = datosCompletosVacantes.slice(-6);
  else if (filtroVacantes === '1y') datosFiltradosVacantes = datosCompletosVacantes;

  const datosAlumnos = [
    { carrera: 'ISC', nombreLargo: 'Ingeniería en Sistemas Computacionales', cantidad: 120 },
    { carrera: 'IIA', nombreLargo: 'Ingeniería en Inteligencia Artificial', cantidad: 85 },
    { carrera: 'LCD', nombreLargo: 'Licenciatura en Ciencia de Datos', cantidad: 45 },
  ];

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-header">
        <h1 className="dashboard-title">Resumen Administrativo</h1>
        <p className="dashboard-subtitle">Monitorea el estado general de Caspita</p>
      </div>
      
      <div className="dashboard-grid">
        
        {/*EMPRESAS*/}
        <div>
          <h2 className="section-title">Empresas Activas</h2>
          <div className="chart-card">
            <div className="segmented-control">
              <button 
                className={`tab-button ${filtroEmpresas === '3m' ? 'active' : ''}`} 
                onClick={() => setFiltroEmpresas('3m')}>3 Meses
              </button>
              <button 
                className={`tab-button ${filtroEmpresas === '6m' ? 'active' : ''}`} 
                onClick={() => setFiltroEmpresas('6m')}>6 Meses
              </button>
              <button 
                className={`tab-button ${filtroEmpresas === '1y' ? 'active' : ''}`} 
                onClick={() => setFiltroEmpresas('1y')}>1 Año
              </button>
            </div>
            <GraficoBarras 
              datos={datosFiltradosEmpresas}
              ejeXClave="mes"
              barras={[
                { clave: 'totales', nombre: 'Empresas Registradas', color: '#122552' },
                { clave: 'reportadas', nombre: 'Empresas con Reportes', color: '#d31131' }
              ]}
            />
          </div>
        </div>

        {/*VACANTES*/}
        <div>
          <h2 className="section-title">Vacantes Publicadas</h2>
          <div className="chart-card">
            <div className="segmented-control">
              <button 
                className={`tab-button ${filtroVacantes === '3m' ? 'active' : ''}`} 
                onClick={() => setFiltroVacantes('3m')}>3 Meses
              </button>
              <button 
                className={`tab-button ${filtroVacantes === '6m' ? 'active' : ''}`} 
                onClick={() => setFiltroVacantes('6m')}>6 Meses
              </button>
              <button 
                className={`tab-button ${filtroVacantes === '1y' ? 'active' : ''}`} 
                onClick={() => setFiltroVacantes('1y')}>1 Año
              </button>
            </div>
            <GraficoBarras 
              datos={datosFiltradosVacantes}
              ejeXClave="mes"
              barras={[
                { clave: 'totales', nombre: 'Vacantes Publicadas', color: '#132f70' },
                { clave: 'conReporte', nombre: 'Vacantes con Reportes', color: '#d31131' }
              ]}
            />
          </div>
        </div>

        {/*ALUMNOS*/}
        <div>
          <h2 className="section-title">Distribución de Perfiles Académicos</h2>
          <div className="chart-card">
            <GraficoPastel datos={datosAlumnos} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default GraphCandi;