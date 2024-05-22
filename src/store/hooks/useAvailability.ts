import { useState } from 'react';
import { getAvailabilityByTutorId, insertarDisponibilidad, eliminarDisponibilidad } from '../services/availability'; // Asegúrate de ajustar la ruta según tu estructura de proyecto

type Availability = {
  availabilityTutorId: number;
  availabilityDate: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  tutorId?: number;
};

type AvailabilityHooksReturn = {
  availability: Availability[];
  loading: boolean;
  error: any;
  fetchAvailability: () => Promise<void>;
  addAvailability: (newAvailability: Availability) => Promise<void>;
  removeAvailability: (availabilityTutorId: number) => Promise<void>;
};

function useAvailability(tutorId: number): AvailabilityHooksReturn {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchAvailability = async () => {
    try {
      const data = await getAvailabilityByTutorId(tutorId);
      setAvailability(data);
      setLoading(false);
    } catch (error) {
      setError("Error en useAvailabilityByTutor");
      setLoading(false);
    }
  };

  const addAvailability = async (newAvailability: Availability) => {
    try {
      await insertarDisponibilidad(newAvailability);
      const updatedAvailability = await getAvailabilityByTutorId(tutorId);
      setAvailability(updatedAvailability);
    } catch (error) {
      setError("Error al agregar disponibilidad");
    }
  };

  const removeAvailability = async (availabilityTutorId: number) => {
    try {
      await eliminarDisponibilidad(availabilityTutorId);
      const updatedAvailability = await getAvailabilityByTutorId(tutorId);
      setAvailability(updatedAvailability);
    } catch (error) {
      setError("Error al eliminar disponibilidad");
    }
  };

  return { availability, loading, error, fetchAvailability, addAvailability, removeAvailability };
}

export { useAvailability };