import React, { useEffect, useState } from 'react'

import { Appointment } from '../../../store/types'
import { Button, Combobox } from '../../../components';
import { EditIcon, SaveIcon, CloseIcon} from '../../../assets';
import axios from 'axios'; 
axios.defaults.headers.common['Access-Control-Allow-Origin'];
import ModalResultadoCita from '../../../components/Tutor/ModalResultadoCita'; 
import { InitialData } from '../../../store/types/AppointmentResult';


type InputProps = {
    className:string;
    cita:Appointment;
    onChangeCita:(name:string,value:any)=>void;
}

const guardarDatos = async (cita: Appointment) => {
    try {
        const newData = { 
                "appointmentResult": {
                  "appointmentResultId": 0,
                  "asistio": true,
                  "isActive": true,
                  "comments": [
                    {
                      "commentId": 0,
                      "message": cita.studentAnnotations,
                      "isActive": true,
                      "appointmentResultId": 0,
                      "privacyTypeId": 1
                    },
                    {
                      "commentId": 0,
                      "message": cita.privateAnnotation,
                      "isActive": true,
                      "appointmentResultId": 0,
                      "privacyTypeId": 2
                    }
                  ]
                },
                "studentId": 2,
                "tutoringProgramId": 4,
                "appointmentId": 27 
        };
  
      const response = await axios.post('https://localhost:44369/agregarResultadoCita', newData);
      console.log('Registro Resultados:', response.data);  
    } catch (error) {
      console.error('Error al crear al registrar resultado:', error);
    }
  };


  
function ResultadoCitaBlock2({className,cita,onChangeCita}:InputProps) {
    const [resultadoCita, setResultadoCita] = useState<InitialData | null>(null);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:44369/consultarResultadoCita?appointmentId=27&studentId=2&tutoringProgramId=4');
            setResultadoCita(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        console.log("okey se logro", resultadoCita?.appointmentResult?.asistio);
    }, [resultadoCita]);
    
    const actualizarCita = async (cita:InitialData) => {
        try {
            const response = await fetch(`https://localhost:44369/actualizarResultadoCita?id_appointmentResult=${cita.appointmentResult.appointmentResultId}&asistio=${cita.appointmentResult.asistio}`, {
              method: 'PUT', // Método de solicitud HTTP 
            });
        
            if (!response.ok) {
              throw new Error('Error al actualizar la cita');
            }
        
            // Si la solicitud es exitosa, puedes manejar la respuesta aquí si es necesario
            const resultadoCitaActualizado = await response.json();
            console.log('Cita actualizada:', resultadoCitaActualizado);
        
            // También puedes llamar a tu función para manejar el resultado de la cita actualizada aquí
            // actualizarCita(resultadoCitaActualizado);
          } catch (error) {
            console.error('Error:', error);
            // Maneja cualquier error aquí
          }
      }; 
    
      const actualizarComentario = async (cita:InitialData) => {
        
        try {
            const response = await fetch(`https://localhost:44369/actualizarComentarioxID?id_comment=${cita.appointmentResult.comments[0].commentId}&message=${cita.appointmentResult.comments[0].message}`, {
            
            method: 'PUT', // Método de solicitud HTTP 
            });

            const response2 = await fetch(`https://localhost:44369/actualizarComentarioxID?id_comment=${cita.appointmentResult.comments[1].commentId}&message=${cita.appointmentResult.comments[1].message}`, {
            
            method: 'PUT', // Método de solicitud HTTP 
            });  

        
            if (!response.ok) {
              throw new Error('Error al actualizar el comentario');
            }
        
            // Si la solicitud es exitosa, puedes manejar la respuesta aquí si es necesario
            const resultadoCitaActualizado = await response.json();
            console.log('comenatario:', resultadoCitaActualizado);
        
            // También puedes llamar a tu función para manejar el resultado de la cita actualizada aquí
            // actualizarCita(resultadoCitaActualizado);
          } catch (error) {
            console.error('Error:', error);
            // Maneja cualquier error aquí
          }
      }; 
    

    const [isModalOpen, setIsModalOpen] = useState(false); 
    
    const openModal = () => {
      setIsModalOpen(true);
    };
    
    const closeModal = () => {
      setIsModalOpen(false);
    };
   
    const [enableAttendance,setEnableAttendance] = useState<boolean>(false);

    const assistanceState = [
        { name: 'Asistio' },
        { name: 'Falto' },
      ]
    
    const attributesToRender =[
        {
            name:"Fecha",
            value:cita?.date
        },
        {
            name:"Modalidad",
            value:cita?.isInPerson?"Presencial":"Virtual"
        },
        {
            name:"Hora",
            value:cita?.startTime+" - "+cita?.endTime
        },
        {
            name:"Motivo",
            value:cita?.reason
        },
        {
            name:"Programa de Tutoria",
            value:cita?.studentProgramName
        }
    ] 
     
     
    const [commentValue, setCommentValue] = useState('');
    const [commentValue2, setCommentValue2] = useState('');
    const [selectOption, setSelectOption] = useState(resultadoCita?.appointmentResult.asistio);
 
    useEffect(() => {
        if (resultadoCita && resultadoCita.appointmentResult && resultadoCita.appointmentResult.comments.length > 0) {
            setCommentValue2(resultadoCita.appointmentResult.comments[1].message);
            setCommentValue(resultadoCita.appointmentResult.comments[0].message);
            setSelectOption(resultadoCita.appointmentResult.asistio);
        }
    }, [resultadoCita]);
 

    const handleCommentChange = (e) => {
        const { value } = e.target;
        setCommentValue(value);
    };
    const handleCommentChange2 = (e) => {
        const { value } = e.target;
        setCommentValue2(value);
    };

    const handleGuardar = () => {
        setIsModalOpen(!isModalOpen); 
        setEnableAttendance(!enableAttendance);
        if (resultadoCita && resultadoCita.appointmentResult && resultadoCita.appointmentResult.comments[0]) {
            resultadoCita.appointmentResult.comments[0].message = commentValue ?? '';
            resultadoCita.appointmentResult.comments[1].message = commentValue2 ?? '';
            resultadoCita.appointmentResult.asistio=selectOption ?? false;
            actualizarComentario(resultadoCita); 
        } 
        actualizarCita(resultadoCita);//updates 
    };
    
    const handleCancelar = () => {
        setEnableAttendance(!enableAttendance);
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
                        value={selectOption} // Mostrar la opción seleccionada según el valor de selectOption
                        name={selectOption?'Asistio':'Falto'}
                        onChange={(selectedValue) => setSelectOption((selectedValue=='Asistio'?true:false)||(selectedValue=='Falto'?true:false))} options={assistanceState} className='w-[150px]'/>
                        
                        <Button variant='primario' onClick={handleCancelar} text={enableAttendance ? 'Cancelar' : 'Editar'} icon={!enableAttendance? EditIcon: 'none'}/> 
                        <Button variant='secundario' onClick={handleGuardar}  text='Guardar' style={{ display: !enableAttendance ? 'none' : 'inline-block' }} />
                    </div>
                </div>
                <div className='flex flex-col w-full pb-5 '>
                    <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Comentario Alumno</h3>
                    <div className='w-full'>
                    <textarea
                        name='studentAnnotations'
                        value={commentValue}
                        placeholder='Comentario visible para el alumno'
                        onChange={handleCommentChange}
                        className='w-full h-full rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold'
                        disabled={!enableAttendance}
                    />
                    </div>
                </div>
                <div className='flex flex-col w-full pb-5'>
                    <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Comentario Privado</h3>
                    <div className='w-full'>
                    <textarea
                        name='studentAnnotations'
                        value={commentValue2}
                        placeholder='Comentario visible para el alumno'
                        onChange={handleCommentChange2}
                        className='w-full h-full rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold'
                        disabled={!enableAttendance}
                    />
                    </div>
                </div>
            </div> 
            <div>{isModalOpen && <ModalResultadoCita onClose={closeModal} />}</div>
        </div>
  )
}

export default ResultadoCitaBlock2 