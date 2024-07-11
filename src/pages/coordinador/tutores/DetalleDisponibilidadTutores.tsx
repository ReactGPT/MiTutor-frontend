import React from 'react';
import { useLocation } from 'react-router-dom';
import PageAgregarDisponibilidadTutor from '../../tutor/calendario/PageAgregarDisponibilidadTutor';

const DetalleDisponibilidadTutores: React.FC = () => {
  const { state } = useLocation();
  const { tutor } = state;
  //console.log("tutor", tutor);

  return (
    <PageAgregarDisponibilidadTutor tutor={tutor} />
  );
};

export default DetalleDisponibilidadTutores;