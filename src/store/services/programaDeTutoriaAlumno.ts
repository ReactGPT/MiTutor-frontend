import axios from 'axios';
import { programaDeTutoriaAlumno } from '../types/ListTutoringProgram';

type ProgramaDeTutoriaAlumnoResponse = {
    listaDeProgramasAlumno: programaDeTutoriaAlumno[];
};


async function getProgramaDeTutoriaByAlumnoId(studentId: number): Promise<ProgramaDeTutoriaAlumnoResponse> {

    try{
        const response = await axios.get(`https://localhost:44369/listarProgramasDeTutoriaPorAlumno/${studentId}`);
        console.log(response.data);
        const listaDeProgramasAlumno: programaDeTutoriaAlumno[] = response.data.data.map((item: any) => {
            return {
                tutoringProgramId : item.tutoringProgramId,
                programName : item.programName,
                programDescription : item.programDescription,
                facultyId : item.facultyId,
                facultyName : item.facultyName,
                specialtyId : item.specialtyId,
                specialtyName : item.specialtyName,
                tutorTypeId : item.tutorTypeId,
                tutorName : item.tutorName,
                tutorLastName : item.tutorLastName,
                tutorSecondLastName : item.tutorSecondLastName,
                studentId : item.studentId,
                typeDescription : item.typeDescription,
                state : item.state,
            };
        });

        return { listaDeProgramasAlumno: listaDeProgramasAlumno };
    }
    catch (error){
        throw new Error("Error en getProgramaDeTutoriaByAlumnoId");
    }

}

export { getProgramaDeTutoriaByAlumnoId };