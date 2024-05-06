import { useState } from 'react';
import AppointmentItem, { AppointmentItemDeriv } from "../../../components/Tutor/AppointmentItemDeriv";
import Pagination from "../../../components/Pagination";
import { SearchInput } from "../../../components";

const listaDerivaciones = [

    { nombre: 'Sofia Lopez', codigo: '20170123', unidad: 'Bienestar ciencias', programa: 'Cachimbos', fecha: '05/11/2024' },
    { nombre: 'Juan Martinez', codigo: '20180517', unidad: 'Bienestar ciencias', programa: 'Cachimbos', fecha: '01/11/2024' },
    { nombre: 'Carmen Rodriguez', codigo: '20191205', unidad: 'Bienestar ciencias', programa: 'Cachimbos', fecha: '02/11/2024' },
    { nombre: 'Alejandro Garcia', codigo: '20201130', unidad: 'Bienestar ciencias', programa: 'Cachimbos', fecha: '14/11/2024' },
    { nombre: 'Maria Fernandez', codigo: '20210810', unidad: 'Bienestar ciencias', programa: 'Cachimbos', fecha: '04/11/2024' },
    { nombre: 'Diego Perez', codigo: '20220409', unidad: 'Bienestar ciencias', programa: 'Cachimbos', fecha: '16/11/2024' },
    { nombre: 'Laura Gonzales', codigo: '20170314', unidad: 'Bienestar ciencias', programa: 'Cachimbos', fecha: '23/11/2024' },
    { nombre: 'Carlos Sanchez', codigo: '20190127', unidad: 'Bienestar ciencias', programa: 'Cachimbos', fecha: '12/11/2024' },
    { nombre: 'Ana Solari', codigo: '20210203', unidad: 'Bienestar ciencias', programa: 'Cachimbos', fecha: '23/11/2024' },
    { nombre: 'Javier Guzman', codigo: '20221218', unidad: 'Bienestar ciencias', programa: 'Cachimbos', fecha: '01/11/2024' }
  
  ];
  

const PageMisDerivacionesHechas = () => {

    const itemsPerPage = 5;
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    const citasFiltradas = listaDerivaciones.filter(cita =>
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
            <AppointmentItemDeriv
              nombre={cita.nombre}
              codigo={cita.codigo}
              unidad={cita.unidad}
              programa={cita.programa}
              fecha={cita.fecha}
              onClick={() => console.log("Ver más clickeado para", cita.codigo)}
              color={cita.nombre}
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

export default PageMisDerivacionesHechas;