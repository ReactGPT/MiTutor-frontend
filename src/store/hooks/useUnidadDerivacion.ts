import { useState } from "react";
import { UnidadDerivacion } from "../types/UnidadDerivacion";
import { getUnidadInfo, getSubUnidadInfo } from "../services/unidadDerivacion";

interface UnidadHookReturnType {
    fetchUnidadData: () => Promise<void>;
    fetchSubUnidadData: (unidadId: number) => Promise<void>;
    unidadData: UnidadDerivacion[];
    subUnidadData: UnidadDerivacion[];
    isLoading: boolean;
    error: Error | null;
}

function useUnidadDerivacion(): UnidadHookReturnType {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [unidadData, setUnidadData] = useState<UnidadDerivacion[]>([]);
    const [subUnidadData, setSubUnidadData] = useState<UnidadDerivacion[]>([]);
    const fetchUnidadData = async () => {
        setIsLoading(true);
        try {
            const unidadData = await getUnidadInfo();
            setUnidadData(unidadData.unidadList);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchSubUnidadData = async (unidadId: number) => {
        setIsLoading(true);
        try {
            const subUnidadData = await getSubUnidadInfo(unidadId);
            setSubUnidadData(subUnidadData.unidadList);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchUnidadData, fetchSubUnidadData, unidadData, subUnidadData, isLoading, error };
}

export { useUnidadDerivacion }