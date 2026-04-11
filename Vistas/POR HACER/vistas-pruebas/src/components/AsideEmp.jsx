import React from 'react';
import '../assets/css/pre_pages/home_Admin.css';

const AsideEmp = () => {
  const empProfile = {
    nombre: "Mercedes Benz",
    rol: "Empresa",
    estado: "Verificada", /*Opciones: "Verificada", "En Revisión", "Suspendida"*/
    // Servicio para generación de avatar 
    avatarUrl: "https://ui-avatars.com/api/?name=Mercedes+Benz&background=3B82F6&color=fff&size=150"
  };

  const metricasRapidas = {
    reclutadoresActivos: 20,
    reclutadoresReportados: 2,
    vacantesAprobadas: 3,
    vacantesReportadas: 1
  };

  const obtenerClaseEstado = (estado) => {
    switch (estado) {
      case 'Verificada':
        return 'estado-verificada';
      case 'En Revisión':
        return 'estado-revision';
      case 'Suspendida':
        return 'estado-suspendida';
      default:
        return '';
    }
  };

  return (
    <div className="admin-sidebar">
      
      {/*PERFIL*/}
      <div className="aside-image">
        <p className="greeting-text">Bienvenido</p>
        <img 
          src={empProfile.avatarUrl} 
          alt="Avatar del Administrador" 
          className="profile-avatar"
        />
        <h3 className="profile-role">{empProfile.rol}</h3>
        <p className="profile-name">{empProfile.nombre}</p>
      </div>

      {/*INFORMACIÓN*/}
      <div className="aside-info">
        <div className="info-card">
          <span className="info-label">Reclutadores Activos</span>
          <span className="info-value">{metricasRapidas.reclutadoresActivos}</span>
        </div>
        <div className="info-card">
          <span className="info-label">Reclutadores Reportados</span>
          <span className="info-value">{metricasRapidas.reclutadoresReportados}</span>
        </div>
        <div className="info-card">
          <span className="info-label">Vacantes Aprobadas</span>
          <span className="info-value">{metricasRapidas.vacantesAprobadas}</span>
        </div>
        <div className="info-card">
          <span className="info-label">Vacantes Reportadas</span>
          <span className="info-value">{metricasRapidas.vacantesReportadas}</span>
        </div>
        
        <div className="info-card">
          <span className="info-label">Estado</span>
          <span className={`info-value ${obtenerClaseEstado(empProfile.estado)}`}>
            {empProfile.estado}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AsideEmp;