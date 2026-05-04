import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//ADMIN - Falta (n): Editar perfil y Gestión deSubAdministradores
import NavAdmin from './components/NavAdmin.jsx';
import HomeAdmin from './components/pre-pages/Admin/Home_Admin.jsx';
import PreRegView from './components/pre-pages/Admin/Admin_EPreReg_Viewer.jsx';
import EmpView from './components/pre-pages/Admin/Admin_EReg_Viewer.jsx';
import RecView from './components/pre-pages/Admin/Admin_RecReg_Viewer.jsx';
import VacPreRegView from './components/pre-pages/Admin/Admin_VacPreReg_Viewer.jsx';
import VacRegView from './components/pre-pages/Admin/Admin_VacReg_Viewer.jsx';
// Prueben con estas rutas en page-contaniner
import NavSubAdmin from './components/NavSubAdmin.jsx';
import NavReclu from './components/NavReclu.jsx';
import NavCandi from './components/NavCandi.jsx';
// También prueben con estas en la sección main-content dentro de routes
import HomeSubAdmin from './components/pre-pages/Home_SubAdmin.jsx';
import HomeEmp from './components/pre-pages/Emp/Home_Emp.jsx';
import HomeReclu from './components/pre-pages/Home_Reclu.jsx';
import HomeCandi from './components/pre-pages/Home_Candi.jsx';
// COMPONENTES YA HECHOS
import NavEmp from './components/NavEmp.jsx';
import RecEmpView from './components/pre-pages/Emp/Emp_RecReg_Viewer.jsx';
import RecGesEmpView from './components/pre-pages/Emp/Emp_RecGes_Viewer.jsx';
import VacRegEmpView from './components/pre-pages/Emp/Emp_VacReg_Viewer.jsx';
//Solo hay un footer y es este :3
import Footer from './components/FooterGlobalWave.jsx';


function App () {
  return(
    <Router> 
      <div className="page-container">
        <NavEmp/> 
        <main className="main-content">
          <Routes>
            {/* Rutas encontradas en NavAdmin.jsx */}
            <Route path="/" element={<HomeEmp />} />
            <Route path="/reclutadores/existentes" element={<RecEmpView />} />
            <Route path="/reclutadores/reportados" element={<RecGesEmpView />} />
            <Route path="/vacantes/existentes" element={<VacRegEmpView />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App;