import React from 'react';
import Button from '../../../components/Button';

const PageCalendarioTutor = () => {
  return (
    <div className="w-full h-full">
      <div className="flex w-full">
        Filtro
        <Button onClick={() => null} variant="call-to-action" text='Agregar Cita' />
        <Button onClick={() => null} variant="call-to-action" text='Modificar Disponibilidad' />
      </div>
      <div className="w-full">
        Calendario
      </div>
    </div>
  );
};

export default PageCalendarioTutor;