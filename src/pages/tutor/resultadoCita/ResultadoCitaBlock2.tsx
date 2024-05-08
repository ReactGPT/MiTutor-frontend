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

    
    const [enableAttendance,setEnableAttendance] = useState<Boolean>(false);
    
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
        <div className='flex w-full flex-col h-[30%] border-custom drop-shadow-md p-4'>
            <h3 className='font-montserrat text-lg font-bold text-primary w-full'>Datos de Cita</h3>
            {attributesToRender.length>0 && attributesToRender.map((item,index)=>(
                <span key={`label-${index}`} className='block truncate flex flex-row gap-2 w-full mt-4'>
                    <label className='font-montserrat text-sm w-[50%] font-bold'>{item.name}</label>
                    <p className='font-montserrat text-sm w-[50%] justify-begin font-semibold block truncate'>{item.value}</p>
                </span>
            ))}
        </div>
        <div className='flex w-full flex-col h-[70%] border-custom drop-shadow-md p-4'>
            <div className='flex w-full h-[40%]'>
                Comentario Alumno
            </div>
            <div className='flex w-full h-[40%]'>
                Comentario Privado
            </div>
            <div className='w-full flex h-[20%]'>
                <Combobox disabled={!enableAttendance} text='Estado' value={null} onChange={()=>{}} options={[]} boxSize='w-[40%]'/>
                <Button  onClick={()=>{setEnableAttendance(true)}} icon={EditIcon}/>
            </div>
            
        </div>
        
    </div>
  )
}

export default ResultadoCitaBlock2