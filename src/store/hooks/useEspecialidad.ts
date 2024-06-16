import { useState } from "react";
import { Specialty } from "../types/Specialty.ts";
import { getEspecialidadByNameInfo, getEspecialidadInfo } from "../services/especialidad.ts";

interface EspecialidadHookReturnType {
    fetchEspecialidadData: () => Promise<void>;
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

    return { fetchEspecialidadData, especialidadData, isLoading, error };
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