import axios from 'axios';
import { Specialty } from '../types/Specialty';
import { Services } from '../../config';

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

async function getEspecialidadPorFacultadInfo(idFacultad:number):Promise<EspecialidadDetailResponse>{
    try{
        const response = await axios({
            method: 'GET',
            url: `${Services.BaseUrl}/api/Specialty/listarEspecialidadPorFacultad?FacultyId=${idFacultad}`,
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

export { getEspecialidadInfo, getEspecialidadPorFacultadInfo }