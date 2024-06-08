import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ResultadoCardInformacionAlumno from './ResultadoCardInformacionAlumno.tsx';
import InputAlumno from '../InputAlumno.tsx';
import { useResultadoCita } from "../../../store/hooks/useResultadoCita";
import { useArchivosDB } from '../../../store/hooks/useArchivos';
import { ExtendedFile } from '../../../store/types/Archivo.ts';
import { FaDownload } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import { Label, TextInput } from 'flowbite-react';
import Button from '../../../components/Button.tsx';
import SimpleCard from '../../../components/Tutor/SimpleCard.tsx';
import ButtonModalCancelarCita from '../../../components/ButtonModalCancelarCita.tsx';

function PageResultadoCitaIndividualAlumno() {
  const { state } = useLocation();
  const { cita } = state;
  const [commentValue, setCommentValue] = useState('');
  const { resultadoCita, fetchResultadoCita } = useResultadoCita(cita);
  const { archivosBD, fetchArchivosBD, loading } = useArchivosDB();

  useEffect(() => {
    fetchResultadoCita();
  }, []);

  useEffect(() => {
    if (resultadoCita && resultadoCita.appointmentResult && resultadoCita.appointmentResult.appointmentResultId !== 0) {
      fetchArchivosBD(resultadoCita.appointmentResult.appointmentResultId, 1);
      setCommentValue(resultadoCita.appointmentResult.comments[0]?.message || '');
      console.log("comentario", commentValue);
    }
  }, [resultadoCita]);

  const handleFileDownload = (file: ExtendedFile) => {
    try {
      const url = URL.createObjectURL(file); // Crear URL del archivo
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click(); // Iniciar descarga
      document.body.removeChild(link); // Limpiar después de la descarga
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  // Determinar si el botón de cancelar debe mostrarse
  const currentDate = new Date();
  const appointmentDate = new Date(cita.creationDate);
  const dayBeforeAppointment = new Date(appointmentDate);
  dayBeforeAppointment.setDate(appointmentDate.getDate() - 1);

  const shouldShowCancelButton = currentDate <= dayBeforeAppointment;

  return (
    <div className='w-full h-full overflow-auto flex flex-col gap-5'>
      {cita && (
        <>
          <div className='h-fit bg-gradient-to-r from-slate-200/50 to-blue-50 p-5 rounded-xl border-custom border border-secondary flex flex-col '>
            <h1 className="text-3xl font-bold">Datos de Cita</h1>
            <div className='grid grid-cols-3 grid-rows-2 gap-3 h-full'>
              <div className='w-full'>
                <Label className="text-primary font-roboto">Estado</Label>
                <TextInput value={cita.appointmentStatus} readOnly />
              </div>
              <div className='w-full'>
                <Label className="text-primary font-roboto">Fecha</Label>
                <TextInput value={cita.creationDate} readOnly />
              </div>
              <div className='w-full'>
                <Label className="text-primary font-roboto">Hora</Label>
                <TextInput value={`${cita.startTime} - ${cita.endTime}`} readOnly />
              </div>
              <div className='w-full'>
                <Label className="text-primary font-roboto">Motivo</Label>
                <TextInput value={cita.reason} readOnly />
              </div>
              <div className='w-full'>
                <Label className="text-primary font-roboto">Tutoria</Label>
                <TextInput value={cita.programName} readOnly />
              </div>
              <div className='w-full'>
                <Label className="text-primary font-roboto">Modalidad</Label>
                <TextInput value={cita.isInPerson ? 'Presencial' : 'Virtual'} readOnly />
              </div>
              <div className='w-full'>
                <Label className="text-primary font-roboto">{cita.isInPerson ? 'Lugar' : 'Sesión'}</Label>
                <TextInput value={cita.isInPerson ? 'Oficina del Profesor' : 'Link de Zoom'} readOnly />
              </div>
              <div className='w-full'>
              </div>
              <div className='w-full flex items-end justify-end'>
                {shouldShowCancelButton && <ButtonModalCancelarCita />}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-3 gap-5 w-full h-full'>

            <ResultadoCardInformacionAlumno
              cardTitle='Tutor'
            >
              <SimpleCard title={`${cita.tutorName} ${cita.tutorLastName} ${cita.tutorSecondLastName}`} content="Docente a tiempo completo" />
            </ResultadoCardInformacionAlumno>

            <ResultadoCardInformacionAlumno
              cardTitle='Comentario'
              emptyMessage={commentValue ? `${commentValue}` : 'Por el momento, no hay comentarios del docente. Regresa más tarde.'}
            />

            <ResultadoCardInformacionAlumno
              cardTitle="Documentos"
              className="additional-classes"
              emptyMessage="No hay archivos seleccionados"
            >
              {loading ? (
                <div className='w-full flex justify-center items-center'>
                  <ClipLoader color="#3498db" loading={loading} size={60} />
                </div>
              ) : (
                archivosBD.length > 0 && (
                  <div className='w-full max-h-48 overflow-y-auto'>
                    <ul>
                      {archivosBD
                        .filter(file => file.eliminado != 1)
                        .map((file, index) => (
                          <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow-md mb-2" style={{ maxHeight: '300px' }}>
                            <span className="flex-1">{file.name}</span>
                            <button onClick={() => handleFileDownload(file)}>
                              <FaDownload size={15} />
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                )
              )}
            </ResultadoCardInformacionAlumno>

          </div>
        </>
      )}
    </div>
  );
}

export default PageResultadoCitaIndividualAlumno;