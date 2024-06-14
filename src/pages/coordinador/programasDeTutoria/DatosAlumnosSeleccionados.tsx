import React from 'react';
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { Button } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';

type InputProps= {
    className:string;
}

function DatosAlumnosSeleccionados({className}:InputProps) {
  const {tutoringProgram,onChangeTutoringProgram} = useTutoringProgramContext();
  //const { tutoringProgramSelected } = useAppSelector((state: RootState) => state.tutoringProgram);
  const navigate = useNavigate();
  const handleOnClickVerAlumnos= ()=>{
    navigate("/alumnosSeleccionados");
  };
  return (
    <div className={className}>
        <div className='flex w-full min-h-[70px] items-center h-full'>
          <div className='flex w-[70%] min-w-[270px] h-[15%] min-h-[50px] items-center'>
            <h2 className='text-xl  font-bold text-primary'>Alumnos Seleccionados : {tutoringProgram.cant_alumnos}</h2>
          </div>
          <Button text='Ver Alumnos' onClick={handleOnClickVerAlumnos}/>
        </div>
        
    </div>
  )
}

export default DatosAlumnosSeleccionados