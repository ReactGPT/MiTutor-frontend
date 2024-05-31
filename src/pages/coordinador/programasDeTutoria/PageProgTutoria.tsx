import React, { useState } from 'react'
import { Button } from '../../../components'
import DatosGeneralesTutoria from './DatosGeneralesTutoria'
import DatosTipoTutoria from './DatosTipoTutoria'
import DatosTutoresSeleccionados from './DatosTutoresSeleccionados'
import DatosTipoTutor from './DatosTipoTutor'
import DatosAlumnosSeleccionados from './DatosAlumnosSeleccionados'
import { ProgramaTutoria } from '../../../store/types'
import { TutoringProgramProvider } from '../../../context/ProgramaTutoriaNuevo'
import { useLocation } from 'react-router-dom'
import ModalAgregarTutores from '../ModalAgregarTutores'

export default function PageProgTutoria() {
  const {state} = useLocation();
  const {programaTutoria}=state;
  const [isOpenModalAgregarTutores,setIsOpenModalAgregarTutores]=useState<boolean>(false);
  
  return (
    <TutoringProgramProvider tutoringProgram={programaTutoria}>
    <div className='flex flex-col w-full h-full gap-4 '>
      <div id="DatosGeneralesTutoria" className='flex relative z-10 flex-col gap-2 w-full min-h-[240px] h-[25%] border-custom drop-shadow-md px-4 py-2'>
        <DatosGeneralesTutoria/>
      </div>
      <div id="ProgramaTutoriaBox2" className='flex flex-row w-full h-[60%] gap-4 z-0 relative'>
        <DatosTipoTutoria className='flex flex-col border-custom drop-shadow-md w-[40%] h-full p-4'/>
        <DatosTutoresSeleccionados className='flex flex-col border-custom drop-shadow-md w-[60%] h-full p-4'
                                    openModal={()=>setIsOpenModalAgregarTutores(true)}
        />
      </div>
      <div id="ProgramaTutoriaBox3" className='flex flex-row w-full h-[20%] gap-4'>
        <DatosTipoTutor className='flex flex-col w-[40%] h-[full] p-4 border-custom drop-shadow-md'/>
        <DatosAlumnosSeleccionados className='flex flex-row w-[60%] h-full items-center p-4 border-custom drop-shadow-md'/>
      </div>
      <ModalAgregarTutores isOpen={isOpenModalAgregarTutores} closeModal={()=>{setIsOpenModalAgregarTutores(false)}}/>
    </div>
    </TutoringProgramProvider>
  )
}


