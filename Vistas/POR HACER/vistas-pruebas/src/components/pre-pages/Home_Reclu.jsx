import React from 'react';
import RecluAside from '../AsideReclu.jsx'
import GraphReclu from '../GraphReclu.jsx';

const Home_Reclu = () => {
  return (
    <div className="home-admin-layout">    
      <aside className="home-admin-sidebar-wrapper">
        <RecluAside />
      </aside>
      <section className="home-admin-main-wrapper">
        <GraphReclu />
      </section>
    </div>
  );
};

export default Home_Reclu;