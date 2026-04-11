import React from 'react';
import '../assets/css/pre_pages/home_Admin.css';

const AsideReclu = () => {
  const recluProfile = {
    nombre: "Magaly Chavez",
    rol: "Reclutador",
    estado: "Verificada", /*Opciones: "Verificada", "Suspendida"*/
    origen: "Mercedes Benz", 
    // Servicio para generación de avatar 
    avatarUrl: "https://ui-avatars.com/api/?name=Magaly+Chavez&background=3B82F6&color=fff&size=150"
  };

  const metricasRapidas = {
    vacantesActivas: 5,
    vacantesReportadas: 2,
    numeroPruebas: 3
  };

  const obtenerClaseEstado = (estado) => {
    switch (estado) {
      case 'Verificada':
        return 'estado-verificada';
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
          src={recluProfile.avatarUrl} 
          alt="Avatar del Reclutador" 
          className="profile-avatar"
        />
        <p className="profile-name">{recluProfile.nombre}</p>
        <h3 className="profile-role">{recluProfile.rol}</h3>
        <p className="profile-origin">{recluProfile.origen}</p>
      </div>

      {/*INFORMACIÓN*/}
      <div className="aside-info">
        <div className="info-card">
          <span className="info-label">Vacantes Activas</span>
          <span className="info-value">{metricasRapidas.vacantesActivas}</span>
        </div>
        <div className="info-card">
          <span className="info-label">Vacantes Reportadas</span>
          <span className="info-value">{metricasRapidas.vacantesReportadas}</span>
        </div>
        <div className="info-card">
          <span className="info-label">Pruebas Creadas</span>
          <span className="info-value">{metricasRapidas.numeroPruebas}</span>
        </div>
        <div className="info-card">
          <span className="info-label">Estado</span>
          <span className={`info-value ${obtenerClaseEstado(recluProfile.estado)}`}>
            {recluProfile.estado}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AsideReclu;