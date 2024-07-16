import { useState } from "react";
import UnidadDerivacion from "../types/UnidadDerivacion";
import { getUnidadInfo, getSubUnidadInfo, eliminarUnidad, crearUnidad, actualizarUnidad, crearSubUnidad } from "../services/unidadDerivacion";

interface UnidadHookReturnType {
    fetchUnidadData: () => Promise<void>;
    fetchSubUnidadData: (unidadId: number) => Promise<void>;
    unidadData: UnidadDerivacion[];
    deleteUnidad: (id: number) => Promise<boolean>;
    createUnidad: (unidad: UnidadDerivacion) => Promise<boolean>;
    updateUnidad: (unidad: UnidadDerivacion) => Promise<boolean>;
    createSubUnidad: (unidad: UnidadDerivacion) => Promise<boolean>;
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
    const deleteUnidad = async (id:number) => {
        setIsLoading(true);
        try {
            const response = await eliminarUnidad(id);
            if(!response.success){
                throw new Error(response.message);
            }
            return true;
        } catch (err:any) {
            setError(err);
            return false;
        } finally {
            setIsLoading(false);
        }
    };
    const createUnidad = async (unidad: UnidadDerivacion) => {
        setIsLoading(true);
        try {
            //console.log("user en postUser: ",user)
            const response = await crearUnidad(unidad);
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
    const updateUnidad = async (unidad: UnidadDerivacion) => {
        setIsLoading(true);
        try {
            //console.log("user en postUser: ",user)
            console.log("en updateUnidad aaaa",unidad)
            const response = await actualizarUnidad(unidad);
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
    const createSubUnidad = async (unidad: UnidadDerivacion) => {
        setIsLoading(true);
        try {
            //console.log("user en postUser: ",user)
            const response = await crearSubUnidad(unidad);
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

    return { fetchUnidadData, fetchSubUnidadData, unidadData, deleteUnidad, createUnidad, updateUnidad,createSubUnidad,subUnidadData, isLoading, error };
}

export { useUnidadDerivacion }