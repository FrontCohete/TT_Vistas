import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import '../assets/css/graphs_global.css'; 

const COLORES = ['#132f70', '#122552', '#2a94f4', '#ffbe55'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontWeight="bold" fontSize={14}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const GraficoPastel = ({ datos }) => {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      <div className="legend-container">
        {datos.map((item, index) => {
          const colorActual = COLORES[index % COLORES.length];
          return (
            <div key={index} className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: colorActual }}></span>
              <span className="legend-abbr" style={{ color: colorActual }}>
                {item.carrera}:
              </span>
              <span className="legend-desc">
                {item.nombreLargo}
              </span>
            </div>
          );
        })}
      </div>

      <div className="chart-wrapper-pie">
        <ResponsiveContainer width="100%" height={300}>
          {/* Se agregó style={{ outline: 'none' }} para quitar el recuadro negro */}
          <PieChart style={{ outline: 'none' }}>
            <Pie
              data={datos} cx="50%" cy="50%" labelLine={false}
              label={renderCustomizedLabel} outerRadius={135} 
              dataKey="cantidad" nameKey="carrera"
            >
              {datos.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const GraficoBarras = ({ datos, ejeXClave, barras }) => {
  return (
    <div className="chart-wrapper-bar">
      <ResponsiveContainer width="100%" height={320}>
        {/* Se agregó style={{ outline: 'none' }} para quitar el recuadro negro */}
        <BarChart data={datos} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} style={{ outline: 'none' }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey={ejeXClave} stroke="#9CA3AF" tick={{fill: '#6B7280', fontSize: 12}} tickLine={false} axisLine={false} />
          <YAxis stroke="#9CA3AF" tick={{fill: '#6B7280', fontSize: 12}} tickLine={false} axisLine={false} />
          
          <Tooltip 
            cursor={{ fill: '#F3F4F6' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          
          {barras.map((config, index) => (
            <Bar key={index} dataKey={config.clave} name={config.nombre} fill={config.color} radius={[4, 4, 0, 0]} barSize={32} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export { GraficoPastel, GraficoBarras };