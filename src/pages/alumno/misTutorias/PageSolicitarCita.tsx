import React from 'react';
import image from '/src/assets/Tutor/no-avatar.webp';
import CalendarioSolicitud from '../../../components/Calendar/CalendarioSolicitud';

const PageSolicitarCita: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full flex items-center justify-between gap-5">
        <div className="flex gap-5">
          <div className='flex h-8 items-center justify-center gap-5'>
            <img src={image} alt="Imagen Tutor" className="h-full rounded-full" />
            <h2 className='font-montserrat text-xl font-bold text-black'>Nombre del tutor</h2>
          </div>
        </div>
        <div className="flex gap-5 h-full">
          <div className='flex h-full items-center gap-3'>
            <div className='flex bg-white p-1 items-center gap-3 rounded px-2'>
              <div className='bg-[#65C3D0] w-2.5 h-2.5'></div>
              <label>Disponible</label>
            </div>
            <div className='flex bg-white p-1 items-center gap-3 rounded px-2'>
              <div className='bg-[#D05252] w-2.5 h-2.5'></div>
              <label>Ocupado</label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full overflow-auto bg-white rounded-md p-4">
        <CalendarioSolicitud programable />
      </div>
    </div >
  );
};

export default PageSolicitarCita;