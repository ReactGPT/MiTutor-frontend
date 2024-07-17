import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import Spinner from '../../../components/Spinner';
import SimpleCard from '../../../components/Tutor/SimpleCard';
import ModalSolicitud from '../../../components/Tutor/ModalSolicitud';
import { listarTutoresTipo } from '../../../store/services/listarTutoresTipo';
import { insertarSolicitudTutoria } from '../../../store/services/insertarSolicitudTutoria';
import { useAuth } from '../../../context';
import ModalConfirmacion from '../../../components/Tutor/ModalConfirmacion';

// Interfaces
export interface Persona {
  id: number;
  name: string;
  lastName: string;
  secondLastName: string;
  phone: string | null;
  isActive: boolean;
}

export interface UserAccount {
  id: number;
  institutionalEmail: string;
  pucpCode: string;
  isActive: boolean;
  persona: Persona;
}

export interface Tutor {
  tutorId: number;
  meetingRoom: string;
  isActive: boolean;
  userAccount: UserAccount;
  faculty: {
    facultyId: number;
    name: string;
  };
  tutoringProgram: {
    tutoringProgramId: number;
    programName: string;
  };
}

interface TutorStudentProgramData {
  studentId: number;
  programId: number;
  tutorStudentProgram: {
    motivo: string;
    tutorId: number;
  };
}

export interface ApiResponse {
  success: boolean;
  data: Tutor[];
}

const PageSolicitarAlumno: React.FC = () => {
  const { userData } = useAuth();
  const studentId = userData?.userInfo?.id || 0;

  const location = useLocation();
  const { tutoriaData } = location.state;
  const { tutoringProgramId } = tutoriaData;
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [motivo, setMotivo] = useState<string>('');
  const itemsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        const tutorsData = await listarTutoresTipo(tutoringProgramId);
        console.log("tutoresssFDFD",tutorsData);
        setTutors(tutorsData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching tutors');
        setLoading(false);
      }
    };

    fetchTutors();
  }, [tutoringProgramId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    // Implement search functionality if needed
  };

  const filteredTutors = tutors.filter((tutor) =>
    `${tutor.userAccount.persona.name} ${tutor.userAccount.persona.lastName} ${tutor.userAccount.persona.secondLastName}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const indexOfLastTutor = currentPage * itemsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - itemsPerPage;
  const currentTutors = searchText
    ? filteredTutors.slice(indexOfFirstTutor, indexOfLastTutor)
    : tutors.slice(indexOfFirstTutor, indexOfLastTutor);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (tutor: Tutor) => {
    setSelectedTutor(tutor);
  };

  const closeModal = () => {
    setSelectedTutor(null);
  };

  const handleSolicitarTutor = async () => {
    if (selectedTutor) {
      const requestData: TutorStudentProgramData = {
        studentId,
        programId: tutoringProgramId,
        tutorStudentProgram: {
          motivo,
          tutorId: selectedTutor.tutorId,
        },
      };

      try {
        await insertarSolicitudTutoria(requestData); // Utilizamos el servicio para insertar la solicitud de tutoría
        closeModal();
        setConfirmacionOpen(true);
        //navigate(-1);
      } catch (error) {
        console.error('Error creando el tutor-student program', error);
      }
    }
  };

  const [confirmacionOpen, setConfirmacionOpen] = useState(false);
  const handleAceptarClick = () => {
    setConfirmacionOpen(false); // Cerramos el modal de confirmación
    closeModal();
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex w-full max-h-[40px] rounded-2xl">
        <input
          className="w-full font-roboto p-3 rounded-l-2xl bg-[rgba(235,236,250,1)] shadow-custom border border-solid border-[rgba(116,170,255,0.70)] 
            focus:outline-none rounded-r-2xl"
          onChange={handleInputChange}
          type="search"
          placeholder="Nombres o Apellidos"
          value={searchText}
        />  
      </div>

      {loading ? (
        <div className="w-full h-[95%] flex items-center justify-center">
          <Spinner size="xl" />
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="flex flex-col items-center w-full h-[95%] gap-5 mt-5">
          <div className="flex flex-wrap justify-center">
            {currentTutors.map((tutor, index) => (
              <div key={index} className="p-2" onClick={() => openModal(tutor)}>
                <SimpleCard
                  title={`${tutor.userAccount.persona.name} ${tutor.userAccount.persona.lastName} ${tutor.userAccount.persona.secondLastName}`}
                  content={tutor.faculty.name}
                  subContent={tutor.tutoringProgram.programName}
                />
              </div>
            ))}
          </div>
          <div className="mt-auto mb-5">
            <Pagination
              currentPage={currentPage}
              totalItems={searchText ? filteredTutors.length : tutors.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
      {selectedTutor && (
        <ModalSolicitud
          onClose={closeModal}
          content={<h2>{`${selectedTutor.userAccount.persona.name} ${selectedTutor.userAccount.persona.lastName} ${selectedTutor.userAccount.persona.secondLastName}`}</h2>}
          motivo={motivo}
          setMotivo={setMotivo}
          handleSolicitarTutor={handleSolicitarTutor}
        /> 
      )}
      <ModalConfirmacion show={confirmacionOpen} onClose={handleAceptarClick} /> 
    </div>
  );
};

export default PageSolicitarAlumno;
