import React from 'react';
import Button from '../Button';
import IconDetails from '../../assets/svg/IconDetails';
import { programaDeTutoriaAlumno } from '../../store/types/ListTutoringProgram';
import { useNavigate } from 'react-router-dom';

type TutoringProgramCardProps = {
  data: programaDeTutoriaAlumno;
};

const TutoringProgramCardAlumno: React.FC<TutoringProgramCardProps> = ({ data }) => {
  const navigate = useNavigate();

  const goToProgramDetails = () => {
    navigate("/programasDeTutoria/detalle-programa", { state: { data } });
  };

  return (
    <div className="w-full h-24 border-custom shadow-custom flex bg-[rgba(235,_236,_250,_1.00)] overflow-hidden font-roboto">
      {(data.tutorType == "TUTOR FIJO SOLICITADO" || data.tutorType == "TUTOR FIJO ASIGNADO") && <div className="bg-blue-400 w-[2%] max-w-6" />}
      {data.tutorType == "TUTOR VARIABLE" && <div className="bg-green-400 w-[2%] max-w-6" />}

      <div className="w-full flex p-5 gap-5 justify-between items-center">
        <div className="w-1/3">
          <span className="text-2xl text-black"> {data.programName} </span>
        </div>

        <div className="flex gap-6 items-center h-full text-center justify-between">
          <span className="text-primary w-32">{data.facultyName}</span>
          <hr className="h-full border-custom" />
          <span className="text-primary w-36"> {data.specialtyName ? data.specialtyName : "General"} </span>
          <hr className="h-full border-custom" />
          <span className="text-primary w-24">{data.tutorType}</span>

          <Button variant='primario' onClick={goToProgramDetails} icon={IconDetails} />
        </div>
      </div>
    </div>
  );
};

export default TutoringProgramCardAlumno;