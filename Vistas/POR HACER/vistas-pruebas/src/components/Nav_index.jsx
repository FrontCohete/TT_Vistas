
import 'normalize.css'
import '../assets/css/main_nav.css'
import logo from '../assets/img-no-opt/logo-caspita.png';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Nav(){
    const [showInfo, setShowInfo] = useState(false);
    const [showManual, setShowManual] = useState(false);
    return(
        <>
            <nav>
                <div className='navbar'>
                    <div className='nav-item'>
                        <a href="#" alt="Información sobre Caspita" onClick={() => setShowInfo(true)}>¿Qué es Caspita?</a>
                    </div>
                    <div className='nav-item-logo'>
                        <img src={logo} alt="logo de Caspita" />
                        <h1>CASPITA</h1>
                    </div>
                    <div className='nav-item'onClick={() => setShowManual(true)}>
                        <a href="#" alt="Acceso a manuales de usuario">Manual de Usuario</a>
                    </div>
                </div> 
            </nav>
            {/* Modal de Información */}
            <Modal show={showInfo} onHide={() => setShowInfo(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>¿Qué es Caspita?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Añadir descripción.</Modal.Body>
            </Modal>

            {/* Modal de Manual */}
            <Modal show={showManual} onHide={() => setShowManual(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Manual de Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>Añadir Manuales.</Modal.Body>
            </Modal>
        </>
    );
}