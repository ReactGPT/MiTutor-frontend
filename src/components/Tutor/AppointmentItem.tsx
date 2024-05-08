import React from "react";
import Button from "../Button";
import IconDetails from '../../assets/svg/IconDetails';

interface AppointmentItemProps {
  nombre: string;
  codigo: string;
  estado: string;
  fecha: string;
  onClick: () => void;
  color: string;
  alumno?: string;
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

export const AppointmentItem: React.FC<AppointmentItemProps> = ({ nombre, codigo, estado, fecha, onClick, color, alumno = null }) => {

  return (
    <div className="w-full h-[20%]">
      <div className="w-full h-[90%] flex flex-row justify-right items-center bg-[rgba(235,_236,_250,_1.00)] border-custom drop-shadow-md">
        
        <div className="w-[5%] h-full">
          <div className={`w-[50%] h-full bg-gradient-to-b ${controlColor(color, 'from')} ${controlColor(color, 'to')} rounded-l-xl`}></div>
        </div>

        <div className="w-[50%] my-5">
          <div className="w-full h-[50%] ">
            <span className="font-montserrat text-2xl text-black"> {nombre} </span>
          </div>
          <div className="w-full h-[50%]">
            <span className="font-montserrat text-xl text-gray-600"> Codigo: {codigo} </span>
          </div>
        </div>

        <div className="w-[50%] flex">
          <pre className="font-montserrat text-2xl text-black">Estado:  </pre>
          <span className={`font-montserrat text-2xl ${controlColor(color, 'text')}`}>{estado}</span>
        </div>

        {alumno && <div className="w-[50%] flex">
          <pre className="font-montserrat text-2xl text-black">Participante:  </pre>
          <span className="font-montserrat text-2xl">{alumno}</span>
        </div>}

        <div className="w-[50%]">
          <span className="font-montserrat text-2xl text-black"> Fecha: {fecha} </span>
        </div>

        <div className="m-5">
          <Button variant="primario" onClick={onClick} icon={IconDetails}/>
        </div>

      </div>
    </div>
  );
};


export default AppointmentItem;
