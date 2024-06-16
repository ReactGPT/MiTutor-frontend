import React, { useEffect, useState } from 'react';
import ModalBase from './ModalBase';
import { SlotInfo } from 'react-big-calendar';
import Button from '../Button';
import { Datepicker, Label, TextInput } from 'flowbite-react';
import { useAvailability } from '../../store/hooks/useAvailability';
import { useAuth } from '../../context';
import { TutorRoleDetails } from '../../store/types';

const formatDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

interface ModalModificarDisponibilidadProps {
  isOpen: boolean;
  onClose: () => void;
  slotInfo: SlotInfo | null;
  refreshCalendar: () => void;
}

const ModalModificarDisponibilidad: React.FC<ModalModificarDisponibilidadProps> = (
  { isOpen, onClose, slotInfo, refreshCalendar }
) => {

  const { userData } = useAuth();
  const tutorId = (userData?.userInfo?.roles[0].details as TutorRoleDetails).tutorId;


  const { addAvailability } = useAvailability(tutorId);

  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    if (slotInfo) {
      setDate(formatDate(slotInfo.start));
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
      <div className="flex flex-col gap-5 p-5 border-custom bg-[rgba(255,255,255,0.50)]">
        <h3 className="text-4xl font-semibold font-roboto text-gray-900">
          Nueva Disponibilidad
        </h3>
        <div className="w-full flex flex-col gap-5 items-center justify-between">
          <div className='w-full'>
            <Label value="Fecha" className='font-roboto text-primary' />
            <Datepicker value={slotInfo?.start.toLocaleDateString()} disabled />
          </div>
          <div className='w-full flex gap-5'>
            <div className='w-1/2'>
              <Label value="Desde" className='font-roboto text-primary' />
              <TextInput type="time" value={slotInfo?.start.toTimeString().split(' ')[0]} disabled />
            </div>
            <div className='w-1/2'>
              <Label value="Hasta" className='font-roboto text-primary' />
              <TextInput type="time" value={slotInfo?.end.toTimeString().split(' ')[0]} disabled />
            </div>
          </div>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <Button text="Guardar" variant="call-to-action" onClick={handleAddAvailability} />
          <Button text="Cancelar" variant="warning" onClick={onClose} />
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalModificarDisponibilidad;
