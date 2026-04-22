import React, { useState, useMemo } from 'react';
import FigureTable from './FigureTable';
import ModalVisualizacion from './ModalPreRegView';
import ModalCorreccion from './Page_Test_Components';

const AprobacionEmpresas = () => {
  const [datosPendientes, setDatosPendientes] = useState([
    { id: 1, razonSocial: 'Industrias Iztapalapa S.A. de C.V.', correo: 'contacto@indiztapalapa.com.mx', giro: 'Manufactura', sector: 'Secundario', telefono: '5512345678', constanciaUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 2, razonSocial: 'Tecnologías Iztacalco S. de R.L.', correo: 'admin@teciztacalco.mx', giro: 'Desarrollo de Software', sector: 'Terciario', telefono: '5587654321', constanciaUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
  ]);

  const [sortConfig, setSortConfig] = useState({ clave: null, direccion: 'asc' });
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  
  // Estados independientes para cada Modal
  const [modalVisualizacionAbierto, setModalVisualizacionAbierto] = useState(false);
  const [modalCorreccionAbierto, setModalCorreccionAbierto] = useState(false);

  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '', tipo: '', saliendo: false });
  const [filasSaliendo, setFilasSaliendo] = useState([]); 

  const handleSort = (clave) => {
    let direccion = 'asc';
    if (sortConfig.clave === clave && sortConfig.direccion === 'asc') direccion = 'desc';
    setSortConfig({ clave, direccion });
  };

  const datosOrdenados = useMemo(() => {
    let datosOrdenables = [...datosPendientes];
    if (sortConfig.clave) {
      datosOrdenables.sort((a, b) => {
        if (a[sortConfig.clave] < b[sortConfig.clave]) return sortConfig.direccion === 'asc' ? -1 : 1;
        if (a[sortConfig.clave] > b[sortConfig.clave]) return sortConfig.direccion === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return datosOrdenables;
  }, [datosPendientes, sortConfig]);

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ visible: true, mensaje, tipo, saliendo: false });
    setTimeout(() => setNotificacion(prev => ({ ...prev, saliendo: true })), 3500);
    setTimeout(() => setNotificacion({ visible: false, mensaje: '', tipo: '', saliendo: false }), 4000);
  };

  const procesarAccion = (id, mensaje, tipoNotificacion) => {
    setModalVisualizacionAbierto(false); 
    setModalCorreccionAbierto(false);
    setEmpresaSeleccionada(null);
    setFilasSaliendo(prev => [...prev, id]);

    setTimeout(() => {
      setDatosPendientes(prev => prev.filter(empresa => empresa.id !== id));
      setFilasSaliendo(prev => prev.filter(fId => fId !== id));
      mostrarNotificacion(mensaje, tipoNotificacion);
    }, 300);
  };

  // Control de apertura de modales
  const abrirVisualizacion = (empresa) => {
    setEmpresaSeleccionada(empresa);
    setModalVisualizacionAbierto(true);
  };

  const abrirCorreccion = (empresa) => {
    setEmpresaSeleccionada(empresa);
    setModalCorreccionAbierto(true);
  };

  // AVISOS DE APROBACIÓN/RECHAZO
  const handleAprobar = (id) => procesarAccion(id, 'La empresa ha sido aprobada exitosamente.', 'exito');
  const handleRechazar = (id) => procesarAccion(id, 'La empresa ha sido rechazada.', 'error');
  
  // Manejador para el envío del correo
  const handleEnviarCorreccion = (id, correcciones) => {
    console.log("Correcciones solicitadas:", correcciones);
    procesarAccion(id, 'Correo de corrección enviado exitosamente.', 'advertencia');
  };

  const columnas = [
    { clave: 'razonSocial', encabezado: 'Razón Social', width: '20%' },
    { clave: 'correo', encabezado: 'Correo Electrónico', width: '15%' },
    { clave: 'giro', encabezado: 'Giro', width: '10%' },
    { clave: 'sector', encabezado: 'Sector', width: '10%' },
    { 
      clave: 'constanciaUrl', encabezado: 'Constancia Fiscal', sortable: false, width: '15%',
      render: (fila) => (
        <a className="link-documento" href={fila.constanciaUrl} target="_blank" rel="noopener noreferrer">
          <i className="fi fi-rr-document"></i> Ver Documento
        </a>
      )
    },
    { 
      clave: 'acciones', encabezado: 'Acciones', sortable: false, width: '20%',
      render: (fila) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button className="btn-animado btn-azul" onClick={() => abrirVisualizacion(fila)}>
            <i className="fi fi-rr-eye"></i> Visualizar
          </button>
          <button className="btn-animado btn-naranja" onClick={() => abrirCorreccion(fila)}>
            <i className="fi fi-rr-edit"></i> Corregir
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="contenedor-principal">
      <h2 className="titulo-principal">Registros de Empresas por Aprobar</h2>
      
      <FigureTable 
        columnas={columnas} datos={datosOrdenados} onSort={handleSort} 
        sortConfig={sortConfig} filasSaliendo={filasSaliendo}
        mensajeVacio="No hay empresas pendientes de revisión."
      />

      {modalVisualizacionAbierto && (
        <ModalVisualizacion 
          empresa={empresaSeleccionada} 
          alCerrar={() => setModalVisualizacionAbierto(false)} 
          onAprobar={handleAprobar}
          onRechazar={handleRechazar}
        />
      )}

      {modalCorreccionAbierto && (
        <ModalCorreccion
          empresa={empresaSeleccionada}
          alCerrar={() => setModalCorreccionAbierto(false)}
          onEnviar={handleEnviarCorreccion}
        />
      )}

      {notificacion.visible && (
        <div className={`toast-notificacion ${notificacion.tipo} ${notificacion.saliendo ? 'saliendo' : ''}`}>
          {notificacion.mensaje}
        </div>
      )}

      <style>{`
        /* --- ESTILOS GENERALES (Escritorio por defecto) --- */
        .contenedor-principal {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .titulo-principal {
          margin-bottom: 20px;
          color: #333;
          font-size: 1.8rem;
          transition: font-size 0.3s ease;
        }

        .link-documento {
          color: #0056b3;
          text-decoration: underline;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .btn-animado {
          display: inline-flex; align-items: center; gap: 6px; justify-content: center;
          padding: 6px 12px; border: none; border-radius: 4px; 
          cursor: pointer; font-weight: bold; color: white;
          transition: all 0.2s ease-in-out; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          font-size: 0.95rem;
        }
        .btn-animado i { font-size: 1.1rem; line-height: 1; transform: translateY(1px); }
        .btn-animado:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.15); }
        .btn-animado:active { transform: translateY(0); box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .btn-azul { background-color: #3b82f6; } .btn-azul:hover { background-color: #2563eb; }
        .btn-naranja { background-color: #f59e0b; } .btn-naranja:hover { background-color: #d97706; }
        
        .fila-tabla { transition: all 0.3s ease-in-out; opacity: 1; transform: translateX(0); }
        .fila-tabla.eliminando { opacity: 0; transform: translateX(-20px); background-color: #fef3c7 !important; }

        @keyframes toastEntrada { from { opacity: 0; transform: translateY(50px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes toastSalida { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(20px) scale(0.9); } }
        
        .toast-notificacion {
          position: fixed; bottom: 30px; right: 30px; padding: 16px 24px; border-radius: 8px;
          color: white; font-weight: bold; z-index: 2000; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
          animation: toastEntrada 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          font-size: 1rem;
        }
        .toast-notificacion.saliendo { animation: toastSalida 0.3s ease-in forwards; }
        .toast-notificacion.exito { background-color: #14b881b9; }
        .toast-notificacion.error { background-color: #be1f1fb2; }
        .toast-notificacion.advertencia { background-color: #ffbc03be; color: white; }
        
        
        /* --- MEDIA QUERIES PARA DISPOSITIVOS MÓVILES (Menos de 768px) --- */
        @media (max-width: 768px) {
          .contenedor-principal {
            padding: 10px; /* Reducimos el padding lateral para ganar espacio */
          }
          
          .titulo-principal {
            font-size: 1rem; /* Reducimos el tamaño del H2 */
            margin-bottom: 15px;
            
          }

          /* Aseguramos que la tabla completa reduzca su fuente */
          .custom-table th, 
          .custom-table td {
            font-size: 0.7rem !important; /* Forzamos el tamaño sobre tu css global si es necesario */
          }

          .link-documento {
            font-size: 0.85rem;
          }

          .btn-animado {
            font-size: 0.8rem;
            padding: 6px 8px; /* Botones un poco más compactos */
            gap: 4px;
          }

          .btn-animado i {
            font-size: 0.9rem;
          }

          .toast-notificacion {
            font-size: 0.9rem;
            padding: 12px 16px;
            bottom: 20px;
            right: 20px;
            left: 20px; /* Hacemos que el toast ocupe más ancho en móviles */
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AprobacionEmpresas;