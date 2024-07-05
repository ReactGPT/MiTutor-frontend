import { useState } from "react";
import Institucion from "../types/Institucion";
import { getInstitucionInfo, actualizarInstitucion } from "../services/institucion";

interface InstitucionHookReturnType {
    fetchInstitucionData: () => Promise<void>;
    institucionData: Institucion[];
    updateInstitucion: (unidad: Institucion) => Promise<boolean>;
    isLoading: boolean;
    error: Error | null;
}

function useInstitucion(): InstitucionHookReturnType {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [institucionData, setInstitucionData] = useState<Institucion[]>([]);
    const fetchInstitucionData = async () => {
        setIsLoading(true);
        try {
            const institucionData = await getInstitucionInfo();
            setInstitucionData(institucionData.institucionList);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    const updateInstitucion = async (institucion: Institucion) => {
        setIsLoading(true);
        try {
            //console.log("user en postUser: ",user)
            // console.log("en updateInstitucion",institucion)
            const response = await actualizarInstitucion(institucion);
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

    return { fetchInstitucionData, institucionData, updateInstitucion, isLoading, error };
}

export { useInstitucion }