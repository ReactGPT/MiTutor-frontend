import React, { useState, useEffect } from "react";
import { SearchInput,Spinner } from "../../../components";
import { useProgramaDeTutoria } from "../../../store/hooks/useProgramaDeTutoria";
import TutoringProgramCard from "../../../components/Tutor/TutoringProgramCard";
import Pagination from "../../../components/Pagination";
import { ListTutoringProgram } from '../../../store/types/ListTutoringProgram';

const lista: ListTutoringProgram[] = [
    {
        tutoringProgramId: 1,
        programName: 'Tutoría con Martina Solis',
        description: 'Individual',
        facultyName: 'Ciencias e ingeniería',
        specialtyName: 'Ingeniería Informática',
        tutorType: 'Martina Solis'
    },    {
        tutoringProgramId: 2,
        programName: 'Tutoría con Diego ramos',
        description: 'Individual',
        facultyName: 'Ciencias e ingeniería',
        specialtyName: 'Ingeniería Informática',
        tutorType: 'Diego ramos'
    },

]

const PageListaDeTutorias = () => {

    //const { programaTutoria, fetchProgramaDeTutoria, loading } = useProgramaDeTutoria(1);

    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const handleSearch = (text: string) => {
        setSearchText(text);
        setCurrentPage(1);
    };    

    const filteredPrograms = lista?.filter(program =>
        program.programName.toLowerCase().includes(searchText.toLowerCase())
    );

    const indexOfLastProgram = currentPage * itemsPerPage;
    const indexOfFirstProgram = indexOfLastProgram - itemsPerPage;
    const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return(
        <div>
            <div className="flex flex-col gap-5 w-full h-full">
            <div className="w-full h-[5%]">
                <SearchInput placeholder="Programa de Tutoria" onSearch={handleSearch} />
            </div>

            { 
                // loading ?
                // <div className="w-full h-[95%] flex items-center justify-center">
                // <Spinner size="xl" />
                // </div>
                // :
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
        </div>
    );

}

export default PageListaDeTutorias;