import React, { useEffect, useState } from "react";
import Button from "../Button";
import IconDetails from '../../assets/svg/IconDetails';
import { useNavigate } from "react-router-dom";
import { ListCita } from "../../store/types/ListCita";
import { Services as ServicesProperties } from '../../config'; 
import axios from 'axios';
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
  if (tipo === 'from') {
    switch (color) {
      case 'completada':
        return fromClasses.blue;
      case 'registrada':
        return fromClasses.green;
      case 'pendiente resultado':
        return fromClasses.red;
      default:
        return fromClasses.yellow;
    }
  } else if (tipo === 'text') {
    switch (color) {
      case 'completada':
        return textClasses.blue;
      case 'registrada':
        return textClasses.green;
      case 'pendiente resultado':
        return textClasses.red;
      default:
        return textClasses.yellow;
    }
  } else if (tipo === 'to') {
    switch (color) {
      case 'completada':
        return toClasses.blue;
      case 'registrada':
        return toClasses.green;
      case 'pendiente resultado':
        return toClasses.red;
      default:
        return toClasses.yellow;
    }
  }
};

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment, tipo, user }) => {
  const navigate = useNavigate();
  const [appointmentStatus, setAppointmentStatus] = useState(appointment.appointmentStatus); 

  // Combina creationDate y endTime para crear la fecha de finalización completa
  const endDateTime = new Date(`${appointment.creationDate}T${appointment.endTime}`);
  
  const goToDetalleCita = () => {
    if (user === 'tutor' && appointment.appointmentStatus!="registrada") {
      navigate("/listaDeCitas/resultadoCitaIndividual", { state: { cita: appointment } });
    } else if (user === 'alumno') {
      navigate("/listaDeCitasAlumno/detalleCitaAlumno", { state: { cita: appointment } });
    }
  };

  // Función para verificar si la cita ha terminado
  const checkAppointmentStatus = () => {
    const currentDate = new Date();
    if (appointmentStatus === 'registrada' && currentDate > endDateTime) { 
      setAppointmentStatus('pendiente resultado');
      appointment.appointmentStatus='pendiente resultado';
    }
  };
   

  useEffect(() => {
    const intervalId = setInterval(checkAppointmentStatus, 10000); // Verifica cada 10 segundos

    return () => clearInterval(intervalId);
  }, [appointmentStatus,endDateTime]);
 
  
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
            tipo === "lista" && (
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
