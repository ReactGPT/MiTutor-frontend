import { Specialty, TutoringProgram } from ".";

type Persona = {
    id: number;
    name: string;
    lastName: string;
    secondLastName?: string | null;
    phone?: string | null;
    isActive: boolean;
    usuario?: any | null;
};

type FacultyManager = {
    id: number | null;
    institutionalEmail: string;
    pucpCode: string;
    isActive: boolean;
    persona: Persona | null;
    roles: any[] | null;
    isVerified: boolean;
};

type Facultad = {
    id: number;
    name: string;
    acronym: string;
    numberStudents: number;
    numberTutors: number;
    isActive?: boolean | null;
    facultyManager: FacultyManager | null;
    bienestarManager?: FacultyManager | null;
    specialties?: Specialty[] | null;
    tutoringPrograms?: TutoringProgram[] | null;
};

export default Facultad;