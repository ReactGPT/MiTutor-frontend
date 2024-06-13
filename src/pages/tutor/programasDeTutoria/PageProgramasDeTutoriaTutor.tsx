import React, { useState, useEffect } from "react";
import { SearchInput, Spinner } from "../../../components";
import TutoringProgramCard from "../../../components/Tutor/TutoringProgramCard";
import Pagination from "../../../components/Pagination";
import { useProgramaDeTutoria } from "../../../store/hooks/useProgramaDeTutoria";
import { TutorRoleDetails } from "../../../store/types";
import { useAuth } from "../../../context";

const PageProgramasDeTutoriaTutor: React.FC = () => {
  const { userData } = useAuth();
  const tutorId = (userData?.userInfo?.roles[0].details as TutorRoleDetails).tutorId;

  const { programaTutoria, fetchProgramaDeTutoria, loading } = useProgramaDeTutoria(tutorId);

  useEffect(() => {
    fetchProgramaDeTutoria();
  }, []);


  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState<any>({
    status: null,
    startDate: null,
    endDate: null,
    name: null
  });

  const handleOnChangeFilters = (filter: any) => {
    setFilters(filter);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    setCurrentPage(1);
  };

  const filteredPrograms = programaTutoria?.filter(program =>
    program.programName.toLowerCase().includes(searchText.toLowerCase())
  );

  //const filtro1 = Array.from(new Set(programaTutoria.map(obj => obj.facultyName)));

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

      {loading ?
        <div className="w-full h-[95%] flex items-center justify-center">
          <Spinner size="xl" />
        </div>
        :
        <div className="w-full h-[95%] flex flex-col gap-5">
          {currentPrograms.map((program, index) => (
            <TutoringProgramCard key={`dpt${index}`} data={program} />
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

export default PageProgramasDeTutoriaTutor;