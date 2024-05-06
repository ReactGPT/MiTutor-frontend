import { useState } from 'react';
import AppointmentItem from "../../../components/Tutor/AppointmentItem";
import Pagination from "../../../components/Pagination";
import { SearchInput } from "../../../components";

const listaCita = [

  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '05/11/2024' },
  { nombre: 'Asesoría academica', codigo: 'AA000000', estado: 'Completado', fecha: '01/11/2024' },
  { nombre: 'Programa organizacional', codigo: 'PO000000', estado: 'Registrado', fecha: '02/11/2024' },
  { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Pendiente', fecha: '14/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Registrado', fecha: '04/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '16/11/2024' },
  { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Completado', fecha: '23/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '12/11/2024' },
  { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Registrado', fecha: '23/11/2024' },
  { nombre: 'Asesoría academica', codigo: 'AA000000', estado: 'Completado', fecha: '01/11/2024' },
  { nombre: 'Programa organizacional', codigo: 'PO000000', estado: 'Registrado', fecha: '02/11/2024' },
  { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Solicitado', fecha: '05/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Registrado', fecha: '13/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Pendiente', fecha: '16/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '12/11/2024' },
  { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Registrado', fecha: '23/11/2024' },
  { nombre: 'Asesoría academica', codigo: 'AA000000', estado: 'Completado', fecha: '01/11/2024' },
  { nombre: 'Programa organizacional', codigo: 'PO000000', estado: 'Registrado', fecha: '02/11/2024' },
  { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Solicitado', fecha: '05/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Registrado', fecha: '13/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Pendiente', fecha: '16/11/2024' }

];

const PageListaDeCitas = () => {

  const itemsPerPage = 5;
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const citasFiltradas = listaCita.filter(cita =>
    cita.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const indiceUltimaCita = currentPage * itemsPerPage;
  const indicePrimeraCita = indiceUltimaCita - itemsPerPage;
  const citasFiltradasRango = citasFiltradas.slice(indicePrimeraCita,indiceUltimaCita);

  const handleSearch = (text: string) => {
    setSearchText(text);
    setCurrentPage(1);
  };

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
        {citasFiltradasRango.map((cita) => (
          <AppointmentItem
            nombre={cita.nombre}
            codigo={cita.codigo}
            estado={cita.estado}
            fecha={cita.fecha}
            onClick={() => console.log("Ver más clickeado para", cita.codigo)}
            color={cita.estado}
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
