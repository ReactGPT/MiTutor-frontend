import React, { useEffect, useState } from 'react'
import { useInstitucion } from '../../../store/hooks/useInstitucion';
import Institucion from '../../../store/types/Institucion';
import InputAdmin2 from '../../../components/Administrador/InputAdmin2';
import { Button } from '../../../components'
import upload from '../../../assets/upload.png'

const PageInstitucion = () => {

  const [editable, setEditable] = useState(false);
  const { institucionData, fetchInstitucionData, updateInstitucion } = useInstitucion();
  const [ institucionBorrador, setInstitucionBorrador ] = useState<Institucion>(institucionData);
  const handleEditSaveButton = () => {
    if(editable){
      if(institucionBorrador){
        updateInstitucion(institucionBorrador);
      }
    }
    setEditable(!editable);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setInstitucionBorrador((prevState) => {
      if(!prevState){
        return null;
      }
      return {
        ...prevState,
      [name]: value,
      };
    });
  };
  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-bold text-[#2F2F2F]">
        Datos Generales de la Institución
      </h1>
      
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[80%] h-full flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className='grid grid-cols-1'>
              <InputAdmin2 
                titulo="Nombre de la Institucion" 
                valor={institucionData?.name} 
                enable={editable}
                onChange={handleInputChange}/>
              <InputAdmin2 
                titulo="Dirección de la Institución" 
                valor={institucionData?.address}
                name="responsable"
                enable={editable} 
                onChange={handleInputChange}/>
              <InputAdmin2 
                titulo="Distrito de la Institución" 
                valor={institucionData?.district} 
                name="email" 
                enable={editable} 
                onChange={handleInputChange}/>
              <InputAdmin2 
                titulo="Tipo de Institución" 
                valor={institucionData?.institutionType} 
                name="siglas" 
                enable={editable}
                onChange={handleInputChange} />
            </div>
            <div className=''>
              <img src={institucionData?.logo ? institucionData?.logo : upload} alt="Logo de la Institucion" />
              <div className="flex justify-center items-center">
                <Button className="" onClick={() => {handleEditSaveButton()}} text={`${editable ? "Guardar" : "Cambiar"} Logo`} />
              </div>
            </div>
          </div>
        </div>
        <Button className="" onClick={() => {handleEditSaveButton()}} text={`${editable ? "Guardar" : "Editar"} Institución`} />
      </div>
      
    </div>
  );
};

export default PageInstitucion;