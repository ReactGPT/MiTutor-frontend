import { useState, useEffect } from "react";
import { Button, SearchInput, Spinner } from "../../../components";
import { useProgramaDeTutoriaAlumno } from "../../../store/hooks/useProgramaDeTutoriaAlumno";
import Pagination from "../../../components/Pagination";
import TutoringProgramCardAlumno from "../../../components/Tutor/TutoringProgramCardAlumno";
import IconAdd from "../../../assets/svg/IconAdd";
import React from 'react';
import { useAuth } from "../../../context";

const PageListaDeTutorias = () => {
  const { userData } = useAuth();
  const studentId = userData?.userInfo?.id || 0;

  const { programaTutoriaAlumno, fetchProgramaDeTutoriaAlumno, loading } = useProgramaDeTutoriaAlumno(studentId);

  useEffect(() => {
    fetchProgramaDeTutoriaAlumno();
  }, []);

  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = (text: string) => {
    setSearchText(text);
    setCurrentPage(1);
  };

  const [filters, setFilters] = useState<any>({
    status: null,
    startDate: null,
    endDate: null,
    name: null
  });

  const handleOnChangeFilters = (filter: any) => {
    setFilters(filter);
  };

  const filteredPrograms = programaTutoriaAlumno?.filter(program =>
    program.programName.toLowerCase().includes(searchText.toLowerCase())
  );

  const indexOfLastProgram = currentPage * itemsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - itemsPerPage;
  const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <div className="w-full h-[5%]">
        <SearchInput placeholder="Programa de Tutoria" onSearch={handleSearch} handleOnChangeFilters={handleOnChangeFilters} />
      </div>

      {
        loading ?
          <div className="w-full h-[90%] flex items-center justify-center">
            <Spinner size="xl" />
          </div>
          :
          <div className="w-full h-[90%] flex flex-col gap-5">
            {currentPrograms.map((program, index) => (
              <TutoringProgramCardAlumno key={`dpt${index}`} data={program} />
            ))}
          </div>
      }

      <Pagination
        currentPage={currentPage}
        totalItems={filteredPrograms.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );

};

export default PageListaDeTutorias;