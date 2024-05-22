import React, { useEffect, useState } from 'react'

import { Appointment } from '../../../store/types/Appointment';
import { Button, Combobox } from '../../../components';
import { EditIcon, SaveIcon, CloseIcon} from '../../../assets';
import axios from 'axios'; 
axios.defaults.headers.common['Access-Control-Allow-Origin'];
import ModalResultadoCita from '../../../components/Tutor/ModalResultadoCita'; 
import { InitialData } from '../../../store/types/AppointmentResult';
import { ListCita } from '../../../store/types/ListCita';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useResultadoCita, useUpdateResultadoCita, useUpdateComentario } from "../../../store/hooks/useResultadoCita";

type InputProps = {
    className:string;
    cita:ListCita;
    onChangeCita:(name:string,value:any)=>void;
}

function ResultadoCitaBlock2({className,cita,onChangeCita}:InputProps) {
    const { resultadoCita, fetchResultadoCita } = useResultadoCita(cita);

    useEffect(() => {
      fetchResultadoCita();
    }, []);
      
    const [isModalOpen, setIsModalOpen] = useState(false); 
    
    const openModal = () => {
      setIsModalOpen(true);
    };
    
    const closeModal = () => {
      setIsModalOpen(false);
    };
   
    /*Habilitar comentarios,asistencia,duracion*/    
    const [enableAttendance,setEnableAttendance] = useState<boolean>(false);

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
            name:"Programa de Tutoria",
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
        if (resultadoCita && resultadoCita.appointmentResult && resultadoCita.appointmentResult.comments.length > 0) {
            setCommentValue2(resultadoCita.appointmentResult.comments[1].message);
            setCommentValue(resultadoCita.appointmentResult.comments[0].message); 
            setSelectOption(resultadoCita.appointmentResult.asistio);
            setStartTime(dayjs(resultadoCita.appointmentResult.startTime, 'HH:mm:ss')); 
            setEndTime(dayjs(resultadoCita.appointmentResult.endTime, 'HH:mm:ss')); 
        }
    }, [resultadoCita]);
 
    //Onchange
    const handleCommentChange = (e) => {
        const { value } = e.target;
        setCommentValue(value);
    };
    const handleCommentChange2 = (e) => {
        const { value } = e.target;
        setCommentValue2(value);
    };
    const handleAsistencia=(e)=>{ 
        setSelectOption(e.name == 'Asistio'); 
    } 
    const handleGuardar = () => {
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
        }  
    }; 
    const handleCancelar = () => {
        setEnableAttendance(!enableAttendance); 
        if (resultadoCita && resultadoCita.appointmentResult) {
          setCommentValue2(resultadoCita.appointmentResult.comments[1].message);
          setCommentValue(resultadoCita.appointmentResult.comments[0].message); 
          setSelectOption(resultadoCita.appointmentResult.asistio);
          setStartTime(dayjs(resultadoCita.appointmentResult.startTime, 'HH:mm:ss')); 
          setEndTime(dayjs(resultadoCita.appointmentResult.endTime, 'HH:mm:ss')); 
      }
    }; 
    const handleStartTimeChange = (time) => {
      setStartTime(time);  
      setEndTime(endTime < time ? null : endTime);
    }; 
    const handleEndTimeChange = (time) => {
      setEndTime(time);
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
                        
                        <Button variant='primario' onClick={handleCancelar} text={enableAttendance ? 'Cancelar' : 'Editar'} icon={!enableAttendance? EditIcon: 'none'}/> 
                          <div style={{ display: enableAttendance ? 'inline-block' : 'none' }}>
                            <Button variant='secundario' onClick={handleGuardar} text='Guardar' />
                          </div>
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