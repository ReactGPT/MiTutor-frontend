import { useEffect, useState } from 'react'
import { useLocation,useNavigate,useParams} from 'react-router-dom';
import ResultadoCardInformacionAlumno from './ResultadoCardInformacionAlumno.tsx';
import InputAlumno from '../InputAlumno.tsx';
import { useResultadoCita} from "../../../store/hooks/useResultadoCita";
import { useArchivosDB} from '../../../store/hooks/useArchivos';
import { ExtendedFile } from '../../../store/types/Archivo.ts';
import { FaDownload } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';

function PageResultadoCitaIndividualAlumno() { 
    const {state} = useLocation();
    const {cita}= state;
    const [commentValue, setCommentValue] = useState('');
    const { resultadoCita, fetchResultadoCita } = useResultadoCita(cita);
    const { archivosBD, fetchArchivosBD, loading} = useArchivosDB(); 

    useEffect(() => {
        fetchResultadoCita();
      }, []);

    useEffect(() => { 
      if (resultadoCita && resultadoCita.appointmentResult && resultadoCita.appointmentResult.appointmentResultId !== 0) {
          fetchArchivosBD(resultadoCita.appointmentResult.appointmentResultId, 1); 
          setCommentValue(resultadoCita.appointmentResult.comments[0]?.message || ''); 
          console.log("comentario",commentValue)
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

    return (
        <div className='w-full overflow-hidden '>
            <div className='h-full overflow-auto flex flex-col gap-5'>
                
                {cita && (
                    <>
                    <div className='h-fit bg-gradient-to-r from-slate-200/50 to-blue-50 p-10 rounded-xl border-custom border border-secondary flex flex-col '>
                        <h2 className='text-3xl font-bold text-primary'>Datos Generales</h2>
                        <div className='grid grid-cols-3 grid-rows-2  gap-10 h-full pt-5'>
                        
                            <div className=' gap-2'>
                                <label className="text-xl font-medium text-primary">Estado</label>
                                <InputAlumno className='flex-1' disabled={true} value={cita.appointmentStatus}/>
                            </div>
                        
                            <div className='gap-2'>
                                <label className="text-xl font-medium text-primary">Fecha</label>
                                <InputAlumno className='flex-1' disabled={true} value={cita.creationDate}/>
                            </div>
                        
                            <div className='gap-2'>
                                <label className="text-xl font-medium text-primary">Hora</label>
                                <InputAlumno className='flex-1' disabled={true} value={`${cita.startTime} - ${cita.endTime}`}/>
                            </div>
                        
                            <div className='gap-2'>
                                <label className="text-xl font-medium text-primary">Motivo</label>
                                <InputAlumno className='flex-1' disabled={true} value={cita.reason}/>
                            </div>
                        
                            <div className='gap-2'>
                                <label className="text-xl font-medium text-primary">Programa de Tutoría</label>
                                <InputAlumno className='flex-1'disabled={true} value={cita.programName}/>
                            </div>
                        
                            <div className='gap-2'>
                                <label className="text-xl font-medium text-primary">Modalidad</label>
                                <InputAlumno className='flex-1'disabled={true} value={cita.isInPerson ? 'Presencial' : 'Virtual'}/>
                            </div>
                            <div className='gap-2'>
                                <label className="text-xl font-medium text-primary">Sesión</label>
                                <InputAlumno className='flex-1'disabled={true} value={cita.isInPerson ? 'Oficina del Profesor' : 'Link de Zoom'}/>
                            </div> 
                        </div>
                    </div>
                    <div className='gap-10 grid ma grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] mx-auto w-full '>
                    
                        <ResultadoCardInformacionAlumno cardTitle='Tutor' emptyMessage={`${cita.tutorName}\n${cita.tutorLastName} ${cita.tutorSecondLastName}\n${cita.tutorEmail}`}/>
                        <ResultadoCardInformacionAlumno cardTitle='Comentario'emptyMessage={commentValue ? `${commentValue}` : 'Por el momento, no hay comentarios del docente. Regresa más tarde.'}/>
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
        </div>
    )
}



export default PageResultadoCitaIndividualAlumno

 