import { getEspecialidades,getFacultades } from '../services';
import {useState} from 'react';
import { Specialty,Faculty } from "../types";
import { useAppDispatch } from './../hooks/storehooks';
import { parametersSlice } from '../slices';

type ProgramaTutoriaHookReturnType =  {
    fetchEspecialidades: ()=>Promise<void>;
    fetchFacultades:()=>Promise<void>;
    // fetchStatuses:()=>Promise<void>;
    especialidadesData: Specialty[];
    facultadesData:Faculty[];    
    isLoading: boolean;
    error: Error | null;
  };
    
function useParameters(): ProgramaTutoriaHookReturnType{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [especialidadesData,setEspecialidadesData] = useState<Specialty[]>([]);
    const [facultadesData,setFacultadesData] = useState<Faculty[]>([]);
    const dispatch=useAppDispatch();
    const {setSpecialities,setFaculties} = parametersSlice.actions;
    //const{updateProductByField}=productSlice.actions
    const fetchEspecialidades = async () => {
        setIsLoading(true);
        try {
            const response = await getEspecialidades();
            setEspecialidadesData(response.data);
            if(response.data.length!==0){
                dispatch(setSpecialities(response.data));
            }
            //console.log(financeData);
            //return financeList;
            
        } catch (err:any) {
            setError(err);
            setEspecialidadesData([]);
        //return [];
        } finally {
            setIsLoading(false);
        }
    };
    const fetchFacultades = async () => {
        setIsLoading(true);
        try {
            const response = await getFacultades();
            setFacultadesData(response.data);
            if(response.data.length!==0){
                dispatch(setFaculties(response.data));
            }
            //console.log(financeData);
            //return financeList;
            
        } catch (err:any) {
            setError(err);
            setFacultadesData([]);
        //return [];
        } finally {
            setIsLoading(false);
        }
    };
    // const fetchStatuses = async () => {
    //     setIsLoading(true);
    //     try {
    //         // const response = await getStatusClassNames();
    //         setFacultadesData(response.data);
    //         if(response.data.length!==0){
    //             dispatch(setFaculties(response.data));
    //         }
    //         //console.log(financeData);
    //         //return financeList;
            
    //     } catch (err:any) {
    //         setError(err);
    //         setFacultadesData([]);
    //     //return [];
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    

    
    return { fetchEspecialidades,fetchFacultades,especialidadesData,facultadesData,isLoading, error };
}


export {useParameters}