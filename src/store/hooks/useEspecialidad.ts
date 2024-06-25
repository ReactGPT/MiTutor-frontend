import { useState } from "react";
import { Specialty } from "../types/Specialty.ts";
import { getEspecialidadInfo, getEspecialidadPorFacultadInfo,
    getEspecialidadByNameInfo, getEspecialidadInfo2
 } from "../services/especialidad.ts";

interface EspecialidadHookReturnType {
    fetchEspecialidadData: () => Promise<void>;
    fetchEspecialidadData2: () => Promise<void>;
    fetchEspecialidadPorFacultadData: (idFacultad: number) => Promise<void>;
    especialidadData: Specialty[];
    isLoading: boolean;
    error: Error | null;
}
interface EspecialidadByNameHookReturnType {
    fetchEspecialidadData: (name:string) => Promise<void>;
    especialidadData: Specialty[];
    isLoading: boolean;
    error: Error | null;
}

function useEspecialidad(): EspecialidadHookReturnType {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [especialidadData, setEspecialidadData] = useState<Specialty[]>([]);
    const fetchEspecialidadData = async () => {
        setIsLoading(true);
        try {
            const especialidadData = await getEspecialidadInfo();
            setEspecialidadData(especialidadData.especialidadList);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchEspecialidadPorFacultadData = async (idFacultad: number) => {
        setIsLoading(true);
        try {
            const especialidadData = await getEspecialidadPorFacultadInfo(idFacultad);
            setEspecialidadData(especialidadData.especialidadList);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchEspecialidadData2 = async () => {
        setIsLoading(true);
        try {
            const especialidadData = await getEspecialidadInfo2();
            setEspecialidadData(especialidadData.especialidadList);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }; 

    return { fetchEspecialidadData, fetchEspecialidadData2, fetchEspecialidadPorFacultadData,especialidadData, isLoading, error };
}

function useEspecialidadByName(): EspecialidadByNameHookReturnType {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [especialidadData, setEspecialidadData] = useState<Specialty[]>([]);
    const fetchEspecialidadData = async (name:string) => {
        setIsLoading(true);
        try {
            const especialidadData = await getEspecialidadByNameInfo(name);
            setEspecialidadData(especialidadData.especialidadList);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchEspecialidadData, especialidadData, isLoading, error };
}

export { useEspecialidad,useEspecialidadByName }
