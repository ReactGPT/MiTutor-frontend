import { Student } from './../types/Student';
import axios from 'axios';

type StudentDetailResponse={
  studentList:Student[];
}

async function getStudentIdInfo(idStudent:number):Promise<StudentDetailResponse>{
  try {
      const response = await axios({
          method: 'get',
          url: `https://localhost:44369/ListarEstudiantesPorId?idEstudiante=${idStudent}`
      });
   
      if(!response.data.success){
          return {studentList:[]};
      }
      const studentList: Student[] = response.data.data.map((item: any) => {
          return {
            studentId: item.id,
            name: item.name,
            lastName: item.lastName + " " + item.secondLastName,
            secondLastName: item.secondLastName,
            isActive: item.isActive,
            pucpCode: item.usuario.pucpCode,
            institutionalEmail: item.usuario.institutionalEmail,
            facultyName: item.facultyName,
            isRegistered: false,
          };
        });

      return {studentList};
      
  } catch (err) {
    return {studentList:[]};
  }
}
export {getStudentIdInfo}