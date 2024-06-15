import { useState } from "react";
import { Specialty } from "../types/Specialty.ts";
import { getEspecialidadInfo, getEspecialidadPorFacultadInfo } from "../services/especialidad.ts";

interface EspecialidadHookReturnType {
    fetchEspecialidadData: () => Promise<void>;
    fetchEspecialidadPorFacultadData: (idFacultad: number) => Promise<void>;
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

    return { fetchEspecialidadData, fetchEspecialidadPorFacultadData,especialidadData, isLoading, error };
}

export { useEspecialidad }