import React from 'react';
import { useLocation } from 'react-router-dom';

const DetalleDisponibilidadTutores: React.FC = () => {
  const { state } = useLocation();
  const { tutor } = state;
  console.log("tutor", tutor);

  return (
    <div>DetalleDisponibilidadTutores</div>
  );
};

export default DetalleDisponibilidadTutores;