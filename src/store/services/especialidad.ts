import axios from 'axios';
import { Specialty } from '../types/Specialty';

type EspecialidadDetailResponse={
  especialidadList:Specialty[];
}

async function getEspecialidadInfo():Promise<EspecialidadDetailResponse>{
    try{
        const response = await axios({
            method: 'GET',
            url: 'https://localhost:44369/listarEspecialidad',
        });
        if(response.data.success===false){
            return {especialidadList:[]};
        }
        const especialidadList:Specialty[] = response.data.data.map((item:any)=>{
            return {
              specialtyId: item.specialtyId,
              name: item.name,
              acronym: item.acronym,
              numberStudents: item.numberOfStudents,
              facultyId: item.facultyId,
                // COMPLETAR CON DATOS DEL RESPONSABLE
            }
        });
        return {especialidadList};
    }
    catch(error){
        return {especialidadList:[]};
    }
}

export { getEspecialidadInfo }