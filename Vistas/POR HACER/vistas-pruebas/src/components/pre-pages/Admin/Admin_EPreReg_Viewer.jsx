import React, { useState, useMemo } from 'react';
import FigureTable from '../../FigureTable';
import ModalVisualizacion from '../../ModalPreRegView';
import ModalCorreccion from '../../ModalPreRegReq';
import '../../../assets/css/admin_View.css';

const AprobacionEmpresas = () => {
  const [datosPendientes, setDatosPendientes] = useState([
    { 
      id: 1, 
      razonSocial: 'Industrias Iztapalapa S.A. de C.V.', 
      rfc: 'IIZ010203ABC', 
      correo: 'contacto@indiztapalapa.com.mx', 
      giro: 'Manufactura', 
      sector: 'Público', 
      telefono: '5512345678', 
      constanciaUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' 
    },
    { 
      id: 2, 
      razonSocial: 'Tecnologías Iztacalco S. de R.L.', 
      rfc: 'TIZ040506DEF',
      correo: 'admin@teciztacalco.mx', 
      giro: 'Desarrollo de Software', 
      sector: 'Privado', 
      telefono: '5587654321', 
      constanciaUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' 
    }
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
    { clave: 'rfc', encabezado: 'RFC', width: '10%' }, // <-- NUEVA COLUMNA
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
    </div>
  );
};

export default AprobacionEmpresas;