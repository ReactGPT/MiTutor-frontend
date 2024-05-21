import axios from 'axios';
import {Services as ServicesProperties} from '../../config';
import { ProgramaTutoria } from '../types';
import { tutoringProgramSlice } from '../slices';

type ServiceResponseProgramaTutoria={
  programaTutoriaList:ProgramaTutoria[];
}

async function getListaProgramaTutorias():Promise<ServiceResponseProgramaTutoria>{
  
  try {
      const response = await axios({
          method: 'get',
          url: ServicesProperties.BaseUrl+'/listarProgramasDeTutoria',
          headers : ServicesProperties.Headers
      });
      if(!response.data.success){
          return {programaTutoriaList:[]};
      }
      const programaTutoriaList: ProgramaTutoria[] = response.data.data.map((item: any) => {
        
        //const 
        return {
            id:item.tutoringProgramId,
            presencial :item.faceToFace,
            virtual: item.virtual,
            grupal:item.groupBased ,
            obligatorio:item.mandatory,
            cant_integrantes:item.membersCount,
            cant_alumnos:item.studentsNumber,
            cant_tutores:item.tutorsNumber,
            nombre:item.programName,
            descripcion:item.description,
            vigente:item.isActive,
            duracion:"",
            facultadId:item.faculty.facultyId,
            facultadNombre:item.faculty.name,
            especialidadId:item.specialty.specialtyId,
            especialidadNombre:item.specialty.name,
            tutores:[],
            alumnos:[],
            tutorTypeId:item.tutorTypeId,
            tutorTypeDescription: item.tutorTypeDescription
          };
        });
       
      return {programaTutoriaList:programaTutoriaList};;
      
  } catch (err) {
    return {programaTutoriaList:[]};
  }

  
}

type ServiceResponse={
    sucess:boolean;
    data?:any;
    message?:string;
}
  async function crearEditarProgramaTutoria(programa:ProgramaTutoria):Promise<ServiceResponse>{
    console.log(programa);
    try {
        const response = await axios({
            method: 'post',
            url: ServicesProperties.BaseUrl+'/crearEditarProgramaDeTutoria',
            headers : ServicesProperties.Headers,
            data: JSON.stringify(!!programa.id?{
                TutoringProgramId : programa?.id,
                FaceToFace:programa.presencial,
                Virtual:programa.virtual,
                GroupBased : programa.grupal,
                IndividualBased : !programa.grupal,
                Optional: !programa.obligatorio,
                Mandatory : programa.obligatorio,
                MembersCount : programa.cant_integrantes,
                ProgramName : programa.nombre,
                Description : programa.descripcion,
                Duration : "00:30:00",
                Faculty : {
                  FacultyId:programa.facultadId
                },
                Specialty: {
                  SpecialtyId:programa.especialidadId,
                },
                TutorTypeId:programa.tutorTypeId,
                IsActive:programa.vigente
            }:{
              //TutoringProgramId : programa?.id,
              FaceToFace:programa.presencial,
              Virtual:programa.virtual,
              GroupBased : programa.grupal,
              IndividualBased : !programa.grupal,
              Optional: !programa.obligatorio,
              Mandatory : programa.obligatorio,
              MembersCount : programa.cant_integrantes,
              ProgramName : programa.nombre,
              Description : programa.descripcion,
              Duration : "00:30:00",
              Faculty : {
                FacultyId:programa.facultadId
              },
              Specialty: {
                SpecialtyId:programa.especialidadId,
              },
              TutorTypeId:programa.tutorTypeId,
              IsActive:programa.vigente
          })
        });
        if(!response?.data.success){
            return {
                sucess:false,
                message:response?.data?.message
            };
        }
        return {
            sucess:response?.data.success,
            message:response?.data.message
        };;
        
    } catch (err:any) {
      return {
        sucess:false,
        message:err.message
      };
    }
  }

export {getListaProgramaTutorias,crearEditarProgramaTutoria}