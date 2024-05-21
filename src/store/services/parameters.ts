import axios from 'axios';
import {Services as ServicesProperties} from '../../config';
import { Faculty, Specialty } from '../types';


type ServiceResponseEspecialidades={
  data:Specialty[];
}

async function getEspecialidades():Promise<ServiceResponseEspecialidades>{
  
  try {
      const response = await axios({
          method: 'get',
          url: ServicesProperties.BaseUrl+'/listarEspecialidad',
          headers : ServicesProperties.Headers
      });
      if(!response.data.success){
          return {data:[]};
      }
      const especialidades: Specialty[] = response.data.data.map((item: any) => {
        
        //const 
        return {
            id:item.specialtyId,
            name:item.name,
            acronym:item.acronym,
            numberStudents:item.numberOfStudents,
            facultyId:item.faculty.facultyId,
          };
        });
       
      return {data:especialidades};;
      
  } catch (err) {
    return {data:[]};
  }
}

type ServiceResponseFacultades={
    data:Faculty[];
  }
  

async function getFacultades():Promise<ServiceResponseFacultades>{
  
    try {
        const response = await axios({
            method: 'get',
            url: ServicesProperties.BaseUrl+'/listarFacultades',
            headers : ServicesProperties.Headers
        });
        if(!response.data.success){
            return {data:[]};
        }
        const facultades: Faculty[] = response.data.data.map((item: any) => {
          
          //const 
          return {
              id:item.facultyId,
              name:item.name,
              acronym:item.acronym,
              numberStudents:item.numberOfStudents,
              numberTutors:item.numberOfTutors,
            };
          });
         
        return {data:facultades};;
        
    } catch (err) {
      return {data:[]};
    }
  }













export {getEspecialidades,getFacultades}