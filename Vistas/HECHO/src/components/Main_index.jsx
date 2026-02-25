import 'normalize.css';
import '../assets/css/main_index.css';
import img_admin from '../assets/img-no-opt/img-adm.svg';
import img_emp from '../assets/img-no-opt/img-rec.svg';
import img_usr from '../assets/img-no-opt/img-usr.svg';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// 1. Importamos Framer Motion
import { motion, AnimatePresence } from 'framer-motion';

export default function Main_ls() {
    const [activeTab, setActiveTab] = useState('candidato');

    // 2. Definimos las variantes de la animación (el "slide")
    const slideVariants = {
        initial: { opacity: 0, y: 20 }, // Empieza un poco abajo y transparente
        animate: { opacity: 1, y: 0 },  // Sube a su posición original
        exit: { opacity: 0, y: -20 },   // Sale hacia arriba mientras desaparece
    };

    return (
        <main>
            <div className='tabs'>
                <section className='tab-btn'>
                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveTab('candidato'); }}
                        className={activeTab === 'candidato' ? 'active' : ''}
                        aria-label='Iniciar sesión o registrarse como candidato' 
                        title='Iniciar sesión o registrarse como candidato'
                    >
                        Candidato
                    </a>
                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveTab('empresa'); }}
                        className={activeTab === 'empresa' ? 'active' : ''}
                        aria-label='Iniciar sesión o registrarse como reclutador o empresa' 
                        title='Iniciar sesión o registrarse como reclutador o empresa'
                    >
                        Empresa
                    </a>
                </section>

                <section className='tab-content' style={{ overflow: 'hidden', position: 'relative' }}>
                    {/* 3. AnimatePresence permite animar componentes al desmontarse */}
                    <AnimatePresence mode='wait'>
                        {activeTab === 'candidato' ? (
                            <motion.div 
                                key="candidato" // La key es obligatoria para identificar el cambio
                                variants={slideVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className='container'
                            >
                                <div className='container-content'>
                                    <h2>Iniciar sesión</h2><span>como candidato</span>
                                    <form action="">
                                        <div className="input-group">
                                            <input type="email" id="email-c" className="input-field" placeholder=" " />
                                            <label htmlFor="email-c" className="input-label">Correo electrónico</label>
                                        </div>
                                        <div className="input-group">
                                            <input type="password" id="password-c" className="input-field" placeholder=" " />
                                            <label htmlFor="password-c" className="input-label">Contraseña</label>
                                        </div>
                                        <input type="submit" value="Enviar" className='btn-azl' />
                                        <div className="form-input">
                                           <a href="#">Olvidé mi contraseña</a> 
                                        </div>
                                    </form>
                                </div>
                                <div className='container-aside'>
                                    <img src={img_usr} alt="Imagen decorativa" />
                                    <a href="#">Registrarse</a>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="empresa"
                                variants={slideVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className='container'
                            >
                                <div className='container-content'>
                                    <h2>Iniciar sesión</h2><span>como empresa o reclutador</span>
                                    <form action="">
                                        <div className="input-group">
                                            <input type="email" id="email-e" className="input-field" placeholder=" " />
                                            <label htmlFor="email-e" className="input-label">Correo electrónico</label>
                                        </div>
                                        <div className="input-group">
                                            <input type="password" id="password-e" className="input-field" placeholder=" " />
                                            <label htmlFor="password-e" className="input-label">Contraseña</label>
                                        </div>
                                        <input type="submit" value="Enviar" className='btn-azl' />
                                        <div className="form-input">
                                           <a href="#">Olvidé mi contraseña</a> 
                                        </div>
                                    </form>
                                </div>
                                <div className='container-aside'>
                                    <img src={img_emp} alt="Imagen decorativa" />
                                    <a href="#">Pre Registrarse</a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </main>
    );
}