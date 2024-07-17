import { useState, useEffect, useMemo } from 'react';
import AppointmentItem from "../../../components/Tutor/AppointmentItem";
import Pagination from "../../../components/Pagination";
import { SearchInput } from "../../../components";
import { useCitasPorAlumno } from "../../../store/hooks/useCita";
import { useAuth } from '../../../context';

const PageListaDeCitasAlumno = () => {
  const { userData } = useAuth();
  const studentId = userData?.userInfo?.id || 0;

  const { cita, fetchCita } = useCitasPorAlumno(studentId);

  useEffect(() => {
    fetchCita();
  }, []);

  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedStatus, setSelectedStatus] = useState('Cualquiera');
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
    // setSelectedStatus(newStatus);
    setCurrentPage(1);
  };

  // Funcion para eliminar las tildes y caracteres especiales (para que "tutoria" y "tutoría" sean iguales)
  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const citasFiltradas = useMemo(() => {
    return cita?.filter(cita => {
      const matchesProgramName = cita.programName.toLowerCase().includes(filters.name?.toLowerCase() || '');
      const matchesStatus = filters.status && filters.status.toLowerCase() !== 'todos' 
        ? (filters.status.toLowerCase() === 'pendiente' 
          ? (cita.appointmentStatus.toLowerCase() === 'pendiente resultado' || cita.appointmentStatus.toLowerCase() === 'pendiente de resultado')
          : cita.appointmentStatus.toLowerCase() === filters.status.toLowerCase())
        : true;
        // Convertir las fechas de filtro a objetos Date si están definidas 
      const startDateFilter = filters.startDate ? new Date(filters.startDate) : null;
      const endDateFilter = filters.endDate ? new Date(filters.endDate) : null;

      // Comparar las fechas si ambos filtros están definidos
      const matchesStartDate = !startDateFilter || new Date(cita.creationDate) >= startDateFilter;
      const matchesEndDate = !endDateFilter || new Date(cita.creationDate) <= endDateFilter;

      return matchesProgramName && matchesStatus && matchesStartDate && matchesEndDate;
    });
  }, [cita, filters]);

  const indiceUltimaCita = currentPage * itemsPerPage;
  const indicePrimeraCita = indiceUltimaCita - itemsPerPage;
  const citasFiltradasRango = citasFiltradas.slice(indicePrimeraCita, indiceUltimaCita);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      {/* Filtro de búsqueda */}

      <div className="h-[7%]">
        <SearchInput placeholder="Ingresa el nombre de la cita..." 
        onSearch={handleSearch} 
        handleOnChangeFilters={handleOnChangeFilters} 
        iconoBusqueda={true}/>
      </div>

      {/* Item de Cita       */}

      <div className="w-full h-[85%] flex flex-col gap-5">
        {citasFiltradasRango.map((cita, index) => (
          <AppointmentItem
            key={`ap-Item-${index}`}
            appointment={cita}
            tipo="lista"
            user='alumno'
            flag={false}
          />
        ))}
      </div>

      {/* Botones de cambio de indice */}
      <Pagination
        currentPage={currentPage}
        totalItems={citasFiltradas.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PageListaDeCitasAlumno;
