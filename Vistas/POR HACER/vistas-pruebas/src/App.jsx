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
// COMPONENTES YA HECHOS
import PreRegView from './components/PreReg_Viewer.jsx';
import EmpView from './components/Empresa_Viewer.jsx';
//Solo hay un footer y es este :3
import Footer from './components/FooterGlobalWave.jsx';


function App () {
  return(
    <Router> 
      <div className="page-container">
        <NavAdmin/> 
        <main className="main-content">
          <Routes>
            {/* Rutas encontradas en NavAdmin.jsx */}
            <Route path="/" element={<HomeAdmin />} />
            <Route path="/empresas/preregistros" element={<PreRegView />} />
            <Route path="/empresas/existentes" element={<EmpView />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App;