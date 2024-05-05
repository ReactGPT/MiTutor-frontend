import React from 'react';
import Button from '../Button';
import IconDetails from '../../assets/svg/IconDetails';
import { TutoringProgram } from '../../store/types/TutoringProgram';

type TutoringProgramCardProps = {
  data: TutoringProgram;
};

const TutoringProgramCard: React.FC<TutoringProgramCardProps> = ({ data }) => {
  //TODO: Agregar redireccionamiento al apretar el boton
  return (
    <div className="border-custom shadow-custom flex min-h-28 bg-[rgba(235,_236,_250,_1.00)] overflow-hidden font-roboto">
      <div className="bg-green-500 w-[20px]" />

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