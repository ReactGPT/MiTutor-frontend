import { useState } from 'react';
import { listarAlumnosPorNombreCodigo, Alumno } from '../services/listarAlumnos'; // Importa el servicio y el tipo

type UseAlumnosReturnType = {
  fetchAlumnos: (nombreCodigo?: string) => Promise<void>;
  alumnos: Alumno[];
  isLoading: boolean;
  error: Error | null;
};

function useAlumnos(): UseAlumnosReturnType {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  const fetchAlumnos = async (nombreCodigo: string = '') => {
    setIsLoading(true);
    try {
      const response = await listarAlumnosPorNombreCodigo(nombreCodigo);
      setAlumnos(response);
    } catch (err: any) {
      setError(err);
      setAlumnos([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchAlumnos, alumnos, isLoading, error };
}

export { useAlumnos };
