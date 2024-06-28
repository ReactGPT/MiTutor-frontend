import { createSlice } from '@reduxjs/toolkit';
//import { Finance } from '../../models/entities';

import { Specialty,Faculty,Tutor,Student, TipoRol } from '../types';
import { UnitDerivation } from '../types/UnitDerivation';

type AppointmentStatus = {
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
    tutorList: Tutor[];
    studentList: Student[];
    tiposRollist: TipoRol[]
}

type TutorType={
    id:number;
    name:string;
}

const initialState:ParametersState={
    specialityList : [
        {
            id: 1,
            name: "Ingeniería Informática",
            acronym: "INF",
            numberStudents: 5,
            facultyId: 2,
            numberOfStudents: 0,
            isActive: false,
            faculty: {
                facultyId: 0,
                name: '',
                acronym: '',
                numberOfStudents: 0,
                numberOfTutors: 0,
                isActive: false,
                facultyManager: undefined,
                specialties: null
            },
            specialtyManager: {
                id: 0,
                institutionalEmail: '',
                pucpCode: '',
                isActive: false,
                persona: {
                    id: 0,
                    name: '',
                    lastName: '',
                    secondLastName: null,
                    phone: null,
                    isActive: false,
                    usuario: undefined
                },
                roles: null,
                isVerified: false,
                creationDate: '',
                modificationDate: ''
            },
            creationDate: '',
            modificationDate: '',
            students: null,
            tutoringPrograms: null
        },
        {
            id: 2,
            name: "Ingeniería Electronica",
            acronym: "INF",
            numberStudents: 5,
            facultyId: 2,
            numberOfStudents: 0,
            isActive: false,
            faculty: {
                facultyId: 0,
                name: '',
                acronym: '',
                numberOfStudents: 0,
                numberOfTutors: 0,
                isActive: false,
                facultyManager: undefined,
                specialties: null
            },
            specialtyManager: {
                id: 0,
                institutionalEmail: '',
                pucpCode: '',
                isActive: false,
                persona: {
                    id: 0,
                    name: '',
                    lastName: '',
                    secondLastName: null,
                    phone: null,
                    isActive: false,
                    usuario: undefined
                },
                roles: null,
                isVerified: false,
                creationDate: '',
                modificationDate: ''
            },
            creationDate: '',
            modificationDate: '',
            students: null,
            tutoringPrograms: null
        },
        {
            id: 3,
            name: "Artes Plasticas",
            acronym: "INF",
            numberStudents: 5,
            facultyId: 1,
            numberOfStudents: 0,
            isActive: false,
            faculty: {
                facultyId: 0,
                name: '',
                acronym: '',
                numberOfStudents: 0,
                numberOfTutors: 0,
                isActive: false,
                facultyManager: undefined,
                specialties: null
            },
            specialtyManager: {
                id: 0,
                institutionalEmail: '',
                pucpCode: '',
                isActive: false,
                persona: {
                    id: 0,
                    name: '',
                    lastName: '',
                    secondLastName: null,
                    phone: null,
                    isActive: false,
                    usuario: undefined
                },
                roles: null,
                isVerified: false,
                creationDate: '',
                modificationDate: ''
            },
            creationDate: '',
            modificationDate: '',
            students: null,
            tutoringPrograms: null
        },
        {
            id: 5,
            name: "Artes Modernas",
            acronym: "INF",
            numberStudents: 5,
            facultyId: 1,
            numberOfStudents: 0,
            isActive: false,
            faculty: {
                facultyId: 0,
                name: '',
                acronym: '',
                numberOfStudents: 0,
                numberOfTutors: 0,
                isActive: false,
                facultyManager: undefined,
                specialties: null
            },
            specialtyManager: {
                id: 0,
                institutionalEmail: '',
                pucpCode: '',
                isActive: false,
                persona: {
                    id: 0,
                    name: '',
                    lastName: '',
                    secondLastName: null,
                    phone: null,
                    isActive: false,
                    usuario: undefined
                },
                roles: null,
                isVerified: false,
                creationDate: '',
                modificationDate: ''
            },
            creationDate: '',
            modificationDate: '',
            students: null,
            tutoringPrograms: null
        },
        {
            id: 6,
            name: "Ingeniería Industrial",
            acronym: "INF",
            numberStudents: 5,
            facultyId: 2,
            numberOfStudents: 0,
            isActive: false,
            faculty: {
                facultyId: 0,
                name: '',
                acronym: '',
                numberOfStudents: 0,
                numberOfTutors: 0,
                isActive: false,
                facultyManager: undefined,
                specialties: null
            },
            specialtyManager: {
                id: 0,
                institutionalEmail: '',
                pucpCode: '',
                isActive: false,
                persona: {
                    id: 0,
                    name: '',
                    lastName: '',
                    secondLastName: null,
                    phone: null,
                    isActive: false,
                    usuario: undefined
                },
                roles: null,
                isVerified: false,
                creationDate: '',
                modificationDate: ''
            },
            creationDate: '',
            modificationDate: '',
            students: null,
            tutoringPrograms: null
        }
        
    ],
    facultyList:[
        {
            id:1,
            acronym:"FACI",
            name:"Ciencias e Ingeniería",
            numberStudents:1500,
            numberTutors:5
        },
        {
            id:2,
            acronym:"ART",
            name:"Artes",
            numberStudents:700,
            numberTutors:4
        },
    ],
    appointmentStatusList:[
        {
            id:1,
            name:"Cualquiera"
        },
        {
            id:2,
            name:"Pendiente"
        },
        {
            id:3,
            name:"Registrada"
        },
        {
            id:4,
            name:"Solicitado"
        },
        {
            id:5,
            name:"Completado"
        },
    ],
    unitDerivationList:[{
        id:1,
        name:"Bienestar Ciencias",
        acronym:"BC",
        email:"anita@pucp.edu.pe",
        phone:"987236654",
        resposible:"Ana García"
    }],
    tutorTypeList:[
        {
            id:1,
            name:"Tutor Fijo Solicitado"
        },
        {
            id:2,
            name:"Tutor Fijo Asignado"
        },
        {
            id:3,
            name:"Tutor Variable"
        }
    ],
    tutorList : [
        {
            idTutor: 1,
            nombre: "Juan",
            apellido_paterno: "Perez",
            apellido_materno: "Gomez",
            email: "juanperez@gmail.com",
            userAccountId: 1,
            pucpCode: "20112345",
            meetingRoom: "1A",
            fullname: "Juan Perez Gomez",
        }
    ],
    studentList : [
        {
            studentId: 1,
            name: "Alonso",
            lastName: "Gomez",
            secondLastName: "Gutierrez",
            isActive: true,
            pucpCode: "20203340",
            institutionalEmail: "agomez@gmail.com",
            facultyName: "Ingeniería Mecatrónica",
            isRegistered: true,            
        }
    ],
    tiposRollist:[]
};
export const parametersSlice = createSlice({
    name : 'parameters',
    initialState:initialState,
    reducers:{
        setSpecialities : (state,action:{payload : any})=>{
            const { payload  } = action;
            
            if(payload.length!==0){
                state.specialityList = payload;
            }
        },
        setFaculties : (state,action:{payload : any})=>{
            const { payload  } = action;
            
            if(payload.length!==0){
                state.facultyList = payload;
            }
        },
        setTutor : (state,action:{payload : any})=>{
            const { payload  } = action;
            
            if(payload.length!==0){
                state.tutorList = payload;
            }
        },
        setStudent : (state,action:{payload : any})=>{
            const { payload  } = action;
            
            if(payload.length!==0){
                state.studentList = payload;
            }
        },
        setAppointmentStatuses: (state,action:{payload : any})=>{
            const { payload  } = action;
            
            if(payload.length!==0){
                state.appointmentStatusList = payload;
            }
        },
        setUnitDerivations: (state,action:{payload : any})=>{
            const { payload  } = action;
            
            if(payload.length!==0){
                state.unitDerivationList = payload;
            }
        },
        setTutorTypes:(state,action:{payload : any})=>{
            const { payload  } = action;
            if(payload.length!==0){
                state.tutorTypeList = payload;
            }
        },
        setTiposRol:(state,action:{payload:any})=>{
            const {payload} = action;
            if(payload.lenght!==0){
                state.tiposRollist =payload;
            }
        }
        /*updateFinance : (state,action:{payload:{updatedPrice:Finance}})=>{
            const {payload} = action;
            state.financeList[state.financeList.findIndex(finance=>finance.id===payload.updatedPrice.id)] = payload.updatedPrice;
        },
        resetFinance : (state,action:{payload:any})=>{
           state.financeList=initialState.financeList;
        }*/
    }
});

export const { setSpecialities,setFaculties,setTutor,setStudent,setAppointmentStatuses,setUnitDerivations,setTiposRol } = parametersSlice.actions;