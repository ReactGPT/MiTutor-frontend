import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import Calendario from '../../../components/Calendar/Calendario';
import { useEffect, useState } from 'react';
import { useCitasPorTutor } from '../../../store/hooks/useCita';
import { useTitle } from '../../../context/TitleContext';

const PageCalendarioTutor = () => {
  const { setTitle } = useTitle();
  setTitle("Calendario");

  const { cita, fetchCita } = useCitasPorTutor(1);

  useEffect(() => {
    fetchCita();
  }, []);

  //ir a disponibilidad
  const navigate = useNavigate();

  const goToDisponibilidad = () => {
    navigate('/calendario/agregarDisponibilidad');
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full flex items-center justify-between gap-5">
        <div className="flex gap-5 h-full">
          <div className='flex h-full items-center gap-3'>
            <div className='flex bg-white p-1 items-center gap-3 rounded px-2'>
              <div className='bg-[#65C3D0] w-2.5 h-2.5'></div>
              <label>Disponible</label>
            </div>
            <div className='flex bg-white p-1 items-center gap-3 rounded px-2'>
              <div className='bg-[#52D076] w-2.5 h-2.5'></div>
              <label>Registrado</label>
            </div>
            <div className='flex bg-white p-1 items-center gap-3 rounded px-2'>
              <div className='bg-[#D05252] w-2.5 h-2.5'></div>
              <label>Pendiente Resultados</label>
            </div>
            <div className='flex bg-white p-1 items-center gap-3 rounded px-2'>
              <div className='bg-[#206CE5] w-2.5 h-2.5'></div>
              <label>Cita completada</label>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <Button text='Ver Disponibilidad' onClick={goToDisponibilidad} variant="primario" />
        </div>
      </div>
      <div className="flex-1 w-full overflow-auto bg-white rounded-md p-4">
        <Calendario citas={cita} />
      </div>
    </div >
  );
};

export default PageCalendarioTutor;