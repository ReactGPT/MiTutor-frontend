import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ListCita } from '../../store/types/ListCita';
import { Event } from 'react-big-calendar';
import "./index.css";

interface CustomEvent extends Event {
  isBackgroundEvent?: boolean;
  availabilityTutorId?: number;
  availabilityDate?: string;
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
  status?: string;
}

interface CalendarioAlumnoProps {
  citas?: ListCita[];
  onSelectEvent?: (event: CustomEvent) => void;
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

const CalendarioAlumno: React.FC<CalendarioAlumnoProps> = ({ citas = null, onSelectEvent }) => {
  const events: CustomEvent[] = citas
    ?.filter(cita => cita.appointmentStatus !== "cancelada")
    .map(transformCitaToEvent) ?? [];
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
  return (
    <Calendar
      className="font-roboto"
      eventPropGetter={eventPropGetter}
      events={events}
      localizer={localizer}
      messages={messages}
      views={{ week: true }}
      defaultView="week"
      timeslots={1}
      step={30}
      min={new Date(0, 0, 0, 8, 0)}
      max={new Date(0, 0, 0, 18, 0)}
      onSelectEvent={onSelectEvent}
    />
  );
};

export default CalendarioAlumno;
