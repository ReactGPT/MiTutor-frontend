import React from 'react';
import ModalBase from './ModalBase';
import Button from '../Button';
import { Event } from 'react-big-calendar';
import { useAvailability } from '../../store/hooks/useAvailability';

interface CustomEvent extends Event {
  isBackgroundEvent?: boolean;
  availabilityTutorId?: number;
  availabilityDate?: string;
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
  status?: string;
}

interface ModalEliminarDisponibilidadProps {
  isOpen: boolean;
  onClose: () => void;
  eventInfo: CustomEvent | null;
  onAvailabilityRemoved: () => void;
}

const ModalEliminarDisponibilidad: React.FC<ModalEliminarDisponibilidadProps> = ({ isOpen, onClose, eventInfo, onAvailabilityRemoved }) => {
  const { removeAvailability } = useAvailability(1);

  const handleEliminarDisponibilidad = async () => {
    if (eventInfo?.availabilityTutorId) {
      await removeAvailability(eventInfo.availabilityTutorId);
      onAvailabilityRemoved();
      onClose();
    }
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div className='flex w-full h-[11%] items-center justify-between py-2 px-3 shadow-custom border-custom bg-[rgba(255,255,255,0.50)]'>
          <h3 className="text-4xl font-semibold font-roboto text-gray-900 pr-5">
            Eliminar Disponibilidad
          </h3>
          <div className="flex gap-5 items-center justify-center">
            <Button text="Eliminar" variant="call-to-action" onClick={handleEliminarDisponibilidad} />
            <Button text="Cancelar" variant="warning" onClick={onClose} />
          </div>
        </div>
        <div className="flex gap-5 items-center justify-between">
          <div>
            <label className='font-roboto text-primary'>Fecha</label>
            <p>{eventInfo?.availabilityDate}</p>
          </div>
          <div>
            <label className='font-roboto text-primary'>Desde</label>
            <p>{eventInfo?.startTime}</p>
          </div>
          <div>
            <label className='font-roboto text-primary'>Hasta</label>
            <p>{eventInfo?.endTime}</p>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalEliminarDisponibilidad;