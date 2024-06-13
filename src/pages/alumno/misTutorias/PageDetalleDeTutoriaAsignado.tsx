import TextBox from "../../../components/TextBox";
import { Button } from "../../../components";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import SimpleCard from "../../../components/Tutor/SimpleCard";
import { da } from "date-fns/locale";
import { programaDeTutoriaAlumno } from "../../../store/types/ListTutoringProgram";
import { useTutoresPorTutoriayAlumno } from "../../../store/hooks/useListarTutoresPorAlumno";
import { useState, useEffect } from "react";
import React from 'react';
import { Spinner } from "../../../components";
import { useAuth } from "../../../context";
import { Label, TextInput, Textarea } from "flowbite-react";

const PageDetalleDeTutoriaAsignado = () => {
  const { userData } = useAuth();
  const studentId = userData?.userInfo?.id || 0;

  const location = useLocation();
  const data = location.state.data;
  //console.log(data);

  const { listaDeTutores, fetchTutoresPorTutoria, loading } = useTutoresPorTutoriayAlumno(data.tutoringProgramId, studentId);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTutoresPorTutoria();
  }, []);

  const goToTutorPlan = () => {
    navigate('/misTutorias/detalle/planesDeAccion', { state: { programId: data.tutoringProgramId, tutorId: listaDeTutores[0].tutorId } });
  };

  const goToSolicitarCita = () => {
    const datos = { tutoringProgram: data, tutor: listaDeTutores[0] };
    navigate('/misTutorias/detalle/solicitarCita', { state: { datos } });
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">

      <div className="flex flex-col w-full h-fit bg-[rgba(255,255,255,0.5)] border-custom drop-shadow-md p-5" >
        <h1 className="text-3xl font-bold">Datos de Tutoría</h1>
        <div className="flex w-full h-full">
          <div className="flex flex-col w-full">
            <div className='flex w-full gap-5'>
              <div className='w-1/2'>
                <Label className="text-primary font-roboto">Nombre de Tutoría</Label>
                <TextInput value={data.programName} readOnly />
              </div>
              <div className='w-1/2'>
                <Label className="text-primary font-roboto">Unidad Académica</Label>
                <TextInput value={data.specialtyName ? data.specialtyName : data.facultyName} readOnly />
              </div>
            </div>
            <Label className="text-primary font-roboto">Descripción</Label>
            <Textarea className='min-h-16 max-h-16' value={data.programDescription} readOnly />
          </div>
        </div>
      </div>

      <div className="w-full flex h-full gap-5">
        {/*tutor*/}
        <div className="flex flex-col w-[30%] h-full p-4 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
          <span className="font-montserrat text-2xl font-bold text-primary">Tutor</span>
          <div className="w-full h-full flex justify-center items-center">
            {
              loading ?
                <div className="w-full h-[90%] flex items-center justify-center">
                  <Spinner size="xl" />
                </div>
                :
                <SimpleCard content="Docente a tiempo completo" title={`${listaDeTutores[0]?.tutorName} ${listaDeTutores[0]?.tutorLastName} ${listaDeTutores[0]?.tutorSecondLastName}`} subContent="" />
            }
          </div>
        </div>

        {/*Plan de Accion*/}
        <div className="flex flex-col w-[70%] h-full p-4 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
          <span className="font-montserrat text-2xl font-bold text-primary">Plan de Acción</span>

          <div className="w-full h-full"></div>

          <div className="w-full flex items-center justify-center">
            <Button onClick={goToTutorPlan} text="Ver plan de accion" />
          </div>
        </div>

      </div>
    </div>

  );
};

export default PageDetalleDeTutoriaAsignado;