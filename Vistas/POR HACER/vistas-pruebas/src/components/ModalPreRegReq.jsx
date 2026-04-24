import React, { useState } from 'react';

const ModalCorreccion = ({ empresa, alCerrar, onEnviar }) => {
  const [correcciones, setCorrecciones] = useState({});

  if (!empresa) return null;

  const campos = [
    { clave: 'razonSocial', etiqueta: 'Razón Social' },
    { clave: 'rfc', etiqueta: 'RFC' }, 
    { clave: 'correo', etiqueta: 'Correo Electrónico' },
    { clave: 'giro', etiqueta: 'Giro' },
    { clave: 'sector', etiqueta: 'Sector' },
    { clave: 'telefono', etiqueta: 'Teléfono' },
    { clave: 'constanciaUrl', etiqueta: 'Constancia Fiscal', esDocumento: true }
  ];

  const handleCambioCombo = (clave, motivo) => {
    setCorrecciones(prev => {
      const nuevasCorrecciones = { ...prev };
      if (motivo === '') {
        delete nuevasCorrecciones[clave];
      } else {
        nuevasCorrecciones[clave] = motivo;
      }
      return nuevasCorrecciones;
    });
  };

  const procesarEnvio = () => {
    const camposSeleccionados = Object.keys(correcciones);
    
    if (camposSeleccionados.length === 0) {
      alert("Debe seleccionar al menos un campo para solicitar una corrección.");
      return;
    }

    onEnviar(empresa.id, correcciones);
  };

  return (
    <>
      <div style={styles.overlay} onClick={alCerrar}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          
          <div style={styles.header}>
            <h2 style={styles.title}>
              <i className="fi fi-rr-edit" style={{ marginRight: '8px' }}></i>
              Seleccione los campos a corregir
            </h2>
            <button onClick={alCerrar} style={styles.closeButton} className="hover-rotate">&times;</button>
          </div>

          <div style={styles.body}>
            <div style={styles.empresaInfo}>
              <strong>Empresa:</strong> {empresa.razonSocial}
            </div>
            
            <div className="grid-campos">
              {campos.map((campo) => (
                <div key={campo.clave} style={styles.cardCampo}>
                  <label style={styles.labelCampo}>{campo.etiqueta}</label>
                  
                  <div style={styles.valorActual}>
                    {campo.esDocumento ? (
                      <a href={empresa[campo.clave]} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
                        Ver documento adjunto
                      </a>
                    ) : (
                      empresa[campo.clave]
                    )}
                  </div>

                  <select 
                    style={styles.comboBox}
                    onChange={(e) => handleCambioCombo(campo.clave, e.target.value)}
                    defaultValue=""
                  >
                    <option value="">Correcto (Sin cambios)</option>
                    <option value="Dato incorrecto">Dato incorrecto</option>
                    <option value="Ilegible o borroso">Ilegible o borroso</option>
                    <option value="No coincide con la constancia">No coincide con la constancia</option>
                    <option value="Falta actualizar">Falta actualizar</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.footer}>
            <button onClick={alCerrar} className="btn-modal btn-modal-gris">
              Cancelar
            </button>
            <button onClick={procesarEnvio} className="btn-modal btn-modal-naranja">
              <i className="fi fi-rr-envelope" style={{ marginRight: '8px', transform: 'translateY(1px)' }}></i>
              Solicitar corrección
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* === MEDIA QUERIES PARA MÓVILES === */
        .grid-campos {
          display: grid;
          grid-template-columns: repeat(2, 1fr); 
          gap: 20px;
        }

        @media (max-width: 768px) {
          .grid-campos {
            grid-template-columns: 1fr; 
            gap: 16px; 
          }
          
          .btn-modal {
            width: 100%; 
            justify-content: center;
          }
          
          .footer-responsivo {
            flex-direction: column-reverse; 
          }
        }

        /* === ANIMACIONES === */
        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUpModal { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        
        .btn-modal {
          padding: 10px 20px; border-radius: 6px; border: none; cursor: pointer;
          font-weight: bold; font-size: 1rem; color: white;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .btn-modal:hover { transform: scale(1.05); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .btn-modal:active { transform: scale(0.95); }

        .btn-modal-gris { background-color: #6b7280; } 
        .btn-modal-gris:hover { background-color: #4b5563; }
        .btn-modal-naranja { background-color: #f59e0b; display: flex; align-items: center; justify-content: center; } 
        .btn-modal-naranja:hover { background-color: #d97706; }
        
        .hover-rotate { transition: transform 0.3s ease-in-out, color 0.2s; }
        .hover-rotate:hover { transform: rotate(90deg) scale(1.2); color: #ef4444 !important; }
      `}</style>
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000, backdropFilter: 'blur(4px)', animation: 'fadeInOverlay 0.3s ease-out'
  },
  modal: {
    backgroundColor: '#fff', width: '90%', maxWidth: '800px', maxHeight: '90vh',
    borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', animation: 'scaleUpModal 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  header: {
    padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fef3c7'
  },
  title: { margin: 0, fontSize: 'clamp(1.1rem, 4vw, 1.25rem)', color: '#92400e', display: 'flex', alignItems: 'center' },
  closeButton: { background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: '#9ca3af', lineHeight: 1 },
  body: { flex: 1, padding: '24px', overflowY: 'auto', backgroundColor: '#f9fafb' },
  empresaInfo: { marginBottom: '20px', padding: '12px', backgroundColor: '#eff6ff', borderRadius: '8px', color: '#1e3a8a', border: '1px solid #bfdbfe' },
  cardCampo: {
    backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', 
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '8px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },
  labelCampo: { fontWeight: 'bold', color: '#374151', fontSize: '0.9rem' },
  valorActual: { color: '#6b7280', fontSize: '0.95rem', minHeight: '24px', wordBreak: 'break-word' },
  comboBox: {
    width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db',
    outline: 'none', cursor: 'pointer', backgroundColor: '#f9fafb', fontSize: '0.9rem', transition: 'border-color 0.2s'
  },
  footer: { padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '12px', backgroundColor: '#fff', flexWrap: 'wrap' }
};

export default ModalCorreccion;