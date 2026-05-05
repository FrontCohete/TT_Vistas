import React from 'react';
import { useParams } from 'react-router-dom';

const View_Postulantes = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Postulantes para la vacante con ID: {id}</h2>
      {/* Aquí irá una tabla de candidatos (espero)*/}
    </div>
  );
};

export default View_Postulantes;