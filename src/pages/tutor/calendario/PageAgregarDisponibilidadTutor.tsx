import React, { useState } from 'react';
import CalendarioDisponibilidad from '../../../components/Calendar/CalendarioDisponibilidad';
import { Event } from 'react-big-calendar';
import ModalEliminarDisponibilidad from '../../../components/Tutor/ModalEliminarDisponibilidad';

interface CustomEvent extends Event {
  isBackgroundEvent?: boolean;
  availabilityTutorId?: number;
  availabilityDate?: string;
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
  status?: string;
}

const PageAgregarDisponibilidadTutor: React.FC = () => {
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [eventInfo, setEventInfo] = useState<CustomEvent | null>(null);
  const [refreshCalendar, setRefreshCalendar] = useState(false);

  const closeModal = () => {
    setShowModalEliminar(false);
  };

  const handleSelectEvent = (event: CustomEvent) => {
    const now = new Date();
    const eventStartDate = new Date(`${event.availabilityDate} ${event.startTime}`);
    if (eventStartDate > now) {
      setEventInfo(event);
      setShowModalEliminar(true);
    }
  };

  const refreshCalendarHandler = () => {
    setRefreshCalendar(!refreshCalendar);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="w-full flex items-center justify-between gap-5">
          <div className='flex h-full items-center gap-5'>
            <div className='flex bg-white p-1 items-center gap-3 rounded px-2'>
              <div className='bg-[#65C3D0] w-2.5 h-2.5'></div>
              <label>Disponible</label>
            </div>
          </div>
          <div className="text-base text-primary font-medium h-[42px] flex flex-col items-start justify-center">
            <label>
              • Selecciona un rango para agregar una disponibilidad.
            </label>
            <label>
              • Selecciona una disponibilidad para eliminarla.
            </label>
          </div>
        </div>
        <div className="flex-1 w-full overflow-auto bg-white rounded-md p-4">
          <CalendarioDisponibilidad programable onSelectEvent={handleSelectEvent} refresh={refreshCalendar} tipo="disponibilidad" />
        </div>
      </div >
      <ModalEliminarDisponibilidad isOpen={showModalEliminar} onClose={closeModal} eventInfo={eventInfo} onAvailabilityRemoved={refreshCalendarHandler} />
    </>
  );
};

export default PageAgregarDisponibilidadTutor;