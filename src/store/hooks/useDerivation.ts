import { useState } from 'react';
import { getListaDerivacionesByTutorId } from '../services/derivation';
import { Derivation,ListDerivation } from '../types/Derivation';

type DerivationHooksReturn = {
    derivation: ListDerivation[];
    loading: boolean;
    error: any;
    fetchDerivation: () => Promise<void>;
};

function useDerivationPorTutor(tutorId: number): DerivationHooksReturn {

    const [derivation, setDerivation] = useState<ListDerivation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchDerivation = async () => {
        try{
            const data = await getListaDerivacionesByTutorId(tutorId);
            setDerivation(data.listaDerivaciones);
            console.log(data.listaDerivaciones);
            setLoading(false);
        }catch(error){
            setError("Error en useCita");
            setLoading(false);
        }
    }

    return { derivation, loading, error, fetchDerivation };

}

export { useDerivationPorTutor};