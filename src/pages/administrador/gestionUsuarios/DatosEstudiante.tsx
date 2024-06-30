import React, { useEffect, useState } from 'react';
import { Combobox } from '../../../components';
import { useUserContext } from '../../../context/UsuarioNuevo';
import { useFacultades } from '../../../store/hooks/useFacultades';
import { useEspecialidad } from '../../../store/hooks/useEspecialidad';

function DatosEstudiante() {
  const { user, onChangeUser } = useUserContext();
  const { facultadData, fetchFacultadData } = useFacultades();
  const { especialidadData, fetchEspecialidadData2 } = useEspecialidad();

  const [facultadSelected, setFacultadSelected] = useState<number>(-1);
  const [filteredEspecialidadData, setFilteredEspecialidadData] = useState(especialidadData);

  useEffect(() => {
    fetchFacultadData();
    fetchEspecialidadData2();
  }, []);

  useEffect(() => {
    if (facultadSelected === -1) {
      setFilteredEspecialidadData(especialidadData);
    } else {
      setFilteredEspecialidadData(especialidadData.filter(item => item.faculty.facultyId === facultadSelected));
    }
  }, [facultadSelected, especialidadData]);

  const handleOnSelectFaculty = (id: number) => {
    setFacultadSelected(id);
  };

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-row justify-between w-full'>
        <h2 className='text-xl font-bold text-primary'>Datos Estudiante</h2>
      </div>
      <div className='flex flex-row gap-10 w-full '>
        <div className='flex flex-col w-1/2 p-3'>
          <label className="font-roboto text-base text-primary">Facultad</label>
          <Combobox name="Seleccionar Facultad"
            buttonStyle='w-full h-full px-3 py-2 mt-1 font-roboto text-base bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-normal'
            noMt={true}
            options={facultadData}
            onChange={(value: any) => {
              handleOnSelectFaculty(value.id);
              onChangeUser("estudiante.facultyId", value.id);
            }}
            value={user.estudiante?.facultyId === -1 ? null : facultadData.find((item) => item.id === user.estudiante?.facultyId)}
            text='Facultad'
          />
        </div>
        <div className='flex flex-col w-1/2 p-3'>
          <label className="font-roboto text-base text-primary">Especialidad</label>
          <Combobox name="Seleccionar Especialidad"
            buttonStyle='w-full h-full mt-1 font-roboto text-base bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-normal'
            noMt={true}
            options={
              filteredEspecialidadData
            }
            onChange={(value: any) => {
              onChangeUser("estudiante.specialityId", value.id);
            }}
            value={user.estudiante?.specialityId === -1 ? null : filteredEspecialidadData.find((item) => item.id === user.estudiante?.specialityId)}
            text='Especialidad'
            disabled={facultadSelected === -1}
          />
        </div>
      </div>
    </div>
  );
}

export default DatosEstudiante;