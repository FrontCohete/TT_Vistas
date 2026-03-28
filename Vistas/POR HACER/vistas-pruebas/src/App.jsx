import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavAdmin from './components/NavAdmin.jsx';
import NavSubAdmin from './components/NavSubAdmin.jsx';
import NavReclu from './components/NavReclu.jsx';
import NavEmp from './components/NavEmp.jsx';
import NavCandi from './components/NavCandi.jsx';
import Form_PreR from './components/FormPreReg.jsx';
import Form_RegCadi from './components/FormRegCandi.jsx';
import Footer_Global from './components/WaveFooter.jsx';
import WaveFooter from './components/WaveFooter.jsx';
import Page from './components/Page_Test_Components.jsx'

function App () {
  return(
    <Router> 
      <>
        <div className="page-container">
          <NavCandi/>
          <main className="main-content">
            <Page/> 
          </main>
          {/* El footer siempre debe ir al final y fuera del main-content */}
          {/* Revisar index.css en caso de ser necesario ajustar footer */}
          <WaveFooter />
        </div>
      </>
    </Router>
  )
}

export default App;