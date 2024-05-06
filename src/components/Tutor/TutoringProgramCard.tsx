import React from 'react';
import Button from '../Button';
import IconDetails from '../../assets/svg/IconDetails';
import { TutoringProgram } from '../../store/types/TutoringProgram';

type TutoringProgramCardProps = {
  data: TutoringProgram;
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
    if (color == 'Facultad de ciencias') {
      return fromClasses.yellow;
    } else if (color == 'Completado') {
      return fromClasses.blue;
    } else if (color == 'Registrado') {
      return fromClasses.green;
    } else {
      return fromClasses.green;
    }
  } else if (tipo == 'to') {
    if (color == 'Facultad de ciencias') {
      return toClasses.yellow;
    } else if (color == 'Completado') {
      return toClasses.blue;
    } else if (color == 'Registrado') {
      return toClasses.green;
    } else {
      return toClasses.green;
    }
  }
};

const TutoringProgramCard: React.FC<TutoringProgramCardProps> = ({ data }) => {
  //TODO: Agregar redireccionamiento al apretar el boton
  return (
    <div className="w-full h-[20%] border-custom shadow-custom flex bg-[rgba(235,_236,_250,_1.00)] overflow-hidden font-roboto">

      <div className="w-[5%] h-full">
        <div className={`w-[35%] h-full bg-gradient-to-b ${controlColor(data.facultyName, 'from')} ${controlColor(data.facultyName, 'to')} rounded-l-xl`}></div>
      </div>

      <div className="w-full flex p-5 gap-5 justify-between items-center">
        <div className="w-1/3">
          <span className="text-2xl text-black"> {data.programName} </span>
        </div>

        <div className="flex gap-6 items-center h-full text-center justify-between">
          <span className="text-primary w-32">{data.facultyName}</span>
          <hr className="h-full border-custom" />
          <span className="text-primary w-36"> {data.specialtyName} </span>
          <hr className="h-full border-custom" />
          <span className="text-primary w-24"> {data.tutorTypeDescription} </span>

          <Button variant='primario' onClick={() => { }} icon={IconDetails} />
        </div>
      </div>
    </div>
  );
};

export default TutoringProgramCard;