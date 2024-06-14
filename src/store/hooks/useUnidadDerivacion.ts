import { useState } from "react";
import { UnidadDerivacion } from "../types/UnidadDerivacion";
import { getUnidadInfo } from "../services/unidadDerivacion";

interface UnidadHookReturnType {
    fetchUnidadData: () => Promise<void>;
    unidadData: UnidadDerivacion[];
    isLoading: boolean;
    error: Error | null;
}

function useUnidadDerivacion(): UnidadHookReturnType {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [unidadData, setUnidadData] = useState<UnidadDerivacion[]>([]);
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

    return { fetchUnidadData, unidadData, isLoading, error };
}

export { useUnidadDerivacion }