import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import '@flaticon/flaticon-uicons/css/all/all.css';
import { CSSTransition } from "react-transition-group";
import 'normalize.css';
import '../assets/css/nav_admin.css';
import avatar from "../assets/img-no-opt/logo-caspita.png";

const items = [
  { name: "Inicio", path: "/", icon: "fi fi-rr-home" },
  { 
    name: "Empresas", 
    icon: "fi fi-rr-building",
    items: [
      { name: "Visualizar Preregistros", path: "/empresas/preregistros", icon: "fi fi-rr-eye" },
      { name: "Visualizar Existentes", path: "/empresas/existentes", icon: "fi fi-rr-list-check" }
    ] 
  },
  { 
    name: "Reclutadores", 
    icon: "fi fi-rr-users",
    items: [
      { name: "Visualizar Existentes", path: "/reclutadores/existentes", icon: "fi fi-rr-eye" }
    ] 
  },
  { 
    name: "Vacantes", 
    icon: "fi fi-rr-briefcase",
    items: [
      { name: "Aprobar Publicaciones", path: "/vacantes/aprobar", icon: "fi fi-rr-check-circle" },
      { name: "Corrección de Publicaciones", path: "/vacantes/corregir", icon: "fi fi-rr-edit" },
      { name: "Visualizar Reportes", path: "/vacantes/reportes", icon: "fi fi-rr-document" }
    ] 
  },
];
const NavItem = ({ item, activeItem, onEnter, onLeave }) => {
  const linkRef = useRef();

  const handleMouseEnter = () => {
    const leftPosition = linkRef.current.offsetLeft;
    onEnter(item, `${leftPosition}px`);
  };

  if (item.path) {
    return (
      <Link
        to={item.path}
        className={`nav-main-link ${item?.name === activeItem?.name ? "active" : ""}`}
        ref={linkRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onLeave} 
      >
        {item.icon && <i className={item.icon}></i>}
        {item.name}
      </Link>
    );
  }

  return (
    <a
      className={`nav-main-link ${item?.name === activeItem?.name ? "active" : ""}`}
      ref={linkRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave} 
      style={{ cursor: "pointer" }}
    >
      {item.icon && <i className={item.icon}></i>}
      {item.name}
    </a>
  );
};

export default function SubAdmin() {
  const [translateX, setTranslateX] = useState("0px");
  const [activeItem, setActiveItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); 
  
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const profileMenuRef = useRef(null);
  const mainDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null); 
  const notificationsRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
        setIsProfileMenuOpen(false);
        setIsNotificationsOpen(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const closeProfileMenu = () => setIsProfileMenuOpen(false);

  // Funciones para alternar menús
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileMenuOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsNotificationsOpen(false);
  };

  return (
    <nav className="page navbar">
      <section className={`navbar-container ${isVisible ? "" : "navbar-hidden"}`}>
        <div className="nav-left-section">
          <button 
            className="mobile-toggle-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <i className="fi fi-rr-menu-burger"></i>
          </button>

          <div className="notifications-wrapper">
            <button 
              className="notifications-btn" 
              aria-label="Notificaciones"
              onClick={toggleNotifications}
            >
              <i className="fi fi-rr-bell"></i>
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </button>

            <CSSTransition
              in={isNotificationsOpen}
              nodeRef={notificationsRef}
              timeout={300}
              classNames="profile-dropdown"
              unmountOnExit
            >
              <div ref={notificationsRef} className="notifications-dropdown-menu">
                <h4 className="notifications-header">Notificaciones</h4>
                <div className="notifications-divider"></div>
                
                {notifications.length > 0 ? (
                  <ul className="notifications-list">
                    {notifications.map((notif, index) => (
                      <li key={index} className="notification-item">
                        {notif.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-notifications">
                    No hay notificaciones disponibles
                  </div>
                )}
              </div>
            </CSSTransition>
          </div>
        </div>

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
                    {subItem.icon && <i className={subItem.icon}></i>}
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </CSSTransition>
          </div>
        </div>

        <div className="nvbar-item img user-profile-container">
          <img 
            src={avatar} 
            alt="Logo Caspita" 
            onClick={toggleProfile}
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
                <i className="fi fi-rr-user-pen"></i> Editar Perfil
              </Link>
              <div className="profile-divider"></div>
              <button 
                className="profile-item logout-btn" 
                onClick={() => {
                  closeProfileMenu();
                  console.log("Cerrando sesión...");
                }}
              >
                <i className="fi fi-rr-sign-out-alt"></i> Cerrar sesión
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
          className="mobile-menu-dropdown" 
        >
          <ul className="mobile-menu-list">
            {items.map((item) => (
              <li key={item.name} className="mobile-menu-item">
                {item.path ? (
                  <Link to={item.path} className="home-label" onClick={closeMobileMenu}>
                    {item.icon && <i className={item.icon}></i>}
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <span className="title-page">
                      {item.icon && <i className={item.icon}></i>}
                      {item.name}
                    </span>
                    <ul className="mobile-sub-list">
                      {item.items.map((subItem) => (
                        <li key={subItem.name} className="mobile-sub-item">
                          <Link to={subItem.path} className="page-label" onClick={closeMobileMenu}>
                            {subItem.icon && <i className={subItem.icon}></i>}
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