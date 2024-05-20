import { useState } from 'react'
import { Button, Combobox } from '../../../components';
import { EditIcon } from '../../../assets';
import ModalDerivacion from '../../../components/Tutor/ModalDerivacion';
import { Appointment } from '../../../store/types';



type InputProps = {
    className:string;
    cita:Appointment;
    onChange:(name:string,value:any)=>void;
}

// const assistanceAreas = [
//   { name: 'Centro de Psicología' },
//   { name: 'Medical PUCP' },
// ]

type IAssistanceAreas = {
  id: number
  name: string
}



function ResultadoCitaBlock3({className,cita,onChange}:InputProps) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [derivarOptions, setDerivarOptions] = useState([])
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className={className}> 
            <div className='h-full flex flex-col flex-grow overflow-auto'>
              <div className='flex'>
                <h3 className='font-montserrat text-lg font-bold text-primary w-full'>Derivación</h3>
                <Button variant='primario' icon={EditIcon}/>
              </div>
               
            <div className='mb-5'>
              <span>Derivar A</span>
              <Combobox name={'Seleccione Area'} onChange={()=>{}} options={derivarOptions} className='w-[300px]'/>
            </div>
 
            <div className='flex flex-col w-full h-full pb-5'>
                <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Motivos</h3>
                <div className='w-full h-full '>
                    <textarea name='reason'value={cita.derivation?.reason} placeholder='Motivos de derivación' onChange={(e)=>{
                      const {name,value} = e.target;
                      const derivation = {...cita.derivation};
                      onChange('derivation',{...derivation,
                        [name]:value
                      });
                    }} className='w-full h-[100px] min-h-[100px] rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold'></textarea>
                    </div>
            </div>
            <div className='flex flex-col w-full h-full pb-5'>
                <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Comentarios</h3>
                <div className='w-full h-full '>
                    <textarea name='comment' value={cita.derivation?.comment} placeholder='Comentario respecto al alumno' onChange={(e)=>{
                      const {name,value} = e.target;
                      const derivation = {...cita.derivation};
                      onChange('derivation',{...derivation,
                        [name]:value
                      });
                    }} className='w-full h-[100px] min-h-[100px] rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold'></textarea>
                  </div>
            </div> 

            <div className='flex justify-end h-full'>
              <Button onClick={openModal} variant='call-to-action' text="Derivar" style={{'width':'180px','justifyContent':'center'}} ></Button>
            </div>
            {isModalOpen && <ModalDerivacion onClose={closeModal} />}
            </div>
    </div>
  )
}

export default ResultadoCitaBlock3