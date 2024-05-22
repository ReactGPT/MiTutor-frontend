import { ProgramaTutoria } from "./ProgramaTutoria";
import { Specialty,Faculty } from "./";
type AppointmentStatus = {
    id:number;
    name:string;
}

type UnitDerivation={
    id:number;
    name:string;
    acronym:string;
    resposible:string;
    email:string;
    phone:string;
}
type TutorType={
    id:number;
    name:string;
}
type ParametersState={
    specialityList : Specialty[        
    ];
    facultyList: Faculty[];
    appointmentStatusList: AppointmentStatus[];
    unitDerivationList: UnitDerivation[];
    tutorTypeList:TutorType[];
}

export type State={
    parameters:ParametersState;
    tutoringProgram:ProgramaTutoria[];
    
}