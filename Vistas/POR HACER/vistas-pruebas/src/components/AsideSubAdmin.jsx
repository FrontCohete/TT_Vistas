import React from 'react';
import '../assets/css/pre_pages/home_Admin.css';

const AsideSubAdmin = () => {
  const adminProfile = {
    nombre: "Choper",
    rol: "Subadministrador",
    // Servicio para generación de avatar 
    avatarUrl: "https://ui-avatars.com/api/?name=Choper&background=3B82F6&color=fff&size=150"
  };

  const metricasRapidas = {
    empresasActivas: 0,
    empresasValidar: 0,
    vacantesActivas: 0,
    vacantesValidar: 0,
    estudiantes: 0
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

export default AsideSubAdmin;