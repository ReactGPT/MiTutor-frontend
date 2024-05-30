import axios from 'axios';
import { programaDeTutoriaAlumno } from '../types/ListTutoringProgram';

type ProgramaDeTutoriaAlumnoResponse = {
  listaDeProgramasAlumno: programaDeTutoriaAlumno[];
};


async function getProgramaDeTutoriaByAlumnoId(studentId: number): Promise<ProgramaDeTutoriaAlumnoResponse> {

  try {
    const response = await axios.get(`https://localhost:44369/listarProgramasDeTutoriaPorAlumno/${studentId}`);
    const listaDeProgramasAlumno: programaDeTutoriaAlumno[] = response.data.data.map((item: any) => {
      return {
        tutoringProgramId: item.tutoringProgramId,
        programName: item.programName,
        programDescription: item.programDescription,
        faceToFace: item.faceToFace,
        virtual: item.virtual,
        facultyName: item.facultyName,
        specialtyName: item.specialtyName,
        tutorType: item.tutorType,
      };
    });

    return { listaDeProgramasAlumno: listaDeProgramasAlumno };
  }
  catch (error) {
    throw new Error("Error en getProgramaDeTutoriaByAlumnoId");
  }

}

export { getProgramaDeTutoriaByAlumnoId };