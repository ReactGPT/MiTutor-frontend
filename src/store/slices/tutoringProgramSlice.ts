import { createSlice } from '@reduxjs/toolkit';
//import { Finance } from '../../models/entities';
import { TutoringProgram } from '../types';

type TutoringProgramState={
    tutoringProgramList : TutoringProgram[];
}
/*


*/ 
const initialState:TutoringProgramState={
    tutoringProgramList : [],
};
export const tutoringProgramSlice = createSlice({
    name : 'tutoringProgram',
    initialState:initialState,
    reducers:{
        setPrograms : (state,action:{payload : any})=>{
            const { payload  } = action;
            
            if(payload.length!==0){
                
                state.tutoringProgramList = payload;
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
export const { setPrograms } = tutoringProgramSlice.actions;