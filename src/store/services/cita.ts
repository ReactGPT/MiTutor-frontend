import axios from 'axios';
import { ListCita } from '../types/ListCita';
import { Services as ServicesProperties } from '../../config';
import { message } from 'antd';


type listaResponse = {
    listaDeCitas: ListCita[];
};


async function getListaDeCitasByTutorId(tutorId: number): Promise<listaResponse> {

    try {
        const response = await axios.get(ServicesProperties.BaseUrl+`/listarCitasPorTutor/${tutorId}`);
        const listaDeCitas: ListCita[] = response.data.data.map((item: any) => {
            return {
                appointmentId: item.appointmentId,
                programId: item.programId,
                programName: item.programName,
                appointmentStatus: item.appointmentStatus,
                groupBased: item.groupBased,
                creationDate: item.creationDate,
                personId: item.personId,
                name: item.name,
                lastName: item.lastName,
                secondLastName: item.secondLastName,
                isInPerson: item.isInPerson,
                startTime: item.startTime,
                endTime: item.endTime,
                reason: item.reason
            };
        });

        return { listaDeCitas: listaDeCitas };
    } catch (error) {
        throw new Error("Error en getListaDeCitasByTutorId");
    }

}

async function getListaDeCitasByTutorIdByStudentId(tutorId: number, studentId: number): Promise<listaResponse> {

    try {
        const response = await axios.get(`${ServicesProperties.BaseUrl}/listarCitasPorTutorPorAlumno/${tutorId}/${studentId}`);
        const listaDeCitas: ListCita[] = response.data.data.map((item: any) => {
            return {
                appointmentId: item.appointmentId,
                programName: item.programName,
                appointmentStatus: item.appointmentStatus,
                groupBased: item.groupBased,
                creationDate: item.creationDate,
                personId: item.personId,
                name: item.name,
                lastName: item.lastName,
                secondLastName: item.secondLastName,
                isInPerson: item.isInPerson,
                startTime: item.startTime,
                endTime: item.endTime,
                reason: item.reason
            };
        });

        console.log(response.data);

        return { listaDeCitas: listaDeCitas };
    } catch (error) {
        throw new Error("Error en getListaDeCitasByTutorIdByAlumnoId");
    }

}

async function getListaDeCitasByStudentId(studentId: number): Promise<listaResponse> {

    try {
        const response = await axios.get(`${ServicesProperties.BaseUrl}/listarCitasPorAlumnoId/${studentId}`);
        const listaDeCitas: ListCita[] = response.data.data.map((item: any) => {
            return {
                appointmentId: item.appointmentId,
                programId: item.programId,
                programName: item.programName,
                appointmentStatus: item.appointmentStatus,
                groupBased: item.groupBased,
                creationDate: item.creationDate,
                personId: item.personId,
                name: item.name,
                lastName: item.lastName,
                secondLastName: item.secondLastName,
                isInPerson: item.isInPerson,
                startTime: item.startTime,
                endTime: item.endTime,
                reason: item.reason,
                tutorId : item.tutorId,
                meetingRoom : item.meetingRoom,
                tutorName : item.tutorName,
                tutorLastName : item.tutorLastName,
                tutorSecondLastName : item.tutorSecondLastName,
                tutorEmail : item.tutorEmail,
                commentId: item.commentId,
                message: item.message
            };
        });

        console.log(response.data);

        return { listaDeCitas: listaDeCitas };
    } catch (error) {
        throw new Error("Error en getListaDeCitasByStudentId");
    }

}

type Appointment = {
    startTime: string;
    endTime: string;
    creationDate: string;
    reason: string;
    isInPerson: boolean;
    classroom: string;
};

type AddAppointmentRequest = {
    appointment: Appointment;
    idProgramTutoring: number;
    idTutor: number;
    idStudent: number[];
};

async function addAppointment(appointmentData: AddAppointmentRequest): Promise<void> {
    try {
        await axios.post(ServicesProperties.BaseUrl+'/agregarCita', appointmentData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        throw new Error("Error en addAppointment");
    }
}

export { getListaDeCitasByTutorId, getListaDeCitasByTutorIdByStudentId, addAppointment, getListaDeCitasByStudentId };