import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTutoresPorTutoriaVariable } from "../../../store/hooks/useListarTutoresPorAlumno";
import Pagination from "../../../components/Pagination";
import SimpleCard from "../../../components/Tutor/SimpleCard";
import { Spinner } from "../../../components";
import { Label, TextInput, Textarea } from "flowbite-react";
import { tutorxalumno } from "../../../store/types/Tutor";

const PageDetalleDeTutoriaVariable = () => {
  const location = useLocation();
  const data = location.state.data;

  const { listaDeTutores, fetchTutoresPorTutoria, loading } = useTutoresPorTutoriaVariable(data.tutoringProgramId);

  const navigate = useNavigate();

  const goToSolicitarCita = (tutor: tutorxalumno) => {
    const datos = { tutoringProgram: data, tutor: tutor };
    navigate('/misTutorias/detalle/solicitarCita', { state: { datos } });
  };

  useEffect(() => {
    fetchTutoresPorTutoria();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastTutor = currentPage * itemsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - itemsPerPage;
  const currentTutors = listaDeTutores.slice(indexOfFirstTutor, indexOfLastTutor);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col w-full h-full">

      <div className="flex flex-col w-full h-2/5 bg-[rgba(255,255,255,0.5)] border-custom drop-shadow-md p-5" >
        <h1 className="text-3xl font-bold">Datos de Tutoría</h1>
        <div className="flex w-full h-full">
          <div className="flex flex-col w-full">
            <div className='flex w-full gap-5'>
              <div className='w-1/2'>
                <Label className="text-primary font-roboto">Nombre de Tutoría</Label>
                <TextInput value={data.programName} readOnly />
              </div>
              <div className='w-1/2'>
                <Label className="text-primary font-roboto">Unidad Académica</Label>
                <TextInput value={data.specialtyName ? data.specialtyName : data.facultyName} readOnly />
              </div>
            </div>
            <Label className="text-primary font-roboto">Descripción</Label>
            <Textarea className='min-h-16 max-h-16' value={data.description} readOnly />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full h-3/5 bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md p-5 mt-4">
        <h1 className="text-3xl font-bold">Tutores disponibles</h1>
        <div className='flex flex-wrap w-full h-3/4 gap-5'>
          {
            loading ?
              <div className="w-full h-full flex items-center justify-center">
                <Spinner size="xl" />
              </div>
              :
              currentTutors.map((Tutor, index) => (
                <div key={index} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                  <SimpleCard onClick={() => goToSolicitarCita(Tutor)} title={`${Tutor.tutorName} ${Tutor.tutorLastName} ${Tutor.tutorSecondLastName}`} content="Docente a tiempo completo" subContent={Tutor.state} />
                </div>
              ))
          }
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={listaDeTutores.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

    </div>
  );

};

export default PageDetalleDeTutoriaVariable;
