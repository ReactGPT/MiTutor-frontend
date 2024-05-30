import axios from 'axios';
import { tutorxalumno,TutorEstadoSolicitud } from '../types/Tutor';

type TutorPorAlumnoResponse = {
  listaDeTutores: tutorxalumno[];
};

async function getTutoresPorTutoriayAlumno(programId : number, studentId : number): Promise<TutorEstadoSolicitud> {

    try {
        const response = await axios.get(`https://localhost:44369/listarTutoresPorProgramaPorAlumno/${programId}/${studentId}`);
        const data = response.data;

        const tutores: tutorxalumno[] = data.data.tutores.map((item: any) => ({
          tutorId: item.tutorId,
          tutorName: item.tutorName,
          tutorLastName: item.tutorLastName,
          tutorSecondLastName: item.tutorSecondLastName,
          state: item.state
        }));

        return {
          estado: data.data.estado,
          tutores: tutores
        };
      }
      catch (error) {
        throw new Error("Error en getTutoresPorTutoriayAlumno");
      }

}

async function getTutoresPorTutoriaVariable(programId : number): Promise<TutorPorAlumnoResponse> {

  try {
      const response = await axios.get(`https://localhost:44369/listarTutoresPorProgramaVariable/${programId}`);
      const listaDeTutores: tutorxalumno[] = response.data.data.map((item: any) => {
        return {
          tutorId : item.tutorId,
          tutorName : item.tutorName,
          tutorLastName : item.tutorLastName,
          tutorSecondLastName : item.tutorSecondLastName,
          state : item.state
        };
      });
  
      return { listaDeTutores: listaDeTutores };
    }
    catch (error) {
      throw new Error("Error en getTutoresPorTutoriaVariable");
    }

}

export { getTutoresPorTutoriayAlumno,getTutoresPorTutoriaVariable };