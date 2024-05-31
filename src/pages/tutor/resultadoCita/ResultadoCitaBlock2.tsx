import React, { useEffect, useState, ChangeEvent} from 'react'

import { Appointment } from '../../../store/types/Appointment';
import { Button, Combobox } from '../../../components';
import { EditIcon, SaveIcon, CloseIcon} from '../../../assets';
import axios from 'axios'; 
axios.defaults.headers.common['Access-Control-Allow-Origin'];
import ModalResultadoCita from '../../../components/Tutor/ModalResultadoCita'; 
import { InitialData } from '../../../store/types/AppointmentResult';
import { ListCita } from '../../../store/types/ListCita';
import { TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useResultadoCita, useUpdateResultadoCita, useUpdateComentario } from "../../../store/hooks/useResultadoCita";
import { ComboboxOptionProps } from '@headlessui/react'; 
import ModalComentario from '../../../components/Tutor/ModalComentario';
import { useArchivos, useArchivosDB, useArchivosOtros} from '../../../store/hooks/useArchivos';
//import {useArchivos, useArchivosDB, useArchivosOtros} from "../../../store/hooks/useArchivos";
import { Archivo, ExtendedFile } from '../../../store/types/Archivo';
//import { Archivo, ExtendedFile } from '../../../store/types/Archivo';
import { Services as ServicesProperties } from '../../../config';
import { FaExpand } from 'react-icons/fa';

type InputProps = {
    className:string;
    cita:ListCita; 
} 
 
function ResultadoCitaBlock2({className,cita}:InputProps) {
    const { resultadoCita, fetchResultadoCita } = useResultadoCita(cita);
    //Enviar archivos
    const { enviarArchivoServidor } = useArchivos();
    const { enviarArchivoBd, fetchArchivosBD, archivosBD, setArchivosBD } = useArchivosDB();  
    const [ archivosBDCopia, setArchivosBDCopia] = useState<ExtendedFile[]>([]);

    const { enviarArchivoOtros, fetchArchivosOtros, archivosOtros, setArchivosOtros } = useArchivosOtros();  
    const [ archivosOtrosCopia, setArchivosOtrosCopia] = useState<ExtendedFile[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalComentario, setIsModalComentario] = useState(false);  
    const [isModalComentario2, setIsModalComentario2] = useState(false);  
    
    const openModal = () => {
      setIsModalOpen(true);
    };
    
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const openModalComentario = () => {
      setIsModalComentario(true);
    };
    
    const closeModalComentario = () => {
      setIsModalComentario(false);
    };

    const openModalComentario2 = () => {
      setIsModalComentario2(true);
    };
    
    const closeModalComentario2 = () => {
      setIsModalComentario2(false);
    };
   
    /*Habilitar comentarios,asistencia,duracion*/    
    const [enableAttendance,setEnableAttendance] = useState<boolean>(false);

    type AssistanceOption = {
      name: string;
    }; 
    const assistanceState = [
        { name: 'Asistio' },
        { name: 'Falto' },
    ]
    
    const attributesToRender =[
        {
            name:"Fecha",
            value:cita.creationDate
        },
        {
            name:"Modalidad",
            value:cita.isInPerson?"Presencial":"Virtual"
        },
        {
            name:"Hora",
            value:cita.startTime+" - "+cita.endTime
        },
        {
            name:"Motivo",
            value:cita.reason
        },
        {
            name:"Tipo de Tutoría",
            value:cita.programName
        }
    ] 
     
    //Inicializar 
    const [commentValue, setCommentValue] = useState('');
    const [commentValue2, setCommentValue2] = useState('');
    const [selectOption, setSelectOption] = useState(resultadoCita?.appointmentResult.asistio ?? false);
    const [startTime, setStartTime] = useState( dayjs('00:00:00', 'HH:mm:ss'));
    const [endTime, setEndTime] = useState(dayjs('00:00:00', 'HH:mm:ss'));
    
    useEffect(() => {
      fetchResultadoCita();
    }, []);

    useEffect(() => {
      console.log("copia",archivosBDCopia);
    }, [archivosBDCopia]);
  
    useEffect(() => { 
      if (resultadoCita && resultadoCita.appointmentResult && resultadoCita.appointmentResult.appointmentResultId !== 0) {
          fetchArchivosBD(resultadoCita.appointmentResult.appointmentResultId, 1);
          fetchArchivosOtros(resultadoCita.appointmentResult.appointmentResultId, 2);
          setCommentValue2(resultadoCita.appointmentResult.comments[1]?.message || '');
          setCommentValue(resultadoCita.appointmentResult.comments[0]?.message || '');
          setSelectOption(resultadoCita.appointmentResult.asistio);
          setStartTime(dayjs(resultadoCita.appointmentResult.startTime, 'HH:mm:ss'));
          setEndTime(dayjs(resultadoCita.appointmentResult.endTime, 'HH:mm:ss'));
      }
    }, [resultadoCita]);

    useEffect(() => { 
      if (archivosBD) {
        const archivosBDCopia2: ExtendedFile[] = archivosBD.map(file => {
          const copiedFile: ExtendedFile = new File([file], file.name, {
            type: file.type,
            lastModified: file.lastModified
          }) as ExtendedFile;
         
          copiedFile.nuevo = file.nuevo;
          copiedFile.eliminado = file.eliminado;
          copiedFile.id_archivo = file.id_archivo; 
          return copiedFile;
        }); 
        setArchivosBDCopia([...archivosBDCopia2]);
        
      }  
    }, [archivosBD]);

    useEffect(() => { 
      if (archivosOtros) {
        const archivosBDCopia2: ExtendedFile[] = archivosOtros.map(file => {
          const copiedFile: ExtendedFile = new File([file], file.name, {
            type: file.type,
            lastModified: file.lastModified
          }) as ExtendedFile;
         
          copiedFile.nuevo = file.nuevo;
          copiedFile.eliminado = file.eliminado;
          copiedFile.id_archivo = file.id_archivo; 
          return copiedFile;
        }); 
        setArchivosOtrosCopia([...archivosBDCopia2]);
        
      }  
    }, [archivosOtros]);
    
    const handleCancelar = () => {
      setEnableAttendance(!enableAttendance); 
      const archivosBDCopia2: ExtendedFile[] = archivosBD.map(file => {
        // Crear una copia profunda de cada objeto ExtendedFile
        const copiedFile: ExtendedFile = new File([file], file.name, {
          type: file.type,
          lastModified: file.lastModified
        }) as ExtendedFile;
      
        // Copiar las propiedades adicionales
        copiedFile.nuevo = file.nuevo;
        copiedFile.eliminado = file.eliminado;
        copiedFile.id_archivo = file.id_archivo;
        return copiedFile;
      });
      setArchivosBDCopia([...archivosBDCopia2]); 

      const archivosOtrosCopia2: ExtendedFile[] = archivosOtros.map(file => {
        // Crear una copia profunda de cada objeto ExtendedFile
        const copiedFile: ExtendedFile = new File([file], file.name, {
          type: file.type,
          lastModified: file.lastModified
        }) as ExtendedFile;
      
        // Copiar las propiedades adicionales
        copiedFile.nuevo = file.nuevo;
        copiedFile.eliminado = file.eliminado;
        copiedFile.id_archivo = file.id_archivo;
        return copiedFile;
      });
      setArchivosOtrosCopia([...archivosOtrosCopia2]); 

      if (resultadoCita && resultadoCita.appointmentResult) {  
        setCommentValue2(resultadoCita.appointmentResult.comments[1].message);
        setCommentValue(resultadoCita.appointmentResult.comments[0].message); 
        setSelectOption(resultadoCita.appointmentResult.asistio);
        setStartTime(dayjs(resultadoCita.appointmentResult.startTime, 'HH:mm:ss')); 
        setEndTime(dayjs(resultadoCita.appointmentResult.endTime, 'HH:mm:ss'));  
      }   
    }; 


    //Onchange
    const handleCommentChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setCommentValue(value);
    };
    const handleCommentChange2 = (e:ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setCommentValue2(value);
    };
    const handleAsistencia=(e:AssistanceOption)=>{ 
        setSelectOption(e.name == 'Asistio'); 
    } 

    const handleGuardar = async () => {
        setIsModalOpen(!isModalOpen); 
        setEnableAttendance(!enableAttendance); 
        if (resultadoCita && resultadoCita.appointmentResult) {
            resultadoCita.appointmentResult.comments[0].message = commentValue ?? '';
            resultadoCita.appointmentResult.comments[1].message = commentValue2 ?? '';
            resultadoCita.appointmentResult.asistio=selectOption;
            resultadoCita.appointmentResult.startTime=startTime.format('HH:mm:ss');
            resultadoCita.appointmentResult.endTime=endTime.format('HH:mm:ss');
            useUpdateComentario(resultadoCita); 
            useUpdateResultadoCita(resultadoCita);
            // Enviar archivos si hay archivos seleccionados
            if (archivosBDCopia.length > 0) {
              try {
                // Seleccionar archivos a guardar
                const filesToSend = archivosBDCopia.filter(file => file.nuevo === 1 && file.eliminado === 0);
                // Seleccionar archivos a eliminar
                const filesToDelete = archivosBDCopia.filter(file => file.nuevo === 0 && file.eliminado === 1);
                // Seleccionar archivos a reactivar
                const filesToActive = archivosBDCopia.filter(file => file.nuevo === 0 && file.eliminado === 0);

                //INSERTAR ARCHIVOS ALUMNOS
                for (const file of filesToSend) {
                  //creo un tipo archivo
                  const archivo:Archivo={  
                      filesId: 0,
                      filesName: file.name,
                      appointmentResultId: resultadoCita.appointmentResult.appointmentResultId,
                      privacyTypeId: 1
                  }
                  const idArchivo = await enviarArchivoBd(archivo); // Espera a que se complete enviarArchivoBd
                  // Enviar archivo al servidor
                  await enviarArchivoServidor(file, idArchivo.toString(), 'archivosCita').then(() => {
                    // Actualizar el estado del archivo en archivosBD
                    file.id_archivo=idArchivo; 

                    const updatedArchivosBD: ExtendedFile[] = archivosBDCopia.map(file => {
                      const copiedFile: ExtendedFile = new File([file], file.name, {
                        type: file.type,
                        lastModified: file.lastModified
                      }) as ExtendedFile;
                    
                      // Copiar las propiedades adicionales
                      copiedFile.nuevo = 0;
                      copiedFile.eliminado = file.eliminado;
                      copiedFile.id_archivo = file.id_archivo;
                      copiedFile.nombre = file.nombre;  // Asegúrate de copiar esta propiedad también
                    
                      return copiedFile;
                    });
          
                      // Actualizar el estado de archivosBD
                      setArchivosBD([...updatedArchivosBD]); 
                    }).catch(error => {
                        console.error('Error al enviar archivo al servidor:', error);
                    });
                }

                for (const file of filesToDelete) {
                  try {
                    await eliminarArchivo(file.id_archivo);
                    console.log(`Archivo eliminado correctamente: ${file.name}`);
                  } catch (error) {
                    console.error(`Error al eliminar el archivo ${file.name}:`, error);
                  }
                }

                for (const file of filesToActive) {
                  try {
                    await activarArchivo(file.id_archivo);
                    console.log(`Archivo activado correctamente: ${file.name}`);
                  } catch (error) {
                    console.error(`Error al eliminar el archivo ${file.name}:`, error);
                  }
                }
                setArchivosBD([...archivosBDCopia]);
                console.log('Archivos enviados correctamente');  
              } catch (error) {
                console.error('Error al enviar archivos:', error);
              }
          }
          //copia
          // Enviar archivos si hay archivos seleccionados
          if (archivosOtros.length > 0) {
            try {
              // Seleccionar archivos a guardar
              const filesToSend = archivosOtros.filter(file => file.nuevo === 1 && file.eliminado === 0);
              // Seleccionar archivos a eliminar
              const filesToDelete = archivosOtros.filter(file => file.nuevo === 0 && file.eliminado === 1);
              // Seleccionar archivos a reactivar
              const filesToActive = archivosOtros.filter(file => file.nuevo === 0 && file.eliminado === 0);

              //INSERTAR ARCHIVOS ALUMNOS
              for (const file of filesToSend) {
                //creo un tipo archivo
                const archivo:Archivo={  
                    filesId: 0,
                    filesName: file.name,
                    appointmentResultId: resultadoCita.appointmentResult.appointmentResultId,
                    privacyTypeId: 2
                }
                const idArchivo = await enviarArchivoBd(archivo); // Espera a que se complete enviarArchivoBd
                // Enviar archivo al servidor
                await enviarArchivoServidor(file, idArchivo.toString(), 'archivosCita').then(() => {
                  // Actualizar el estado del archivo en archivosBD
                  file.id_archivo=idArchivo; 
                  const updatedArchivosBD: ExtendedFile[] = archivosOtrosCopia.map(file => {
                    const copiedFile: ExtendedFile = new File([file], file.name, {
                      type: file.type,
                      lastModified: file.lastModified
                    }) as ExtendedFile;
                  
                    // Copiar las propiedades adicionales
                    copiedFile.nuevo = 0;
                    copiedFile.eliminado = file.eliminado;
                    copiedFile.id_archivo = file.id_archivo;
                    copiedFile.nombre = file.nombre;  // Asegúrate de copiar esta propiedad también
                  
                    return copiedFile;
                  });
        
                    // Actualizar el estado de archivosBD
                    setArchivosOtros([...updatedArchivosBD]);
                  }).catch(error => {
                      console.error('Error al enviar archivo al servidor:', error);
                  });
              }

              for (const file of filesToDelete) {
                try {
                  await eliminarArchivo(file.id_archivo);
                  console.log(`Archivo eliminado correctamente: ${file.name}`);
                } catch (error) {
                  console.error(`Error al eliminar el archivo ${file.name}:`, error);
                }
              }

              for (const file of filesToActive) {
                try {
                  await activarArchivo(file.id_archivo);
                  console.log(`Archivo activado correctamente: ${file.name}`);
                } catch (error) {
                  console.error(`Error al eliminar el archivo ${file.name}:`, error);
                }
              }

              console.log('Archivos enviados correctamente');  
            } catch (error) {
              console.error('Error al enviar archivos:', error);
            }
        }

        }  
    }; 

    async function eliminarArchivo(idArchivo: number) {
      try {
          const response = await axios.put(ServicesProperties.BaseUrl+`/eliminarArchivo?fileId=${idArchivo}`);
          return response;
      } catch (error) {
          console.error('Error al eliminar el archivo:', error);
          throw error; // Re-lanza el error para manejarlo en el lugar donde se llama a esta función
      }
    }

    async function activarArchivo(idArchivo: number) {
      try {
          const response = await axios.put(ServicesProperties.BaseUrl+`/reactivarArchivo?fileId=${idArchivo}`);
          return response;
      } catch (error) {
          console.error('Error al eliminar el archivo:', error);
          throw error; // Re-lanza el error para manejarlo en el lugar donde se llama a esta función
      }
    }

    const handleStartTimeChange = (time: Dayjs | null) => {
      if (time) {
        setStartTime(time);
        if (endTime.isBefore(time)) {
          setEndTime(time);
        }
      }
    };
  
    const handleEndTimeChange = (time: Dayjs | null) => {
      if (time) {
        setEndTime(time);
      }
    };
 
    return (
        <div className={className}>
            <div className='flex w-full flex-col justify-between h-[20%] border-custom drop-shadow-md p-4'>
                <h3 className='font-montserrat text-lg font-bold text-primary w-full'>Datos de Cita</h3>
                <div className='flex flex-col gap-2 flex-grow overflow-auto'>
                    {attributesToRender.length>0 && attributesToRender.map((item)=>(
                    <div key={`label-${item.name}`} className='flex w-full'>
                        <label className='font-montserrat text-sm w-[50%] font-bold'>{item.name}</label>
                        <p className='font-montserrat text-sm w-[50%] justify-begin font-semibold block truncate'>{item.value}</p>
                    </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-col h-[80%] border-custom drop-shadow-md p-4 flex-grow overflow-auto'>
                <div className='w-full flex items-center mb-5 '>
                    <h3 className='font-montserrat text-lg font-bold text-primary w-full'>Asistencia</h3>
                    <div className='flex items-center gap-4'>
                        <Combobox disabled={!enableAttendance} 
                        value={selectOption} name={selectOption?'Asistio':'Falto'} options= {assistanceState}
                        onChange={handleAsistencia} className='w-[150px]'/>
                        
                        {/*<Button variant='primario' onClick={handleCancelar} text={enableAttendance ? 'Cancelar' : 'Editar'}/> 
                          <div style={{ display: enableAttendance ? 'inline-block' : 'none' }}>
                            <Button variant='secundario' onClick={handleGuardar} text='Guardar' />
                          </div>*/}
                          {!enableAttendance ? (
                            <Button variant="primario" onClick={()=>setEnableAttendance(true)} text="Editar" />
                          ) : (
                            <>
                              <Button variant="secundario" onClick={handleCancelar} text="Cancelar" />
                              <Button variant="primario" onClick={handleGuardar} text="Guardar" />
                            </>
                          )}


                      </div>
                </div>
                <div className='w-full flex items-center mb-5 '>
                    <h3 className='font-montserrat text-lg font-bold text-primary w-full'>Duración Real</h3>
                    <div className='flex items-center gap-4'> 
                      <TimePicker
                        disabled={!enableAttendance} value={startTime} onChange={handleStartTimeChange}
                        placeholder="Hora de inicio" format="HH:mm" style={{ width: '150px' }} 
                      />
                      <TimePicker
                        disabled={!enableAttendance} value={endTime} onChange={handleEndTimeChange}
                        placeholder="Hora de fin" format="HH:mm" style={{ width: '150px' }} 
                        disabledHours={() => {
                          if (!startTime) {
                            return Array.from({ length: 24 }, (_, index) => index);
                          }
                          return Array.from({ length: startTime.hour() }, (_, index) => index);
                        }}
                        disabledMinutes={(selectedHour) => {
                          if (!startTime) {
                            return Array.from({ length: 60 }, (_, index) => index);
                          }
                          if (selectedHour === startTime.hour()) {
                            return Array.from({ length: startTime.minute() }, (_, index) => index);
                          }
                          return [];
                        }} 
                      />
                    </div>
                </div>
                <div className='flex flex-col w-full pb-5 '>
                    <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Comentario Para el alumno</h3>
                    <div className='w-full'>
                      <div className='relative w-full h-full'>
                        <textarea
                            name='studentAnnotations'
                            value={commentValue}
                            placeholder='Comentario visible para el alumno'
                            onChange={handleCommentChange}
                            className='w-full h-full rounded-md resize-none 
                              outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold text-gray-500'
                            disabled={true}
                        />
                        {/*Para que se esquine*/}
                        <button
                          onClick={openModalComentario}
                          className={`absolute top-2 right-2 border-custom bg-secondary text-primary p-2 rounded-full shadow-md 
                              ${enableAttendance ? 'hover:bg-blue-500 hover:text-white' : ''}`}
                          disabled={!enableAttendance}
                        >
                          <FaExpand />
                        </button>
                        <ModalComentario
                            isOpen={isModalComentario}
                            onClose={closeModalComentario}
                            commentValue={commentValue}
                            commentChange={handleCommentChange}
                            updatePage={()=>{}}
                            selectedFiles={archivosBDCopia}
                            setSelectedFiles={setArchivosBDCopia}
                        />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col w-full pb-5'>
                    <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Comentario Privado</h3>
                    <div className='w-full'>
                    <div className='relative w-full h-full'>
                      <textarea
                            name='studentAnnotations'
                            value={commentValue2}
                            placeholder='Comentario visible para el tutor'
                            onChange={handleCommentChange2}
                            className='w-full h-full rounded-md resize-none 
                              outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold text-gray-500'
                            disabled={true}
                      />
                      {/*Para que se esquine*/}
                      <button
                          onClick={openModalComentario2}
                          className={`absolute top-2 right-2 border-custom bg-secondary text-primary p-2 rounded-full shadow-md 
                              ${enableAttendance ? 'hover:bg-blue-500 hover:text-white' : ''}`}
                          disabled={!enableAttendance}
                        >
                          <FaExpand />
                        </button>
                      <ModalComentario
                          isOpen={isModalComentario2}
                          onClose={closeModalComentario2}
                          commentValue={commentValue2}
                          commentChange={handleCommentChange2}
                          updatePage={()=>{}}
                          selectedFiles={archivosOtros}
                          setSelectedFiles={setArchivosOtros}
                      />
                    </div>
                  </div>
                </div>
            </div> 
            <div>{isModalOpen && <ModalResultadoCita onClose={closeModal} />}</div>
        </div>
  )
}

export default ResultadoCitaBlock2 