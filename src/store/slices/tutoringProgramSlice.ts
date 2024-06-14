import { PayloadAction, createSlice } from '@reduxjs/toolkit';
//import { Finance } from '../../models/entities';
import { ProgramaTutoria, TutoringProgram } from '../types';

type TutoringProgramState={
    tutoringProgramSelected : ProgramaTutoria;
}

const newTutoringProgramTemplate : ProgramaTutoria ={
    presencial :true,
    virtual: false,
    grupal:false  ,
    obligatorio:false,
    cant_integrantes:1,
    cant_tutores:0,
    nombre:"",
    descripcion:"",
    vigente:true,
    duracion:"30 mins",
    facultadId:0,
    facultadNombre:"",
    especialidadId:0,
    especialidadNombre:"",
    tutores:[],
    alumnos:[],
    cant_alumnos:0,
    tutorTypeId:1,
    tutorTypeDescription:"Fijo Asignado"
}

const initialState:TutoringProgramState={
    tutoringProgramSelected : newTutoringProgramTemplate,
};
export const tutoringProgramSlice = createSlice({
    name : 'tutoringProgram',
    initialState:initialState,
    reducers:{
        // setPrograms : (state,action:{payload : any})=>{
        //     const { payload  } = action;
            
        //     if(payload.length!==0){
                
        //         state.tutoringProgramList = payload;
        //     }
        // },
        resetProgram : (state)=>{
            state.tutoringProgramSelected=newTutoringProgramTemplate;
        },
        setTutoringProgramDefault:(state)=>{
            state.tutoringProgramSelected = newTutoringProgramTemplate;
        },
        setTutoringProgram : (state,action:{payload:ProgramaTutoria})=>{
            const {payload} = action;
            state.tutoringProgramSelected=payload;
        },
        handleChangeTutoringProgram: (state,action:PayloadAction<{name:string,value:any}>)=>{
            const {name,value} = action.payload;

            //console.log(name,value);
            //const oldState = state.tutoringProgramSelected;
            state.tutoringProgramSelected[name]=value;
            // if (state.tutoringProgramSelected.hasOwnProperty(payload.name)) {
            //     console.log(state.tutoringProgramSelected[payload.name]);
            //   }
        }
    }
});
export const { resetProgram,setTutoringProgramDefault,setTutoringProgram,handleChangeTutoringProgram } = tutoringProgramSlice.actions;