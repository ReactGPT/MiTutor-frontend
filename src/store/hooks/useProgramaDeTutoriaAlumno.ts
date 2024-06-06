import { useState } from 'react';
import { getProgramaDeTutoriaByAlumnoId } from '../services/programaDeTutoriaAlumno';
import { programaDeTutoriaAlumno } from '../types/ListTutoringProgram';

type ProgramaTutoriaAlumnoHooksReturn = {
    programaTutoriaAlumno: programaDeTutoriaAlumno[];
    loading: boolean;
    error: any;
    fetchProgramaDeTutoriaAlumno: () => Promise<void>;
};

function useProgramaDeTutoriaAlumno(studentId: number): ProgramaTutoriaAlumnoHooksReturn {

    const [programaTutoriaAlumno, setProgramaTutoriaAlumno] = useState<programaDeTutoriaAlumno[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchProgramaDeTutoriaAlumno = async () => {
        try {
            const data = await getProgramaDeTutoriaByAlumnoId(studentId);
            setProgramaTutoriaAlumno(data.listaDeProgramasAlumno);
            setLoading(false);
        } catch (error) {
            setError("Error en useProgramaDeTutoriaAlumno");
            setLoading(false);
        }
    };

    return { programaTutoriaAlumno, loading, error, fetchProgramaDeTutoriaAlumno };

}

export { useProgramaDeTutoriaAlumno };