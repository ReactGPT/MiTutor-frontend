export type ListTutoringProgram = {
    tutoringProgramId: number;
    programName: string;
    description: string;
    facultyName: string;
    specialtyName: string;
    tutorType: string;
};

export type programaDeTutoriaAlumno = {
    tutoringProgramId : number;
    programName : string;
    programDescription : string;
    facultyId : number;
    facultyName : string;
    specialtyId : number;
    specialtyName : string;
    tutorTypeId : number;
    tutorName : string;
    tutorLastName : string;
    tutorSecondLastName : string;
    studentId : number;
    typeDescription : string;
    state : string;
}