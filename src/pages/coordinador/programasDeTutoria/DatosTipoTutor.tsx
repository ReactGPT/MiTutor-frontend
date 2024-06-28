import React from 'react';
import { Combobox, Radial } from '../../../components';
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { tutoringProgramSlice } from '../../../store/slices';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const isEditRoute = location.pathname === '/programasDeTutoriaMaestro/editar';

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
        }} options={tutorTypeList} value={tutorTypeList.find((item) => item.id === tutoringProgram.tutorTypeId)} disabled={isEditRoute} />
      </div>
    </div>
  );
}

export default DatosTipoTutor;