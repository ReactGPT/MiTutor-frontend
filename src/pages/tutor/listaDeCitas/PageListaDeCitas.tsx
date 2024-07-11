import { useState, useEffect } from 'react';
import AppointmentItem from "../../../components/Tutor/AppointmentItem";
import Pagination from "../../../components/Pagination";
import { SearchInput } from "../../../components";
import { useCitasPorTutor } from "../../../store/hooks/useCita";
import { useAuth } from '../../../context';
import { TutorRoleDetails } from '../../../store/types';
import { Services as ServicesProperties } from '../../../config';
import axios from 'axios';
import { ListCita } from '../../../store/types/ListCita';
import { getTutorId } from '../../../store/hooks/RolesIdTutor';

const PageListaDeCitas = () => {
  const { userData } = useAuth();
  //const tutorId = userData?.userInfo?.roles[0].details.tutorId;
  //const tutorId = (userData?.userInfo?.roles[2].details as TutorRoleDetails).tutorId;

  const tutorId = getTutorId(userData);

  const { cita, fetchCita } = useCitasPorTutor(tutorId);

  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    fetchCita();
  }, [refreshKey]);

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

  const citasFiltradas = cita?.filter(cita =>
    cita.programName.toLowerCase().includes(searchText.toLowerCase())
  );

  const indiceUltimaCita = currentPage * itemsPerPage;
  const indicePrimeraCita = indiceUltimaCita - itemsPerPage;
  const citasFiltradasRango = citasFiltradas.slice(indicePrimeraCita, indiceUltimaCita);

  // Función para actualizar la cita en el servidor
  const actualizarCitaEnServidor = async (appointment: ListCita) => {
    try {
      await axios.put(`${ServicesProperties.BaseUrl}/actulizar_Estado_Insertar_Resultado?id_appointment=${appointment.appointmentId}`, {});
      //esto era si no habian grupales
      //await axios.post(`${ServicesProperties.BaseUrl}/agregarResultadoCita?studentId=${appointment.personId}&tutoringProgramId=${appointment.programId}&id_appointment=${appointment.appointmentId}`, {});
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
    }
  };

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (citasFiltradas) {
        citasFiltradas.forEach((appointment) => {
          const currentDate = new Date();
          const endDateTime = new Date(`${appointment.creationDate}T${appointment.endTime}`);
          if (appointment.appointmentStatus === 'registrada' && currentDate > endDateTime) {
            appointment.appointmentStatus = 'pendiente resultado';
            actualizarCitaEnServidor(appointment);
            setFlag(true);
          }
        });
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [citasFiltradas,]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      {/* Filtro de búsqueda */}

      <div className="h-[7%]">
        <SearchInput placeholder="Buscador" onSearch={handleSearch} handleOnChangeFilters={handleOnChangeFilters} />
      </div>

      {/* Item de Cita       */}

      <div className="w-full h-[85%] flex flex-col gap-5">
        {citasFiltradasRango.map((cita, index) => (
          <AppointmentItem
            key={`ap-Item-${index}`}
            appointment={cita}
            tipo="lista"
            user="tutor"
            flag={flag}
            onCancelAppointment={() => {
              setRefreshKey(prev => prev + 1);
            }}
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
