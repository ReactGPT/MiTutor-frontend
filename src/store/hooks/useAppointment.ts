import { useState } from 'react';
import { addAppointment, cancelAppointment } from '../services/cita';

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
  cancelCita: (appointmentId: number) => Promise<boolean>;
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

  const cancelCita = async (appointmentId: number): Promise<boolean> => { // Cambio en la firma de la función
    setLoading(true);
    setError(null);
    try {
      const response = await cancelAppointment(appointmentId);
      if (response.success === true) {
        setLoading(false);
        return true; // Devolver true si la operación se completó con éxito
      }
      else throw new Error("No se pudo cancelar la cita");
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido al cancelar la cita");
      }
      return false; // Devolver false si hubo un error
    }
  };

  return { addNewAppointment, cancelCita, loading, error };
}

export { useAppointment };