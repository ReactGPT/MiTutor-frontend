import { createSlice } from '@reduxjs/toolkit';
//import { Finance } from '../../models/entities';
import { Specialty,Faculty } from '../types';

type ParametersState={
    specialityList : Specialty[];
    facultyList: Faculty[];
}

const initialState:ParametersState={
    specialityList : [],
    facultyList:[]
};
export const parameters = createSlice({
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
        /*updateFinance : (state,action:{payload:{updatedPrice:Finance}})=>{
            const {payload} = action;
            state.financeList[state.financeList.findIndex(finance=>finance.id===payload.updatedPrice.id)] = payload.updatedPrice;
        },
        resetFinance : (state,action:{payload:any})=>{
           state.financeList=initialState.financeList;
        }*/
    }
});

export const { setSpecialities } = parameters.actions;