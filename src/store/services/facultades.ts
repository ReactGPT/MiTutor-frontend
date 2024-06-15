import axios from 'axios';
import { Facultad } from '../types/Facultad';
import { number } from 'react-form-ease';

type FacultyDetailResponse={
  facultadList:Facultad[];
}

async function getFacultadInfo():Promise<FacultyDetailResponse>{
    try{
        const response = await axios({
            method: 'GET',
            url: 'https://localhost:44369/api/Faculty/listarFacultades',
        });
        if(response.data.success===false){
            return {facultadList:[]};
        }
        const facultadList:Facultad[] = response.data.data.map((item:any)=>{
            return {
              id: item.facultyId,
              name: item.name,
              acronym: item.acronym,
              numberStudents: item.numberOfStudents,
              numberTutors: item.numberOfTutors,
              isActive: item.isActive,
              facultyManager: item.facultyManager,
              specialties: item.specialties,
              tutoringPrograms: item.tutoringPrograms,
              
            }
        });
        return {facultadList};
    }
    catch(error){
      console.log("error");
        return {facultadList:[]};
    }
}

export { getFacultadInfo }