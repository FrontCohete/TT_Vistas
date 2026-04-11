import React from 'react';
import '../assets/css/pre_pages/home_Admin.css';

const AsideAdmin = () => {
  const adminProfile = {
    nombre: "Francisco Serrano",
    rol: "Administrador",
    // Servicio para generación de avatar 
    avatarUrl: "https://ui-avatars.com/api/?name=Francisco+Serrano&background=3B82F6&color=fff&size=150"
  };

  const metricasRapidas = {
    empresasActivas: 145,
    empresasValidar: 12,
    vacantesActivas: 320,
    vacantesValidar: 45,
    estudiantes: 850
  };

  return (
    <div className="admin-sidebar">
      
      {/*PERFIL*/}
      <div className="aside-image">
        <p className="greeting-text">Bienvenido</p>
        <img 
          src={adminProfile.avatarUrl} 
          alt="Avatar del Administrador" 
          className="profile-avatar"
        />
        <h3 className="profile-role">{adminProfile.rol}</h3>
        <p className="profile-name">{adminProfile.nombre}</p>
      </div>

      {/*INFORMACIÓN*/}
      <div className="aside-info">
        <div className="info-card">
          <span className="info-label">Empresas Activas</span>
          <span className="info-value">{metricasRapidas.empresasActivas}</span>
        </div>
        <div className="info-card">
          <span className="info-label">Empresas por Validar</span>
          <span className="info-value">{metricasRapidas.empresasValidar}</span>
        </div>
        <div className="info-card">
          <span className="info-label">Vacantes Activas</span>
          <span className="info-value">{metricasRapidas.vacantesActivas}</span>
        </div>
        <div className="info-card">
          <span className="info-label">Vacantes por Validar</span>
          <span className="info-value">{metricasRapidas.vacantesValidar}</span>
        </div>
        <div className="info-card">
          <span className="info-label">Alumnos Registrados</span>
          <span className="info-value">{metricasRapidas.estudiantes}</span>
        </div>
      </div>

    </div>
  );
};

export default AsideAdmin;