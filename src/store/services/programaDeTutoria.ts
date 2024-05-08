import axios from 'axios';
import { TutoringProgram } from '../types/TutoringProgram';

type ProgramaDeTutoriaResponse = {             
    listaDeProgramas : TutoringProgram[];
};

async function getProgramaDeTutoriaByTutorId(tutorId: number): Promise<ProgramaDeTutoriaResponse> {

    try{
        const response = await axios.get(`https://localhost:44369/listarProgramasDeTutoriaPorTutor/${tutorId}`);
        const listaDeProgramas: TutoringProgram[] = response.data.data.map((item: any) => {
            return {
                tutoringProgramId: item.tutoringProgramId,
                faceToFace: item.faceToFace,
                groupBased: item.groupBased,
                individualBased: item.individualBased,
                membersCount: item.membersCount,
                programName: item.programName,
                description: item.description,
                facultyId: 2,
                facultyName: "generales ciencias",
                specialtyId: 3,
                specialtyName: "Ingenieria informatica",
                tutorTypeId: 1,
                tutorTypeDescription: "Programa de cachimbos"
            }
        })

        return {listaDeProgramas: listaDeProgramas};
    }
    catch(error){
        throw new Error("Error en getProgramaDeTutoriaByTutorId");
    }

}

export {getProgramaDeTutoriaByTutorId};