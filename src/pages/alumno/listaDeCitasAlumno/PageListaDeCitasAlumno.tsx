import { useState, useEffect } from 'react';
import AppointmentItem from "../../../components/Tutor/AppointmentItem";
import Pagination from "../../../components/Pagination";
import { SearchInput } from "../../../components";
import { useCitasPorTutorPorAlumno } from "../../../store/hooks/useCita";


const PageListaDeCitasAlumno = () => {

  const { cita, fetchCita } = useCitasPorTutorPorAlumno(1,2);

  useEffect(() => {
    fetchCita();
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
  }

  const handleSearch = (text: string) => {
    setSearchText(text);
    setCurrentPage(1);
  };

  // Funcion para eliminar las tildes y caracteres especiales (para que "tutoria" y "tutoría" sean iguales)
  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  const citasFiltradas = cita?.filter(cita =>
    normalizeText(cita.programName.toLowerCase()).includes(normalizeText(searchText.toLowerCase()))
  );

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
        <SearchInput placeholder="Ingresa el nombre de la cita..." onSearch={handleSearch} handleOnChangeFilters={handleOnChangeFilters} />
      </div>

      {/* Item de Cita       */}

      <div className="w-full h-[85%] flex flex-col gap-5">
        {citasFiltradasRango.map((cita, index) => (
          <AppointmentItem
            key={`ap-Item-${index}`}
            appointment={cita}
            tipo="lista"
            user='alumno'
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
