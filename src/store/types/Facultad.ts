import { Specialty, TutoringProgram } from ".";

type Persona = {
    personaId: number;
    name: string;
    lastName: string;
    secondLastName: string | null;
    phone: string | null;
    isActive: boolean;
    usuario: any | null;

}

type FacultyManager = {
    managerId: number;
    institutionalEmail: string;
    pucpCode: string;
    isActive: boolean;
    persona: Persona;
    roles: any[] | null;
    isVerified: boolean;
}

export type Facultad = {
    id:number;
    name:string;
    acronym:string;
    numberStudents:number;
    numberTutors:number;
    isActive?:boolean | null;
    facultyManager:FacultyManager;
    specialties?:Specialty[] | null;
    tutoringPrograms?:TutoringProgram[] | null;
}