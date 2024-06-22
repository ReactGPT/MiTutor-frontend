import { useLocation } from 'react-router-dom';
import { Button } from '../../../components';
import { actualizarEspecialidad } from '../../../store/services/actualizarEspecialidad';
import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import ModalError from "../../../components/ModalError";
import ModalSuccess from "../../../components/ModalSuccess";
import AsignarResponsable from "./AsignarResponsable";
import ModalConfirmation from '../../../components/ModalConfirmation';

const EspecialidadSingular = () => {
  const [editable, setEditable] = React.useState(false);
  const { state } = useLocation();
  const { especialidadEspecifica } = state;

  const [name, setName] = React.useState(especialidadEspecifica?.name);
  const [acronym, setAcronym] = React.useState(especialidadEspecifica?.acronym);
  const [isActive, setIsActive] = React.useState(especialidadEspecifica?.IsActive);
  const [isOpenAsignarResponsable, setIsOpenAsignarResponsable] = React.useState(false);
  const [responsable, setResponsable] = useState("");
  const [correoResponsable, setCorreoResponsable] = useState("");
  const [responsableId, setResponsableId] = useState(-1);

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className='flex gap-2 items-center justify-between'>
        <span className='text-3xl text-primary font-bold'>
          {especialidadEspecifica?.name}
        </span>
        {editable ? <Button text='Guardar' onClick={async () => {

          if (!editable) {
            setEditable(true);
            return;
          }
          await actualizarEspecialidad({
            SpecialtyId: especialidadEspecifica?.specialtyId,
            Name: name,
            Acronym: acronym,
            IsActive: isActive,
            SpecialtyManager: { Id: responsableId },
          });
          console.log("Updated!");
          setEditable(false);
          console.log('Actualizado!');
        }} className='rounded-2xl ' /> : <Button text='Editar' onClick={() => { setEditable(true); }} className='rounded-2xl ' />}
      </div>
      <div className='w-full h-full flex items-start justify-center'>
        <div className='w-3/4 flex flex-col gap-5'>
          <div className='grid-cols-2 grid gap-4 max-w-[700px]'>
            <label className='text-lg text-gray-500'>Siglas</label>
            <input
              onChange={(e) => {
                setAcronym(e.target.value);
              }}
              disabled={!editable} type="text" placeholder='Siglas' value={acronym} className={`grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 ${!editable ? 'bg-blue-100' : ''}`} />
          </div>
          <div className='grid-cols-2 grid gap-4 max-w-[700px]'>
            <label className='text-lg text-gray-500'>Nombre especialidad</label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              disabled={!editable} type="text" placeholder='Siglas' value={name} className={`grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 ${!editable ? 'bg-blue-100' : ''}`} />
          </div>
          <div className='grid-cols-2 grid gap-4 max-w-[700px]'>
            <label className='text-lg text-gray-500'>Responsable</label>
            <div className='flex justify-between align-center gap-2'>
              <input
                disabled
                type="text"
                placeholder='Responsable'
                value={
                  responsable
                    ? responsable
                    : especialidadEspecifica?.specialtyManager?.persona?.name && especialidadEspecifica?.specialtyManager?.persona?.lastName
                      ? `${especialidadEspecifica.specialtyManager.persona.name} ${especialidadEspecifica.specialtyManager.persona.lastName}`
                      : "-"
                }
                className="grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 bg-blue-100"
              />
              <button
                className="rounded-lg bg-secondary shadow p-2 "
                onClick={() => {
                  setIsOpenAsignarResponsable(true);
                }}
                disabled={!editable}
              >
                <MdOutlineEdit />
              </button>
            </div>
          </div>
          <div className='grid-cols-2 grid gap-4 max-w-[700px]'>
            <label className='text-lg text-gray-500'>Correo responsable</label>
            <input
              disabled
              type="text"
              value={
                responsable
                  ? correoResponsable
                  : especialidadEspecifica?.specialtyManager?.institutionalEmail
                    ? especialidadEspecifica.specialtyManager?.institutionalEmail
                    : "-"
              }
              className="grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 bg-blue-100"
            />
          </div>
          {/* <div className='grid-cols-2 grid gap-4 max-w-[700px]'>
            <label className='text-lg text-gray-500'>Fecha de creación</label>
            <input disabled type="text" placeholder='Fecha de Creación' value={especialidadEspecifica?.creationDate} className={`grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 bg-blue-100`} />
          </div>
          <div className='grid-cols-2 grid gap-4 max-w-[700px]'>
            <label className='text-lg text-gray-500'>Fecha de modificación</label>
            <input disabled type="text" placeholder='Fecha de modificación' value={especialidadEspecifica?.modificationDate} className={`grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 bg-blue-100`} />
          </div> */}
          <div className='grid-cols-2 grid gap-4 max-w-[700px]'>
            <label className='text-lg text-gray-500'>Estado</label>
            {/* put a select with only Activo y el otro */}
            <select
              onChange={(e) => {
                setIsActive(e.target.value === 'on');
              }}
              disabled={!editable} className={`grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 ${!editable ? 'bg-blue-100' : ''}`}>
              <option value="on">Activo</option>
              <option value="off">Inactivo</option>
            </select>
          </div>
        </div>
      </div>
      <AsignarResponsable
        isOpen={isOpenAsignarResponsable}
        onClose={() => {
          setIsOpenAsignarResponsable(false);
        }}
        onSelect={(User) => {
          console.log(`User selected: ${JSON.stringify(User, null, 5)}`);
          setResponsable(User.persona.name);
          setCorreoResponsable(User.institutionalEmail);
          setResponsableId(User.id);
        }}
      />
    </div>
  );
};

export default EspecialidadSingular;