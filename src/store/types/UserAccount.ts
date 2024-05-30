export type Person={
    id:number;
    name:string;
    lastName:string;
    secondLastName:string;
    phone:string;
}

export type TutorRoleDetails={
    isTutor:boolean;
    tutorId:number;
    meetingRoom:string;
}

export type StudentRoleDetails={
    isStudent:boolean;
    isRisk:boolean;
    specialtyId:number;
    specialtyName:string;
    facultyId:number;
    facultyName:string;
}

export type ManagerRoleDetails={
    isManager:boolean;
    departmentType:string;
    departmentId:string;
    departmentName:string;
    departmentAcronym:string;
}

export type Role ={
    accountTypeId:number;
    rolName:string;
    type:string;
    details:TutorRoleDetails|StudentRoleDetails|ManagerRoleDetails
}

export type UserAccount={
    id:number;
    isVerified:boolean;
    institutionalEmail:string;
    pucpCode:string;
    personInfo:Person;
    roles:Role[];
}