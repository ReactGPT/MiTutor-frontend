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

const studentId = 2;

const PageDetalleDeTutoria = () => {

  const location = useLocation();
  const data = location.state.data;

  const { listaDeTutores, fetchTutoresPorTutoria, loading } = useTutoresPorTutoriayAlumno(data.tutoringProgramId, studentId);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTutoresPorTutoria();
  }, []);

  const goToTutorPlan = () => {
    const tutorData = { tutoringProgramId: data.tutoringProgramId, tutorId: listaDeTutores[0].tutorId };
    navigate('/', { state: { tutorData } });
  };

  const goToSolicitarCita = () => {
    const datos = { tutoringProgramId: data.tutoringProgramId, tutor: listaDeTutores[0] };
    navigate('/solicitarCita', { state: { datos } });
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">

      {/*Datos Tutoria*/}
      <div className="w-full h-[44%] p-4 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
        <span className="font-montserrat text-2xl font-bold text-primary">Datos Tutoria</span>

        <div className="w-full flex gap-5">
          <TextBox className="w-full" nombre='Nombre' contenido={data.programName} />
          <TextBox className="w-full" nombre='Facultad' contenido={data.facultyName} />
          <TextBox className="w-full" nombre='Especialidad' contenido={data.specialtyName} />
        </div>

        <div className="w-full flex">
          <TextBox className="w-1/2" nombre='Descripcion' contenido={data.programDescription} />
        </div>

        <div className="w-full flex items-center justify-center p-2">
          <Button onClick={goToSolicitarCita} variant="primario" text="Solicitar cita" />
        </div>

      </div>

      <div className="w-full flex h-[56%] gap-5">
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

export default PageDetalleDeTutoria;