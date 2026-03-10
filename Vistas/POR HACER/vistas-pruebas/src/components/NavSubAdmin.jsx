import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import 'normalize.css';
import '../assets/css/nav_admin.css';
import avatar from "../assets/img-no-opt/logo-caspita.png";

const items = [
  { name: "Inicio", path: "/" },
  { 
    name: "Empresas", 
    items: [
      { name: "Visualizar Preregistros", path: "/empresas/preregistros" }
    ] 
  },
  { 
    name: "Reclutadores", 
    items: [
      { name: "Visualizar Existentes", path: "/reclutadores/existentes" }
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
    const leftPosition = linkRef.current.offsetLeft;
    onEnter(item, `${leftPosition}px`);
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
  const [translateX, setTranslateX] = useState("0px");
  const [activeItem, setActiveItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const profileMenuRef = useRef(null);
  const mainDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null); 
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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="page navbar">
      <section className="navbar-container">
        {/* Toggle para menú móvil */}
        <button 
          className="mobile-toggle-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        {/* Menú de escritorio */}
        <div className="nvbar-item menu desktop-menu">
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
            
            <CSSTransition
              in={!!activeItem?.items && activeItem.items.length > 0}
              nodeRef={mainDropdownRef}
              timeout={300}
              classNames="main-dropdown"
              unmountOnExit
            >
              <div
                ref={mainDropdownRef}
                style={{ transform: `translateX(${translateX})` }}
                className="item-dropdown" 
                onMouseEnter={handleDropdownEnter} 
                onMouseLeave={handleMouseLeave}    
              >
                {activeItem?.items?.map((subItem) => (
                  <Link key={subItem.name} to={subItem.path} className="dropdown-link">
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </CSSTransition>
          </div>
        </div>

        {/* Perfil de usuario */}
        <div className="nvbar-item img user-profile-container">
          <img 
            src={avatar} 
            alt="Logo Caspita" 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          />
          
          <CSSTransition
            in={isProfileMenuOpen}
            nodeRef={profileMenuRef}
            timeout={300}
            classNames="profile-dropdown"
            unmountOnExit
          >
            <div 
              ref={profileMenuRef}
              className="profile-dropdown-menu" 
            >
              <Link to="/perfil/editar" className="profile-item" onClick={closeProfileMenu}>
                Editar Perfil
              </Link>
              <Link to="/subadministradores" className="profile-item" onClick={closeProfileMenu}>
                Ver Sub administradores
              </Link>
              <div className="profile-divider"></div>
              <button 
                className="profile-item logout-btn" 
                onClick={() => {
                  closeProfileMenu();
                  console.log("Cerrando sesión...");
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </CSSTransition>
        </div>
      </section>

      {/* Menú Móvil */}
      <CSSTransition
        in={isMobileMenuOpen}
        nodeRef={mobileMenuRef}
        timeout={300}
        classNames="mobile-menu"
        unmountOnExit
      >
        <div 
          ref={mobileMenuRef} 
          className="mobile-menu-dropdown" 
        >
          <ul className="mobile-menu-list">
            {items.map((item) => (
              <li key={item.name} className="mobile-menu-item">
                {item.path ? (
                  <Link to={item.path} className="home-label" onClick={closeMobileMenu}>
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <span className="title-page">{item.name}</span>
                    <ul className="mobile-sub-list">
                      {item.items.map((subItem) => (
                        <li key={subItem.name} className="mobile-sub-item">
                          <Link to={subItem.path} className="page-label" onClick={closeMobileMenu}>
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </nav>
  );
}