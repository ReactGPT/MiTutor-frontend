import { useState, useEffect } from 'react';
import AppointmentItem from "../../../components/Tutor/AppointmentItem";
import Pagination from "../../../components/Pagination";
import { SearchInput } from "../../../components";
import { useCitasPorTutorPorAlumno } from '../../../store/hooks/useCita';
import { useAuth } from '../../../context';
import { useLocation } from 'react-router-dom';
import { ListStudent } from '../../../store/types/ListStudent';

const PageHistoricoDeCitas = () => {
  const { userData } = useAuth();
  const tutorId = userData?.userInfo?.roles[0].details.tutorId;

  const location = useLocation();
  const student: ListStudent = location.state.data;

  const { cita, fetchCita } = useCitasPorTutorPorAlumno(tutorId, student.studentId);

  useEffect(() => {
    fetchCita();
  }, []);

  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const citasFiltradas = cita?.filter(cita =>
    cita.programName.toLowerCase().includes(searchText.toLowerCase())
  );

  const indiceUltimaCita = currentPage * itemsPerPage;
  const indicePrimeraCita = indiceUltimaCita - itemsPerPage;
  const citasFiltradasRango = citasFiltradas.slice(indicePrimeraCita, indiceUltimaCita);

  const handleSearch = (text: string) => {
    setSearchText(text);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full h-full">

      <div className="w-[30%] flex h-[15%] min-h-[60px]">
        <div className="w-full h-[60%] flex flex-row justify-right items-center bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md p-5">
          <span className="font-montserrat text-4xl font-bold text-primary"><pre>Alumno: </pre></span>
          <span className="font-roboto text-3xl text-primary"> {student.name} {student.lastName} {student.secondLastName} </span>
        </div>
      </div>

      <div className="h-[7%]">
        <SearchInput placeholder="Cosa a buscar" onSearch={handleSearch} />
      </div>

      <div className="w-full h-[65%] min-h-[60px]">

        {citasFiltradasRango.map((cita, index) => (
          <AppointmentItem
            key={`ap-Item-${index}`}
            appointment={cita}
            tipo="historico"
          />
        ))}

      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={citasFiltradas.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

    </div>
  );
};

export default PageHistoricoDeCitas;