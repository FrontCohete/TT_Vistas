import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/index.css'; 

import img_hero from '../assets/img-no-opt/img-adm.svg';
import img_emp from '../assets/img-no-opt/img-rec.svg';
import img_usr from '../assets/img-no-opt/img-usr.svg';
import logo from '../assets/img-no-opt/logo-caspita.png'; 
import img_mision from '../assets/img-no-opt/img-mision.png';
import img_vision from '../assets/img-no-opt/img-vision.png';

const LoginForm = ({ idPrefix, title, image, registerText, registerLink }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Enviando login de ${title}:`, { email, password });
    };

    return (
        <div className='login-container'>
            <div className='login-content'>
                <div className="login-header">
                    <h2>Bienvenido de vuelta</h2>
                    <p>Ingresa tus datos para acceder como <strong>{title}</strong></p>
                </div>

                <form onSubmit={handleSubmit} className="modern-form">
                    <div className="modern-input-group">
                        <label htmlFor={`email-${idPrefix}`}>Correo institucional</label>
                        <div className="input-icon-wrapper">
                            <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            
                            <input 
                                type="email" 
                                id={`email-${idPrefix}`} 
                                className="modern-input" 
                                placeholder="ejemplo@alumno.ipn.mx" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="modern-input-group">
                        <label htmlFor={`password-${idPrefix}`}>Contraseña</label>
                        <div className="input-icon-wrapper">
                            <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            
                            <input 
                                type="password" 
                                id={`password-${idPrefix}`} 
                                className="modern-input" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Recordarme</span>
                        </label>
                        <a href="#recuperar" className="forgot-password">¿Olvidaste tu contraseña?</a>
                    </div>

                    <button type="submit" className='btn-modern-submit'>Ingresar a mi cuenta</button>
                </form>
            </div>
            
            <div className='login-aside'>
                <div className="aside-illustration-box">
                    <img src={image} alt={`Ilustración para ${title}`} className="login-image" />
                </div>
                <div className="aside-text">
                    <h3>¿Nuevo en Caspita?</h3>
                    <p>Únete a la principal red de talento de la ESCOM.</p>
                    <a href={registerLink} className="btn-modern-register">{registerText}</a>
                </div>
            </div>
        </div>
    );
};

export default function LandingPage() {
    const [activeTab, setActiveTab] = useState('candidato');

    const slideVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
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
                            <a href="#registro-candidato" className="btn-solid-bld">Regístrate como Candidato</a>
                            <a href="#registro-empresa" className="btn-solid-guinda">Publica Oferta como Empresa</a>
                        </div>
                    </div>
                    <div className="hero-image-container">
                        <img src={img_hero} alt="Conectando talento" />
                    </div>
                </section>

                {/* SECCIÓN MISIÓN Y VISIÓN */}
                <section id="nosotros" className="institutional-section">
                    <div className="info-card">
                        <img src={img_mision} alt="Fondo Misión" className="watermark-img" />
                        <div className="card-content">
                            <h3>NUESTRA MISIÓN</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias vel deleniti eius illum error. Modi, nihil nesciunt explicabo repudiandae vel error. Animi incidunt provident impedit illum facere molestiae distinctio deleniti.</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <img src={img_vision} alt="Fondo Visión" className="watermark-img" />
                        <div className="card-content">
                            <h3>NUESTRA VISIÓN</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque asperiores reiciendis veniam tempora quod at eius magnam, eaque porro, autem sequi recusandae. Ducimus nam quae, neque placeat accusantium aliquid eos.</p>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN DE LOGIN */}
                <section id="login-section" className="login-section-wrapper">
                    <div className='tabs-container'>
                        <section className='tab-btn'>
                            <button 
                                onClick={() => setActiveTab('candidato')}
                                className={activeTab === 'candidato' ? 'active' : ''}
                                aria-label='Iniciar sesión como candidato'
                            >
                                Candidato
                            </button>
                            <button 
                                onClick={() => setActiveTab('empresa')}
                                className={activeTab === 'empresa' ? 'active' : ''}
                                aria-label='Iniciar sesión como empresa'
                            >
                                Empresa
                            </button>
                        </section>

                        <section className='tab-content' style={{ overflow: 'hidden', position: 'relative' }}>
                            <AnimatePresence mode='wait'>
                                <motion.div 
                                    key={activeTab} 
                                    variants={slideVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                >
                                    {activeTab === 'candidato' ? (
                                        <LoginForm 
                                            idPrefix="c"
                                            title="candidato"
                                            image={img_usr}
                                            registerText="Registrarse"
                                            registerLink="#registro-candidato"
                                        />
                                    ) : (
                                        <LoginForm 
                                            idPrefix="e"
                                            title="empresa o reclutador"
                                            image={img_emp}
                                            registerText="Pre Registrarse"
                                            registerLink="#registro-empresa"
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </section>
                    </div>
                </section>
            </main>
        </div>
    );
}