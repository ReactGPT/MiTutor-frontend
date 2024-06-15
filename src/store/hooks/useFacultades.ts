import { useState } from "react";
import { getFacultadInfo } from "../services/facultades";
import { Facultad } from "../types/Facultad";

interface FacultadHookReturnType {
  fetchFacultadData: () => Promise<void>;
  facultadData: Facultad[];
  isLoading: boolean;
  error: Error | null;
}

function useFacultades(): FacultadHookReturnType {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [facultadData, setFacultadData] = useState<Facultad[]>([]);
  const fetchFacultadData = async () => {
    setIsLoading(true);
    try {
      const facultadData = await getFacultadInfo();
      setFacultadData(facultadData.facultadList);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchFacultadData, facultadData, isLoading, error };
}

export { useFacultades }