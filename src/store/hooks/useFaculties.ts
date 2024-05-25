import { useState } from 'react';
import { listarFacultades, Faculty } from '../services/listarFacultades'; // Importa el servicio y el tipo

type UseFacultiesReturnType = {
  fetchFaculties: () => Promise<void>;
  faculties: Faculty[];
  isLoading: boolean;
  error: Error | null;
};

function useFaculties(): UseFacultiesReturnType {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [faculties, setFaculties] = useState<Faculty[]>([]);

  const fetchFaculties = async () => {
    setIsLoading(true);
    try {
      const response = await listarFacultades();
      console.log('Fetched faculties:', response); // Añadir console.log
      setFaculties(response);
    } catch (err: any) {
      setError(err);
      setFaculties([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchFaculties, faculties, isLoading, error };
}

export { useFaculties };
