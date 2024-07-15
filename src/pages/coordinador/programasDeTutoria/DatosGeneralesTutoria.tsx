import React, { useState, useMemo, useEffect } from 'react';
import { Button, Combobox, InputCell, Spinner } from '../../../components';
import { SaveIcon, CloseIcon } from '../../../assets';
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import { useProgramaTutoria } from '../../../store/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { Label } from 'flowbite-react';
import { Faculty, ManagerRoleDetails, Specialty } from '../../../store/types';
import { useAuth } from '../../../context';

function DatosGeneralesTutoria() {
  const location = useLocation();
  const { postProgramaTutoria, isLoading } = useProgramaTutoria();
  const navigate = useNavigate();
  const { tutoringProgram, onChangeTutoringProgram } = useTutoringProgramContext();
  const { tutoringProgramSelected } = useAppSelector((state: RootState) => state.tutoringProgram);

  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);
  const { userData } = useAuth();
  const roles = !!userData ? userData?.userInfo?.roles : [];

  const { specialityList, facultyList } = useAppSelector((state: RootState) => ({
    specialityList: state.parameters.specialityList,
    facultyList: state.parameters.facultyList,
  }));

  const [specialitySelected, setSpecialitySelected] = useState<Specialty | null>(null);
  const [facultySelected, setFacultySelected] = useState<Faculty | null>(null);

  let selectedFaculties: Faculty[] = [];

  if (roles) {
    const uniqueFacultyIds = new Set<number>();
    roles.forEach(role => {
      if (role.rolName === 'Responsable de Facultad') {
        const facultyId = parseInt((role.details as any).departmentId, 10);
        if (!uniqueFacultyIds.has(facultyId)) {
          uniqueFacultyIds.add(facultyId);
          const faculty = facultyList.find(faculty => faculty.id === facultyId);
          if (faculty) {
            selectedFaculties.push(faculty);
          }
        }
      }

      if (selectedFaculties.length === 0) {
        if (roles[0].type === "SUPPORTFACULTY") {
          const facultyId = parseInt((roles[0].details as any).departmentId, 10);
          const faculty = facultyList.find(faculty => faculty.id === facultyId);
          if (faculty) {
            selectedFaculties.push(faculty);
          }
        }
      }
    });
  }

  const isEditRoute = location.pathname === '/programasDeTutoriaMaestro/editar';
  // Identificar si estamos en modo de edición basado en la URL
  useEffect(() => {
    const isEditMode = location.pathname.includes('/editar');
    if (isEditMode) {
      // Asignar facultad seleccionada
      const selectedFaculty = facultyList.find(faculty => faculty.id === tutoringProgramSelected.facultadId);
      if (selectedFaculty) {
        setFacultySelected(selectedFaculty);
      }

      // Asignar especialidad seleccionada
      const selectedSpeciality = specialityList.find(speciality => speciality.id === tutoringProgramSelected.especialidadId);
      if (selectedSpeciality) {
        setSpecialitySelected(selectedSpeciality);
      }
    }
  }, [location.pathname, tutoringProgramSelected, facultyList, specialityList]);

  const handleOnChangeFaculty = (value: Faculty) => {
    if ((facultySelected && facultySelected.id !== value.id) || (!facultySelected && specialitySelected?.facultyId !== value.id)) {
      setSpecialitySelected(null);
    }
    setFacultySelected(value);
  };

  const specialityOptions = useMemo(() => {
    if (!facultySelected?.id) {
      return [];
    } else {
      const filteredOptions = specialityList.filter(item => item.facultyId === facultySelected.id);
      return [{ id: 0, name: 'Todas', facultyId: facultySelected.id }, ...filteredOptions];
    }
  }, [facultySelected, specialityList]);

  const handleSaveTutoria = () => {
    postProgramaTutoria(tutoringProgramSelected)
      .then((response) => response ? setIsOpenModalSuccess(true) : setIsOpenModalError(true));
  };

  return (
    <div className='flex flex-col w-full h-full'>

      <div id="ProgramaTutoriaBox1Header" className='flex flex-row justify-between items-center w-full h-full'>
        <h2 className='text-xl font-bold font-roboto text-black'>Datos del programa</h2>
        <div className='flex flex-row gap-4'>
          {isLoading
            ?
            <Spinner />
            :
            <Button
              disabled=
              {!!roles
                ?
                !(roles.some((rol: any) => rol.type === "FACULTYMANAGER"
                  && (
                    rol.details.departmentType === 'Facultad'
                      ?
                      rol.details.departmentId.toString() === tutoringProgram.facultadId.toString()
                      :
                      rol.details.departmentId.toString() === tutoringProgram.especialidadId.toString()
                  ))
                )
                &&
                !((roles[0].type === "SUPPORTFACULTY") && (
                  (roles[0].details as ManagerRoleDetails).departmentType === 'Facultad'
                    ?
                    (roles[0].details as ManagerRoleDetails).departmentId.toString() === tutoringProgram.facultadId.toString()
                    :
                    (roles[0].details as ManagerRoleDetails).departmentId.toString() === tutoringProgram.especialidadId.toString()
                ))
                :
                true
              }
              text='Guardar'
              icon={SaveIcon}
              onClick={handleSaveTutoria} />}
          <Button
            text='Cancelar'
            variant='primario'
            icon={CloseIcon}
            iconSize={4}
            onClick={() => { navigate("/programasDeTutoria"); }}
          />
        </div>
      </div>

      <div id='ProgramaTutoriaBox1Content' className='flex flex-col w-full gap-2 h-full'>

        <div id='ProgramaTutoriaBox1ContentTutoria' className='flex w-full justify-between items-center gap-5'>

          <span className='w-1/3 h-full'>
            <Label value="Nombre de tutoría" className='font-roboto text-primary' />
            <InputCell
              name='nombre'
              placeholder='Elija un nombre'
              text={tutoringProgram.nombre}
              onChange={{ tipo: 'object', onChange: onChangeTutoringProgram }}
              boxSize='w-full flex h-[38px]'
            />
          </span>

          <span className='w-1/3 h-full'>
            <Label value="Facultad" className='font-roboto text-primary' />
            <Combobox
              name="Elija una facultad"
              options={selectedFaculties}
              onChange={(value: any) => {
                onChangeTutoringProgram("facultadId", value.id);
                onChangeTutoringProgram("especialidadId", 0); // CAMBIO: Reset speciality when faculty changes in TutoringProgram
                setFacultySelected(value);
                setSpecialitySelected(null); // Reset speciality when faculty changes
              }}
              value={facultySelected}
              text='Facultad'
              disabled={isEditRoute}
            />
          </span>

          <span className='w-1/3 h-full'>
            <Label value="Especialidad" className='font-roboto text-primary' />
            <Combobox
              name="Elija una especialidad"
              options={specialityOptions}
              onChange={(value: any) => {
                onChangeTutoringProgram("especialidadId", value.id);
                setSpecialitySelected(value);
              }}
              value={specialitySelected}
              text='Especialidad'
              disabled={isEditRoute}
            />
          </span>

        </div>

        <div id='ProgramaTutoriaBox1ContentDescripcion' className='flex w-full h-full flex-col'>

          <Label value="Descripción" className='font-roboto text-primary' />
          <textarea
            id="message"
            name="descripcion"
            onChange={(e) => {
              onChangeTutoringProgram(e.target.name, e.target.value);
            }}
            value={tutoringProgram.descripcion}
            rows={4}
            className="block w-full max-h-[51px] text-xs  bg-gray-50 rounded-md border border-primary focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ej: La tutorías de cachimbos es para..."
          />

        </div>

      </div>

      <ModalSuccess isOpen={isOpenModalSuccess}
        message={!!tutoringProgram.id ? "Se guardaron los cambios satisfactoriamente" : "Se creó la tutoría satisfactoriamente"}
        onClose={() => {
          setIsOpenModalSuccess(false);
          navigate("/programasDeTutoria");
        }}
      />

      <ModalError isOpen={isOpenModalError} message='Ocurrió un error al intentar procesar el programa de tutoría. Intente nuevamente'
        onClose={() => setIsOpenModalError(false)}
      />

    </div>
  );
}

export default DatosGeneralesTutoria;
