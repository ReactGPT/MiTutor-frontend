import React from 'react'
import { Combobox, Radial } from '../../../components';
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { useAppSelector,useAppDispatch } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { tutoringProgramSlice } from '../../../store/slices';
type InputProps= {
    className:string;
}



function DatosTipoTutor({className}:InputProps) {
  const {tutoringProgram,onChangeTutoringProgramObject} = useTutoringProgramContext();
  //const dispatch = useAppDispatch();
  const {tutorTypeList}= useAppSelector((state:RootState)=>state.parameters);
  //const {tutoringProgramSelected}= useAppSelector((state:RootState)=>state.tutoringProgram);
  //const {setTutoringProgram} = tutoringProgramSlice.actions;
  // const handleLocalChangeTutoringProgram= (name:string,value:any)=>{
  //   dispatch(handleChangeTutoringProgram({payload:{name:name,value:value}}));
  // };
  return (
    <div className={className}>
        <h2 className='text-xl font-bold text-primary'>Tipo de Tutor</h2>
        <div className='w-full flex h-full py-8'>
          <Combobox name='tutorTypeId' className='w-full max-w-[150px]' onChange={(value:any)=>{
            onChangeTutoringProgramObject({...tutoringProgram,
              "tutorTypeId":value.id,
              "tutorTypeDescription":value.name
            })
          }} options={tutorTypeList} value={tutorTypeList.find((item)=>item.id===tutoringProgram.tutorTypeId)}/>
        </div>
        
        {/* <div className='w-full h-full'>
          <div className='flex w-full h-[50%] gap-2'>
            <Radial  boxSize='w-[50%]' onChange={()=>{
              onChangeTutoringProgramObject({...tutoringProgram,
                "tipoTutor":{
                  "fijoAsignado":!tutoringProgram.tipoTutor.fijoAsignado,
                  "fijoSolicitado":!!tutoringProgram.tipoTutor.fijoAsignado,
                  "variable":!!tutoringProgram.tipoTutor.fijoAsignado
              }})
            }} checked={tutoringProgram.tipoTutor.fijoAsignado} label='Fijo Asignado' left/>

            <Radial boxSize='w-[50%] ' onChange={()=>{
              onChangeTutoringProgramObject({...tutoringProgram,
                "tipoTutor":{
                  "fijoAsignado":!!tutoringProgram.tipoTutor.fijoSolicitado,
                  "fijoSolicitado":!tutoringProgram.tipoTutor.fijoSolicitado,
                  "variable":!!tutoringProgram.tipoTutor.fijoSolicitado
                }
              })
            }} checked={tutoringProgram.tipoTutor.fijoSolicitado} label='Fijo Solicitado' left />
          </div>
          <div className='flex w-full h-[50%]'>
            <Radial boxSize='w-[50%] ' onChange={()=>{
              onChangeTutoringProgramObject({...tutoringProgram,
                "tipoTutor":{
                  "fijoAsignado":!!tutoringProgram.tipoTutor.variable,
                  "fijoSolicitado":!!tutoringProgram.tipoTutor.variable,
                  "variable":!tutoringProgram.tipoTutor.variable
                }});
            }} checked={tutoringProgram.tipoTutor.variable} label='Variable' left/>
          </div>
        </div> */}
    </div>
  )
}

export default DatosTipoTutor