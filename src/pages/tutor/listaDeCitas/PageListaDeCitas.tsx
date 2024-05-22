import { useState, useEffect } from 'react';
import AppointmentItem from "../../../components/Tutor/AppointmentItem";
import Pagination from "../../../components/Pagination";
import { SearchInput } from "../../../components";
import { useCitasPorTutor } from "../../../store/hooks/useCita";


const PageListaDeCitas = () => {

  const { cita, fetchCita } = useCitasPorTutor(1);

  useEffect(() => {
    fetchCita();
  }, []);

  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = (text: string) => {
    setSearchText(text);
    setCurrentPage(1);
  };

  const citasFiltradas = cita?.filter(cita =>
    cita.programName.toLowerCase().includes(searchText.toLowerCase())
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
        <SearchInput placeholder="Cosa a buscar" onSearch={handleSearch} />
      </div>

      {/* Item de Cita       */}

      <div className="w-full h-[85%] flex flex-col gap-5">
        {citasFiltradasRango.map((cita, index) => (
          <AppointmentItem
            key={`ap-Item-${index}`}
            appointment={cita}
            tipo="lista"
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

export default PageListaDeCitas;
