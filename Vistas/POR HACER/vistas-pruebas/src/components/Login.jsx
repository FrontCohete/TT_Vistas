import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/login_page.css'; 

import img_hero from '../assets/img-no-opt/img-usr.svg';
import logo from '../assets/img-no-opt/logo-caspita.png'; 
import img_mision from '../assets/img-no-opt/img-mision.png';
import img_vision from '../assets/img-no-opt/img-vision.png';

export default function LandingPage() {
    // Estado del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Estructura preparada para el consumo del endpoint y pruebas de integración 
        try {
            /* 
            const response = await fetch('https://localhost:TU_PUERTO/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
                throw new Error('Error de autenticación');
            }
            
            const data = await response.json();
            console.log('Autenticación exitosa:', data);
            */
            
            console.log(`Simulando envío a endpoint:`, { email, password });
        } catch (error) {
            console.error("Error en la petición de login:", error);
        }
    };

    return (
        <div className="landing-wrapper">
            {/* NAVEGACIÓN */}
             <nav>
                <div className='navbar'>
                    <div className='nav-slogan'>
                        <h2>BOLSA  DE  TRABAJO  PARA  ALUMNOS  DE  LA  <span>ESCOM</span></h2>
                    </div> 
                </div> 
            </nav>
            <main>
                {/* SECCIÓN HERO */}
                <section id="inicio" className="hero-section">
                    <div className="hero-text">
                        <div className='hero-logo'>
                            <img src={logo} alt="logo de Caspita" />
                            <h1>CASPITA</h1>
                        </div>
                        <p>Vinculando a los estudiantes con el mercado laboral</p>
                        
                        <div className="hero-buttons">
                            <Link to="/registro-candidato" className="btn-solid-bld">
                                Regístrate como Candidato
                            </Link>
                            <Link to="/registro-empresa" className="btn-solid-guinda">
                                Publica Oferta como Empresa
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image-container">
                        <img src={img_hero} alt="Conectando talento" />
                    </div>
                </section>

                <section id="nosotros" className="caspita-mv-section">
                    <div className="info-card-login">
                        <img src={img_mision} alt="Fondo Misión" className="watermark-img" />
                        <div className="card-content">
                            <h3>NUESTRA MISIÓN</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias vel deleniti eius illum error. Modi, nihil nesciunt explicabo repudiandae vel error. Animi incidunt provident impedit illum facere molestiae distinctio deleniti.</p>
                        </div>
                    </div>
                    <div className="info-card-login">
                        <img src={img_vision} alt="Fondo Visión" className="watermark-img" />
                        <div className="card-content">
                            <h3>NUESTRA VISIÓN</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque asperiores reiciendis veniam tempora quod at eius magnam, eaque porro, autem sequi recusandae. Ducimus nam quae, neque placeat accusantium aliquid eos.</p>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN DE LOGIN (Formulario Único) */}
                <section id="login-section" className="login-section-wrapper">
                    <div className='login-card-wrapper'>
                        <div className='login-card'>
                            <div className='login-content'>
                                <div className="login-header">
                                    <h2>Bienvenido</h2>
                                    <p>Ingresa tus credenciales para acceder a tu cuenta</p>
                                </div>

                                <form onSubmit={handleSubmit} className="modern-form">
                                    <div className="modern-input-group">
                                        <label htmlFor="email-login">Correo electronico</label>
                                        <div className="input-icon-wrapper">
                                            <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                            
                                            <input 
                                                type="email" 
                                                id="email-login" 
                                                className="modern-input" 
                                                placeholder="ejemplo@alumno.ipn.mx" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="modern-input-group">
                                        <label htmlFor="password-login">Contraseña</label>
                                        <div className="input-icon-wrapper">
                                            <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                            
                                            <input 
                                                type="password" 
                                                id="password-login" 
                                                className="modern-input" 
                                                placeholder="••••••••" 
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-options">
                                        <a href="#recuperar" className="forgot-password">¿Olvidaste tu contraseña?</a>
                                    </div>

                                    <button type="submit" className='btn-modern-submit'>Ingresar a mi cuenta</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}