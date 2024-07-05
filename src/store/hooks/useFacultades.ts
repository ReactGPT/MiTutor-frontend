import { useState } from "react";
import { getFacultadInfo, eliminarFacultad, crearFacultad, actualizarFacultad } from "../services/facultades";
import Facultad from '../types/Facultad';

interface FacultadHookReturnType {
  fetchFacultadData: () => Promise<void>;
  facultadData: Facultad[];
  deleteFacultad: (id: number) => Promise<boolean>;
  createFacultad: (facultad: Facultad) => Promise<boolean>;
  updateFacultad: (facultad: Facultad) => Promise<boolean>;
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

  const deleteFacultad = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await eliminarFacultad(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createFacultad = async (facultad: Facultad) => {
    setIsLoading(true);
    try {
      //console.log("user en postUser: ",user)
      const response = await crearFacultad(facultad);
      if (!response.success) {
        throw new Error(response.message);
      }
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateFacultad = async (facultad: Facultad) => {
    setIsLoading(true);
    try {
      if (facultad.facultyManager === null) {
        facultad.facultyManager = {
          id: null,
          institutionalEmail: "",
          pucpCode: "",
          isActive: true,
          persona: null,
          roles: null,
          isVerified: true,
        };
      }
      if (facultad.bienestarManager === null) {
        facultad.bienestarManager = {
          id: null,
          institutionalEmail: "",
          pucpCode: "",
          isActive: true,
          persona: null,
          roles: null,
          isVerified: true,
        };
      }
      const response = await actualizarFacultad(facultad);
      if (!response.success) {
        throw new Error(response.message);
      }
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchFacultadData, facultadData, deleteFacultad, createFacultad, updateFacultad, isLoading, error };
}

export { useFacultades };