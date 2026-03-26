import React, { forwardRef, useState, useRef, useEffect } from "react";
import '../assets/css/nav_search.css';

const Nav_SearchCandi = forwardRef(({ isNavbarVisible, navHeight }, ref) => {
  const topPosition = isNavbarVisible ? `${navHeight}px` : "0px";
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    puesto: "",
    ubicacion: "",
    sueldo: "",
    modalidad: "",
    contratacion: "",
    fecha: "",
    afinidad: ""
  });

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const filterGroupRef = useRef(null);
  const locationRef = useRef(null);
  const zonasCdmxEdomex = [
    "Álvaro Obregón, CDMX", "Azcapotzalco, CDMX", "Benito Juárez, CDMX", "Coyoacán, CDMX",
    "Cuajimalpa de Morelos, CDMX", "Cuauhtémoc, CDMX", "Gustavo A. Madero, CDMX", "Iztacalco, CDMX",
    "Iztapalapa, CDMX", "La Magdalena Contreras, CDMX", "Miguel Hidalgo, CDMX", "Milpa Alta, CDMX",
    "Tláhuac, CDMX", "Tlalpan, CDMX", "Venustiano Carranza, CDMX", "Xochimilco, CDMX",
    "Atizapán de Zaragoza, Edomex", "Chalco, Edomex", "Chimalhuacán, Edomex", "Coacalco, Edomex",
    "Cuautitlán Izcalli, Edomex", "Ecatepec de Morelos, Edomex", "Huixquilucan, Edomex", 
    "Ixtapaluca, Edomex", "Naucalpan de Juárez, Edomex", "Nezahualcóyotl, Edomex", 
    "Nicolás Romero, Edomex", "Tecámac, Edomex", "Texcoco, Edomex", "Tlalnepantla de Baz, Edomex", 
    "Toluca, Edomex", "Tultitlán, Edomex", "Valle de Chalco, Edomex"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterGroupRef.current && !filterGroupRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleSelect = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
    setActiveDropdown(null);
  };

const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "afinidad") {
      if (value !== "" && Number(value) > 100) {
        value = "100"; // Si se pasa de 100, lo topamos en 100
      } else if (value !== "" && Number(value) < 0) {
        value = "0";
      }
    }

    setFilters({ ...filters, [name]: value });
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, ubicacion: value });

    if (value.length > 0) {
      const filtered = zonasCdmxEdomex.filter(zona => 
        zona.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (zona) => {
    setFilters({ ...filters, ubicacion: zona });
    setShowSuggestions(false);
  };

  const opcionesModalidad = [
    { value: "presencial", label: "Presencial" },
    { value: "home-office", label: "Home Office" },
    { value: "hibrido", label: "Híbrido" }
  ];

  const opcionesContratacion = [
    { value: "medio", label: "Medio Tiempo" },
    { value: "completo", label: "Tiempo Completo" }
  ];

  const opcionesFecha = [
    { value: "hoy", label: "Hoy" },
    { value: "1-semana", label: "Hace 1 semana" },
    { value: "2-semanas", label: "Hace 2 semanas" },
    { value: "1-mes", label: "Hace 1 Mes" }
  ];

  return (
    <div 
      ref={ref}
      className="search-candi-container"
      style={{ 
        top: topPosition 
      }} 
    >
      {!isMobilePanelOpen && (
        <div className="explore-btn-container">
          <button className="explore-btn" onClick={() => setIsMobilePanelOpen(true)}>
            <i className="fi fi-rr-search-alt"></i> Explorar
          </button>
        </div>
      )}

      <div className={`search-wrapper ${isMobilePanelOpen ? "mobile-open" : "mobile-closed"}`}>
        
        <button className="close-panel-btn" onClick={() => setIsMobilePanelOpen(false)}>
          <i className="fi fi-rr-cross-small"></i> Cerrar
        </button>

        {/* --- BARRA DE BÚSQUEDA PRINCIPAL --- */}
        <div className="search-material-bar">
          
          <div className="search-input-group">
            <i className="fi fi-rr-briefcase search-icon"></i>
            <input 
              type="text" 
              name="puesto"
              value={filters.puesto}
              onChange={handleInputChange}
              placeholder="Puesto, Vacante o Palabra Clave" 
              className="search-input"
            />
          </div>
          
          <div className="search-divider"></div>
          
          <div className="search-input-group autocomplete-group" ref={locationRef}>
            <i className="fi fi-rr-marker search-icon"></i>
            <input 
              type="text" 
              name="ubicacion"
              value={filters.ubicacion}
              onChange={handleLocationChange}
              onFocus={() => filters.ubicacion && setShowSuggestions(true)}
              placeholder="Ciudad, alcaldía o municipio" 
              className="search-input"
              autoComplete="off"
            />
            
            {showSuggestions && suggestions.length > 0 && (
              <ul className="autocomplete-suggestions">
                {suggestions.map((zona, index) => (
                  <li 
                    key={index} 
                    onClick={() => handleSuggestionClick(zona)}
                    className="suggestion-item"
                  >
                    <i className="fi fi-rr-marker"></i> {zona}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button 
            className="search-btn" 
            onClick={() => {
              console.log("Filtros enviados:", filters);
              setIsMobilePanelOpen(false);
            }}
          >
            <i className="fi fi-rr-search"></i>
            <span>Buscar</span>
          </button>
        </div>

        <div className="search-filters-bar">
          <div className="filter-button-group" ref={filterGroupRef}>
            
            <div className="filter-item">
              <i className="fi fi-rr-sack-dollar"></i>
              <input 
                type="number" 
                name="sueldo"
                value={filters.sueldo}
                onChange={handleInputChange}
                placeholder="Sueldo min." 
                className="filter-input-number"
              />
            </div>

            <div className="filter-item custom-dropdown-container">
              <i className="fi fi-rr-laptop"></i>
              <div className="custom-dropdown-trigger" onClick={() => toggleDropdown("modalidad")}>
                <span className={filters.modalidad ? "selected-text" : "placeholder-text"}>
                  {opcionesModalidad.find(opt => opt.value === filters.modalidad)?.label || "Modalidad"}
                </span>
                <i className={`fi fi-rr-angle-small-down chevron ${activeDropdown === "modalidad" ? "open" : ""}`}></i>
              </div>
              <div className={`custom-dropdown-menu ${activeDropdown === "modalidad" ? "active" : ""}`}>
                {opcionesModalidad.map(opt => (
                  <div 
                    key={opt.value} 
                    className={`custom-dropdown-option ${filters.modalidad === opt.value ? "selected" : ""}`}
                    onClick={() => handleSelect("modalidad", opt.value)}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-item custom-dropdown-container">
              <i className="fi fi-rr-calendar-clock"></i>
              <div className="custom-dropdown-trigger" onClick={() => toggleDropdown("contratacion")}>
                <span className={filters.contratacion ? "selected-text" : "placeholder-text"}>
                  {opcionesContratacion.find(opt => opt.value === filters.contratacion)?.label || "Contratación"}
                </span>
                <i className={`fi fi-rr-angle-small-down chevron ${activeDropdown === "contratacion" ? "open" : ""}`}></i>
              </div>
              <div className={`custom-dropdown-menu ${activeDropdown === "contratacion" ? "active" : ""}`}>
                {opcionesContratacion.map(opt => (
                  <div 
                    key={opt.value} 
                    className={`custom-dropdown-option ${filters.contratacion === opt.value ? "selected" : ""}`}
                    onClick={() => handleSelect("contratacion", opt.value)}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-item custom-dropdown-container">
              <i className="fi fi-rr-calendar"></i>
              <div className="custom-dropdown-trigger" onClick={() => toggleDropdown("fecha")}>
                <span className={filters.fecha ? "selected-text" : "placeholder-text"}>
                  {opcionesFecha.find(opt => opt.value === filters.fecha)?.label || "Fecha de pub."}
                </span>
                <i className={`fi fi-rr-angle-small-down chevron ${activeDropdown === "fecha" ? "open" : ""}`}></i>
              </div>
              <div className={`custom-dropdown-menu right-aligned ${activeDropdown === "fecha" ? "active" : ""}`}>
                {opcionesFecha.map(opt => (
                  <div 
                    key={opt.value} 
                    className={`custom-dropdown-option ${filters.fecha === opt.value ? "selected" : ""}`}
                    onClick={() => handleSelect("fecha", opt.value)}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-item">
              <i className="fi fi-rr-chart-pie-alt"></i>
              <input 
                type="number" 
                name="afinidad"
                value={filters.afinidad}
                onChange={handleInputChange}
                placeholder="% Afinidad" 
                min="0" 
                max="100" 
                className="filter-input-number affinity-input"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
});

export default Nav_SearchCandi;