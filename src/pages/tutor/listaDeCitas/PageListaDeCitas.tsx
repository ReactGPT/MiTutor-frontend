import { useState,useEffect } from 'react';
import AppointmentItem from "../../../components/Tutor/AppointmentItem";
import Pagination from "../../../components/Pagination";
import { SearchInput } from "../../../components";
import { useCitasPorTutor } from "../../../store/hooks/useCita";

// const listaCita = [

//   { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '05/11/2024' },
//   { nombre: 'Asesoría academica', codigo: 'AA000000', estado: 'Completado', fecha: '01/11/2024' },
//   { nombre: 'Programa organizacional', codigo: 'PO000000', estado: 'Registrado', fecha: '02/11/2024' },
//   { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Pendiente', fecha: '14/11/2024' },
//   { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Registrado', fecha: '04/11/2024' },
//   { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '16/11/2024' },
//   { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Completado', fecha: '23/11/2024' },
//   { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '12/11/2024' },
//   { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Registrado', fecha: '23/11/2024' },
//   { nombre: 'Asesoría academica', codigo: 'AA000000', estado: 'Completado', fecha: '01/11/2024' },
//   { nombre: 'Programa organizacional', codigo: 'PO000000', estado: 'Registrado', fecha: '02/11/2024' },
//   { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Solicitado', fecha: '05/11/2024' },
//   { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Registrado', fecha: '13/11/2024' },
//   { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Pendiente', fecha: '16/11/2024' },
//   { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '12/11/2024' },
//   { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Registrado', fecha: '23/11/2024' },
//   { nombre: 'Asesoría academica', codigo: 'AA000000', estado: 'Completado', fecha: '01/11/2024' },
//   { nombre: 'Programa organizacional', codigo: 'PO000000', estado: 'Registrado', fecha: '02/11/2024' },
//   { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Solicitado', fecha: '05/11/2024' },
//   { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Registrado', fecha: '13/11/2024' },
//   { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Pendiente', fecha: '16/11/2024' }

// ];

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
  const citasFiltradasRango = citasFiltradas.slice(indicePrimeraCita,indiceUltimaCita);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full h-full">
      {/* Filtro de búsqueda */}

      <div className="h-[7%]">
        <SearchInput placeholder="Cosa a buscar" onSearch={handleSearch} />
      </div>

      {/* Item de Cita       */}

      <div className="w-full h-[85%]">
        {citasFiltradasRango.map((cita,index) => (
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
