import React, { useMemo, useState } from 'react';
import { Button, Combobox, InputCell, Spinner } from '../../../components';
import { SaveIcon, CloseIcon } from '../../../assets';
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import { useProgramaTutoria } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { Label } from 'flowbite-react';
import { Faculty, Specialty } from '../../../store/types';
import { useAuth } from '../../../context';

function DatosGeneralesTutoria() {
  const { postProgramaTutoria, isLoading } = useProgramaTutoria();
  const navigate = useNavigate();
  const { tutoringProgram, onChangeTutoringProgram } = useTutoringProgramContext();
  const { tutoringProgramSelected } = useAppSelector((state: RootState) => state.tutoringProgram);

  const [isOpenModalSucess, setIsOpenModalSucess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);
  const { userData } = useAuth();
  const roles = !!userData ? userData?.userInfo?.roles : [];

  const { specialityList, facultyList } = useAppSelector((state: RootState) => ({
    specialityList: state.parameters.specialityList,
    facultyList: state.parameters.facultyList,
  }));

  const [specialitySelected, setSpecialitySelected] = useState<Specialty | null>(null);
  const [facultySelected, setFacultySelected] = useState<Faculty | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  let selectedFaculties: Faculty[] = [];

  if (roles) {
    roles.forEach(role => {
      if (role.rolName === 'Responsable de Facultad') {
        const facultyId = parseInt((role.details as any).departmentId, 10);
        const faculty = facultyList.find(faculty => faculty.id === facultyId);
        if (faculty) {
          selectedFaculties.push(faculty);
        }
      }
    });
  }

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
      return specialityList.filter(item => item.facultyId === facultySelected.id);
    }
  }, [facultySelected, specialityList]);

  const handleSaveTutoria = () => {
    postProgramaTutoria(tutoringProgramSelected)
      .then((response) => response ? setIsOpenModalSucess(true) : setIsOpenModalError(true));
  };

  return (
    <div className='flex flex-col w-full h-full'>

      <div id="ProgramaTutoriaBox1Header" className='flex flex-row justify-between items-center w-full h-full'>
        <h2 className='text-xl font-bold font-roboto text-black'>Datos del programa</h2>
        <div className='flex flex-row gap-4'>
          {isLoading ? <Spinner /> : <Button disabled={!!roles ? !(roles.some((rol: any) => rol.type === "MANAGER" 
            && (rol.details.departmentType === 'Facultad' ? rol.details.departmentId.toString() === tutoringProgram.facultadId.toString() : rol.details.departmentId.toString() === tutoringProgram.especialidadId.toString()))) : true} text='Guardar' icon={SaveIcon} onClick={handleSaveTutoria} />}
          <Button text='Cancelar' variant='primario' icon={CloseIcon} iconSize={4} onClick={() => { navigate("/programasDeTutoria"); }} />
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
                setFacultySelected(value);
                setSpecialitySelected(null); // Reset speciality when faculty changes
              }}
              value={facultySelected}
              text='Facultad'
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

      <ModalSuccess isOpen={isOpenModalSucess}
        message={!!tutoringProgram.id ? "Se guardaron los cambios satisfactoriamente" : "Se creó la tutoría satisfactoriamente"}
        onClose={() => {
          setIsOpenModalSucess(false);
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
