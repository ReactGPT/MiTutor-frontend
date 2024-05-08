import { useState } from 'react'
import { Button, Combobox } from '../../../components';
import { EditIcon } from '../../../assets';
import ModalDerivacion from '../../../components/Tutor/ModalDerivacion';



type InputProps = {
    className:string;
}

// const assistanceAreas = [
//   { name: 'Centro de Psicología' },
//   { name: 'Medical PUCP' },
// ]

type IAssistanceAreas = {
  id: number
  name: string
}



function ResultadoCitaBlock3({className}:InputProps) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [derivarOptions, setDerivarOptions] = useState([])
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // useEffect(()=>{

  //   const assistanceAreas:IAssistanceAreas[] = getAreas()

  //   setDerivarOptions(assistanceAreas)

  // },[]);

  return (
    <div className={className}>
        
            <div className='flex'>
              <h3 className='font-montserrat text-lg font-bold text-primary w-full'>Derivación</h3>
              <Button variant='primario' icon={EditIcon}/>
            </div>

            <div className='mb-5'>
              <span>Derivar A</span>
              <Combobox name={'Seleccione Area'} onChange={()=>{}} options={derivarOptions} className='w-[300px]'/>
            </div>


            <div className='flex flex-col w-full h-[35%] pb-5'>
                <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Motivos</h3>
                <div className='w-full h-full '>
                    <textarea placeholder='Motivos de derivación' className='w-full h-full rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold '></textarea>
                </div>
            </div>
            <div className='flex flex-col w-full h-[35%] pb-5'>
                <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Comentarios</h3>
                <div className='w-full h-full '>
                    <textarea placeholder='Comentario respecto al alumno' className='w-full h-full rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold'></textarea>
                </div>
            </div>

            <div className='flex justify-end'>
              <Button onClick={openModal} variant='call-to-action' text="Derivar" style={{'width':'180px','justifyContent':'center'}} ></Button>
            </div>
            {isModalOpen && <ModalDerivacion onClose={closeModal} />}
    </div>
  )
}

export default ResultadoCitaBlock3