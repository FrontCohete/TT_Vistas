import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
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
    <nav className="page navbar position-relative">
      <section className="navbar-container">
        <button 
          className="d-lg-none btn btn-outline-secondary" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <div className="nvbar-item menu d-none d-lg-block">
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
              in={!!activeItem}
              nodeRef={mainDropdownRef}
              timeout={300}
              classNames="main-dropdown"
              unmountOnExit
            >
              <div
                ref={mainDropdownRef}
                style={{ translate: `${translateX} 0` }}
                className="item-dropdown" 
                onMouseEnter={handleDropdownEnter} 
                onMouseLeave={handleMouseLeave}    
              >
                {activeItem?.items?.map((subItem) => (
                  <Link key={subItem.name} to={subItem.path}>
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </CSSTransition>
          </div>
        </div>

        <div className="nvbar-item img position-relative" style={{ cursor: "pointer" }}>
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
              className="dropdown-menu position-absolute end-0 shadow-sm" 
              style={{ zIndex: 950, display: 'block' }}
            >
              <Link to="/perfil/editar" className="dropdown-item" onClick={closeProfileMenu}>
                Editar Perfil
              </Link>
              <Link to="/subadministradores" className="dropdown-item" onClick={closeProfileMenu}>
                Ver Sub administradores
              </Link>
              <div className="dropdown-divider"></div>
              <button 
                className="dropdown-item text-danger" 
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

      <CSSTransition
        in={isMobileMenuOpen}
        nodeRef={mobileMenuRef}
        timeout={300}
        classNames="mobile-menu"
        unmountOnExit
      >
        <div 
          ref={mobileMenuRef} 
          className="mobile-menu-dropdown d-lg-none start-0" 
          style={{ zIndex: 1000 }}
        >
          <ul className="list-unstyled mb-0">
            {items.map((item) => (
              <li key={item.name} className="ref-a mb-3">
                {item.path ? (
                  <Link to={item.path} className="home-label fw-bold " onClick={closeMobileMenu}>
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <span className="title-page ">{item.name}</span>
                    <ul className="list-unstyled ms-3 mt-2">
                      {item.items.map((subItem) => (
                        <li key={subItem.name} className="mb-2">
                          <Link to={subItem.path} className="page-label " onClick={closeMobileMenu}>
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