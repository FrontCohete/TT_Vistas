import React from 'react';
import CandiAside from '../AsideCandi.jsx'
import CandiGraph from '../GraphCandi.jsx';

const Home_Admin = () => {
  return (
    <div className="home-admin-layout">
      
      <aside className="home-admin-sidebar-wrapper">
        <CandiAside />
      </aside>
      <section className="home-admin-main-wrapper">
        <CandiGraph />
      </section>

    </div>
  );
};

export default Home_Admin;