import { useState } from 'react';
import axios from 'axios';
import { Services as ServicesProperties } from '../../config';

// Define la interfaz para los datos del programa de tutoría del estudiante
export interface TutorStudentProgram {
    tutorStudentProgramId: number;
    studentId: number;
    studentCode: string;
    specialtyId: number;
    specialtyName: string;
    specialtyAcronym: string;
    studentFirstName: string;
    studentLastName: string;
    tutorId: number;
    tutorFirstName: string;
    tutorLastName: string;
    programName: string;
    programDescription: string;
    requestDate: string;
    state: string;
    isActive: number;
    motivo: string;
    studentProgram: {
        student: {   
            name: string;
            lastName: string;
            secondLastName: string;         
            specialty: {
                name: string;
                faculty: {
                    name: string;
                };
            };           
            usuario: {
                pucpCode: string;
            };
        };
    };
    tutor: {
        userAccount: {
            persona: {
                name: string;
                lastName: string;
                secondLastName: string;
            };
        };
    };
}

// Configura Axios para usar la URL base del backend
const api = axios.create({
    baseURL: ServicesProperties.BaseUrl + '/api', // Asegúrate de que esta URL es correcta
});

type UseTutorStudentProgramsReturnType = {
    fetchTutorStudentPrograms: () => Promise<void>;
    updateProgramState: (ids: number[], newState: string) => Promise<void>;
    tutorStudentPrograms: TutorStudentProgram[];
    isLoading: boolean;
    error: Error | null;
};

function useTutorStudentPrograms(): UseTutorStudentProgramsReturnType {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [tutorStudentPrograms, setTutorStudentPrograms] = useState<TutorStudentProgram[]>([]);

    const fetchTutorStudentPrograms = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await api.get<{ success: boolean; data: TutorStudentProgram[] }>('/tutorstudentprogram/listarTutorStudentProgram');
            setTutorStudentPrograms(response.data.data); // Actualiza el estado con los datos obtenidos
        } catch (err: any) {
            setError(err);
            setTutorStudentPrograms([]); // Limpia los datos en caso de error
        } finally {
            setIsLoading(false);
        }
    };

    const updateProgramState = async (ids: number[], newState: string) => {
        try {
            await api.post('/tutorstudentprogram/updateEstado', {
                TutorStudentProgramIds: ids,
                NewState: newState
            });
        } catch (err: any) {
            setError(err);
        }
    };
    return { fetchTutorStudentPrograms, updateProgramState, tutorStudentPrograms, isLoading, error };
}

export { useTutorStudentPrograms };
