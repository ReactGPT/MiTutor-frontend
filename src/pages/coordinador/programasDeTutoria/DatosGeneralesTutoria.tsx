import React, { useState } from 'react';
import { Button, Combobox, InputCell, Spinner } from '../../../components';
import { SaveIcon, CloseIcon } from '../../../assets';
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { useAppSelector,useAppDispatch } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { useProgramaTutoria } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import { tutoringProgramSlice } from '../../../store/slices';

function DatosGeneralesTutoria() {
  //const[open,setOpen] = useState<boolean>(true);
  const { postProgramaTutoria, isLoading } = useProgramaTutoria();
  const navigate = useNavigate();
  //const dispatch = useAppDispatch();
  //const {handleChangeTutoringProgram}=tutoringProgramSlice.actions;
  const { tutoringProgram, onChangeTutoringProgram } = useTutoringProgramContext();
  const { facultyList, specialityList } = useAppSelector((state: RootState) => state.parameters);
  //const { tutoringProgramSelected } = useAppSelector((state: RootState) => state.tutoringProgram);
  
  const [isOpenModalSucess,setIsOpenModalSucess]=useState<boolean>(false);
  const [isOpenModalError,setIsOpenModalError]=useState<boolean>(false);
  const handleSaveTutoria=()=>{
    postProgramaTutoria(tutoringProgram)
    .then((response) => response?setIsOpenModalSucess(true):setIsOpenModalError(true));
  }
  // const handleLocalChangeTutoringProgram= (name:string,value:any)=>{
  //   dispatch(handleChangeTutoringProgram({name:name,value:value}));
  // };
  return (
    <div className='flex flex-col w-full h-full'>
      <div id="ProgramaTutoriaBox1Header" className='flex flex-row justify-between max-h-[45px] w-full h-[30%]'>
        <h2 className='text-xl font-bold text-primary'>Datos del programa</h2>
        <div className='flex flex-row gap-4'>
          {isLoading ? <Spinner /> : <Button text='Guardar' icon={SaveIcon} onClick={handleSaveTutoria} />}
          <Button text='Cancelar' variant='primario' icon={CloseIcon} iconSize={4} onClick={() => { navigate(-1); }} />
        </div>
      </div>
      <div id='ProgramaTutoriaBox1Content' className='flex flex-row w-full h-full gap-2 h-[70%]'>
        <div id='ProgramaTutoriaBox1ContentTutoria' className='flex flex-col w-[30%]'>
          <div className='flex flex-col gap-2'>
            <span className='flex flex-col'>
              <label className='text-md w-full font-medium text-gray-900 dark:text-white mb-2'>Nombre de Tutoría</label>
              
              <InputCell name='nombre' placeholder='Escoja un nombre' text={tutoringProgram.nombre} 
              onChange={{ tipo: 'object', onChange: onChangeTutoringProgram }} boxSize='w-full flex h-[37px] ' />
            </span>

            <Combobox name="facultadId"
              options={facultyList}
              onChange={(value: any) => {
                onChangeTutoringProgram("facultadId", value.id);
                
              }}
              value={tutoringProgram.facultadId === 0 ? null : facultyList.find((item) => item.id === tutoringProgram.facultadId)}
              text='Facultad' />
            <Combobox name="especialidadId"
              options={specialityList}
              onChange={(value: any) => {
                onChangeTutoringProgram("especialidadId",value.id)
                //dispatch(handleChangeTutoringProgram({payload:{nombre:"especialidadId",value: value.id}}));
              }}
              value={tutoringProgram.especialidadId === 0 ? null : specialityList.find((item) => item.id === tutoringProgram.especialidadId)}
              text='Especialidad' />
          </div>
        </div>
        <div id='ProgramaTutoriaBox1ContentDescripcion' className='flex w-[70%] h-full flex-col'>

          <label htmlFor="message"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
            Descripción
          </label>
          <textarea id="message"
            name="descripcion"
            onChange={(e) => {
              onChangeTutoringProgram(e.target.name, e.target.value);
            }}
            value={tutoringProgram.descripcion}
            rows={4}
            className="block py-2 px-2.5 w-full h-full text-xs  bg-gray-50 rounded-md border border-primary focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ej: La tutorías de cachimbos es para..."
          />

        </div>
      </div>
      <ModalSuccess isOpen={isOpenModalSucess} 
                      message={!!tutoringProgram.id?"Se guardaron los cambios satisfactoriamente":"Se creó la tutoría satisfactoriamente"}
                      onClose={()=>{
                        setIsOpenModalSucess(false);
                        navigate("/programasDeTutoria");
                      }}
                      />
      <ModalError isOpen={isOpenModalError} message='Ocurrió un error al intentar procesar el programa de tutoría. Intente nuevamente'
                  onClose={()=>setIsOpenModalError(false)}
                  />
    </div>
  );
}

export default DatosGeneralesTutoria;