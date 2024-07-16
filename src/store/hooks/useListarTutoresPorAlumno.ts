import { useState } from 'react';
import { getTutoresPorTutoriaVariable, getTutoresPorTutoriayAlumno } from '../services/listarTutoresPorAlumno';
import { tutorxalumno,TutorEstadoSolicitud } from '../types/Tutor';

type TutorPorAlumnoHooksReturn = {
    listaDeTutores: tutorxalumno[];
    estado ?: string;
    loading: boolean;
    error: any;
    fetchTutoresPorTutoria: () => Promise<void>;
};

function useTutoresPorTutoriayAlumno(programId: number, studentId: number): TutorPorAlumnoHooksReturn {
    const [listaDeTutores, setlistaDeTutores] = useState<tutorxalumno[]>([]);
    const [estado,setEstado] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
  
    const fetchTutoresPorTutoria = async () => {
      try {
        const data: TutorEstadoSolicitud = await getTutoresPorTutoriayAlumno(programId, studentId);
        console.log("tutoresss",data.tutores);
        setlistaDeTutores(data.tutores);
        setEstado(data.estado);
        setLoading(false);
      } catch (error) {
        setError("Error en useTutoresPorTutoriayAlumno");
        setLoading(false);
      }
    };
    
    return { listaDeTutores,estado, loading, error, fetchTutoresPorTutoria };
  }

function useTutoresPorTutoriaVariable(programId : number): TutorPorAlumnoHooksReturn {

    const [listaDeTutores, setlistaDeTutores] = useState<tutorxalumno[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchTutoresPorTutoria = async () => {
        try {
            const data = await getTutoresPorTutoriaVariable(programId);
            setlistaDeTutores(data.listaDeTutores);
            setLoading(false);
        } catch (error) {
            setError("Error en useTutoresPorTutoriaVariable");
            setLoading(false);
        }
    };

    return { listaDeTutores, loading, error, fetchTutoresPorTutoria };

}

export { useTutoresPorTutoriayAlumno,useTutoresPorTutoriaVariable };