import React, { useEffect, useState } from 'react';
import { Button } from '../../../components';
import DatosGeneralesTutoria from './DatosGeneralesTutoria';
import DatosTipoTutoria from './DatosTipoTutoria';
import DatosTutoresSeleccionados from './DatosTutoresSeleccionados';
import DatosTipoTutor from './DatosTipoTutor';
import DatosAlumnosSeleccionados from './DatosAlumnosSeleccionados';
import { ProgramaTutoria } from '../../../store/types';
import { TutoringProgramProvider } from '../../../context/ProgramaTutoriaNuevo';
import { useLocation } from 'react-router-dom';
import ModalAgregarTutores from '../ModalAgregarTutores';
import ModalConfirmation from '../../../components/ModalConfirmation';
import { useAppDispatch } from '../../../store/hooks';
import { tutoringProgramSlice } from '../../../store/slices';

export default function PageProgTutoria() {
  const { state } = useLocation();
  const { programaTutoria } = state;
  //const dispatch = useAppDispatch();
  //const {setTutoringProgramDefault,setTutoringProgram}=tutoringProgramSlice.actions
  //const {isNew,tutoringProgram}=state;

  // useEffect(()=>{
  //   if(isNew){
  //     dispatch(setTutoringProgramDefault());
  //   }
  //   else{
  //     dispatch(setTutoringProgram(tutoringProgram));
  //   }
  // },[]);

  const [isOpenModalAgregarTutores, setIsOpenModalAgregarTutores] = useState<boolean>(false);
  //const [isOpenModalConfirmation,setisOpenModalConfirmation]= useState<boolean>(false);
  return (
    <TutoringProgramProvider tutoringProgram={programaTutoria}>
      <div className='flex flex-col w-full h-full gap-4 '>
        <div id="DatosGeneralesTutoria" className='flex relative z-10 flex-col w-full h-fit border-custom drop-shadow-md p-4'>
          <DatosGeneralesTutoria />
        </div>
        <div id="ProgramaTutoriaBox2" className='flex flex-row w-full h-fit gap-4 z-0 relative'>
          <DatosTipoTutoria
            className='flex flex-col border-custom drop-shadow-md w-fit min-w-[300px] h-full p-4 gap-3'
          />
          <DatosTutoresSeleccionados
            className='flex flex-col border-custom drop-shadow-md w-full h-full p-4 gap-4'
            openModal={() => setIsOpenModalAgregarTutores(true)}
          />
        </div>
        <div id="ProgramaTutoriaBox3" className='flex flex-row w-full h-[20%] gap-4'>
          <DatosTipoTutor className='flex flex-col w-fit h-fit p-4 border-custom drop-shadow-md gap-4' />
          <DatosAlumnosSeleccionados className='flex flex-row w-full h-full items-center p-4 border-custom drop-shadow-md' />
        </div>
        <ModalAgregarTutores isOpen={isOpenModalAgregarTutores} closeModal={() => { setIsOpenModalAgregarTutores(false); }} />
      </div>
    </TutoringProgramProvider>
  );
}


