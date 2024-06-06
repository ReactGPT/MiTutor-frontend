import { useState } from 'react';
import { getListaDeCitasByTutorId,getListaDeCitasByTutorIdByStudentId, getListaDeCitasByStudentId } from '../services/cita';
import { ListCita } from '../types/ListCita';

type CitaHooksReturn = {
    cita: ListCita[];
    loading: boolean;
    error: any;
    fetchCita: () => Promise<void>;
};

function useCitasPorTutor(tutorId: number): CitaHooksReturn {

    const [cita, setCita] = useState<ListCita[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchCita = async () => {
        try{
            const data = await getListaDeCitasByTutorId(tutorId);
            setCita(data.listaDeCitas);
            setLoading(false);
        }catch(error){
            setError("Error en useCita");
            setLoading(false);
        }
    }

    return { cita, loading, error, fetchCita };

}

function useCitasPorTutorPorAlumno(tutorId: number, studentId: number): CitaHooksReturn {

    const [cita, setCita] = useState<ListCita[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchCita = async () => {
        try{
            const data = await getListaDeCitasByTutorIdByStudentId(tutorId,studentId);
            setCita(data.listaDeCitas);
            setLoading(false);
        }catch(error){
            setError("Error en useCita");
            setLoading(false);
        }
    }

    return { cita, loading, error, fetchCita };

}

function useCitasPorAlumno(studentId: number): CitaHooksReturn {

    const [cita, setCita] = useState<ListCita[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchCita = async () => {
        try{
            const data = await getListaDeCitasByStudentId(studentId);
            setCita(data.listaDeCitas);
            setLoading(false);
        }catch(error){
            setError("Error en useCita");
            setLoading(false);
        }
    }

    return { cita, loading, error, fetchCita };

}

export { useCitasPorTutor,useCitasPorTutorPorAlumno, useCitasPorAlumno};