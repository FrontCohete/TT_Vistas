import 'normalize.css'
import '../assets/css/main_index.css'
import img_admin from '../assets/img-no-opt/img-adm.svg';
import img_emp from '../assets/img-no-opt/img-rec.svg';
import img_usr from '../assets/img-no-opt/img-usr.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/global_nav.css'


const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="contact-info">
            <span className="info-item">
              <i className="location-icon"></i> 4578 Marmora Road, Glasgow, D04 89GR
            </span>
            <span className="info-item">
              <i className="phone-icon"></i> (800) 123-0045 ; (800) 123-0045
            </span>
          </div>
          <div className="social-icons">
            <a href="#facebook">f</a>
            <a href="#twitter">t</a>
            <a href="#google">G+</a>
            <a href="#vimeo">v</a>
            <a href="#youtube">y</a>
            <a href="#pinterest">p</a>
          </div>
        </div>
      </div>

      <div className="main-nav">
        <div className="main-nav-content">
          <div className="logo">
            <span className="logo-icon">▲</span>
            <span className="logo-text">Element</span>
            <span className="logo-badge">FREE</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home" className="active">HOME</a></li>
            <li><a href="#about">ABOUT</a></li>
            <li><a href="#typography">TYPOGRAPHY</a></li>
            <li><a href="#contacts">CONTACTS</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;