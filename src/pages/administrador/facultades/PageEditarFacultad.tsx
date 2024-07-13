import React, { useEffect, useState } from 'react';
import { Button } from '../../../components';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useEspecialidad } from '../../../store/hooks/useEspecialidad';
import Facultad from '../../../store/types/Facultad';
import { FacultadProvider } from '../../../context/FacultadContext';
import { useLocation } from 'react-router-dom';
import ModalSearch from '../../../components/Administrador/ModalSearch';
import { useFacultades } from '../../../store/hooks/useFacultades';
import EspecialidadesPage from '../../coordinador/especialidades/Especialidades';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';

const PageEditarFacultad = () => {
  const [editable, setEditable] = useState(false);
  const { state } = useLocation();
  const { facultadEstado } = state;
  const [facultadBorrador, setFacultadBorrador] = useState<Facultad>(facultadEstado);
  const { updateFacultad } = useFacultades();
  const [isOpenModalSearch, setIsOpenModalSearch] = useState<boolean>(false);

  const [us, setUs] = useState<"CoordFacultad" | "CoordBienestar" | "PersonalApoyo">("CoordFacultad");

  const [refreshKey, setRefreshKey] = useState(0);

  const update = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    console.log("estado que me viene:");
    console.log(facultadEstado);
    setFacultadBorrador(facultadBorrador);
  }, [isOpenModalSearch]);

  const handleEditSaveButton = () => {
    if (!editable) {
      setEditable(true);
      return;
    }

    updateFacultad(facultadBorrador);

    setEditable(false);

    update();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFacultadBorrador((prevState) => {
      if (!prevState) {
        return facultadEstado;
      }
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const setBienestarManagerToNull = () => {
    setFacultadBorrador((prevState) => ({
      ...prevState,
      bienestarManager: null
    }));
  };

  const setFacultyManagerToNull = () => {
    setFacultadBorrador((prevState) => ({
      ...prevState,
      facultyManager: null
    }));
  };

  const setPersonalApoyoToNull = () => {
    setFacultadBorrador((prevState) => ({
      ...prevState,
      personalApoyo: null
    }));
  };

  const handleClearFacultad = () => {
    setFacultadBorrador(facultadEstado);
  };

  return (
    <FacultadProvider facultad={facultadBorrador}>
      <div className="w-full h-full flex flex-col gap-4">

        <div className="w-full h-fit flex justify-between items-center">

          <h1 className="text-2xl font-bold text-[#2F2F2F]">
            {`${facultadBorrador?.name}`}
          </h1>

          {
            editable
              ?
              <div className='flex gap-5'>
                <Button
                  text='Guardar'
                  onClick={handleEditSaveButton}
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
                    handleClearFacultad();
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
              />
          }

        </div>

        <div className="w-full h-fit flex flex-col gap-3">
          <div className='w-full flex gap-5'>
            <div className='w-1/4 flex flex-col'>
              <label className='text-base text-primary'>Siglas</label>
              <input
                onChange={handleInputChange}
                disabled={!editable}
                type="text"
                placeholder='Siglas'
                value={facultadBorrador?.acronym}
                className={`grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 ${!editable ? 'bg-blue-100' : ''}`}
                name="acronym"
              />
            </div>
            <div className='w-3/4 flex flex-col'>
              <label className='text-base text-primary'>Facultad</label>
              <input
                onChange={handleInputChange}
                disabled={!editable}
                type="text"
                placeholder='Nombre de Facultad'
                value={facultadBorrador?.name}
                className={`grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 ${!editable ? 'bg-blue-100' : ''}`}
                name="name"
              />
            </div>
            <div className='w-[15%] flex flex-col'>
              <label className='text-base text-primary'>Num. Estudiantes</label>
              <input
                disabled
                type="text"
                value={facultadBorrador?.numberStudents.toString()}
                className="grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 bg-blue-100"
              />
            </div>
          </div>

          <div className='flex w-full justify-between gap-4'>

            <div className='flex gap-5 w-1/2 justify-start items-end'>
              <div className='flex flex-col w-1/3'>
                <label className='text-base text-primary'>Responsable Facultad</label>
                <input
                  disabled
                  type="text"
                  placeholder='Responsable'
                  value={
                    facultadBorrador?.facultyManager?.persona?.name && facultadBorrador?.facultyManager?.persona?.lastName
                      ? `${facultadBorrador?.facultyManager?.persona?.name} ${facultadBorrador?.facultyManager?.persona?.lastName}`
                      : "-"
                  }
                  className="grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 bg-blue-100"
                />
              </div>

              <div className='flex flex-col w-2/3'>
                <label className='text-base text-primary'>Correo Facultad</label>
                <input
                  disabled
                  type="text"
                  value={
                    facultadBorrador?.facultyManager?.institutionalEmail
                      ? facultadBorrador.facultyManager?.institutionalEmail
                      : "-"
                  }
                  className="grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 bg-blue-100"
                />
              </div>

              <div className='flex flex-col w-fit'>
                <label className='text-base text-primary'> </label>
                <div className='flex gap-3'>
                  <button
                    className={`rounded-lg ${editable ? 'bg-white' : 'bg-secondary'} shadow p-2`}
                    onClick={() => {
                      setUs("CoordFacultad");
                      update();
                      setIsOpenModalSearch(true);
                    }}
                    disabled={!editable}
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    className={`rounded-lg ${editable ? 'bg-white' : 'bg-secondary'} shadow p-2`}
                    onClick={setFacultyManagerToNull}
                    disabled={!editable}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>

            </div>

            <div className='flex gap-5 w-1/2 justify-end items-end'>
              <div className='flex flex-col w-1/3'>
                <label className='text-base text-primary'>Personal de Apoyo</label>
                <input
                  disabled
                  type="text"
                  placeholder='Responsable'
                  value={
                    facultadBorrador?.personalApoyo?.persona?.name && facultadBorrador?.personalApoyo?.persona?.lastName
                      ? `${facultadBorrador?.personalApoyo?.persona?.name} ${facultadBorrador?.personalApoyo?.persona?.lastName}`
                      : "-"
                  }
                  className="grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 bg-blue-100"
                />
              </div>

              <div className='flex flex-col w-2/3'>
                <label className='text-base text-primary'>Correo Personal de Apoyo</label>
                <input
                  disabled
                  type="text"
                  value={
                    facultadBorrador?.personalApoyo?.institutionalEmail
                      ? facultadBorrador.personalApoyo?.institutionalEmail
                      : "-"
                  }
                  className="grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 bg-blue-100"
                />
              </div>

              <div className='flex flex-col w-fit'>
                <label className='text-base text-primary'> </label>
                <div className='flex gap-3'>
                  <button
                    className={`rounded-lg ${editable ? 'bg-white' : 'bg-secondary'} shadow p-2`}
                    onClick={() => {
                      setUs("PersonalApoyo");
                      update();
                      setIsOpenModalSearch(true);
                    }}
                    disabled={!editable}
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    className={`rounded-lg ${editable ? 'bg-white' : 'bg-secondary'} shadow p-2`}
                    onClick={setPersonalApoyoToNull}
                    disabled={!editable}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className='flex w-full justify-between gap-4'>
            <div className='flex gap-5 w-1/2 justify-end items-end'>
              <div className='w-full'></div>
            </div>

            <div className='flex gap-5 w-1/2 justify-end items-end'>
              <div className='flex flex-col w-1/3'>
                <label className='text-base text-primary'>Responsable Bienestar</label>
                <input
                  disabled
                  type="text"
                  placeholder='Responsable'
                  value={
                    facultadBorrador?.bienestarManager?.persona?.name && facultadBorrador?.bienestarManager?.persona?.lastName
                      ? `${facultadBorrador?.bienestarManager?.persona?.name} ${facultadBorrador?.bienestarManager?.persona?.lastName}`
                      : "-"
                  }
                  className="grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 bg-blue-100"
                />
              </div>

              <div className='flex flex-col w-2/3'>
                <label className='text-base text-primary'>Correo Bienestar</label>
                <input
                  disabled
                  type="text"
                  value={
                    facultadBorrador?.bienestarManager?.institutionalEmail
                      ? facultadBorrador.bienestarManager?.institutionalEmail
                      : "-"
                  }
                  className="grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 bg-blue-100"
                />
              </div>

              <div className='flex flex-col w-fit'>
                <label className='text-base text-primary'> </label>
                <div className='flex gap-3'>
                  <button
                    className={`rounded-lg ${editable ? 'bg-white' : 'bg-secondary'} shadow p-2`}
                    onClick={() => {
                      setUs("CoordBienestar");
                      update();
                      setIsOpenModalSearch(true);
                    }}
                    disabled={!editable}
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    className={`rounded-lg ${editable ? 'bg-white' : 'bg-secondary'} shadow p-2`}
                    onClick={setBienestarManagerToNull}
                    disabled={!editable}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        <EspecialidadesPage Facultyid={facultadEstado.id} disableAgregarEspecialidad={editable} />

        <ModalSearch
          isOpen={isOpenModalSearch}
          onClose={() => {
            setIsOpenModalSearch(false);
          }}
          facultad={facultadBorrador}
          setFacultadData={(facultad: Facultad) => { setFacultadBorrador(facultad); }}
          userType={us}
          updateKey={refreshKey}
        />
      </div>
    </FacultadProvider>
  );
};

export default PageEditarFacultad;
