import React from 'react';

const ModalVisualizacion = ({ empresa, alCerrar, onAprobar, onRechazar }) => {
  if (!empresa) return null;

  return (
    <>
      <div style={styles.overlay} onClick={alCerrar}>
        {/* El e.stopPropagation() evita que hacer clic dentro del modal lo cierre */}
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div style={styles.header}>
            <div>
              <h2 style={styles.title}>{empresa.razonSocial}</h2>
              <p style={styles.subtitle}>
                <strong>Giro:</strong> {empresa.giro} | <strong>Sector:</strong> {empresa.sector}
              </p>
            </div>
            <button onClick={alCerrar} style={styles.closeButton} className="hover-rotate">&times;</button>
          </div>

          <div style={styles.body}>
            <iframe src={`${empresa.constanciaUrl}#toolbar=0`} title="Vista previa" style={styles.iframe} />
          </div>

          <div style={styles.footer}>
            <button onClick={() => onRechazar(empresa.id)} className="btn-modal btn-modal-rojo">
              Rechazar
            </button>
            <button onClick={() => onAprobar(empresa.id)} className="btn-modal btn-modal-verde">
              Aprobar
            </button>
          </div>
        </div>
      </div>

      {/* Inyección de Keyframes para el Modal */}
      <style>{`
        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUpModal { 
          from { opacity: 0; transform: scale(0.95) translateY(20px); } 
          to { opacity: 1; transform: scale(1) translateY(0); } 
        }
        
        .btn-modal {
          padding: 10px 20px; border-radius: 6px; border: none; cursor: pointer;
          font-weight: bold; font-size: 1rem; color: white;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-modal:hover { transform: scale(1.05); }
        .btn-modal:active { transform: scale(0.95); }
        .btn-modal-verde { background-color: #10b981; } .btn-modal-verde:hover { background-color: #059669; }
        .btn-modal-rojo { background-color: #ef4444; } .btn-modal-rojo:hover { background-color: #dc2626; }
        
        .hover-rotate { transition: transform 0.3s; }
        .hover-rotate:hover { transform: rotate(90deg) scale(1.2); color: #ef4444 !important; }
      `}</style>
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000, backdropFilter: 'blur(4px)',
    animation: 'fadeInOverlay 0.3s ease-out' // <--- Animación del fondo
  },
  modal: {
    backgroundColor: '#fff', width: '90%', maxWidth: '1000px', height: '90vh',
    borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    animation: 'scaleUpModal 0.4s cubic-bezier(0.16, 1, 0.3, 1)' // <--- Animación del cuadro
  },
  header: {
    padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb'
  },
  title: { margin: 0, fontSize: '1.5rem', color: '#111827' },
  subtitle: { margin: '4px 0 0 0', color: '#6b7280', fontSize: '0.95rem' },
  closeButton: { background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: '#9ca3af', lineHeight: 1 },
  body: { flex: 1, backgroundColor: '#525659' },
  iframe: { width: '100%', height: '100%', border: 'none' },
  footer: { padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '12px', backgroundColor: '#f9fafb' }
};

export default ModalVisualizacion;