import React from 'react';
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { Button } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { useStudent } from '../../../store/hooks';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PageAlumnosSeleccionados from './PageCargarAlumnos/PageAlumnosSeleccionados'; 
import { TbUTurnRight } from 'react-icons/tb';
type InputProps = {
  className: string;
};

function DatosAlumnosSeleccionados({ className }: InputProps) {
  const { tutoringProgram, updateAlumnos, onChangeTutoringProgram } = useTutoringProgramContext();
  //const { tutoringProgramSelected } = useAppSelector((state: RootState) => state.tutoringProgram);
  const navigate = useNavigate();
  const {studentData, fetchStudentData} = useStudent();

  useEffect(()=>{
    fetchStudentData(!!tutoringProgram.id?tutoringProgram.id:-1) 
  },[]);

  useEffect(()=>{ 
    updateAlumnos(studentData);
    console.log(tutoringProgram.alumnos);
  },[studentData]); 

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOnClickVerAlumnos = () => {
    console.log("son esos Alumnos:",tutoringProgram.alumnos);
    //navigate("/alumnosSeleccionados");
    setIsModalOpen(true);
  };
  return (
    <div className={className}>
      <div className='flex w-full min-h-[70px] items-center h-full justify-between'>
        <div className='flex w-[70%] min-w-[270px] h-[15%] min-h-[50px] items-center'>
          <h2 className='text-xl  font-bold text-primary'>Alumnos Seleccionados : {tutoringProgram.cant_alumnos}</h2>
        </div>
        <Button text='Ver Alumnos' onClick={handleOnClickVerAlumnos} />
      </div>
      <PageAlumnosSeleccionados isOpen={isModalOpen} closeModal={() => { setIsModalOpen(false); }} />
      {/*<ModalAlumnosSeleccionados isOpen={isModalOpen} closeModal={() => { setIsModalOpen(false); }}/>*/}
    </div>
  );
}

export default DatosAlumnosSeleccionados;