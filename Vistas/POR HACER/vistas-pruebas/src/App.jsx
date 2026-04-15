import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Prueben con estas rutas en page-contaniner
import NavSubAdmin from './components/NavSubAdmin.jsx';
import NavAdmin from './components/NavAdmin.jsx';
import NavEmp from './components/NavEmp.jsx';
import NavReclu from './components/NavReclu.jsx';
import NavCandi from './components/NavCandi.jsx';
// También prueben con estas en la sección main-content dentro de routes
import HomeAdmin from './components/pre-pages/Home_Admin.jsx';
import HomeSubAdmin from './components/pre-pages/Home_SubAdmin.jsx';
import HomeEmp from './components/pre-pages/Home_Emp.jsx';
import HomeReclu from './components/pre-pages/Home_Reclu.jsx';
import HomeCandi from './components/pre-pages/Home_Candi.jsx';
//Solo hay un footer y es este :3
import Footer from './components/FooterGlobalWave.jsx';


function App () {
  return(
    <Router> 
      <div className="page-container">
        <NavCandi/> 
        <main className="main-content">
          {/*El enrutador decide qué componente mostrar basado en la URL */}
          <Routes>
            <Route path="/" element={<HomeCandi />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App;