import React from "react";
import Button from "../Button";
import IconDetails from '../../assets/svg/IconDetails';
import { useNavigate } from "react-router-dom";
import { ListCita } from "../../store/types/ListCita";

interface AppointmentItemProps {
  appointment: ListCita;
  tipo: "lista" | "historico";
  user: "alumno" | "tutor";
}

const textClasses = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500'
};

const fromClasses = {
  red: 'from-red-500',
  blue: 'from-blue-500',
  green: 'from-green-500',
  yellow: 'from-yellow-500'
};

const toClasses = {
  red: 'to-[#6A2A2A]',
  blue: 'to-[#123C7F]',
  green: 'to-[#2A6A3C]',
  yellow: 'to-[#7E631C]'
};

const controlColor = (color: string, tipo: string) => {
  if (tipo == 'from') {
    if (color == 'Solicitado') {
      return fromClasses.yellow;
    } else if (color == 'Completado') {
      return fromClasses.blue;
    } else if (color == 'Registrada') {
      return fromClasses.green;
    } else if (color == 'Pendiente') {
      return fromClasses.red;
    } else {
      return fromClasses.green;
    }
  } else if (tipo == 'text') {
    if (color == 'Solicitado') {
      return textClasses.yellow;
    } else if (color == 'Completado') {
      return textClasses.blue;
    } else if (color == 'Registrada') {
      return textClasses.green;
    } else if (color == 'Pendiente') {
      return textClasses.red;
    } else {
      return textClasses.green;
    }
  } else if (tipo == 'to') {
    if (color == 'Solicitado') {
      return toClasses.yellow;
    } else if (color == 'Completado') {
      return toClasses.blue;
    } else if (color == 'Registrada') {
      return toClasses.green;
    } else if (color == 'Pendiente') {
      return toClasses.red;
    } else {
      return toClasses.green;
    }
  }
};

export const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment, tipo, user }) => {

  const navigate = useNavigate();
  const currentDate = new Date();

  const goToDetalleCita = () => {
    if (user === 'tutor') {
      //if (new Date(appointment.creationDate) < currentDate)
      navigate("/listaDeCitas/resultadoCitaIndividual", { state: { cita: appointment } });
    } else if (user === 'alumno') {
      navigate("/listaDeCitasAlumno/detalleCitaAlumno", { state: { cita: appointment } });
    }
  };

  return (
    <div className="w-full h-22 border-custom shadow-custom flex bg-[rgba(235,_236,_250,_1.00)] overflow-hidden font-roboto">
      <div className={`w-[2%] max-w-6 bg-gradient-to-b ${controlColor(appointment.appointmentStatus, 'from')} ${controlColor(appointment.appointmentStatus, 'to')}`}></div>

      <div className="w-full flex p-5 gap-5 justify-between items-center">
        <div className="w-1/3">
          <span className="text-xl text-black"> {appointment.programName} </span>
        </div>

        <div className="flex gap-6 items-center h-full text-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-black font-semibold">Estado:</span>
            <span className={`font-semibold ${controlColor(appointment.appointmentStatus, 'text')}`}>{appointment.appointmentStatus}</span>
          </div>
          <hr className="h-full border-custom" />
          {
            tipo == "lista" && (
              <>
                <div className="flex flex-col items-start min-w-40">
                  {
                    user === "tutor" && (
                      <>
                        <span className="text-black font-semibold">Participante:</span>
                        <span className="text-primary">{`${appointment.name} ${appointment.lastName} ${appointment.secondLastName}`}</span>
                      </>
                    )
                  }
                  {
                    user === "alumno" && (
                      <>
                        <span className="text-black font-semibold">Tutor:</span>
                        <span className="text-primary">{`${appointment.tutorName} ${appointment.tutorLastName} ${appointment.tutorSecondLastName}`}</span>
                      </>
                    )
                  }
                </div>
                <hr className="h-full border-custom" />
              </>
            )
          }
          <div className="flex flex-col items-start">
            <span className="text-black font-semibold">Fecha:</span>
            <span className="text-primary">{appointment.creationDate}</span>
          </div>
          <hr className="h-full border-custom" />
          <div className="flex flex-col items-start">
            <span className="text-black font-semibold">Hora:</span>
            <span className="text-primary">{`${appointment.startTime}`}</span>
          </div>

          <Button variant='primario' onClick={goToDetalleCita} icon={IconDetails} />
        </div>
      </div>
    </div>
  );
};


export default AppointmentItem;
