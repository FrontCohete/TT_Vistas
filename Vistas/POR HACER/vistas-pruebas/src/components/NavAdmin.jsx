import { useState, useRef } from "react";
import { Link } from "react-router-dom";
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

const NavItem = ({ item, activeItem, onEnter, onLeave }) => {
  const linkRef = useRef();

  const handleMouseEnter = () => {
    const rect = linkRef.current.getBoundingClientRect();
    onEnter(item, `${rect.x}px`);
  };

  return (
    <a
      className={item?.name === activeItem?.name ? "active" : ""}
      ref={linkRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave} 
      style={{ cursor: "pointer" }}
    >
      {item.name}
    </a>
  );
};

export default function NavAdmin() {
  const [translateX, setTranslateX] = useState("0");
  const [activeItem, setActiveItem] = useState(null);
  
  const timeoutRef = useRef(null);

  const handleMouseEnter = (item, x) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setActiveItem(item || null);
    if (x) setTranslateX(x);
  };

  
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveItem(null); 
    }, 1000); 
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <nav className="page navbar">
      <section className="navbar-container">
        <div className="nvbar-item menu">
          <div className="item-menu">
            {items.map((item) => (
              <NavItem
                key={item.name}
                activeItem={activeItem}
                item={item}
                onEnter={handleMouseEnter}
                onLeave={handleMouseLeave} 
              />
            ))}
            <div
              style={{
                translate: `${translateX} 0`,
              }}
              className={`item-dropdown ${activeItem ? "visible" : ""}`}
              onMouseEnter={handleDropdownEnter} 
              onMouseLeave={handleMouseLeave}    
            >
              {activeItem?.items?.map((subItem) => (
                <Link key={subItem.name} to={subItem.path}>
                  {subItem.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="nvbar-item img">
          <img src={avatar} alt="Logo Caspita" />
        </div>
      </section>
    </nav>
  );
}