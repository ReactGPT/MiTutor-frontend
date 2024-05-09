import React, { useEffect, useState } from 'react'

import { Appointment } from '../../../store/types'
import { Button, Combobox } from '../../../components';
import { EditIcon } from '../../../assets';




type InputProps = {
    className:string;
    cita:Appointment;
    onChangeCita:(name:string,value:any)=>void;
}


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
    useEffect(()=>{
        setEnableAttendance(false);
    },[])
  return (
    <div className={className}>
        <div className='flex w-full flex-col justify-between h-[30%] border-custom drop-shadow-md p-4'>
            <h3 className='font-montserrat text-lg font-bold text-primary w-full'>Datos de Cita</h3>
            <div className='flex flex-col gap-2'>
                {attributesToRender.length>0 && attributesToRender.map((item)=>(
                    <div key={`label-${item.name}`} className='flex w-full'>
                        <label className='font-montserrat text-sm w-[50%] font-bold'>{item.name}</label>
                        <p className='font-montserrat text-sm w-[50%] justify-begin font-semibold block truncate'>{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className='flex flex-col h-[70%] border-custom drop-shadow-md p-4'>
        <div className='w-full flex items-center mb-5'>
                <h3 className='font-montserrat text-lg font-bold text-primary w-full'>Asistencia</h3>
                <div className='flex gap-4'>
                    <Combobox disabled={!enableAttendance} name={'Estado'} onChange={()=>{}} options={assistanceState} className='w-[150px]'/>
                    <Button variant='primario' onClick={()=>{setEnableAttendance(true)}} icon={EditIcon}/>
                </div>
            </div>
            <div className='flex flex-col w-full h-[40%] pb-5'>
                <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Comentario Alumno</h3>
                <div className='w-full h-full '>
                    <textarea name='studentAnnotations'value={cita.studentAnnotations} placeholder='Comentario respecto al alumno' onChange={(e)=>{
                      const {name,value} = e.target;
                      onChangeCita(name,value);
                    }}className='w-full h-full rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold '></textarea>
                </div>
            </div>
            <div className='flex flex-col w-full h-[40%] pb-5'>
                <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Comentario Privado</h3>
                <div className='w-full h-full '>
                    <textarea name='privateAnnotation'value={cita.privateAnnotation} placeholder='Comentario respecto al alumno' onChange={(e)=>{
                      const {name,value} = e.target;
                      onChangeCita(name,value);}} className='w-full h-full rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold'></textarea>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ResultadoCitaBlock2