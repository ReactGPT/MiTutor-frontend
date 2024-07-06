import React from 'react';
import welcome from '../../../assets/welcome.webp';

const PageInicioTutor: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[100%]'>
      <div className='flex justify-center items-center h-4/5'>
        <img src={welcome} alt="welcome" className='max-h-full' />
      </div>
      <h1 className='mt-4 text-3xl font-bold'>
        ¡Hola! Bienvenido a MiTutor
      </h1>
      <p className='mt-2 text-lg text-center'>
        Para comenzar, haz click en una de las opciones del menú de la izquierda.
      </p>
    </div>
  );
};

export default PageInicioTutor;