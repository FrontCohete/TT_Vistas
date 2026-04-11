import React from 'react';
import EmpAside from '../AsideEmp.jsx'
import GraphEmp from '../GraphEmp.jsx';

const Home_Emp = () => {
  return (
    <div className="home-admin-layout">
      
      <aside className="home-admin-sidebar-wrapper">
        <EmpAside />
      </aside>
      <section className="home-admin-main-wrapper">
        <GraphEmp />
      </section>

    </div>
  );
};

export default Home_Emp;