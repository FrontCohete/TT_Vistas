import React from 'react';
import '../assets/css/table_global.css';

const FigureTable = ({ columnas, datos, mensajeVacio = "No hay registros disponibles", onSort, sortConfig, filasSaliendo = [] }) => {
  return (
    <div className="table-responsive-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            {columnas.map((col, index) => {
              const esOrdenable = onSort && col.sortable !== false;
              return (
                <th 
                  key={`th-${index}`} 
                  style={{ width: col.width || 'auto', cursor: esOrdenable ? 'pointer' : 'default' }}
                  className={esOrdenable ? 'sortable-header' : ''}
                  onClick={() => esOrdenable ? onSort(col.clave) : null}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {col.encabezado}
                    {esOrdenable && (
                      <span style={{ 
                        transition: 'transform 0.2s', 
                        transform: sortConfig?.clave === col.clave && sortConfig.direccion === 'desc' ? 'rotate(180deg)' : 'rotate(0)'
                      }}>
                        {sortConfig?.clave === col.clave ? '▲' : '↕'}
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
            datos.map((fila, indexFila) => {
              // NUEVO: Comprobamos si esta fila se está animando para salir
              const seEstaEliminando = filasSaliendo.includes(fila.id);
              
              return (
                <tr 
                  key={`tr-${fila.id}`} // IMPORTANTE: Usa el ID en lugar del index para que React no confunda las filas al animar
                  className={`fila-tabla ${seEstaEliminando ? 'eliminando' : ''}`}
                >
                  {columnas.map((col, indexCol) => (
                    <td key={`td-${fila.id}-${indexCol}`} data-label={col.encabezado}>
                      {col.render ? col.render(fila) : fila[col.clave]}
                    </td>
                  ))}
                </tr>
              );
            })
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