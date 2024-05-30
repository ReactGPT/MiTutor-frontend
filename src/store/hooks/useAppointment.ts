import { useState } from 'react';
import { addAppointment } from '../services/cita';

type MakeAppointment = {
  startTime: string;
  endTime: string;
  creationDate: string;
  reason: string;
  isInPerson: boolean;
  classroom: string;
};

type AddAppointmentRequest = {
  appointment: MakeAppointment;
  idProgramTutoring: number;
  idTutor: number;
  idStudent: number[];
};

type AppointmentHooksReturn = {
  addNewAppointment: (appointmentData: AddAppointmentRequest) => Promise<void>;
  loading: boolean;
  error: any;
};

function useAppointment(): AppointmentHooksReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const addNewAppointment = async (appointmentData: AddAppointmentRequest) => {
    setLoading(true);
    try {
      await addAppointment(appointmentData);
      setLoading(false);
    } catch (error) {
      setError("Error al agregar cita");
      setLoading(false);
    }
  };

  return { addNewAppointment, loading, error };
}

export { useAppointment };