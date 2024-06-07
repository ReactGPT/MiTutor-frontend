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
    setError(null);
    try {
      const response = await addAppointment(appointmentData);
      if (response.status >= 400) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido al agregar cita");
      }
      setLoading(false);
    }
  };

  return { addNewAppointment, loading, error };
}

export { useAppointment };