export type Tutor={
    idTutor:number;
    nombre:string;
    apellido_paterno:string;
    apellido_materno:string;
    //id_tipo:number;
    //descripcion_tipo:string;
    meetingRoom:string;
    email:string;
    fullname:string;
    toAdd?:boolean;
}
type Alumno={
    codigo:number;
    nombres:string;
    apellidos:string;
    correo:string;
    facultyId:number;
    specialityId:number;
    accountActive:boolean;
};

type TutorType={
    id:number;
    variable:boolean;
    fijoAsignado:boolean;
    fijoSolicitado:boolean;
}

export type ProgramaTutoria = {
    id?:number;
    presencial :boolean;
    virtual: boolean;
    grupal:boolean;    
    obligatorio:boolean;
    cant_integrantes:number;
    cant_alumnos:number;
    cant_tutores:number;
    nombre:string;
    descripcion:string;
    vigente:boolean;
    duracion:string;
    facultadId:number;
    facultadNombre:string;
    especialidadId:number;
    especialidadNombre:string;
    tutores:Tutor[];
    alumnos:Alumno[];
    //tipoTutor:TutorType;
    tutorTypeId:number;
    tutorTypeDescription:string;
    //id?:number;
}