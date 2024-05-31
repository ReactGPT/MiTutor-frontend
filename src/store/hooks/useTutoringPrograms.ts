import { useState } from 'react';
import { listarProgramasDeTutoria, TutoringProgram } from '../services/listarProgramasDeTutoria'; // Importa el servicio y el tipo

type UseTutoringProgramsReturnType = {
  fetchTutoringPrograms: () => Promise<void>;
  tutoringPrograms: TutoringProgram[];
  isLoading: boolean;
  error: Error | null;
};

function useTutoringPrograms(): UseTutoringProgramsReturnType {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [tutoringPrograms, setTutoringPrograms] = useState<TutoringProgram[]>([]);

  const fetchTutoringPrograms = async () => {
    setIsLoading(true);
    try {
      const response = await listarProgramasDeTutoria();
      setTutoringPrograms(response);
    } catch (err: any) {
      setError(err);
      setTutoringPrograms([]);
    } finally {
      setIsLoading(false);
    }
  };
  return { fetchTutoringPrograms, tutoringPrograms, isLoading, error };
}

export { useTutoringPrograms };
