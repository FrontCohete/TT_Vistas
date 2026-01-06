import 'normalize.css';
import '../assets/css/main_index.css';
import img_admin from '../assets/img-no-opt/img-adm.svg';
import img_emp from '../assets/img-no-opt/img-rec.svg';
import img_usr from '../assets/img-no-opt/img-usr.svg';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Main_ls() {
    // 1. Declaramos el estado para saber qué tab está visible (por defecto 'candidato')
    const [activeTab, setActiveTab] = useState('candidato');

    return (
        <main>
            <div className='tabs'>
                <section className='tab-btn'>
                    {/* 2. Agregamos el onClick para cambiar el estado */}
                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveTab('candidato'); }}
                        className={activeTab === 'candidato' ? 'active' : ''} // Opcional: para estilos CSS
                    >
                        Candidato
                    </a>
                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveTab('empresa'); }}
                        className={activeTab === 'empresa' ? 'active' : ''}
                    >
                        Empresa
                    </a>
                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveTab('administrador'); }}
                        className={activeTab === 'administrador' ? 'active' : ''}
                    >
                        Administrador
                    </a>
                </section>

                <section className='tab-content'>
                    
                    {/* 3. Renderizado Condicional: Bloque Candidato */}
                    {activeTab === 'candidato' && (
                        <div className='container'>
                            <div className='container-content'>
                                <h2>Iniciar Sesión</h2>
                                <form action="">
                                    <label htmlFor="user-cand">Usuario</label>
                                    <input type="text" id="user-cand" />
                                    <label htmlFor="pass-cand">Contraseña</label>
                                    <input type="password" name="" id="pass-cand" />
                                    <input type="submit" value="Enviar" />
                                </form>
                            </div>
                            <div className='container-aside'>
                                <img src={img_usr} alt="Imagen decorativa" />
                                <a href="#">Registrarse</a>
                            </div>
                        </div>
                    )}

                    {/* 3. Renderizado Condicional: Bloque Empresa */}
                    {activeTab === 'empresa' && (
                        <div className='container'>
                            <div className='container-content'>
                                <h2>Iniciar Sesión</h2>
                                <form action="">
                                    <label htmlFor="user-emp">Usuario</label>
                                    <input type="text" id="user-emp" />
                                    <label htmlFor="pass-emp">Contraseña</label>
                                    <input type="password" name="" id="pass-emp" />
                                    <input type="submit" value="Enviar" />
                                </form>
                            </div>
                            <div className='container-aside'>
                                <img src={img_emp} alt="Imagen decorativa" />
                                <a href="#">Pre Registrarse</a>
                            </div>
                        </div>
                    )}

                    {/* 3. Renderizado Condicional: Bloque Administrador */}
                    {activeTab === 'administrador' && (
                        <div className='container'>
                            {/* Nota: En tu código original usas 'form-candidato' aquí también, verifica si necesitas 'form-admin' */}
                            <div className='container-content'> 
                                <h2>Iniciar Sesión</h2>
                                <form action="">
                                    <label htmlFor="user-admin">Usuario</label>
                                    <input type="text" id="user-admin" />
                                    <label htmlFor="pass-admin">Contraseña</label>
                                    <input type="password" name="" id="pass-admin" />
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