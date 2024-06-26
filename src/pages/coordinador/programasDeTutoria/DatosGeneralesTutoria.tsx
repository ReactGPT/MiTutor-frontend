import React, { useState } from 'react';
import { Button, Combobox, InputCell, Spinner } from '../../../components';
import { SaveIcon, CloseIcon } from '../../../assets';
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { useProgramaTutoria } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import { tutoringProgramSlice } from '../../../store/slices';
import { useAuth } from '../../../context';
import { Label } from 'flowbite-react';

function DatosGeneralesTutoria() {
  //const[open,setOpen] = useState<boolean>(true);
  const { postProgramaTutoria, isLoading } = useProgramaTutoria();
  const navigate = useNavigate();
  //const dispatch = useAppDispatch();
  //const {handleChangeTutoringProgram}=tutoringProgramSlice.actions;
  const { tutoringProgram, onChangeTutoringProgram } = useTutoringProgramContext();
  const { facultyList, specialityList } = useAppSelector((state: RootState) => state.parameters);
  const { tutoringProgramSelected } = useAppSelector((state: RootState) => state.tutoringProgram);

  const [isOpenModalSucess, setIsOpenModalSucess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);
  const handleSaveTutoria = () => {
    postProgramaTutoria(tutoringProgramSelected)
      .then((response) => response ? setIsOpenModalSucess(true) : setIsOpenModalError(true));
  };
  const { userData } = useAuth();
  const roles = !!userData ? userData?.userInfo?.roles : [];
  // const handleLocalChangeTutoringProgram= (name:string,value:any)=>{
  //   dispatch(handleChangeTutoringProgram({name:name,value:value}));
  // };
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
              name="Elija una facultad" //facultadId
              options={facultyList}
              onChange={(value: any) => {
                onChangeTutoringProgram("facultadId", value.id);
              }}
              value={tutoringProgram.facultadId === 0 ? null : facultyList.find((item) => item.id === tutoringProgram.facultadId)}
              text='Facultad'
            />
          </span>

          <span className='w-1/3 h-full'>
            <Label value="Especialidad" className='font-roboto text-primary' />
            <Combobox
              name="Elija una especialidad" //especialidadId
              options={specialityList}
              onChange={(value: any) => {
                onChangeTutoringProgram("especialidadId", value.id);
                //dispatch(handleChangeTutoringProgram({payload:{nombre:"especialidadId",value: value.id}}));
              }}
              value={tutoringProgram.especialidadId === 0 ? null : specialityList.find((item) => item.id === tutoringProgram.especialidadId)}
              text='Especialidad'
            />
          </span>

        </div>

        <div id='ProgramaTutoriaBox1ContentDescripcion' className='flex w-full h-full flex-col'>

          <Label value="Descripción" className='font-roboto text-primary' />
          <textarea id="message"
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