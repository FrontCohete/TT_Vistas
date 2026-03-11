import React, { useState } from 'react';
import './App.css';
import NavAdmin from './components/NavAdmin.jsx';
import NavSubAdmin from './components/NavSubAdmin.jsx';
import NavReclu from './components/NavReclu.jsx';
import NavEmp from './components/NavEmp.jsx';
import Form_PreR from './components/FormPreReg.jsx';

function App () {
  return(
    <>
      <NavReclu/>
      <Form_PreR/>
      <Form_PreR/>
      <Form_PreR/>
    </>

  )
}

export default App;