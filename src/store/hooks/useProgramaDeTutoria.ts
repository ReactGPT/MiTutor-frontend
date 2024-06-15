import { useState } from 'react';
import { getProgramaDeTutoriaByTutorId } from '../services/programaDeTutoria';
import { ListTutoringProgram } from '../types/ListTutoringProgram';

type ProgramaTutoriaHooksReturn = {
  programaTutoria: ListTutoringProgram[];
  loading: boolean;
  error: any;
  fetchProgramaDeTutoria: () => Promise<void>;
};

function useProgramaDeTutoria(tutorId: number): ProgramaTutoriaHooksReturn {

  const [programaTutoria, setProgramaTutoria] = useState<ListTutoringProgram[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

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

  return { programaTutoria, loading, error, fetchProgramaDeTutoria };

}

export { useProgramaDeTutoria };