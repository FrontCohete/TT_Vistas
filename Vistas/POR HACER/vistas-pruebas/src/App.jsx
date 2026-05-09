import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Index from './components/Index.jsx';
// Prueben con estas rutas en page-contaniner
import NavSubAdmin from './components/NavSubAdmin.jsx';
import NavCandi from './components/NavCandi.jsx';
// También prueben con estas en la sección main-content dentro de routes
import HomeSubAdmin from './components/pre-pages/Home_SubAdmin.jsx';
import HomeCandi from './components/pre-pages/Home_Candi.jsx';
//Solo hay un footer y es este :3
import Footer from './components/FooterGlobalWave.jsx';

//RECLUTADOR - Falta (n): Editar perfil, Gestión de Pruebas y Creación de Vacantes
/*
import NavReclu from './components/NavReclu.jsx';
import HomeReclu from './components/pre-pages/Reclu/Home_Reclu.jsx';
import VacRegRecView from './components/pre-pages/Reclu/Rec_VacReg_Viewer.jsx';
import CandInVacView from './components/pre-pages/Reclu/Rec__CandInVac__View.jsx';
function App () {
  return(
    <Router> 
      <div className="page-container">
        <NavReclu/>  
        <main className="main-content">
          <Routes>
             <Route path="/" element={<HomeReclu />} />
            <Route path="/vacantes/existentes" element={<VacRegRecView />} />
            <Route path="/vacantes/:id/postulantes" element={<CandInVacView />} />
            <Route path="/vacantes/crear-publicación" element={<CandInVacView />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}
export default App;
*/

//ADMIN - Falta (n): Editar perfil y Gestión deSubAdministradores
/*
import NavAdmin from './components/NavAdmin.jsx';
import HomeAdmin from './components/pre-pages/Admin/Home_Admin.jsx';
import PreRegView from './components/pre-pages/Admin/Admin_EPreReg_Viewer.jsx';
import EmpView from './components/pre-pages/Admin/Admin_EReg_Viewer.jsx';
import RecView from './components/pre-pages/Admin/Admin_RecReg_Viewer.jsx';
import VacPreRegView from './components/pre-pages/Admin/Admin_VacPreReg_Viewer.jsx';
import VacRegView from './components/pre-pages/Admin/Admin_VacReg_Viewer.jsx';
function App () {
  return(
  <Router>
    <div className="page-container">
      <NavAdmin/>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeAdmin />} /> 
          <Route path="/Admin/empresas/preregistros" element={<PreRegView />} />
          <Route path="/Admin/empresas/existentes" element={<EmpView />} />
          <Route path="/Admin/reclutadores/existentes" element={<RecView />} />
          <Route path="/Admin/vacantes/existentes" element={<VacPreRegView />} />
          <Route path="/Admin/vacantes/aprobar" element={<VacRegView />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  </Router>
  )
}
export default App;
*/

// EMPRESA - Falta (n): Editar perfil y Gestión de Pruebas
/*
import NavEmp from './components/NavEmp.jsx';
import HomeEmp from './components/pre-pages/Emp/Home_Emp.jsx';
import RecEmpView from './components/pre-pages/Emp/Emp_RecReg_Viewer.jsx';
import RecGesEmpView from './components/pre-pages/Emp/Emp_RecGes_Viewer.jsx';
import VacRegEmpView from './components/pre-pages/Emp/Emp_VacReg_Viewer.jsx';

function App () { 
  return(
    <Router> 
      <div className="page-container"> 
        <NavEmp/>  
        <main className="main-content">
          <Routes> 
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
*/

// CANDIDATO - Falta (n): Todo 
/*
function App () { 
  return(
    <Router> 
      <div className="page-container"> 
        <NavCandi/>  
        <main className="main-content">
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

// LOGIN
*/
function App () { 
  return(



    <Router> 
      
      <div className="page-container"> 
         
        <main className="main-content">
          <Routes> 
            <Route path="/" element={<Index />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}
export default App;