import React from 'react';
import ModalBase from './ModalBase';
import Button from '../Button';
import { Event } from 'react-big-calendar';
import { useAvailability } from '../../store/hooks/useAvailability';
import { Datepicker, Label, TextInput } from 'flowbite-react';

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
      <div className="flex flex-col gap-5 p-5 border-custom bg-[rgba(255,255,255,0.50)]">
        <h3 className="text-4xl font-semibold font-roboto text-gray-900">
          Eliminar Disponibilidad
        </h3>

        <div className="w-full flex flex-col gap-5 items-center justify-between">
          <div className='w-full'>
            <Label value="Fecha" className='font-roboto text-primary' />
            <Datepicker value={eventInfo?.availabilityDate} disabled />
          </div>
          <div className='w-full flex gap-5'>
            <div className='w-1/2'>
              <Label value="Desde" className='font-roboto text-primary' />
              <TextInput type="time" value={eventInfo?.startTime} disabled />
            </div>
            <div className='w-1/2'>
              <Label value="Hasta" className='font-roboto text-primary' />
              <TextInput type="time" value={eventInfo?.endTime} disabled />
            </div>
          </div>
        </div>

        <div className="flex gap-5 items-center justify-center">
          <Button text="Eliminar" variant="call-to-action" onClick={handleEliminarDisponibilidad} />
          <Button text="Cancelar" variant="warning" onClick={onClose} />
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalEliminarDisponibilidad;