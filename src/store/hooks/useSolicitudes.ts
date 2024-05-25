import { useState } from 'react';
import { listarSolicitudes, Solicitud } from '../services/listarSolicitudes'; // Importa el servicio y el tipo

type UseSolicitudesReturnType = {
  fetchSolicitudes: (facultyId: number) => Promise<void>;
  solicitudes: Solicitud[];
  isLoading: boolean;
  error: Error | null;
};

function useSolicitudes(): UseSolicitudesReturnType {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

  const fetchSolicitudes = async (facultyId: number) => {
    setIsLoading(true);
    try {
      const response = await listarSolicitudes(facultyId);
      setSolicitudes(response);
    } catch (err: any) {
      setError(err);
      setSolicitudes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchSolicitudes, solicitudes, isLoading, error };
}

export { useSolicitudes };
