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
                </section>

                <section className='tab-content'>
                    {activeTab === 'candidato' && (
                        <div className='container'>
                            <div className='container-content'>
                                <h2>Iniciar sesión</h2><span>como candidato</span>
                                <form action="">
                                    <div class="input-group">
                                        <input type="email" id="email" className="input-field" placeholder=" " aria-label='Ingrese el correo electrónico con el que se registró' title='Ingrese el correo electrónico con el que se registró'/>
                                        <label htmlFor="email" className="input-label">Correo electrónico</label>
                                    </div>
                                    <div class="input-group">
                                        <input type="password" id="password" className="input-field" placeholder=" " aria-label='Ingrese la constraseña con la que se registró' title='Ingrese la contraseña con la que se registró'/>
                                        <label htmlFor="email" className="input-label">Contraseña</label>
                                    </div>
                                    <input type="submit" value="Enviar" className='btn-azl' aria-label='Iniciar sesión' title='Iniciar sesión'/>
                                    <div className="form-input">
                                       <a href="#" aria-label='Recuperar contraseña' title='Recuperar contraseña'>Olvidé mi contraseña</a> 
                                    </div>
                                </form>
                            </div>
                            <div className='container-aside'>
                                <img src={img_usr} alt="Imagen decorativa" />
                                <a href="#" aria-label='Registrarse como candidato en caso de no tener una cuenta' title='Registrarse como candidato en caso de no tener una cuenta'>Registrarse</a>
                            </div>
                        </div>
                    )}

                    {activeTab === 'empresa' && (
                        <div className='container'>
                            <div className='container-content'>
                                <h2>Iniciar sesión</h2><span>como empresa o reclutador</span>
                                <form action="">
                                    <div class="input-group">
                                        <input type="email" id="email" className="input-field" placeholder=" " aria-label='Ingrese el correo electrónico con el que fué registrado' title='Ingrese el correo electrónico con el que fué registrado'/>
                                        <label htmlFor="email" className="input-label" >Correo electrónico</label>
                                    </div>
                                    <div class="input-group">
                                        <input type="password" id="password" className="input-field" placeholder=" " aria-label='Ingrese la contraseña con el que fué registrado' title='Ingrese la contraseña con el que fué registrado'/>
                                        <label htmlFor="email" className="input-label">Contraseña</label>
                                    </div>
                                    <input type="submit" value="Enviar" className='btn-azl'aria-label='Iniciar Sesión' title='Iniciar sesión'/>
                                    <div className="form-input">
                                       <a href="#" aria-label='Recuperar contraseña' title='Recuperar contraseña'>Olvidé mi contraseña</a> 
                                    </div>
                                </form>
                            </div>
                            <div className='container-aside'>
                                <img src={img_emp} alt="Imagen decorativa" />
                                <a href="#" aria-label='Realizar pre registro para una empresa' title='Realizar pre registro para una empresa'>Pre Registrarse</a>
                            </div>
                        </div>
                    )}


                </section>
            </div>
        </main>
    );
}