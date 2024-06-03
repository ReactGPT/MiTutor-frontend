import React from "react";
import Button from "../Button";
import IconDetails from '../../assets/svg/IconDetails'; 
import { useNavigate } from "react-router-dom";  
import { ListDerivation } from "../../store/types/Derivation";
import { useEffect, useState, ChangeEvent} from 'react';
import DerivationModalDetalle from "./DerivationModalDetalle";
interface AppointmentItemDerivProps {
  nombre: string;
  codigo: string;
  unidad: string;
  programa: string;
  fecha: string;
  status:string;
  onClick: () => void;
  color: string;
  derivation: ListDerivation
}

const textClasses = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500'
};

const fromClasses = {
  red: 'from-red-500',
  blue: 'from-blue-500',
  green: 'from-green-500',
  yellow: 'from-yellow-500'
};

const toClasses = {
  red: 'to-[#6A2A2A]',
  blue: 'to-[#123C7F]',
  green: 'to-[#2A6A3C]',
  yellow: 'to-[#7E631C]'
};

const controlColor = (color: string, tipo: string) => {
  if (tipo == 'from') {
    if (color == 'Solicitado') {
      return fromClasses.yellow;
    } else if (color == 'Completado') {
      return fromClasses.blue;
    } else if (color == 'Registrado') {
      return fromClasses.green;
    }else if (color == 'Pendiente') {
      return fromClasses.red;
    } else {
      return fromClasses.green;
    }
  } else if (tipo == 'text') {
    if (color == 'Solicitado') {
      return textClasses.yellow;
    } else if (color == 'Completado') {
      return textClasses.blue;
    } else if (color == 'Registrado') {
      return textClasses.green;
    }else if (color == 'Pendiente') {
      return textClasses.red;
    } else {
      return textClasses.green;
    }
  } else if (tipo == 'to') {
    if (color == 'Solicitado') {
      return toClasses.yellow;
    } else if (color == 'Completado') {
      return toClasses.blue;
    } else if (color == 'Registrado') {
      return toClasses.green;
    }else if (color == 'Pendiente') {
      return toClasses.red;
    } else {
      return toClasses.green;
    }
  }
};

export const AppointmentItemDeriv: React.FC<AppointmentItemDerivProps> = ({ derivation, nombre, codigo, unidad, programa, fecha, status,onClick, color }) => {
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleGuardar = async () => {
      setIsModalOpen(!isModalOpen);  
  }
  return (
    <div className="w-full h-22 border-custom shadow-custom flex bg-[rgba(235,_236,_250,_1.00)] overflow-hidden font-roboto">
      <div className={`w-[2%] max-w-6 bg-gradient-to-b ${controlColor(status, 'from')} ${controlColor(status, 'to')}`}></div>

      <div className="w-full flex p-5 gap-5 items-center">
        <div className="w-1/3 flex flex-col">
          <span className="text-xl text-black">{nombre}</span>
          <span className={`font-semibold ${controlColor(status, 'text')}`}>{codigo}</span>
        </div>

        <div className="flex flex-grow items-center">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-start max-w-[200px] w-[200px] truncate">
              <span className="text-black font-semibold">Unidad:</span>
              <span className={`font-semibold ${controlColor(status, 'text')} truncate`}>{unidad}</span>
            </div>
            <hr className="h-6 border-custom mx-2" />
            <div className="flex flex-col items-start max-w-[200px] w-[200px] truncate">
              <span className="text-black font-semibold">Programa de Tutoría:</span>
              <span className="text-primary truncate">{`${programa}`}</span>
            </div>
            <hr className="h-6 border-custom mx-2" />
            <div className="flex flex-col items-start max-w-[150px] w-[150px] truncate">
              <span className="text-black font-semibold">Fecha:</span>
              <span className="text-primary truncate">{`${fecha}`}</span>
            </div>
          </div>
        </div> 
          <Button variant='primario' onClick={handleGuardar} icon={IconDetails} />
          <div>{isModalOpen && <DerivationModalDetalle onClose={closeModal} derivation={derivation}/>}</div>
      </div>
    </div>
  )
};


export default AppointmentItemDeriv;
