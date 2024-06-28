import axios from 'axios';
import {Services as ServicesProperties} from '../../config';
import { ProgramaTutoria, Tutor } from '../types';
import { tutoringProgramSlice } from '../slices';

type ServiceResponseProgramaTutoria={
  programaTutoriaList:ProgramaTutoria[];
}

async function getListaProgramaTutorias():Promise<ServiceResponseProgramaTutoria>{
  
  try {
      const response = await axios({
          method: 'get',
          url: ServicesProperties.BaseUrl+'/api/TutoringProgram/listarProgramasDeTutoria',
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
            data: JSON.stringify({
                
                TutoringProgramId : !!programa.id?programa?.id:-1,
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
                Tutors: programa.tutores.map(tutor=>{
                  return {
                    TutorId: tutor.idTutor,
                    MeetingRoom : tutor.meetingRoom
                  }
                }),
                Students: programa.alumnos.map(alumno=>{
                  return {
                    Id:alumno.studentId,
                    IdTutor:!!alumno.tutorId?alumno.tutorId:-1,
                    IsActive:alumno.isActive
                  }
                }),
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
  
  async function getTutoresByTutoringProgramId(tutoringProgramId:number):Promise<ServiceResponse>{
    try {
      const response = await axios({
          method: 'get',
          url: ServicesProperties.BaseUrl+`/listarTutores?idProgramaTutoria=${tutoringProgramId}`,
          headers : ServicesProperties.Headers
      });
      if(!response.data.success){
          return {sucess:false,message:response.data.message};
      }
      if(response.data.data.lenght===0){
        return {sucess:true,data:[]}
      }
      const tutorList: Tutor[] = response.data.data.map((item: any) => {
        console.log("tutores",response);
        return {
            idTutor:item.tutorId,
            nombre:item.userAccount.persona.name,
            apellido_paterno:item.userAccount.persona.lastName,
            apellido_materno:item.userAccount.persona.secondLastName,
            pucpCode:item.userAccount.pucpCode,
            meetingRoom:item.meetingRoom,
            email:item.userAccount.institutionalEmail,
            fullname:`${item.userAccount.persona.name} ${item.userAccount.persona.lastName} ${item.userAccount.persona.secondLastName}`,
            modificationDate:item.modificationDate.toString().split(' ')[0],
            userAccountId: item.userAccount.id
          };
        });
       
      return {sucess:true,data:tutorList};
        
    } catch (err:any) {
      throw new Error(err.message);
    }

    
}
async function getEliminarTutoria(tutoringProgramId:number):Promise<ServiceResponse>{
  try {
    const response = await axios({
        method: 'get',
        url: ServicesProperties.BaseUrl+`/eliminarProgramaTutoria?tutoringProgramId=${tutoringProgramId}`,
        headers : ServicesProperties.Headers
    });
    if(!response.data.success){
        return {sucess:false,message:response.data.message};
    }
    
    return {sucess:true,message:response.data.message};
      
  } catch (err:any) {
    throw new Error(err.message);
  }
}

async function getEliminarEstudiantesProgramaTutoria(tutoringProgramId:number):Promise<ServiceResponse>{
  try{
    const response = await axios({
      method: 'get',
      url: ServicesProperties.BaseUrl+`/eliminarEstudiantesPrograma?tutoringProgramId=${tutoringProgramId}`,
      headers : ServicesProperties.Headers
    });
    if(!response.data.success){
        return {sucess:false,message:response.data.message};
    }
    return {sucess:true,message:response.data.message};
  }
  catch(err:any){
    throw new Error(err.message);
  }
}

export {getListaProgramaTutorias,crearEditarProgramaTutoria,getTutoresByTutoringProgramId,getEliminarTutoria,getEliminarEstudiantesProgramaTutoria}