import { useState, useEffect } from "react";
import TextBox from "../../../components/TextBox";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../../components";
import { useTutoresPorTutoriaVariable } from "../../../store/hooks/useListarTutoresPorAlumno";
import Pagination from "../../../components/Pagination";
import SimpleCard from "../../../components/Tutor/SimpleCard";
import React from 'react';
import { Spinner } from "../../../components";

const listaTutores = [

  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' },
  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' },
  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' },
  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' },
  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' },
  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' },
  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' },
  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' },
  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' },
  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' },
  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' },
  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' },
  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' },
  { title: 'Fernando Antonio Hererra Cruz', content: 'Facultad/Programa', subcontent:'Tipo de profesor' }

];

const PageDetalleDeTutoriaAlumno = () => {

    const location = useLocation();
    const data = location.state.data;

    const { listaDeTutores,fetchTutoresPorTutoria,loading } = useTutoresPorTutoriaVariable(data.tutoringProgramId);

    const navigate = useNavigate();

    useEffect(() => {
      fetchTutoresPorTutoria();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastTutor = currentPage * itemsPerPage;
    const indexOfFirstTutor = indexOfLastTutor - itemsPerPage;
    const currentTutors = listaDeTutores.slice(indexOfFirstTutor, indexOfLastTutor);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="w-full h-full container mx-auto">
            <div className="w-full h-[40%] p-2 container mx-auto" >
                <div className="w-full h-full p-5 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
                    <div className="w-full h-1/4">
                        <span className="font-montserrat text-4xl font-bold text-primary">Datos Tutoria</span>
                    </div>
                    <div className="w-full flex h-1/3">
                        <div className="w-full h-full p-2">
                            <TextBox nombre='Nombre' contenido='Tutoria con Martina Solis'/>
                        </div>
                        <div className="w-full h-full p-2">
                            <TextBox nombre='Facultad' contenido='Ciencias e ingenieria'/>
                        </div>
                        <div className="w-full h-full p-2">
                            <TextBox nombre='Especialidad' contenido='Ingenieria Informatica'/>
                        </div>
                    </div>
                    <div className="w-full flex h-1/3">
                        <div className="w-1/2 h-full p-2">
                            <TextBox nombre='Descripcion' contenido='Descripcion de la tutoria'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[60%] p-2 container mx-auto" >
                <div className="w-full h-full p-5 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
                    <div className="w-full h-1/4">
                        <span className="font-montserrat text-4xl font-bold text-primary">Tutores Disponibles</span>
                    </div>
                    <div className="w-full flex h-2/4">
                        {
                            loading ?
                            <div className="w-full h-[90%] flex items-center justify-center">
                                <Spinner size="xl" />
                            </div>
                            :
                            <div className="w-full h-full flex gap-5">
                            {currentTutors.map((Tutor) => (
                                <SimpleCard title={`${Tutor.tutorName} ${Tutor.tutorLastName} ${Tutor.tutorSecondLastName}`} content="Docente a tiempo completo" subContent={Tutor.state} />
                            ))}
                            </div>
                        }
                    </div>
                    <div className="w-full h-1/4">
                        <Pagination
                            currentPage={currentPage}
                            totalItems={listaTutores.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default PageDetalleDeTutoriaAlumno;
