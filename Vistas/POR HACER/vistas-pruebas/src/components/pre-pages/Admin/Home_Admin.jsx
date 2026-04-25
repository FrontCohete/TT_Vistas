import React from 'react';
import AdminAside from '../../AsideAdmin.jsx'
import GraphAdmin from '../../GraphAdmin.jsx';

const Home_Admin = () => {
  return (
    <div className="home-admin-layout">
      
      <aside className="home-admin-sidebar-wrapper">
        <AdminAside />
      </aside>
      <section className="home-admin-main-wrapper">
        <GraphAdmin />
      </section>

    </div>
  );
};

export default Home_Admin;