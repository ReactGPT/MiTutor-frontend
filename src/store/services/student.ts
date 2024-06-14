import axios from 'axios';
import { Student } from '../types/Student';
import {Services as ServicesProperties} from '../../config';
type StudentDetailResponse={
  studentList:Student[];
}

async function getStudentInfo(idTutoringProgram:number):Promise<StudentDetailResponse>{
  try {
      const response = await axios({
          method: 'get',
          url: `${ServicesProperties.BaseUrl}/listarEstudiantesPorIdProgramaTutoria?idProgramaTutoria=${idTutoringProgram}`
      });
      if(response.data.success===false){
          return {studentList:[]};
      }
      const studentList: Student[] = response.data.data.map((item: any) => {
          return {
            studentId: item.id,
            name: item.person.name,
            lastName: item.person.lastName + " " + item.person.secondLastName,
            secondLastName: item.person.secondLastName,
            isActive: item.isActive,
            pucpCode: item.usuario.pucpCode,
            institutionalEmail: item.usuario.institutionalEmail,
            facultyName: item.facultyName,
            isRegistered: true,
            tutorId: item.idTutor,
            tutorName: item.tutorName,
          };
        });
      return {studentList:studentList};
      
  } catch (err) {
    return {studentList:[]};
  }
}

async function getStudentIdInfo(students:Student[]):Promise<StudentDetailResponse>{
  try {
      const response = await axios({
          method: 'post',
          url: `${ServicesProperties.BaseUrl}/listarEstudiantesPorId`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(students)
      });
   
      if(!response.data.success){
          return {studentList:[]};
      }
      const studentList: Student[] = response.data.data.map((item: any) => {
          return {
            studentId: item.studentId,
            name: item.name,
            lastName: item.lastName + " " + item.secondLastName,
            secondLastName: item.secondLastName,
            isActive: item.isActive,
            pucpCode: item.pucpCode,
            institutionalEmail: item.institutionalEmail,
            facultyName: item.facultyName,
            isRegistered: false,
          };
        });

      return {studentList};
      
  } catch (err) {
    return {studentList:[]};
  }
}

export {getStudentInfo, getStudentIdInfo}