import TextBox from "../../../components/TextBox";
import { Button } from "../../../components";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import SimpleCard from "../../../components/Tutor/SimpleCard";
import { da } from "date-fns/locale";
import { programaDeTutoriaAlumno } from "../../../store/types/ListTutoringProgram";
import { useTutoresPorTutoriayAlumno } from "../../../store/hooks/useListarTutoresPorAlumno";
import { useState, useEffect } from "react";
import React from 'react'


const PageDetalleDeTutoria = () => {

  const location = useLocation();
  const data = location.state.data;

  const { listaDeTutores,fetchTutoresPorTutoriayAlumno,loading } = useTutoresPorTutoriayAlumno(data.tutoringProgramId,2);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTutoresPorTutoriayAlumno();
  }, []);

  const goToTutorList = () => {
    const tutoriaData = {tutoringProgramId: data.tutoringProgramId };
    navigate('/solicitarTutor', { state: { tutoriaData } });
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
          <Button onClick={goToTutorList} variant="primario" text="Solicitar cita" />
        </div>

      </div>

      <div className="w-full flex h-[56%] gap-5">
        {/*tutor*/}
        <div className="flex flex-col w-[30%] h-full p-4 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
          <span className="font-montserrat text-2xl font-bold text-primary">Tutor</span>
          <div className="w-full flex justify-center items-center p-20">
            {
              loading ?
              <div>cargando</div>
              :
              <SimpleCard content="Docente a tiempo completo" title={`${listaDeTutores[0].tutorName}`} subContent="" />
            }
          </div>
        </div>

        {/*Plan de Accion*/}
        <div className="flex flex-col w-[70%] h-full p-4 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
          <span className="font-montserrat text-2xl font-bold text-primary">Plan de Acción</span>

          <div className="w-full h-full">
            <div className="flex p-3 w-full h-full border-custom shadow-custom bg-[rgba(237,_238,_250,_0.50)] font-roboto">
              <div className="w-[30%] flex flex-col gap-3">
                <span className="h-[30%] font-montserrat flex text-xl font-bold text-secundary justify-center">Nombre</span>
                <span className="h-[70%] font-montserrat flex text-xl font-bold text-secundary justify-center">Descripción</span>
              </div>
              <div className="w-[70%] flex flex-col gap-3">

                <div className=" h-[30%] w-full">
                  <div className="w-full h-full border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">

                  </div>
                </div>

                <div className="h-[70%] w-full">
                  <div className="w-full h-full border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">

                  </div>
                </div>

              </div>

            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <Button onClick={() => {  }} text="Ver plan de accion" />
          </div>
        </div>

      </div>
    </div>

  );
};

export default PageDetalleDeTutoria;