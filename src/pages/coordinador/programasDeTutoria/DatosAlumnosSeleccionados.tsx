import React from 'react';
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { Button } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { useStudent } from '../../../store/hooks';
import { useState, useEffect, useMemo } from 'react';

type InputProps = {
  className: string;
};

function DatosAlumnosSeleccionados({ className }: InputProps) {
  const { tutoringProgram, updateAlumnos } = useTutoringProgramContext();
  //const { tutoringProgramSelected } = useAppSelector((state: RootState) => state.tutoringProgram);
  const navigate = useNavigate();
  const {studentData, fetchStudentData} = useStudent();

  /*useEffect(()=>{
    fetchStudentData(!!tutoringProgram.id?tutoringProgram.id:-1) 
  },[]);

  useEffect(()=>{ 
    tutoringProgram.alumnos=studentData;
    console.log(tutoringProgram.alumnos);
  },[studentData]); */

  useEffect(() => {
    if (tutoringProgram.id) {
      fetchStudentData(tutoringProgram.id)
        .then((alumnos) => {
          updateAlumnos(alumnos);
        });
    } 
  }, [tutoringProgram.id,updateAlumnos]);

  const handleOnClickVerAlumnos = () => {
    console.log("son esos Alumnos:",tutoringProgram.alumnos);
    navigate("/alumnosSeleccionados");
  };
  return (
    <div className={className}>
      <div className='flex w-full min-h-[70px] items-center h-full justify-between'>
        <div className='flex w-[70%] min-w-[270px] h-[15%] min-h-[50px] items-center'>
          <h2 className='text-xl  font-bold text-primary'>Alumnos Seleccionados : {tutoringProgram.cant_alumnos}</h2>
        </div>
        <Button text='Ver Alumnos' onClick={handleOnClickVerAlumnos} />
      </div>
    </div>
  );
}

export default DatosAlumnosSeleccionados;