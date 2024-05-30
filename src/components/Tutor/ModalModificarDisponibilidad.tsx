import React, { useEffect, useState } from 'react';
import ModalBase from './ModalBase';
import { SlotInfo } from 'react-big-calendar';
import Button from '../Button';
import { Datepicker, Label, TextInput } from 'flowbite-react';
import { useAvailability } from '../../store/hooks/useAvailability';

interface ModalModificarDisponibilidadProps {
  isOpen: boolean;
  onClose: () => void;
  slotInfo: SlotInfo | null;
  refreshCalendar: () => void;
}

const tutorId = 3;

const ModalModificarDisponibilidad: React.FC<ModalModificarDisponibilidadProps> = (
  { isOpen, onClose, slotInfo, refreshCalendar }
) => {

  const { addAvailability } = useAvailability(tutorId);

  const [startTime, setStartTime] = useState<string>(slotInfo?.start.toTimeString().split(' ')[0] || '');
  const [endTime, setEndTime] = useState<string>(slotInfo?.end.toTimeString().split(' ')[0] || '');
  const [date, setDate] = useState<string>(slotInfo?.start.toLocaleDateString() || '');

  useEffect(() => {
    if (slotInfo) {
      setDate(slotInfo.start.toLocaleDateString());
      setStartTime(slotInfo.start.toTimeString().split(' ')[0]);
      setEndTime(slotInfo.end.toTimeString().split(' ')[0]);
    }
  }, [slotInfo]);

  const handleAddAvailability = async () => {
    const newAvailability = {
      availabilityTutorId: 0,
      availabilityDate: date,
      startTime,
      endTime,
      isActive: true,
      tutorId: tutorId
    };

    await addAvailability(newAvailability);
    refreshCalendar();
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div className='flex w-full h-[11%] items-center justify-between py-2 px-3 shadow-custom border-custom bg-[rgba(255,255,255,0.50)]'>
          <h3 className="text-4xl font-semibold font-roboto text-gray-900 pr-5">
            Nueva Disponibilidad
          </h3>
          <div className="flex gap-5 items-center justify-center">
            <Button text="Guardar" variant="call-to-action" onClick={handleAddAvailability} />
            <Button text="Cancelar" variant="warning" onClick={onClose} />
          </div>
        </div>
        <div className="flex gap-5 items-center justify-between">
          <div>
            <Label value="Fecha" className='font-roboto text-primary' />
            <Datepicker value={slotInfo?.start.toLocaleDateString()} disabled />
          </div>
          <div>
            <Label value="Desde" className='font-roboto text-primary' />
            <TextInput type="time" value={slotInfo?.start.toTimeString().split(' ')[0]} disabled />
          </div>
          <div>
            <Label value="Hasta" className='font-roboto text-primary' />
            <TextInput type="time" value={slotInfo?.end.toTimeString().split(' ')[0]} disabled />
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalModificarDisponibilidad;
