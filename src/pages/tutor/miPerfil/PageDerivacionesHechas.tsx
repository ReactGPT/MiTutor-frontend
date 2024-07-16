import { useState, useEffect } from 'react';
import { AppointmentItemDeriv } from "../../../components/Tutor/AppointmentItemDeriv";
import Pagination from "../../../components/Pagination";
import { SearchInput } from "../../../components";
import { useDerivationPorTutor } from '../../../store/hooks/useDerivation';
import { useAuth } from '../../../context';
import { getTutorId } from '../../../store/hooks/RolesIdTutor';

const PageMisDerivacionesHechas = () => {
  const { userData } = useAuth();
  //const tutorId = userData?.userInfo?.roles[0].details.tutorId;
  //const tutorId = (userData?.userInfo?.roles[2].details as TutorRoleDetails).tutorId;

  //llamar funcion para el tutorId
  const tutorId = getTutorId(userData);

  const { derivation, fetchDerivation } = useDerivationPorTutor(tutorId);

  useEffect(() => {
    fetchDerivation();
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

  const derivacionesFiltradas = derivation?.filter(derivation =>
    derivation.creationDate.toLowerCase().includes(searchText.toLowerCase())
  );

  const indiceUltimaDerivacion = currentPage * itemsPerPage;
  const indicePrimeraDerivacion = indiceUltimaDerivacion - itemsPerPage;
  const derivacionesFiltradasRango = derivacionesFiltradas.slice(indicePrimeraDerivacion, indiceUltimaDerivacion);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


  return (
    <div className="w-full h-full flex flex-col gap-5">
      {/* Filtro de búsqueda */}

      <div className="h-[7%]">
        <SearchInput placeholder="Cosa a buscar" onSearch={handleSearch} 
        handleOnChangeFilters={handleOnChangeFilters} iconoBusqueda={false} />
      </div>

      {/* Item de Cita       */}

      <div className="w-full h-[85%] flex flex-col gap-5">
        {derivacionesFiltradasRango.map((derivation) => (
          <AppointmentItemDeriv
            nombre={derivation.nombreAlumno}
            codigo={derivation.codigo}
            unidad={derivation.unitDerivationName}
            programa={derivation.programName}
            fecha={derivation.creationDate}
            status={derivation.status}
            onClick={() => console.log("Ver más clickeado para")}
            color={"azul"}
            derivation={derivation}
          />
        ))}
      </div>

      {/* Botones de cambio de indice */}
      <Pagination
        currentPage={currentPage}
        totalItems={derivacionesFiltradasRango.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>

  );


};

export default PageMisDerivacionesHechas;