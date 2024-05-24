import { Student } from './../types/Student';
import axios from 'axios';

type StudentDetailResponse={
  studentList:Student[];
}

async function getStudentInfo(idTutoringProgram:number):Promise<StudentDetailResponse>{
  try {
      const response = await axios({
          method: 'get',
          url: `https://localhost:44369/ListarEstudiantesPorIdProgramaTutoria?idProgramaTutoria=${idTutoringProgram}`
      });
      if(response.data.success===false){
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
            isRegistered: true,
          };
        });
      return {studentList:studentList};
      
  } catch (err) {
    return {studentList:[]};
  }
}
export {getStudentInfo}