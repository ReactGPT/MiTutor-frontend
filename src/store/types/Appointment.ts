type Student = {
    id:number;
    nombre:string;
}


type Derivation= {
    id?:number;
    reason:string;
    comment:string;
}



export type Appointment = {
    id:number;
    date:string;
    startTime:string;
    endTime:string;
    reason:string;
    studentProgramId:number;
    studentProgramName:string;
    isInPerson:boolean;
    attendanceId:number;
    studentAnnotations:string;
    privateAnnotation:string;
    student:Student;
    derivation?:Derivation;
}
