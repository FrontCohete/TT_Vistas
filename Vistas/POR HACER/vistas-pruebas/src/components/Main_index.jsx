import 'normalize.css';
import '../assets/css/main_index.css';
import img_admin from '../assets/img-no-opt/img-adm.svg';
import img_emp from '../assets/img-no-opt/img-rec.svg';
import img_usr from '../assets/img-no-opt/img-usr.svg';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Main_ls() {
    const [activeTab, setActiveTab] = useState('candidato');

    return (
        <main>
            <div className='tabs'>
                <section className='tab-btn'>
                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveTab('candidato'); }}
                        className={activeTab === 'candidato' ? 'active' : ''}
                        aria-label='Iniciar sesión o registrarse como candidato' title='Iniciar sesión o registrarse como candidato'
                    >
                        Candidato
                    </a>
                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveTab('empresa'); }}
                        className={activeTab === 'empresa' ? 'active' : ''}
                        aria-label='Iniciar sesión o registrarse como reclutador o empresa' title='Iniciar sesión o registrarse como reclutador o empresa'
                    >
                        Empresa
                    </a>
                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveTab('administrador'); }}
                        className={activeTab === 'administrador' ? 'active' : ''}
                        aria-label='Iniciar sesión como administrador o sub administrador' title='Iniciar sesión o registrarse como administrador o sub administrador'
                    >
                        Administrador
                    </a>
                </section>

                <section className='tab-content'>
                    {activeTab === 'candidato' && (
                        <div className='container'>
                            <div className='container-content'>
                                <h2>Iniciar sesión como candidato</h2>
                                <form action="">
                                    <div class="input-group">
                                        <input type="email" id="email" className="input-field" placeholder=" " />
                                        <label htmlFor="email" className="input-label">Correo electrónico</label>
                                    </div>
                                    <div class="input-group">
                                        <input type="password" id="password" className="input-field" placeholder=" " />
                                        <label htmlFor="email" className="input-label">Contraseña</label>
                                    </div>
                                    <div className="form-input">
                                       <a href="#">Olvidé mi contraseña</a> 
                                    </div>
                                    <input type="submit" value="Enviar" />
                                </form>
                            </div>
                            <div className='container-aside'>
                                <img src={img_usr} alt="Imagen decorativa" />
                                <a href="#">Registrarse</a>
                            </div>
                        </div>
                    )}

                    {activeTab === 'empresa' && (
                        <div className='container'>
                            <div className='container-content'>
                                <h2>Iniciar sesión como empresa o reclutador</h2>
                                <form action="">
                                    <div class="input-group">
                                        <input type="email" id="email" className="input-field" placeholder=" " />
                                        <label htmlFor="email" className="input-label">Correo electrónico</label>
                                    </div>
                                    <div class="input-group">
                                        <input type="password" id="password" className="input-field" placeholder=" " />
                                        <label htmlFor="email" className="input-label">Contraseña</label>
                                    </div>
                                    <div className="form-input">
                                       <a href="#">Olvidé mi contraseña</a> 
                                    </div>
                                    <input type="submit" value="Enviar" />
                                </form>
                            </div>
                            <div className='container-aside'>
                                <img src={img_emp} alt="Imagen decorativa" />
                                <a href="#">Pre Registrarse</a>
                            </div>
                        </div>
                    )}

                    {activeTab === 'administrador' && (
                        <div className='container'>
                            <div className='container-content'> 
                                <h2>Iniciar sesión como administrador</h2>
                                <form action="">
                                    <div class="input-group">
                                        <input type="email" id="email" className="input-field" placeholder=" " />
                                        <label htmlFor="email" className="input-label">Correo electrónico</label>
                                    </div>
                                    <div class="input-group">
                                        <input type="password" id="password" className="input-field" placeholder=" " />
                                        <label htmlFor="email" className="input-label">Contraseña</label>
                                    </div>
                                    <div className="form-input">
                                       <a href="#">Olvidé mi contraseña</a> 
                                    </div>
                                    <input type="submit" value="Enviar" />
                                </form>
                            </div>
                            <div className='container-aside'>
                                <img src={img_admin} alt="Imagen decorativa" />
                            </div>
                        </div>
                    )}

                </section>
            </div>
        </main>
    );
}