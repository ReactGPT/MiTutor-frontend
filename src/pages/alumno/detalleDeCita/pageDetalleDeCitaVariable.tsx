import { useState, useEffect } from "react";
import TextBox from "../../../components/TextBox";
import { Button } from "../../../components";
import Pagination from "../../../components/Pagination";
import SimpleCard from "../../../components/Tutor/SimpleCard";
import React from 'react';

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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastTutor = currentPage * itemsPerPage;
    const indexOfFirstTutor = indexOfLastTutor - itemsPerPage;
    const currentTutors = listaTutores.slice(indexOfFirstTutor, indexOfLastTutor);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const debugClick = () => {
        console.log('boton clickeado')
    }

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
                            <div className="w-full h-full flex gap-5">
                            {currentTutors.map((Tutor) => (
                                <SimpleCard title={Tutor.title} content={Tutor.content} subContent={Tutor.subcontent} />
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
