import { useState } from 'react';
import { getTutoresPorTutoriayAlumno } from '../services/listarTutoresPorAlumno';
import { tutorxalumno } from '../types/Tutor';

type TutorPorAlumnoYTutoriaHooksReturn = {
    listaDeTutores: tutorxalumno[];
    loading: boolean;
    error: any;
    fetchTutoresPorTutoriayAlumno: () => Promise<void>;
};

function useTutoresPorTutoriayAlumno(programId : number, studentId : number): TutorPorAlumnoYTutoriaHooksReturn {

    const [listaDeTutores, setlistaDeTutores] = useState<tutorxalumno[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchTutoresPorTutoriayAlumno = async () => {
        try {
            const data = await getTutoresPorTutoriayAlumno(programId,studentId);
            setlistaDeTutores(data.listaDeTutores);
            setLoading(false);
        } catch (error) {
            setError("Error en useTutoresPorTutoriayAlumno");
            setLoading(false);
        }
    };

    return { listaDeTutores, loading, error, fetchTutoresPorTutoriayAlumno };

}

export { useTutoresPorTutoriayAlumno };