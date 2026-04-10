import 'normalize.css';
import '../assets/css/main_index.css';
import img_emp from '../assets/img-no-opt/img-rec.svg';
import img_usr from '../assets/img-no-opt/img-usr.svg';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ENV } from '../config/env';

fetch(`${ENV.API_URL}/auth/login`)

export default function Main_ls() {
    const [activeTab, setActiveTab] = useState('candidato');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const slideVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const tabData = {
        candidato: {
            subtitle: 'como candidato',
            image: img_usr,
            sideLinkText: 'Registrarse',
        },
        empresa: {
            subtitle: 'como empresa o reclutador',
            image: img_emp,
            sideLinkText: 'Pre Registrarse',
        },
    };

    const currentTab = tabData[activeTab];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                email: formData.email,
                password: formData.password,
                userType: activeTab, // candidato o empresa
            };

            const result = await loginUser(payload);

            console.log('Login exitoso:', result);

            // Guardar token si tu API lo retorna
            if (result.token) {
                localStorage.setItem('token', result.token);
            }

        } catch (error) {
            console.error('Error en login:', error.message);
        }
    };

    return (
        <main>
            <div className='tabs'>
                <section className='tab-btn'>
                    <button
                        type="button"
                        onClick={() => setActiveTab('candidato')}
                        className={activeTab === 'candidato' ? 'active' : ''}
                    >
                        Candidato
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('empresa')}
                        className={activeTab === 'empresa' ? 'active' : ''}
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
                            className='container'
                        >
                            <div className='container-content'>
                                <h2>Iniciar sesión</h2>
                                <span>{currentTab.subtitle}</span>

                                <form onSubmit={handleSubmit}>
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            name="email"
                                            id={`email-${activeTab}`}
                                            className="input-field"
                                            placeholder=" "
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor={`email-${activeTab}`} className="input-label">
                                            Correo electrónico
                                        </label>
                                    </div>

                                    <div className="input-group">
                                        <input
                                            type="password"
                                            name="password"
                                            id={`password-${activeTab}`}
                                            className="input-field"
                                            placeholder=" "
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor={`password-${activeTab}`} className="input-label">
                                            Contraseña
                                        </label>
                                    </div>

                                    <input type="submit" value="Enviar" className='btn-azl' />

                                    <div className="form-input">
                                        <a href="#">Olvidé mi contraseña</a>
                                    </div>
                                </form>
                            </div>

                            <div className='container-aside'>
                                <img src={currentTab.image} alt="Imagen decorativa" />
                                <a href="#">{currentTab.sideLinkText}</a>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </section>
            </div>
        </main>
    );
}