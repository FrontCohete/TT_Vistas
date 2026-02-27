import { useState, useRef } from "react";
import { Link } from "react-router-dom"; // Mantenemos este para el dropdown
import 'normalize.css';
import '../assets/css/nav_admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import avatar from "../assets/img-no-opt/logo-caspita.png";

const items = [
  { name: "Inicio", path: "/" },
  { 
    name: "Empresas", 
    items: [
      { name: "Visualizar Preregistros", path: "/empresas/preregistros" },
      { name: "Visualizar Existentes", path: "/empresas/existentes" }
    ] 
  },
  { 
    name: "Reclutadores", 
    items: [
      { name: "Visualizar Existentes", path: "/reclutadores/existentes" },
      { name: "Emitir Reportes", path: "/reclutadores/reportes" }
    ] 
  },
  { 
    name: "Vacantes", 
    items: [
      { name: "Aprobar Publicaciones", path: "/vacantes/aprobar" },
      { name: "Corrección de Publicaciones", path: "/vacantes/corregir" },
      { name: "Visualizar Reportes", path: "/vacantes/reportes" }
    ] 
  },
];

// Renombramos esto a 'NavItem' para evitar conflicto con 'Link' de react-router-dom
const NavItem = ({ item, activeItem, onHover }) => {
  const linkRef = useRef();

  const handleHover = () => {
    const rect = linkRef.current.getBoundingClientRect();
    onHover(item, `${rect.x}px`);
  };

  return (
    <a
      className={item?.name === activeItem?.name ? "active" : ""}
      ref={linkRef}
      onMouseEnter={handleHover}
      style={{ cursor: "pointer" }}
    >
      {item.name}
    </a>
  );
};

const Search = () => (
  <div className="navbar-3-search">
    <span className="material-symbols-outlined">search</span>
    <input type="text" placeholder="Search" />
  </div>
);

// Lo cambiamos a 'export default function NavAdmin' para que coincida con App.jsx
export default function NavAdmin() {
  const [translateX, setTranslateX] = useState("0");
  const [activeItem, setActiveItem] = useState(null);

  const handleLinkHover = (item, x) => {
    setActiveItem(item || null);
    setTranslateX(x);
  };

  return (
    <section className="page navbar-3-page">
      <nav className="navbar-3">
        <img src={avatar} alt="Logo Caspita" />
        <div className="navbar-3-menu">
          {items.map((item) => (
            <NavItem
              key={item.name} // Siempre agrega un 'key' único al usar .map()
              activeItem={activeItem}
              item={item}
              onHover={handleLinkHover}
            />
          ))}
          <div
            style={{
              translate: `${translateX} 0`,
            }}
            className={`navbar-3-dropdown ${activeItem ? "visible" : ""}`}
          >
            {/* Corrección: 'subItem' es un objeto, renderizamos subItem.name */}
            {activeItem?.items?.map((subItem) => (
              <Link key={subItem.name} to={subItem.path}>
                {subItem.name}
              </Link>
            ))}
          </div>
        </div>
        <Search />
      </nav>
    </section>
  );
}