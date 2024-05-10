import React, { useEffect, useState } from 'react'

import { Appointment } from '../../../store/types'
import { Button, Combobox } from '../../../components';
import { EditIcon, SaveIcon, CloseIcon} from '../../../assets';
import axios from 'axios'; 
axios.defaults.headers.common['Access-Control-Allow-Origin'];

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

    const [enableAttendance,setEnableAttendance] = useState<boolean>(false);

    const assistanceState = [
        { name: 'Asistió' },
        { name: 'Faltó' },
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
    //USA EL ONCHANGECITA PARA CAMBIAR UN ATRIBUTO DE CITA
    /*
    por ejemplo : 
    onChangeCita("studentAnnotation","No hizo la tarea de la sesion anterior");
    Con eso cambias el atributo studentAnnotation a lo que sea que le pases.
    */
     
    const TextAreaHabilitados = () => {
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
                    <Combobox disabled={!enableAttendance} name={'Estado'} onChange={()=>{}} options={assistanceState} className='w-[150px]'/>
                    
                    <Button variant='primario' onClick={TextAreaHabilitados} text={enableAttendance ? 'Cancelar' : 'Editar'} icon={!enableAttendance? EditIcon: 'none'}/> 
                    <Button
                        variant='secundario' // O el variant que prefieras para el botón de cancelar
                        onClick={TextAreaHabilitados} // Toggle para cancelar la edición
                        text='Guardar' 
                        style={{ display: !enableAttendance ? 'none' : 'inline-block' }} // Mostrar solo cuando no esté en modo de edición
                    />
                </div>
            </div>
            <div className='flex flex-col w-full pb-5 '>
                <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Comentario Alumno</h3>
                <div className='w-full'>
                    <textarea name='studentAnnotations' value={cita.studentAnnotations} placeholder='Comentario respecto al alumno' onChange={(e)=>{
                        const {name, value} = e.target;
                        onChangeCita(name, value);
                    }} className='w-full h-full rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold'
                    disabled={!enableAttendance}></textarea>
                </div>
            </div>
            <div className='flex flex-col w-full pb-5'>
                <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Comentario Privado</h3>
                <div className='w-full'>
                    <textarea name='privateAnnotation' value={cita.privateAnnotation} placeholder='Comentario respecto al alumno' onChange={(e)=>{
                        const {name, value} = e.target;
                        onChangeCita(name, value);
                    }} className='w-full h-full rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold'
                        disabled={!enableAttendance}> 
                    </textarea>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ResultadoCitaBlock2
//<Button variant='primario' onClick={() => guardarDatos(cita)} icon={SaveIcon} text="Guardar"/>