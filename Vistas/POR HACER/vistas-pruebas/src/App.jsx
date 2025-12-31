import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('Candidato');

  // Datos dinámicos
  const contentData = {
    Candidato: { label: "Nombre Completo del Candidato", placeholder: "Ingresa el nombre..." },
    Reclutador: { label: "Número de Empleado (Reclutador)", placeholder: "Ingresa tu ID..." },
    Empresa: { label: "Nombre Fiscal de la Empresa", placeholder: "Ingresa la razón social..." }
  };

  return (
    <div className="app-container">
      
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>Portal</h2>
        
        {['Candidato', 'Reclutador', 'Empresa'].map((item) => (
          <div
            key={item}
            // Agregamos la clase 'active' si coincide con el estado
            className={`nav-item ${activeTab === item ? 'active' : ''}`}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </div>
        ))}
      </nav>

      {/* Main Content */}
      <main className="main-content">
        
        {/* KEY es vital: fuerza a React a destruir y recrear el div
            para que la animación CSS 'cardSwipeIn' se ejecute de nuevo */}
        <div className="card" key={activeTab}>
          <h3 style={{ color: 'white', marginBottom: '25px', textAlign: 'center', textTransform: 'uppercase' }}>
            Registro de <span style={{color: 'red'}}>{activeTab}</span>
          </h3>

          <div className="form-group">
            <label>{contentData[activeTab].label}</label>
            <input type="text" placeholder={contentData[activeTab].placeholder} />
          </div>

          <div className="form-group">
            <button className="action-btn">
              Guardar Datos
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;