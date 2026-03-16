import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavAdmin from './components/NavAdmin.jsx';
import NavSubAdmin from './components/NavSubAdmin.jsx';
import NavReclu from './components/NavReclu.jsx';
import NavEmp from './components/NavEmp.jsx';
import NavCandi from './components/NavCandi.jsx';
import Form_PreR from './components/FormPreReg.jsx';

function App () {
  return(
    <Router> 
      <>
        <NavAdmin/> 
        <Form_PreR />
        <Form_PreR />
        <Form_PreR />
        <Form_PreR />
        <Form_PreR />
        <Form_PreR />
      </>
    </Router>
  )
}

export default App;