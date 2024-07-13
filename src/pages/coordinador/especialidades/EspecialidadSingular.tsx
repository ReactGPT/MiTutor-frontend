import { useLocation } from 'react-router-dom';
import { Button, Combobox } from '../../../components';
import { actualizarEspecialidad } from '../../../store/services/actualizarEspecialidad';
import React, { useEffect, useState } from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import AsignarResponsable from "./AsignarResponsable";
import { ManagerRoleDetails, Specialty } from '../../../store/types';
import { useEspecialidadByName } from '../../../store/hooks/useEspecialidad';
import { useAuth } from '../../../context';
import { getEspecialidadesFromRoleCoordinador } from '../../../store/hooks/EspecialidadesRolesIdCoordinador';
import { Label } from 'flowbite-react';

type Persona = {
  id: number;
  name: string;
  lastName: string;
  secondLastName: string | null;
  phone: string | null;
  isActive: boolean;
  usuario: any | null;

};

type SpecialtyManager = {
  id: number;
  institutionalEmail: string;
  pucpCode: string;
  isActive: boolean;
  persona: Persona;
  roles: any[] | null;
  isVerified: boolean;
  creationDate: string;
  modificationDate: string;
};

type Facultad = {
  facultyId: number;
  name: string;
  acronym: string;
  numberOfStudents: number;
  numberOfTutors: number;
  isActive: boolean;
  facultyManager: any | null;
  specialties: any[] | null;
};

const defaultPersona: Persona = {
  id: 0,
  name: '-',
  lastName: '',
  secondLastName: null,
  phone: null,
  isActive: true,
  usuario: null
};

const defaultSpecialtyManager: SpecialtyManager = {
  id: 0,
  institutionalEmail: '-',
  pucpCode: '-',
  isActive: true,
  persona: defaultPersona,
  roles: null,
  isVerified: false,
  creationDate: '2023-01-01',
  modificationDate: '2023-01-01'
};

const defaultFacultad: Facultad = {
  facultyId: 0,
  name: '-',
  acronym: '-',
  numberOfStudents: 0,
  numberOfTutors: 0,
  isActive: true,
  facultyManager: null,
  specialties: null
};

const defaultEspecialidad: Specialty = {
  id: 0,
  name: '-',
  acronym: '-',
  numberOfStudents: 0,
  isActive: true,
  faculty: defaultFacultad,
  specialtyManager: defaultSpecialtyManager,
  personalApoyo: defaultSpecialtyManager,
  creationDate: '2023-01-01',
  modificationDate: '2023-01-01',
  students: null,
  tutoringPrograms: null,
  numberStudents: 0,
  facultyId: 0
};

const EspecialidadSingular = () => {
  const { userData } = useAuth();
  const especialidades: ManagerRoleDetails[] = getEspecialidadesFromRoleCoordinador(userData);

  const [editable, setEditable] = React.useState(false);
  const { state } = useLocation();
  //const { especialidadEspecifica } = state;
  const especialidadEspecifica = state?.especialidadEspecifica ? state?.especialidadEspecifica : defaultEspecialidad;

  const [isOpenAsignarResponsable, setIsOpenAsignarResponsable] = useState<boolean>(false);

  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<number | null>(null);

  const [name, setName] = useState<string>(especialidadEspecifica?.name);
  const [acronym, setAcronym] = useState<string>(especialidadEspecifica?.acronym);
  //
  const [responsableId, setResponsableId] = useState(
    especialidadEspecifica?.specialtyManager ? especialidadEspecifica?.specialtyManager.id : -1
  );
  const [responsable, setResponsable] = useState<string>(
    especialidadEspecifica?.specialtyManager ? especialidadEspecifica.specialtyManager.persona.name + " " + especialidadEspecifica.specialtyManager.persona.lastName : "-"
  );
  const [correoResponsable, setCorreoResponsable] = useState<string>(
    especialidadEspecifica?.specialtyManager ? especialidadEspecifica.specialtyManager.institutionalEmail : "-"
  );
  //
  const [personalApoyoId, setPersonalApoyoId] = useState(
    especialidadEspecifica?.personalApoyo ? especialidadEspecifica?.personalApoyo.id : -1
  );
  const [personalApoyo, setPersonalApoyo] = useState<string>(
    especialidadEspecifica?.personalApoyo ? especialidadEspecifica.personalApoyo.persona.name + " " + especialidadEspecifica.personalApoyo.persona.lastName : "-"
  );
  const [correoPersonalApoyo, setCorreoPersonalApoyo] = useState<string>(
    especialidadEspecifica?.personalApoyo ? especialidadEspecifica.personalApoyo.institutionalEmail : "-"
  );
  //
  const [user, setUser] = useState<"Responsable" | "PersonalApoyo">("Responsable");
  //
  const handleClearResponsable = () => {
    setResponsableId(-1);
    setResponsable("-");
    setCorreoResponsable("-");
  };
  //
  const handleClearPersonalApoyo = () => {
    setPersonalApoyoId(-1);
    setPersonalApoyo("-");
    setCorreoPersonalApoyo("-");
  };
  //
  const restablecerDatos = () => {
    if (state) {
      setName(especialidadEspecifica?.name);
      setAcronym(especialidadEspecifica?.acronym);
      //
      setResponsableId(
        especialidadEspecifica?.specialtyManager ? especialidadEspecifica?.specialtyManager.id : -1
      );
      setResponsable(
        especialidadEspecifica?.specialtyManager ? especialidadEspecifica.specialtyManager.persona.name + " " + especialidadEspecifica.specialtyManager.persona.lastName : "-"
      );
      setCorreoResponsable(
        especialidadEspecifica?.specialtyManager ? especialidadEspecifica.specialtyManager.institutionalEmail : "-"
      );
      //
      setPersonalApoyoId(
        especialidadEspecifica?.personalApoyo ? especialidadEspecifica?.personalApoyo.id : -1
      );
      setPersonalApoyo(
        especialidadEspecifica?.personalApoyo ? especialidadEspecifica.personalApoyo.persona.name + " " + especialidadEspecifica.personalApoyo.persona.lastName : "-"
      );
      setCorreoPersonalApoyo(
        especialidadEspecifica?.personalApoyo ? especialidadEspecifica.personalApoyo.institutionalEmail : "-"
      );
    } else {
      const espe: Specialty = especialidadData.find(esp => esp.specialtyId === selectedSpecialtyId) || defaultEspecialidad;
      console.log("espe", espe);
      setName(espe.name);
      setAcronym(espe.acronym);
      setResponsableId(espe.specialtyManager?.id);
      setResponsable(espe.specialtyManager ? espe.specialtyManager?.persona.name + " " + espe.specialtyManager?.persona.lastName : "-");
      setCorreoResponsable(espe.specialtyManager?.institutionalEmail ? espe.specialtyManager?.institutionalEmail : "-");
      setPersonalApoyoId(espe.personalApoyo?.id);
      setPersonalApoyo(espe.personalApoyo ? espe.personalApoyo?.persona.name + " " + espe.personalApoyo?.persona.lastName : "-");
      setCorreoPersonalApoyo(espe.personalApoyo?.institutionalEmail ? espe.personalApoyo?.institutionalEmail : "-");
    }
  };
  //
  const { especialidadData, fetchEspecialidadData } = useEspecialidadByName();

  useEffect(() => {
    if (!state) {
      fetchEspecialidadData("");
      console.log("especialidadData", especialidadData);
      const espe: Specialty = especialidadData.find(esp => esp.specialtyId === selectedSpecialtyId) || defaultEspecialidad;
      console.log("espe", espe);
      setName(espe.name);
      setAcronym(espe.acronym);
      setResponsableId(espe.specialtyManager?.id);
      setResponsable(espe.specialtyManager ? espe.specialtyManager?.persona.name + " " + espe.specialtyManager?.persona.lastName : "-");
      setCorreoResponsable(espe.specialtyManager?.institutionalEmail ? espe.specialtyManager?.institutionalEmail : "-");
      setPersonalApoyoId(espe.personalApoyo?.id);
      setPersonalApoyo(espe.personalApoyo ? espe.personalApoyo?.persona.name + " " + espe.personalApoyo?.persona.lastName : "-");
      setCorreoPersonalApoyo(espe.personalApoyo?.institutionalEmail ? espe.personalApoyo?.institutionalEmail : "-");
    }
  }, [selectedSpecialtyId]);
  //
  const handleOnChangeSpecialty = (value: any) => {
    setSelectedSpecialtyId(value.id);
  };
  //
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className='flex gap-2 items-center justify-between'>
        {
          state == null &&
          <div>
            <Label value="Especialidad" className='font-roboto text-primary' />
            <Combobox
              className='w-[250px]'
              options={especialidades.map(especialidad => ({
                id: especialidad.departmentId,
                name: especialidad.departmentName,
                ...especialidad
              }))}
              onChange={handleOnChangeSpecialty}
              value={null}
            />
          </div>
        }
        <span className='text-3xl text-primary font-bold'>
          {name}
        </span>
        {
          editable
            ?
            <div className='flex gap-5'>
              <Button
                text='Guardar'
                onClick={async () => {
                  if (!editable) {
                    setEditable(true);
                    return;
                  }
                  await actualizarEspecialidad({
                    SpecialtyId: especialidadEspecifica?.specialtyId,
                    Name: name,
                    Acronym: acronym,
                    IsActive: true,
                    SpecialtyManager: { Id: responsableId === -1 ? null : responsableId },
                    PersonalApoyo: { Id: personalApoyoId === -1 ? null : personalApoyoId },
                  });
                  setEditable(false);
                }}
                className='rounded-2xl '
              />
              <Button
                text='Cancelar'
                onClick={async () => {
                  if (!editable) {
                    setEditable(true);
                    return;
                  }
                  //restablecer
                  restablecerDatos();
                  //
                  setEditable(false);
                }}
                className='rounded-2xl'
                variant='warning'
              />
            </div>
            :
            <Button
              text='Editar'
              onClick={() => { setEditable(true); }}
              className='rounded-2xl '
              disabled={selectedSpecialtyId == null && state == null}
            />
        }
      </div>
      <div className='w-full h-full flex items-start justify-center'>
        <div className='w-3/4 flex flex-col gap-5'>

          <div className='grid-cols-2 grid gap-4 max-w-[700px]'>
            <label className='text-lg text-gray-500'>Siglas</label>
            <input
              onChange={(e) => {
                setAcronym(e.target.value);
              }}
              disabled={!editable || state == null}
              type="text"
              placeholder='Siglas'
              value={acronym}
              className={`grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 ${editable && state != null ? 'bg-white' : 'bg-blue-100'}`}
            />
          </div>

          <div className='grid-cols-2 grid gap-5 max-w-[700px]'>
            <label className='text-lg text-gray-500'>Nombre especialidad</label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              disabled={!editable || state == null}
              type="text"
              placeholder='Siglas'
              value={name}
              className={`grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 ${editable && state != null ? 'bg-white' : 'bg-blue-100'}`} />
          </div>

          <div className='grid-cols-2 grid gap-4 max-w-[700px]'>
            <label className='text-lg text-gray-500'>Responsable</label>
            <div className='flex justify-between align-center gap-5'>
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
              <>
                <button
                  className={`rounded-lg ${editable && state != null ? 'bg-white' : 'bg-secondary'} shadow p-2`}
                  onClick={() => {
                    setUser("Responsable");
                    setIsOpenAsignarResponsable(true);
                  }}
                  disabled={!editable || state == null}
                >
                  <MdOutlineEdit />
                </button>
                <button
                  className={`rounded-lg ${editable && state != null ? 'bg-white' : 'bg-secondary'} shadow p-2`}
                  onClick={handleClearResponsable}
                  disabled={!editable || state == null}
                >
                  <MdDeleteOutline />
                </button>
              </>
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

          <div className='grid-cols-2 grid gap-4 max-w-[700px]'>
            <label className='text-lg text-gray-500'>Personal de Apoyo</label>
            <div className='flex justify-between align-center gap-5'>
              <input
                disabled
                type="text"
                placeholder='Responsable'
                value={
                  personalApoyo
                    ? personalApoyo
                    : especialidadEspecifica?.personalApoyo?.persona?.name && especialidadEspecifica?.personalApoyo?.persona?.lastName
                      ? `${especialidadEspecifica.personalApoyo.persona.name} ${especialidadEspecifica.personalApoyo.persona.lastName}`
                      : "-"
                }
                className="grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 bg-blue-100"
              />
              <>
                <button
                  className={`rounded-lg ${editable ? 'bg-white' : 'bg-secondary'} shadow p-2`}
                  onClick={() => {
                    setUser("PersonalApoyo");
                    setIsOpenAsignarResponsable(true);
                  }}
                  disabled={!editable}
                >
                  <MdOutlineEdit />
                </button>
                <button
                  className={`rounded-lg ${editable ? 'bg-white' : 'bg-secondary'} shadow p-2`}
                  onClick={handleClearPersonalApoyo}
                  disabled={!editable}
                >
                  <MdDeleteOutline />
                </button>
              </>
            </div>
          </div>

          <div className='grid-cols-2 grid gap-4 max-w-[700px]'>
            <label className='text-lg text-gray-500'>Correo personal de apoyo</label>
            <input
              disabled
              type="text"
              value={
                personalApoyo
                  ? correoPersonalApoyo
                  : especialidadEspecifica?.personalApoyo?.institutionalEmail
                    ? especialidadEspecifica.personalApoyo?.institutionalEmail
                    : "-"
              }
              className="grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 bg-blue-100"
            />
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
          switch (user) {
            case "Responsable":
              //
              setResponsable(User.persona.name);
              setCorreoResponsable(User.institutionalEmail);
              setResponsableId(User.id);
              break;
            case "PersonalApoyo":
              //
              setPersonalApoyo(User.persona.name);
              setCorreoPersonalApoyo(User.institutionalEmail);
              setPersonalApoyoId(User.id);
              break;
          }
        }}
      />
    </div>
  );
};

export default EspecialidadSingular;