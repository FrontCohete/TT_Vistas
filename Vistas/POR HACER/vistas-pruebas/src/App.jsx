import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavCandi from './components/NavCandi.jsx';
import NavAdmin from './components/NavAdmin.jsx';
import Footer from './components/FooterGlobalWave.jsx';
//NO SE PORQUE ME MANDA ERROR CUANDO LA RUTA ES "./components/pre-pages/Home_Admin.jsx"
import HomeAdmin from './components/pre-pages/home_Admin.jsx';


function App () {
  return(
    <Router> 
      <div className="page-container">
        
        <NavAdmin/> 
        
        <main className="main-content">
          {/*El enrutador decide qué componente mostrar basado en la URL */}
          <Routes>
            {/* Cuando la ruta sea "/" (que es el path de "Inicio"), dibuja HomeAdmin */}
            <Route path="/" element={<HomeAdmin />} />
            
          </Routes>
        </main>

        <Footer/>
        
      </div>
    </Router>
  )
}

export default App;