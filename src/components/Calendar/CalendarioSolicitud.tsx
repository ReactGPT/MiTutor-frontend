import React, { useEffect, useState } from 'react';
import { Calendar, SlotInfo, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ListCita } from '../../store/types/ListCita';
import { Event } from 'react-big-calendar';
import { useAvailability } from '../../store/hooks/useAvailability';
import "./index.css";
import { useCitasPorTutor } from '../../store/hooks/useCita';
import ModalSolicitarCita from '../Alumno/ModalSolicitarCita';

interface CustomEvent extends Event {
  isBackgroundEvent?: boolean;
  availabilityTutorId?: number;
  availabilityDate?: string;
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
  status?: string;
}

type Availability = {
  availabilityTutorId: number;
  availabilityDate: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
};

interface CalendarioSolicitudProps {
  programable?: boolean;
  onSelectEvent?: (event: CustomEvent) => void;
  refresh?: boolean;
  tutorId: number;
  tutoringProgram: any;
}

dayjs.locale("es");
const localizer = dayjsLocalizer(dayjs);
const messages = {
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  allDay: 'Todo el día',
  week: 'Semana',
  work_week: 'Semana laboral',
  day: 'Día',
  month: 'Mes',
  previous: 'Anterior',
  next: 'Siguiente',
  yesterday: 'Ayer',
  tomorrow: 'Mañana',
  today: 'Hoy',
  agenda: 'Agenda',
  noEventsInRange: 'No hay eventos en este rango'
};

function combineDateAndTime(date: string, time: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

function transformCitaToEvent(cita: ListCita): CustomEvent {
  const { creationDate, startTime, endTime } = cita;

  return {
    title: "",
    start: combineDateAndTime(creationDate, startTime.toString()),
    end: combineDateAndTime(creationDate, endTime.toString()),
    resource: cita
  };
}

function transformAvailabilityToEvent(availability: Availability[]): CustomEvent[] {
  return availability.map(item => ({
    start: new Date(`${item.availabilityDate}T${item.startTime}`),
    end: new Date(`${item.availabilityDate}T${item.endTime}`),
    isBackgroundEvent: true,
    availabilityTutorId: item.availabilityTutorId,
    availabilityDate: item.availabilityDate,
    startTime: item.startTime,
    endTime: item.endTime,
    isActive: item.isActive,
  }));
}

const CalendarioSolicitud: React.FC<CalendarioSolicitudProps> = (
  { programable = false, onSelectEvent, refresh, tutorId, tutoringProgram }
) => {
  const { availability, fetchAvailability } = useAvailability(tutorId);
  const { cita, fetchCita } = useCitasPorTutor(tutorId);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchAvailability();
    fetchCita();
  }, [refresh, refreshKey]);

  const events: CustomEvent[] = cita.map(transformCitaToEvent) ?? [];
  const disponibilidad = transformAvailabilityToEvent(availability);
  //
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const newStartTime = slotInfo.start;
    const newEndTime = slotInfo.end;
    const currentDateTime = new Date();

    const isWithinAvailability = disponibilidad.some(event => {
      const eventStart = event.start instanceof Date ? event.start : new Date(event.start!);
      const eventEnd = event.end instanceof Date ? event.end : new Date(event.end!);
      return (
        newStartTime >= eventStart &&
        newEndTime <= eventEnd
      );
    });

    const isOverlappingWithEvents = events.some(event => {
      const eventStart = event.start instanceof Date ? event.start : new Date(event.start!);
      const eventEnd = event.end instanceof Date ? event.end : new Date(event.end!);
      return (
        (newStartTime < eventEnd && newEndTime > eventStart)
      );
    });

    const isAfterCurrentTime = newStartTime > currentDateTime && newEndTime > currentDateTime;

    if (isWithinAvailability && isAfterCurrentTime && !isOverlappingWithEvents) {
      setSelectedSlot(slotInfo);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSlot(null);
  };
  //
  const eventPropGetter = (event: CustomEvent) => {
    if (event.isBackgroundEvent) {
      return {
        style: {
          backgroundColor: '#65C3D0',
          opacity: 0.6,
          border: 'none',
          color: 'black',
        }
      };
    };

    if (event.title === '') {
      return {
        style: {
          backgroundColor: 'rgb(208 82 82)',
        }
      };
    }

    return {};
  };
  //
  const refreshCalendar = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };
  //
  return (
    <>
      <Calendar
        className="font-roboto"
        eventPropGetter={eventPropGetter}
        events={events}
        backgroundEvents={disponibilidad}
        localizer={localizer}
        messages={messages}
        views={{ week: true }}
        defaultView="week"
        timeslots={1}
        step={30}
        min={new Date(0, 0, 0, 8, 0)}
        max={new Date(0, 0, 0, 18, 0)}
        onSelectEvent={onSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable={programable}
      />
      <ModalSolicitarCita tutoringProgram={tutoringProgram} tutorId={tutorId} slotInfo={selectedSlot} isOpen={showModal} onClose={closeModal} refreshCalendar={refreshCalendar} />
    </>
  );
};

export default CalendarioSolicitud;
