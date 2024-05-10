import axios from 'axios';
import { ListTutoringProgram } from '../types/ListTutoringProgram';

type ProgramaDeTutoriaResponse = {
    listaDeProgramas: ListTutoringProgram[];
};

async function getProgramaDeTutoriaByTutorId(tutorId: number): Promise<ProgramaDeTutoriaResponse> {

    try {
        const response = await axios.get(`https://localhost:44369/listarProgramasDeTutoriaPorTutor/${tutorId}`);
        const listaDeProgramas: ListTutoringProgram[] = response.data.data.map((item: any) => {
            return {
                tutoringProgramId: item.tutoringProgramId,
                programName: item.programName,
                description: item.description,
                facultyName: item.facultyName,
                specialtyName: item.specialtyName,
                tutorType: item.tutorType,
            };
        });

        return { listaDeProgramas: listaDeProgramas };
    }
    catch (error) {
        throw new Error("Error en getProgramaDeTutoriaByTutorId");
    }

}

export { getProgramaDeTutoriaByTutorId };