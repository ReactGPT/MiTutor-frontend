import React, { useEffect, useState } from 'react'
import { useInstitucion } from '../../../store/hooks/useInstitucion';
import Institucion from '../../../store/types/Institucion';
import InputAdmin2 from '../../../components/Administrador/InputAdmin2';
import { Button } from '../../../components'
import upload from '../../../assets/upload.png'

const nuevaInstitucion: Institucion = {
  institutionId: 0,
  name: "",
  address: "",
  district: "",
  institutionType: "",
  logo: "",
}

const PageInstitucion = () => {

  const [editable, setEditable] = useState(false);
  const { institucionData, fetchInstitucionData, updateInstitucion } = useInstitucion();
  const [ institucionBorrador, setInstitucionBorrador ] = useState<Institucion | null>(institucionData[0]);

  // console.log("institucionData 0",institucionData[0]);
  // console.log("institucionData 1",institucionData[1]);
  // console.log("institucionData 2",institucionData[2]);
  useEffect(() => {
    fetchInstitucionData();
  }, []);

  useEffect(() => {
    if (institucionData.length > 0) {
      setInstitucionBorrador(institucionData[0]);
    }
  }, [institucionData]);
  
  const handleEditSaveButton = () => {
    if(editable){
      if(institucionBorrador){
        updateInstitucion(institucionBorrador);
        // console.log("institucionBorrador",institucionBorrador);
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

  const handleEditLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file",file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInstitucionBorrador((prevState) => {
          if (!prevState) {
            prevState = nuevaInstitucion;
          }
          return {
            ...prevState,
            logo: reader.result as string,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-full">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold text-[#2F2F2F]">
          {institucionBorrador?.name ? institucionBorrador?.name : institucionData[0]?.name}
        </h1>
        <Button className="" onClick={() => {handleEditSaveButton()}} text={`${editable ? "Guardar" : "Editar"} Institución`} />
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[80%] h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#2F2F2F]">Información de la Institución</h2>
          <div className="grid grid-cols-1 gap-4 p-4">
            <div className='grid grid-cols-1'>
              <InputAdmin2 
                titulo="Nombre de la Institucion" 
                valor={institucionBorrador?.name ? institucionBorrador?.name : institucionData[0]?.name} 
                enable={editable}
                name="name"
                onChange={handleInputChange}/>
              <InputAdmin2 
                titulo="Dirección de la Institución" 
                valor={institucionBorrador?.address ? institucionBorrador?.address :
                  institucionData[0]?.address}
                name="address"
                enable={editable} 
                onChange={handleInputChange}/>
              <InputAdmin2 
                titulo="Distrito de la Institución" 
                valor={institucionBorrador?.district ? institucionBorrador?.district : institucionData[0]?.district} 
                name="district" 
                enable={editable} 
                onChange={handleInputChange}/>
              <InputAdmin2 
                titulo="Tipo de Institución" 
                valor={institucionBorrador?.institutionType ? institucionBorrador?.institutionType :
                  institucionData[0]?.institutionType} 
                name="institutionType" 
                enable={editable}
                onChange={handleInputChange} />
            </div>
            {/* <div className='flex flex-col justify-between items-center'>
              <img 
                src={institucionBorrador?.logo ? institucionBorrador?.logo :
                  (institucionData[0]?.logo ? institucionData[0]?.logo : upload)} 
                alt="Logo de la Institucion" 
                className="mb-4 max-w-full h-auto max-h-80" 
                key={institucionData[0]?.logo} />
              <div className="flex justify-center items-center">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleEditLogo}
                  className="hidden"
                  id="logo-upload"
                  disabled={!editable}
                />
                <label 
                  htmlFor="logo-upload"
                  className={`flex items-center justify-between h-[42px] gap-2 px-3 py-2 shadow-custom rounded-xl font-roboto text-sm font-medium transition-all duration-200 ease-linear border-custom bg-secondary text-primary ${editable ? 'hover:bg-primary hover:text-white cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                >
                Cambiar Logo
                </label>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageInstitucion;