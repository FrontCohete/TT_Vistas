import React from 'react';
import EmpAside from '../AsideSubAdmin.jsx'
import GraphEmp from '../GraphAdmin.jsx';

const Home_SubAdmin = () => {
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

export default Home_SubAdmin;