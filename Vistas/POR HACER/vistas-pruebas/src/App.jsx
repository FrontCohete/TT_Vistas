import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavCandi from './components/NavCandi.jsx';
import NavSubAdmin from './components/NavSubAdmin.jsx';
import NavAdmin from './components/NavAdmin.jsx';
import Footer from './components/FooterGlobalWave.jsx';
//NO SE PORQUE ME MANDA ERROR CUANDO LA RUTA ES "./components/pre-pages/Home_Admin.jsx"
import HomeAdmin from './components/pre-pages/home_Admin.jsx';
import HomeSubAdmin from './components/pre-pages/Home_SubAdmin.jsx';
import SubAdmin from './components/NavSubAdmin.jsx';


function App () {
  return(
    <Router> 
      <div className="page-container">
        
        <NavSubAdmin/> 
        
        <main className="main-content">
          {/*El enrutador decide qué componente mostrar basado en la URL */}
          <Routes>
            {/* Cuando la ruta sea "/" (que es el path de "Inicio"), dibuja HomeAdmin */}
            <Route path="/" element={<HomeSubAdmin />} />
            
          </Routes>
        </main>

        <Footer/>
        
      </div>
    </Router>
  )
}

export default App;