import axios from 'axios';
import { Specialty } from '../types/Specialty';
import { Services } from '../../config';

type EspecialidadDetailResponse = {
    especialidadList: Specialty[];
};

async function getEspecialidadInfo(): Promise<EspecialidadDetailResponse> {
    try {
        const response = await axios({
            method: 'GET',
            url: `${Services.BaseUrl}/listarEspecialidad`,
        });
        if (response.data.success === false) {
            return { especialidadList: [] };
        }
        const especialidadList: Specialty[] = response.data.data.map((item: any) => {
            return {
                specialtyId: item.specialtyId,
                name: item.name,
                acronym: item.acronym,
                numberStudents: item.numberOfStudents,
                facultyId: item.facultyId,
                // COMPLETAR CON DATOS DEL RESPONSABLE
            };
        });
        return { especialidadList };
    }
    catch (error) {
        return { especialidadList: [] };
    }
}

async function getEspecialidadPorFacultadInfo(idFacultad: number): Promise<EspecialidadDetailResponse> {
    try {
        const response = await axios({
            method: 'GET',
            url: `${Services.BaseUrl}/api/Specialty/listarEspecialidadPorFacultad?FacultyId=${idFacultad}`,
        });
        if (response.data.success === false) {
            return { especialidadList: [] };
        }
        const especialidadList: Specialty[] = response.data.data.map((item: any) => {
            return {
                specialtyId: item.specialtyId,
                name: item.name,
                acronym: item.acronym,
                numberStudents: item.numberOfStudents,
                facultyId: item.facultyId,
                // COMPLETAR CON DATOS DEL RESPONSABLE
            };
        });
        return { especialidadList };
    }
    catch (error) {
        return { especialidadList: [] };
    }
}

async function getEspecialidadInfo2(): Promise<EspecialidadDetailResponse> {
    try {
        const response = await axios({
            method: 'GET',
            url: Services.BaseUrl + '/api/Specialty/listarEspecialidad',
        });
        if (response.data.success === false) {
            return { especialidadList: [] };
        }
        const especialidadList: Specialty[] = response.data.data.map((item: any) => {
            return {
                specialtyId: item.specialtyId,
                name: item.name,
                acronym: item.acronym,
                creationDate: item.creationDate.split('T')[0],
                modificationDate: item.modificationDate.split('T')[0],
                numberOfStudents: item.numberOfStudents,
                faculty: item.faculty,
                isActive: item.isActive,
                specialtyManager: item.specialtyManager,
                students: item.students,
                tutoringPrograms: item.tutoringPrograms,
                id: item.specialtyId, //el id del type Specialty                 
                // COMPLETAR CON DATOS DEL RESPONSABLE
            };
        });
        console.log("EspecialidadList", especialidadList);
        return { especialidadList };
    }
    catch (error) {
        console.log("EspecialidadList error");
        return { especialidadList: [] };
    }
}

async function getEspecialidadByNameInfo(name: string): Promise<EspecialidadDetailResponse> {
    try {
        const response = await axios({
            method: 'GET',
            url: Services.BaseUrl + '/api/Specialty/listarEspecialidadXNombre?name=' + name
        });
        console.log({ response });
        if (response.data.success === false) {
            return { especialidadList: [] };
        }
        const especialidadList: Specialty[] = response.data.data.map((item: any) => {
            return {
                specialtyId: item.specialtyId,
                name: item.name,
                acronym: item.acronym,
                creationDate: item.creationDate.split('T')[0],
                modificationDate: item.modificationDate.split('T')[0],
                numberOfStudents: item.numberOfStudents,
                faculty: item.faculty,
                isActive: item.isActive,
                specialtyManager: item.specialtyManager,
                personalApoyo: item.personalApoyo,
                students: item.students,
                tutoringPrograms: item.tutoringPrograms,


                // COMPLETAR CON DATOS DEL RESPONSABLE
            };
        });
        console.log("EspecialidadList", especialidadList);
        return { especialidadList };
    }
    catch (error) {
        console.log("EspecialidadList error");
        console.log({ error });
        return { especialidadList: [] };
    }
}

export { getEspecialidadInfo, getEspecialidadPorFacultadInfo, getEspecialidadInfo2, getEspecialidadByNameInfo };
