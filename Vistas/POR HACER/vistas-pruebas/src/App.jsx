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
import HomeAdmin from './components/pre-pages/Admin/Home_Admin.jsx';
import HomeSubAdmin from './components/pre-pages/Home_SubAdmin.jsx';
import HomeEmp from './components/pre-pages/Home_Emp.jsx';
import HomeReclu from './components/pre-pages/Home_Reclu.jsx';
import HomeCandi from './components/pre-pages/Home_Candi.jsx';
// COMPONENTES YA HECHOS
import PreRegView from './components/pre-pages/Admin/Admin_EPreReg_Viewer.jsx';
import EmpView from './components/pre-pages/Admin/Admin_EReg_Viewer.jsx';
import RecView from './components/pre-pages/Admin/Admin_RecReg_Viewer.jsx';
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
            <Route path="/Admin/empresas/preregistros" element={<PreRegView />} />
            <Route path="/Admin/empresas/existentes" element={<EmpView />} />
            <Route path="/Admin/reclutadores/existentes" element={<RecView />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App;