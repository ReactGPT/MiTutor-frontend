import IconBack from "../../assets/svg/IconBack";
import IconBell from "../../assets/svg/IconBell";
import { useTitle } from "../../context/TitleContext";
import { useNavigate } from "react-router-dom";
import Notifications from "../Notifications";
import { Notification } from "../../store/types/Notification";
import React from 'react';

const lista : Notification[] = [
  {
    resumen: "Solicitud de tutor rechazada",
    descripcion: "Su solicitud con carlos diaz fue rechazada.",
    tipo: "negativo"
  },
  {
    resumen: "Nueva cita registrada",
    descripcion: "Carlos Fernandez ha registrado una ueva cita para el dia 15/04.",
    tipo: "positivo"
  },
  {
    resumen: "Una cita fue cancelada",
    descripcion: "Su cita con Carlos Diaz para el dia 15/06 fue rechazada.",
    tipo: "negativo"
  }
];


const Header: React.FC = () => {
  const navigate = useNavigate();
  const { title } = useTitle();
  const handleOnClickBack = ()=>{
    navigate(-1);
  }
  return (
    <div className="w-full h-full flex flex-row justify-between items-center bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md p-5">
      <div className="flex items-center justify-center">          
        <button onClick={handleOnClickBack} className="bg-white text-primary rounded-full p-2.5 size-13">
          <IconBack size={6} />
        </button>
      </div>

      <span className="font-montserrat text-4xl font-bold text-primary">{title}</span>

      <div className="flex items-center justify-center">
        <Notifications notificaciones={lista}/>
      </div>
    </div>
  );
};

export default Header;