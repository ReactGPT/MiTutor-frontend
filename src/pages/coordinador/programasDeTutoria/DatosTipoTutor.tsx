import React from 'react';
import { Combobox, Radial } from '../../../components';
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { tutoringProgramSlice } from '../../../store/slices';
type InputProps = {
  className: string;
};



function DatosTipoTutor({ className }: InputProps) {
  const { tutoringProgram, onChangeTutoringProgramObject } = useTutoringProgramContext();
  //const dispatch = useAppDispatch();
  const { tutorTypeList } = useAppSelector((state: RootState) => state.parameters);
  //const {tutoringProgramSelected}= useAppSelector((state:RootState)=>state.tutoringProgram);
  //const {setTutoringProgram} = tutoringProgramSlice.actions;
  // const handleLocalChangeTutoringProgram= (name:string,value:any)=>{
  //   dispatch(handleChangeTutoringProgram({payload:{name:name,value:value}}));
  // };
  return (
    <div className={className}>
      <h2 className='text-xl font-bold font-roboto text-black'>Tipo de Tutor</h2>
      <div className='flex w-full h-fit'>
        <Combobox name='tutorTypeId' className='w-full' onChange={(value: any) => {
          onChangeTutoringProgramObject({
            ...tutoringProgram,
            "tutorTypeId": value.id,
            "tutorTypeDescription": value.name
          });
        }} options={tutorTypeList} value={tutorTypeList.find((item) => item.id === tutoringProgram.tutorTypeId)} />
      </div>
    </div>
  );
}

export default DatosTipoTutor;