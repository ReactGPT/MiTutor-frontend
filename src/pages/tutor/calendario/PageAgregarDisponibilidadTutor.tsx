import React, { useState } from 'react';
import Button from '../../../components/Button';
import Calendario from '../../../components/Calendar/Calendario';
import { Event } from 'react-big-calendar';
import ModalEliminarDisponibilidad from '../../../components/Tutor/ModalEliminarDisponibilidad';

interface CustomEvent extends Event {
  isBackgroundEvent?: boolean;
  availabilityTutorId?: number;
  availabilityDate?: string;
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
}

const PageAgregarDisponibilidadTutor: React.FC = () => {

  const [selectable, setSelectable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [eventInfo, setEventInfo] = useState<CustomEvent | null>(null);
  const [refreshCalendar, setRefreshCalendar] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const [modificarDisponibilidad, setModificarDisponibilidad] = useState(false);
  const handleModificarDisponibilidad = () => {
    setModificarDisponibilidad(true);
    setSelectable(true);
  };
  const handleCancelModificarDisponibilidad = () => {
    setModificarDisponibilidad(false);
    setSelectable(false);
  };

  const handleSelectEvent = (event: CustomEvent) => {
    if (modificarDisponibilidad) {
      // Obtener la fecha y hora actual
      const now = new Date();

      // Verificar si la fecha y hora de inicio del evento son mayores que la fecha y hora actual
      const eventStartDate = new Date(`${event.availabilityDate} ${event.startTime}`);
      if (eventStartDate > now) {
        setEventInfo(event);
        setShowModal(true);
      }
    }
  };

  const refreshCalendarHandler = () => {
    setRefreshCalendar(!refreshCalendar); // Cambia el estado para forzar el rerender del calendario
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="w-full flex items-center justify-between gap-5">
          <div className="text-xl text-primary font-bold">
            {modificarDisponibilidad ? "Modificar Disponibilidad" : ""}
          </div>
          <div className="flex gap-5">
            {modificarDisponibilidad ?
              <Button text='Cancelar Modificacion' onClick={handleCancelModificarDisponibilidad} variant="warning" />
              :
              <Button text='Modificar Disponibilidad' onClick={handleModificarDisponibilidad} variant="primario" />
            }
          </div>
        </div>
        <div className="flex-1 w-full overflow-auto bg-white rounded-md p-4">
          <Calendario programable={selectable} onSelectEvent={handleSelectEvent} refresh={refreshCalendar} />
        </div>
      </div >
      <ModalEliminarDisponibilidad isOpen={showModal} onClose={closeModal} eventInfo={eventInfo} onAvailabilityRemoved={refreshCalendarHandler} />
    </>
  );
};

export default PageAgregarDisponibilidadTutor;