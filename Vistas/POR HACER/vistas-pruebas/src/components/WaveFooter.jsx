import React from 'react';
import '../assets/css/wave_footer.css';

const WaveFooter = () => {
  const currentYear = new Date().getFullYear();
  const textCaspita = "Caspita - Por y para alumnos de la Escuela Superior de Cómputo";

  return (
    <footer className="footer-wrapper">
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(0, 123, 255, 0.7)" />
          <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(0, 123, 255, 0.5)" />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(0, 123, 255, 0.3)" />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="#007bff" />
        </g>
      </svg>

      <div className="footer-content">
        
        {/* Contenedor principal del carrusel */}
        <div className="ticker-wrap">
          {/* La "pista" que se moverá completa con los 3 textos */}
          <div className="ticker-track">
            <p>&copy; {currentYear} {textCaspita}</p>
            <p>&copy; {currentYear} {textCaspita}</p>
            <p>&copy; {currentYear} {textCaspita}</p>
          </div>
        </div>

        <ul className="footer-links">
          <li><a href="#">Manual de Usuario</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default WaveFooter;