import React, { useEffect, useState } from 'react';
import { Calendar, SlotInfo, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ListCita } from '../../store/types/ListCita';
import { Event } from 'react-big-calendar';
import { useAvailability } from '../../store/hooks/useAvailability';
import "./index.css";
import ModalModificarDisponibilidad from '../Tutor/ModalModificarDisponibilidad';
import { useAuth } from '../../context';
import { TutorRoleDetails } from '../../store/types';
import ModalProgramarCitaTutor from '../Tutor/ModalProgramarCitaTutor';

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

interface CalendarioDisponibilidadProps {
  citas?: ListCita[];
  programable?: boolean;
  onSelectEvent?: (event: CustomEvent) => void;
  onSelectSlot?: (slotInfo: SlotInfo) => void;
  refresh?: () => void;
  tipo: "solicitar" | "disponibilidad";
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
  const { programName, creationDate, startTime, endTime, appointmentStatus } = cita;

  return {
    title: `${programName}`,
    start: combineDateAndTime(creationDate, startTime.toString()),
    end: combineDateAndTime(creationDate, endTime.toString()),
    status: appointmentStatus,
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

const CalendarioDisponibilidad: React.FC<CalendarioDisponibilidadProps> = ({ citas = null, programable = false, onSelectEvent, onSelectSlot, refresh, tipo }) => {
  const { userData } = useAuth();
  const tutorId = (userData?.userInfo?.roles[0].details as TutorRoleDetails).tutorId;

  const { availability, fetchAvailability } = useAvailability(tutorId);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchAvailability();
  }, [refreshKey]);

  const events: CustomEvent[] = citas?.map(transformCitaToEvent) ?? [];
  const disponibilidad = transformAvailabilityToEvent(availability);
  //
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [showModalDisponibilidad, setShowModalDisponibilidad] = useState<boolean>(false);
  const [showModalProgramarCita, setShowModalProgramarCita] = useState<boolean>(false);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    // Obtener las fechas de inicio y fin del nuevo slot
    const newStartTime = slotInfo.start;
    const newEndTime = slotInfo.end;

    // Obtener la fecha y hora actuales
    const currentDateTime = new Date();

    // Verificar si newStartTime y newEndTime son posteriores a la fecha y hora actuales
    const isAfterCurrentDateTime =
      newStartTime > currentDateTime && newEndTime > currentDateTime;

    // Verificar si hay solapamiento con los eventos existentes y si es posterior a la fecha y hora actuales
    const hasOverlapWithDisponibilidad = disponibilidad.some((event) => {
      const eventStart = event.start;
      const eventEnd = event.end;

      // Verificar que eventStart y eventEnd sean instancias de Date
      if (eventStart instanceof Date && eventEnd instanceof Date) {
        return (
          (newStartTime >= eventStart && newStartTime < eventEnd) ||
          (newEndTime > eventStart && newEndTime <= eventEnd) ||
          (newStartTime <= eventStart && newEndTime >= eventEnd)
        );
      }

      return false;
    });

    // Verificar si hay solapamiento con los eventos existentes y si es posterior a la fecha y hora actuales
    const hasOverlapWithEvents = events.some((event) => {
      const eventStart = event.start;
      const eventEnd = event.end;

      // Verificar que eventStart y eventEnd sean instancias de Date
      if (eventStart instanceof Date && eventEnd instanceof Date) {
        return (
          (newStartTime >= eventStart && newStartTime < eventEnd) ||
          (newEndTime > eventStart && newEndTime <= eventEnd) ||
          (newStartTime <= eventStart && newEndTime >= eventEnd)
        );
      }

      return false;
    });

    if (tipo == "solicitar") {
      if (!hasOverlapWithEvents && isAfterCurrentDateTime) {
        setSelectedSlot(slotInfo);
        setShowModalProgramarCita(true);
      }
    }
    else if (tipo == "disponibilidad") {
      if (!hasOverlapWithDisponibilidad && isAfterCurrentDateTime) {
        setSelectedSlot(slotInfo);
        setShowModalDisponibilidad(true);
      }
    }
  };
  //
  const closeModalDisponibilidad = () => {
    setShowModalDisponibilidad(false);
    setSelectedSlot(null);
  };
  //
  const closeModalProgramarCita = () => {
    setShowModalProgramarCita(false);
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
    if (event.status === "registrada") {
      return {
        style: {
          backgroundColor: 'rgb(82 208 118)',
          color: 'white',
        }
      };
    };
    if (event.status === "pendiente resultado") {
      return {
        style: {
          backgroundColor: 'rgb(208 82 82)',
          color: 'white',
        }
      };
    };
    if (event.status === "completada") {
      return {
        style: {
          backgroundColor: 'rgb(32 108 229)',
          color: 'white',
        }
      };
    };
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
        onSelectSlot={onSelectSlot ? onSelectSlot : handleSelectSlot}
        selectable={programable}
      />
      <ModalModificarDisponibilidad slotInfo={selectedSlot} isOpen={showModalDisponibilidad} onClose={closeModalDisponibilidad} refreshCalendar={refreshCalendar} />
      <ModalProgramarCitaTutor slotInfo={selectedSlot} isOpen={showModalProgramarCita} onClose={closeModalProgramarCita} refreshCalendar={refresh ? refresh : () => { }} />
    </>
  );
};

export default CalendarioDisponibilidad;
