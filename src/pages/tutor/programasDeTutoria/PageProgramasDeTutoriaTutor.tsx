import React, { useState, useEffect, useMemo } from "react";
import { SearchInput } from "../../../components";
import TutoringProgramCard from "../../../components/Tutor/TutoringProgramCard";
//import { TutoringProgram } from "../../../store/types/TutoringProgram";
import Pagination from "../../../components/Pagination";
import { useProgramaDeTutoria } from "../../../store/hooks/useProgramaDeTutoria";

/* const tutoringPrograms: TutoringProgram[] = [
  {
    tutorId: 1,
    tutorProgramTutorTypeId: 1,
    tutoringProgramId: 1,
    faceToFace: true,
    groupBased: false,
    individualBased: true,
    membersCount: 10,
    programName: 'Programa de Matemáticas Avanzadas',
    description: 'Descripción del programa 1',
    facultyId: 1,
    facultyName: 'Facultad de Ingeniería',
    specialtyId: 1,
    specialtyName: 'Ingeniería Informática',
    tutorTypeId: 1,
    tutorTypeDescription: 'Tutor Fijo',
  },
  {
    tutorId: 2,
    tutorProgramTutorTypeId: 2,
    tutoringProgramId: 2,
    faceToFace: false,
    groupBased: true,
    individualBased: false,
    membersCount: 5,
    programName: 'Programa de Biología Celular',
    description: 'Descripción del programa 2',
    facultyId: 2,
    facultyName: 'Facultad de Ciencias',
    specialtyId: 2,
    specialtyName: 'Biología',
    tutorTypeId: 2,
    tutorTypeDescription: 'Tutor Variable',
  },
  {
    tutorId: 3,
    tutorProgramTutorTypeId: 3,
    tutoringProgramId: 3,
    faceToFace: true,
    groupBased: true,
    individualBased: false,
    membersCount: 15,
    programName: 'Programa de Contabilidad Financiera',
    description: 'Descripción del programa 3',
    facultyId: 3,
    facultyName: 'Facultad de Economía',
    specialtyId: 3,
    specialtyName: 'Contabilidad',
    tutorTypeId: 1,
    tutorTypeDescription: 'Tutor Fijo',
  },
  {
    tutorId: 4,
    tutorProgramTutorTypeId: 4,
    tutoringProgramId: 4,
    faceToFace: false,
    groupBased: false,
    individualBased: true,
    membersCount: 8,
    programName: 'Programa de Ingeniería Civil Estructural',
    description: 'Descripción del programa 4',
    facultyId: 1,
    facultyName: 'Facultad de Ingeniería',
    specialtyId: 4,
    specialtyName: 'Ingeniería Civil',
    tutorTypeId: 2,
    tutorTypeDescription: 'Tutor Variable',
  },
  {
    tutorId: 5,
    tutorProgramTutorTypeId: 5,
    tutoringProgramId: 5,
    faceToFace: true,
    groupBased: true,
    individualBased: true,
    membersCount: 20,
    programName: 'Programa de Química Orgánica',
    description: 'Descripción del programa 5',
    facultyId: 2,
    facultyName: 'Facultad de Ciencias',
    specialtyId: 5,
    specialtyName: 'Química',
    tutorTypeId: 1,
    tutorTypeDescription: 'Tutor Fijo',
  },
  {
    tutorId: 6,
    tutorProgramTutorTypeId: 1,
    tutoringProgramId: 6,
    faceToFace: true,
    groupBased: false,
    individualBased: true,
    membersCount: 12,
    programName: 'Programa de Física Cuántica',
    description: 'Descripción del programa 6',
    facultyId: 4,
    facultyName: 'Facultad de Ciencias Físicas',
    specialtyId: 6,
    specialtyName: 'Física Cuántica',
    tutorTypeId: 1,
    tutorTypeDescription: 'Tutor Fijo',
  },
  {
    tutorId: 7,
    tutorProgramTutorTypeId: 2,
    tutoringProgramId: 7,
    faceToFace: false,
    groupBased: true,
    individualBased: false,
    membersCount: 7,
    programName: 'Programa de Literatura Comparada',
    description: 'Descripción del programa 7',
    facultyId: 5,
    facultyName: 'Facultad de Letras',
    specialtyId: 7,
    specialtyName: 'Literatura',
    tutorTypeId: 2,
    tutorTypeDescription: 'Tutor Variable',
  },
  {
    tutorId: 8,
    tutorProgramTutorTypeId: 3,
    tutoringProgramId: 8,
    faceToFace: true,
    groupBased: true,
    individualBased: false,
    membersCount: 18,
    programName: 'Programa de Marketing Estratégico',
    description: 'Descripción del programa 8',
    facultyId: 6,
    facultyName: 'Facultad de Negocios',
    specialtyId: 8,
    specialtyName: 'Marketing',
    tutorTypeId: 1,
    tutorTypeDescription: 'Tutor Fijo',
  },
  {
    tutorId: 9,
    tutorProgramTutorTypeId: 4,
    tutoringProgramId: 9,
    faceToFace: false,
    groupBased: false,
    individualBased: true,
    membersCount: 6,
    programName: 'Programa de Arquitectura Sustentable',
    description: 'Descripción del programa 9',
    facultyId: 7,
    facultyName: 'Facultad de Arquitectura',
    specialtyId: 9,
    specialtyName: 'Arquitectura',
    tutorTypeId: 2,
    tutorTypeDescription: 'Tutor Variable',
  },
  {
    tutorId: 10,
    tutorProgramTutorTypeId: 5,
    tutoringProgramId: 10,
    faceToFace: true,
    groupBased: true,
    individualBased: true,
    membersCount: 25,
    programName: 'Programa de Neurociencia Cognitiva',
    description: 'Descripción del programa 10',
    facultyId: 8,
    facultyName: 'Facultad de Psicología',
    specialtyId: 10,
    specialtyName: 'Neurociencia',
    tutorTypeId: 1,
    tutorTypeDescription: 'Tutor Fijo',
  },
  {
    tutorId: 11,
    tutorProgramTutorTypeId: 1,
    tutoringProgramId: 11,
    faceToFace: true,
    groupBased: false,
    individualBased: true,
    membersCount: 11,
    programName: 'Programa de Astrofísica Avanzada',
    description: 'Descripción del programa 11',
    facultyId: 4,
    facultyName: 'Facultad de Ciencias Físicas',
    specialtyId: 11,
    specialtyName: 'Astrofísica',
    tutorTypeId: 1,
    tutorTypeDescription: 'Tutor Fijo',
  },
  {
    tutorId: 12,
    tutorProgramTutorTypeId: 2,
    tutoringProgramId: 12,
    faceToFace: false,
    groupBased: true,
    individualBased: false,
    membersCount: 9,
    programName: 'Programa de Historia del Arte',
    description: 'Descripción del programa 12',
    facultyId: 5,
    facultyName: 'Facultad de Letras',
    specialtyId: 12,
    specialtyName: 'Historia del Arte',
    tutorTypeId: 2,
    tutorTypeDescription: 'Tutor Variable',
  },
  {
    tutorId: 13,
    tutorProgramTutorTypeId: 3,
    tutoringProgramId: 13,
    faceToFace: true,
    groupBased: true,
    individualBased: false,
    membersCount: 20,
    programName: 'Programa de Gestión Empresarial',
    description: 'Descripción del programa 13',
    facultyId: 6,
    facultyName: 'Facultad de Negocios',
    specialtyId: 13,
    specialtyName: 'Gestión Empresarial',
    tutorTypeId: 1,
    tutorTypeDescription: 'Tutor Fijo',
  },
  {
    tutorId: 14,
    tutorProgramTutorTypeId: 4,
    tutoringProgramId: 14,
    faceToFace: false,
    groupBased: false,
    individualBased: true,
    membersCount: 5,
    programName: 'Programa de Diseño Urbano',
    description: 'Descripción del programa 14',
    facultyId: 7,
    facultyName: 'Facultad de Arquitectura',
    specialtyId: 14,
    specialtyName: 'Diseño Urbano',
    tutorTypeId: 2,
    tutorTypeDescription: 'Tutor Variable',
  },
  {
    tutorId: 15,
    tutorProgramTutorTypeId: 5,
    tutoringProgramId: 15,
    faceToFace: true,
    groupBased: true,
    individualBased: true,
    membersCount: 30,
    programName: 'Programa de Lingüística Aplicada',
    description: 'Descripción del programa 15',
    facultyId: 9,
    facultyName: 'Facultad de Lenguas',
    specialtyId: 15,
    specialtyName: 'Lingüística',
    tutorTypeId: 1,
    tutorTypeDescription: 'Tutor Fijo',
  },
]; */

const PageProgramasDeTutoriaTutor: React.FC = () => {

  const { programaTutoria, fetchProgramaDeTutoria } = useProgramaDeTutoria(1);

  useEffect(() => {
    fetchProgramaDeTutoria();
  }, []);


  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSearch = (text: string) => {
    setSearchText(text);
    setCurrentPage(1);
  };

  // const filteredPrograms = programaTutoria?.filter(program =>
  //   program.programName.toLowerCase().includes(searchText.toLowerCase())
  // );

  const filteredPrograms = useMemo(() => {
    console.log(programaTutoria);
    return programaTutoria.filter(program =>
      program.programName.toLowerCase().includes(searchText.toLowerCase())
    );

  }, [searchText]);

  const indexOfLastProgram = currentPage * itemsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - itemsPerPage;
  const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="w-full h-[5%]">
        <SearchInput placeholder="Programa de Tutoria" onSearch={handleSearch} />
      </div>

      <div className="w-full h-[95%] flex flex-col gap-5">
        {currentPrograms.map((program) => (
          <TutoringProgramCard key={program.tutoringProgramId} data={program} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredPrograms.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PageProgramasDeTutoriaTutor;