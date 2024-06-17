import {useState} from 'react';
//import { crearEditarUsuario, eliminarUsuario, getUsuarios, getStudents, crearEditarAlumno } from '../services/User';
import { Tutor } from '../types';
import { postCrearTutores } from '../services';

type TutorHookReturnType = {
    //tutores: Tutor[];
    isLoading: boolean;
    error: Error|null;
    postTutores: (tutores:Tutor[]) => Promise<boolean>;
};

function useTutor(): TutorHookReturnType{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [tutores,setTutores] = useState<Tutor[]|null>(null);
    
    const postTutores = async (tutores:Tutor[]) => {
        setIsLoading(true);
        try {
            const response = await postCrearTutores(tutores);
            return response.success
            
        } catch (err:any) {
            setError(err);
            return false;
        //return [];
        } finally {
            setIsLoading(false);
        }
    };
    
    return { postTutores,isLoading, error };

}

export {useTutor}