import React, { useState } from 'react';
import IconTime from '../../../assets/svg/IconTime';
import ToggleButton from '../../../components/ToggleButton';
import { Button } from '../../../components';
import IconPencil from '../../../assets/svg/IconPencil';

const PageAgregarDisponibilidadTutor: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="flex items-center  text-3xl font-semibold text-black font-roboto">
          Disponibilidad Semanal
        </h1>
        <div className="flex gap-5">
          <Button text="Editar" onClick={() => { }} icon={IconPencil} />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        {/* Horarios */}
        <SeleccionDia day="Lunes" />
        <hr className="border-t border-gray-300"></hr>
        <SeleccionDia day="Martes" />
        <hr className="border-t border-gray-300"></hr>
        <SeleccionDia day="Miercoles" />
        <hr className="border-t border-gray-300"></hr>
        <SeleccionDia day="Jueves" />
        <hr className="border-t border-gray-300"></hr>
        <SeleccionDia day="Viernes" />
        <hr className="border-t border-gray-300"></hr>
        <SeleccionDia day="Sabado" />
        <hr className="border-t border-gray-300"></hr>
        <SeleccionDia day="Domingo" />
      </div>
    </div>
  );
};

export default PageAgregarDisponibilidadTutor;

type SeleccionDiaProps = {
  day: string;
};

const SeleccionDia: React.FC<SeleccionDiaProps> = ({ day }) => {
  const [isActive, setIsActive] = useState(false);
  const handleSwitch = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex items-center justify-between px-5">
      <div className="flex items-center min-w-[10rem] gap-2">
        <ToggleButton onChange={handleSwitch} />
        <label className="ms-2 font-roboto text-sm font-medium text-gray-900">
          {day}
        </label>
      </div>
      <div className="flex gap-10">
        <form className={`${!isActive && "text-gray-500"}`}>
          <div className="flex">
            <input
              type="time"
              className="font-roboto rounded-none rounded-s-lg bg-gray-50 border leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 min-w-24"
              min="09:00"
              max="18:00"
              defaultValue="09:00"
              required
              disabled={!isActive}
            />
            <span className="inline-flex items-center px-3 text-sm bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md">
              <IconTime />
            </span>
          </div>
        </form>

        <form className={`${!isActive && "text-gray-500"}`}>
          <div className="flex">
            <input
              type="time"
              className="font-roboto rounded-none rounded-s-lg bg-gray-50 border leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 min-w-24"
              min="09:00"
              max="18:00"
              defaultValue="18:00"
              required
              disabled={!isActive}
            />
            <span className="inline-flex items-center px-3 text-sm bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md">
              <IconTime />
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};