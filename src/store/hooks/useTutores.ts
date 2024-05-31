import { useState } from 'react';
import axios from 'axios';
import { Services as ServicesProperties } from '../../config';

// Define la interfaz para los datos del tutor
export interface Tutor {
  TutorId: number;
  Name: string;
  LastName: string;
  SecondLastName: string;
}

// Configura Axios para usar la URL base del backend
const api = axios.create({
  baseURL: ServicesProperties.BaseUrl+'/api', // Asegúrate de que esta URL es correcta
});

type UseTutoresReturnType = {
  fetchTutores: (query?: string) => Promise<void>;
  tutors: Tutor[];
  isLoading: boolean;
  error: Error | null;
};

function useTutores(): UseTutoresReturnType {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [tutors, setTutors] = useState<Tutor[]>([]);

  const fetchTutores = async (query: string = ''): Promise<void> => {
    setIsLoading(true);
    try {
      const url = `/tutor/listarTutoresPorNombreApellido/${query}`;
      const response = await api.get<{ success: boolean; data: Tutor[] }>(url);
      setTutors(response.data.data); // Actualiza el estado de tutors
    } catch (err: any) {
      setError(err);
      setTutors([]); // Limpia los tutores en caso de error
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchTutores, tutors, isLoading, error };
}

export { useTutores };
