import axios from 'axios';
import { ListCita } from '../types/ListCita';
import {Services as ServicesProperties} from '../../config';

type listaResponse = {
    listaDeCitas : ListCita[];
}


async function getListaDeCitasByTutorId(tutorId : number): Promise<listaResponse> {

    try{
        const response = await axios.get(`${ServicesProperties.BaseUrl}/listarCitasPorTutor/${tutorId}`);
        const listaDeCitas: ListCita[] = response.data.data.map((item: any) => {
            return {
                appointmentId : item.appointmentId,
                programName : item.programName,
                appointmentStatus : item.appointmentStatus,
                groupBased : item.groupBased,
                creationDate : item.creationDate,
                personId : item.personId,
                name : item.name,
                lastName : item.lastName,
                secondLastName : item.secondLastName,
                isInPerson : item.isInPerson,
                startTime : item.startTime,
                endTime : item.endTime,
                reason : item.reason
            }
        })

        return {listaDeCitas: listaDeCitas};
    }catch(error){
        throw new Error("Error en getListaDeCitasByTutorId");
    }

}

async function getListaDeCitasByTutorIdByStudentId(tutorId : number, studentId : number): Promise<listaResponse> {

    try{
        const response = await axios.get(`${ServicesProperties.BaseUrl}/listarCitasPorTutorPorAlumno/${tutorId}/${studentId}`);
        const listaDeCitas: ListCita[] = response.data.data.map((item: any) => {
            return {
                appointmentId : item.appointmentId,
                programName : item.programName,
                appointmentStatus : item.appointmentStatus,
                groupBased : item.groupBased,
                creationDate : item.creationDate,
                personId : item.personId,
                name : item.name,
                lastName : item.lastName,
                secondLastName : item.secondLastName,
                isInPerson : item.isInPerson,
                startTime : item.startTime,
                endTime : item.endTime,
                reason : item.reason
            }
        })
        
        console.log(response.data);

        return {listaDeCitas: listaDeCitas};
    }catch(error){
        throw new Error("Error en getListaDeCitasByTutorIdByAlumnoId");
    }

}

export { getListaDeCitasByTutorId, getListaDeCitasByTutorIdByStudentId };