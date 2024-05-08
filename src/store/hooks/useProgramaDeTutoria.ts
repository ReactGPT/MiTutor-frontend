import { useState } from 'react';
import { getProgramaDeTutoriaByTutorId } from '../services/programaDeTutoria';
import { TutoringProgram } from '../types/TutoringProgram';

type ProgramaTutoriaHooksReturn = {
    programaTutoria: TutoringProgram[];
    loading: boolean;
    error: any;
    fetchProgramaDeTutoria: () => Promise<void>;
};

function useProgramaDeTutoria(tutorId: number): ProgramaTutoriaHooksReturn {

    const [programaTutoria, setProgramaTutoria] = useState<TutoringProgram[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    //useEffect( () => {},[]);

    const fetchProgramaDeTutoria = async () => {
        try {
            const data = await getProgramaDeTutoriaByTutorId(tutorId);
            setProgramaTutoria(data.listaDeProgramas);
            setLoading(false);
        } catch (error) {
            setError("Error en useProgramaDeTutoria");
            setLoading(false);
        }
    };

    //fetchProgramaDeTutoria();

    return { programaTutoria, loading, error, fetchProgramaDeTutoria };

}

export { useProgramaDeTutoria };