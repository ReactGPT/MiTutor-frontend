import React from 'react';
import Button from '../Button';
import IconDetails from '../../assets/svg/IconDetails';
import { ActionPlan } from '../../store/types/ActionPlan';
import { useNavigate } from "react-router-dom";


type CardPlanAccionProps = {
  data: ActionPlan;
};

const CardPlanAccion: React.FC<CardPlanAccionProps> = ({ data }) => {
  const navigate = useNavigate();


  // Función para navegar a la página de detalles con el ID dado
  const toDetail = (id: any) => {
    console.log(id, 'id')
    navigate('/detallePlanAccion', {state: {id: id}});
    //console.log('navegando a detalle de plan de acción con id: ', id);
  };

  //TODO: Agregar redireccionamiento al apretar el boton
  return (
    <div className="border-custom shadow-custom flex h-21 bg-[rgba(235,_236,_250,_1.00)] overflow-hidden font-roboto">
      <div className={`${data.isActive ? 'bg-green-700' : 'bg-red-700'} w-[20px]`} />

      <div className="w-full flex p-5 gap-5 justify-between items-center">
        <div className="w-1/3">
          <span className="text-2xl text-black"> {data.name} </span>
        </div>

        <div className="flex gap-6 items-center h-full text-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-black font-semibold">Fecha creación:</span>
            <span className="text-primary">{new Date(data.creationDate).toLocaleDateString()}</span>
          </div>
          <hr className="h-full border-custom" />
          <div className="flex flex-col items-start">
            <span className="text-black font-semibold">Fecha de última modificación</span>
            <span className="text-primary">{new Date(data.modificationDate).toLocaleDateString()}</span>
          </div>
          <hr className="h-full border-custom" />
          <span className={`text-primary w-24 rounded-full ${data.isActive ? 'bg-green-700' : 'bg-red-700'} text-white`}> {data.isActive ? 'Activo' : 'Inactivo'} </span>


          <Button variant='primario' onClick={() => { toDetail(data.actionPlanId) }} icon={IconDetails} />
        </div>
      </div>
    </div>
  );
};

export default CardPlanAccion;