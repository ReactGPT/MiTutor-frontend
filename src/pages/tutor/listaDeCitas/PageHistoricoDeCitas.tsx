import { useState, useEffect, useMemo } from 'react';
import AppointmentItem from "../../../components/Tutor/AppointmentItem";
import Pagination from "../../../components/Pagination";
import { SearchInput } from "../../../components";
import { useCitasPorTutorPorAlumno } from '../../../store/hooks/useCita';
import { useAuth } from '../../../context';
import { useLocation } from 'react-router-dom';
import { ListStudent } from '../../../store/types/ListStudent';
import { TutorRoleDetails } from '../../../store/types';
import image from '/src/assets/Tutor/no-avatar.webp';
import { getTutorId
  
 } from '../../../store/hooks/RolesIdTutor';
const PageHistoricoDeCitas = () => {
  const { userData } = useAuth();
  //const tutorId = (userData?.userInfo?.roles[0].details as TutorRoleDetails).tutorId;

  const tutorId = getTutorId(userData);

  const location = useLocation();
  const student: ListStudent = location.state.data;

  const { cita, fetchCita } = useCitasPorTutorPorAlumno(tutorId, student.studentId);

  useEffect(() => {
    fetchCita();
  }, []);

  
  const [filters, setFilters] = useState<any>({
    status: null,
    startDate: null,
    endDate: null,
    name: null
  });
  
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const citasFiltradas = useMemo(() => {
    return cita?.filter(cita => {
      const matchesProgramName = cita.programName.toLowerCase().includes(filters.name?.toLowerCase() || '');
      const matchesStatus = filters.status && filters.status.toLowerCase() !== 'todos' 
        ? (filters.status.toLowerCase() === 'pendiente' 
          ? (cita.appointmentStatus.toLowerCase() === 'pendiente resultado' || cita.appointmentStatus.toLowerCase() === 'pendiente de resultado')
          : cita.appointmentStatus.toLowerCase() === filters.status.toLowerCase())
        : true;
      const matchesStartDate = filters.startDate ? new Date(cita.creationDate) >= new Date(filters.startDate) : true;
      const matchesEndDate = filters.endDate ? new Date(cita.creationDate) <= new Date(filters.endDate) : true;
      return matchesProgramName && matchesStatus && matchesStartDate && matchesEndDate;
    });
  }, [cita, filters]);

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
  
  const handleOnChangeFilters = (filter: any) => {
    setFilters(filter);
  };


  return (
    <div className="w-full h-full flex flex-col gap-5">

      <div className="flex gap-5">
        <div className='flex h-8 items-center justify-center gap-5'>
          <img src={image} alt="Imagen Tutor" className="h-full rounded-full" />
          <h2 className='font-montserrat text-xl font-bold text-black'>{student.name} {student.lastName} {student.secondLastName}</h2>
        </div>
      </div>

      <div>
        <SearchInput placeholder="Buscador" onSearch={handleSearch} 
        handleOnChangeFilters={handleOnChangeFilters} 
        iconoBusqueda={true}/>
      </div>

      <div className="w-full h-[65%] min-h-[60px] flex flex-col gap-5">

        {citasFiltradasRango.map((cita, index) => (
          <AppointmentItem
            key={`ap-Item-${index}`}
            appointment={cita}
            tipo="historico"
            user="tutor"
            flag={false}
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