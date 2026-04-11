import React from 'react';
import '../assets/css/table_global.css';

const FigureTable = ({ columnas, datos, mensajeVacio = "No hay registros disponibles", onSort, sortConfig }) => {
  return (
    <div className="table-responsive-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            {columnas.map((col, index) => {
              // Verificamos si la columna es ordenable (por defecto sí, a menos que col.sortable sea false como en 'acciones')
              const esOrdenable = onSort && col.sortable !== false;
              
              return (
                <th 
                  key={`th-${index}`} 
                  style={{ width: col.width || 'auto' }}
                  className={esOrdenable ? 'sortable-header' : ''}
                  onClick={() => esOrdenable ? onSort(col.clave) : null}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {col.encabezado}
                    
                    {/* Flechas de ordenamiento */}
                    {esOrdenable && (
                      <span className={`sort-icon ${sortConfig?.clave === col.clave ? 'active' : ''}`}>
                        {sortConfig?.clave === col.clave 
                          ? (sortConfig.direccion === 'asc' ? '▲' : '▼') 
                          : '↕'}
                      </span>
                    )}
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {datos && datos.length > 0 ? (
            datos.map((fila, indexFila) => (
              <tr key={`tr-${indexFila}`}>
                {columnas.map((col, indexCol) => (
                  <td key={`td-${indexFila}-${indexCol}`} data-label={col.encabezado}>
                    {col.render ? col.render(fila) : fila[col.clave]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnas.length} className="empty-state-cell">
                {mensajeVacio}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FigureTable;