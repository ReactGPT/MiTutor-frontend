import { getListaProgramaTutorias,crearEditarProgramaTutoria,getTutoresByTutoringProgramId } from '../services';
import {useState} from 'react';
import { ProgramaTutoria, Tutor } from "../types";


type ProgramaTutoriaHookReturnType =  {
    fetchProgramaTutorias: ()=>Promise<void>;
    fetchTutoresByProgramaTutoria:(tutoringProgramId:number)=>Promise<Tutor[]>;
    postProgramaTutoria:(programa:ProgramaTutoria)=>Promise<void>;
    programaTutoriaData: ProgramaTutoria[];    
    isLoading: boolean;
    error: Error | null;
    tutorListByProgramId:Tutor[];
  };
    
function useProgramaTutoria(): ProgramaTutoriaHookReturnType{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [programaTutoriaData,setProgramaTutoriaData] = useState<ProgramaTutoria[]>([]);
    const [tutorListByProgramId,setTutorListByProgramId] = useState<Tutor[]>([]);
    const fetchProgramaTutorias = async () => {
        setTutorListByProgramId([]);
        setIsLoading(true);
        try {
            const response = await getListaProgramaTutorias();
            setProgramaTutoriaData(response.programaTutoriaList);
            //console.log(financeData);
            //return financeList;
            
        } catch (err:any) {
            setError(err);
            setProgramaTutoriaData([]);
        //return [];
        } finally {
            setIsLoading(false);
        }
    };
    
    const postProgramaTutoria = async (programa:ProgramaTutoria) => {
        setIsLoading(true);
        try {
            const response = await crearEditarProgramaTutoria(programa);
            if(!response.sucess){
                throw new Error(response.message);
            }
            //console.log(financeData);
            //return financeList;
            
        } catch (err:any) {
            setError(err);
        //return [];
        } finally {
            setIsLoading(false);
        }
    };
    const fetchTutoresByProgramaTutoria = async (tutoringProgramId:number) => {
        setIsLoading(true);
        let tutores:Tutor[]=[]
        try {
            const response = await getTutoresByTutoringProgramId(tutoringProgramId);
            setTutorListByProgramId(response.data);
            tutores=response.data;
            return response.data;
            //console.log(financeData);
            //return financeList;
            
        } catch (err:any) {
            setError(err);
            setTutorListByProgramId([]);
            return []
        //return [];
        } finally {
            setIsLoading(false);
            //return tutores;
        }
    };

    return { fetchProgramaTutorias,fetchTutoresByProgramaTutoria,postProgramaTutoria,programaTutoriaData,isLoading, error,tutorListByProgramId };

}


export {useProgramaTutoria}