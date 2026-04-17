import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/pre_pages/home_Admin.css';

const AsideCandi = () => {
  // Simulación de la estructura de datos que enviaría el backend
  const candiProfile = {
    nombre: "Joshi Setu",
    rol: "Candidato",
    carrera: "Ingeniería en Sistemas Computacionales",
    ubicacion: "Ciudad de México, CDMX",
    avatarUrl: "https://ui-avatars.com/api/?name=Joshi+Setu&background=3B82F6&color=fff&size=150",
    cvUrl: "#", // Link al PDF generado/guardado en servidor
    redesSociales: [
      { id: 1, nombre: "LinkedIn", url: "https://linkedin.com", icono: "fi fi-brands-linkedin" },
      { id: 2, nombre: "Instagram", url: "https://instagram.com", icono: "fi fi-brands-instagram" },
      { id: 3, nombre: "Facebook", url: "https://facebook.com", icono: "fi fi-brands-facebook" },
      { id: 4, nombre: "X", url: "https://x.com", icono: "fi fi-brands-twitter" }
    ]
  };

  return (
    <div className="admin-sidebar">
      
      {/* SECCIÓN 1: IDENTIDAD */}
      <div className="aside-image">
        <p className="greeting-text">Bienvenido</p>
        <img 
          src={candiProfile.avatarUrl} 
          alt="Avatar del Candidato" 
          className="profile-avatar"
        />
        <h3 className="profile-name">{candiProfile.nombre}</h3>
        <p className="profile-career">{candiProfile.carrera}</p>
        <p className="profile-location">{candiProfile.ubicacion}</p>
      </div>

      <hr className="aside-divider" />

      {/* SECCIÓN 2: GESTIÓN DE CV */}
      <div className="aside-cv-section">
        <h4 className="section-subtitle">Mi Curriculum</h4>
        
        {/* Ver CV Actual */}
        <a href={candiProfile.cvUrl} target="_blank" rel="noreferrer" className="cv-link-item">
          <i className="fi fi-rr-document icon-cv"></i>
          <span>Ver CV Actual</span>
        </a>

        {/* Crear CV Link */}
        <Link to="/crear-cv" className="create-cv-btn">
          Crear Nuevo CV Online
        </Link>
      </div>

      <hr className="aside-divider" />

      {/* SECCIÓN 3: REDES SOCIALES (Renderizado Dinámico) */}
      <div className="aside-social">
        <h4 className="section-subtitle">Mis Redes</h4>
        <div className="social-icons-grid">
          {candiProfile.redesSociales.length > 0 ? (
            candiProfile.redesSociales.map((red) => (
              <a 
                key={red.id} 
                href={red.url} 
                target="_blank" 
                rel="noreferrer" 
                title={`Visitar ${red.nombre}`}
              >
                <i className={red.icono}></i>
              </a>
            ))
          ) : (
            <p className="texto-secundario" style={{ fontSize: '12px', textAlign: 'center' }}>
              No hay redes vinculadas
            </p>
          )}
        </div>
      </div>

    </div>
  );
};

export default AsideCandi;