import { getListaProgramaTutorias,crearEditarProgramaTutoria } from '../services';
import {useState} from 'react';
import { ProgramaTutoria } from "../types";


type ProgramaTutoriaHookReturnType =  {
    fetchProgramaTutorias: ()=>Promise<void>;
    postProgramaTutoria:(programa:ProgramaTutoria)=>Promise<void>;
    programaTutoriaData: ProgramaTutoria[];    
    isLoading: boolean;
    error: Error | null;
  };
    
function useProgramaTutoria(): ProgramaTutoriaHookReturnType{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [programaTutoriaData,setProgramaTutoriaData] = useState<ProgramaTutoria[]>([]);
    //const dispatch=useAppDispatch();
    //const {setFinances} = financeSlice.actions;
    //const{updateProductByField}=productSlice.actions
    const fetchProgramaTutorias = async () => {
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
    return { fetchProgramaTutorias,postProgramaTutoria,programaTutoriaData,isLoading, error };

}


export {useProgramaTutoria}