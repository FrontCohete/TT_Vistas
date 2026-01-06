import 'normalize.css'
import '../assets/css/main_index.css'
import img_admin from '../assets/img-no-opt/img-adm.svg';
import img_emp from '../assets/img-no-opt/img-rec.svg';
import img_usr from '../assets/img-no-opt/img-usr.svg';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Main_ls(){
    return (
            <main>
                <div className='tabs'>
                    <section className='tab-btn'>
                        <a href="#">Candidato</a>
                        <a href="#">Empresa</a>
                        <a href="#">Administrador</a>
                    </section>
                    <section className='tab-content'>
                        <div className='container'>
                            <div className='form-candidato'>
                                <h2>Iniciar Sesión</h2>
                                <form action="">
                                    <label htmlFor="">Usuario</label>
                                    <input type="text" />
                                    <label htmlFor="">Contraseña</label>
                                    <input type="password" name="" id="" />
                                    <input type="submit" value="Enviar" />
                                </form>
                            </div>
                            <div className='container-aside'>
                                <img src={img_usr} alt="Imagen decorativa" />
                                <a href="#">Registrarse</a>
                            </div>
                        </div>
                        <div className='container'>
                            <div className='form-Empresa'>
                                <h2>Iniciar Sesión</h2>
                                <form action="">
                                    <label htmlFor="">Usuario</label>
                                    <input type="text" />
                                    <label htmlFor="">Contraseña</label>
                                    <input type="password" name="" id="" />
                                    <input type="submit" value="Enviar" />
                                </form>
                            </div>
                            <div className='container-aside'>
                                <img src={img_emp} alt="Imagen decorativa" />
                                <a href="#">Pre Registrarse</a>
                            </div>
                        </div>
                        <div className='container'>
                            <div className='form-candidato'>
                                <h2>Iniciar Sesión</h2>
                                <form action="">
                                    <label htmlFor="">Usuario</label>
                                    <input type="text" />
                                    <label htmlFor="">Contraseña</label>
                                    <input type="password" name="" id="" />
                                    <input type="submit" value="Enviar" />
                                </form>
                            </div>
                            <div className='container-aside'>
                                <img src={img_admin} alt="Imagen decorativa" />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        );

}