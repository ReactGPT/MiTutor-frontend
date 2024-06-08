import React, { useState } from 'react';
import { Button, Combobox, InputCell, Spinner } from '../../../components';
import { SaveIcon, CloseIcon } from '../../../assets';
import { useUserContext } from '../../../context/UsuarioNuevo';
import { RootState } from '../../../store/store';
import { useUser } from '../../../store/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import InputTutor from '../../../components/Tutor/InputTutor';

function DatosPersona() {
  //const[open,setOpen] = useState<boolean>(true);
  const { postUser, loading } = useUser();
  const navigate = useNavigate();
  const { user, onChangeUser } = useUserContext();
  const [isOpenModalSucess,setIsOpenModalSucess]=useState<boolean>(false);
  const [isOpenModalError,setIsOpenModalError]=useState<boolean>(false);

  const handleSaveUsuario=()=>{
    postUser(user)
    .then((response) => response?setIsOpenModalSucess(true):setIsOpenModalError(true));
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-row justify-between max-h-[45px] w-full h-[30%]'>
        <h2 className='text-xl font-bold text-primary'>Datos Personales</h2>
        <div className='flex flex-row gap-4'>
          {loading ? <Spinner /> : <Button text='Guardar' icon={SaveIcon} onClick={handleSaveUsuario} />}
          <Button text='Cancelar' variant='primario' icon={CloseIcon} iconSize={4} onClick={() => { navigate(-1); }} />
        </div>
      </div>
      <div className='flex flex-row w-full h-full gap-2 h-[70%]'>
        <div className='flex flex-col w-[30%]'>
          <div className='flex flex-col gap-2'>
          <InputTutor titulo="Nombre" value={user?.persona.name} enable={false} />
          <InputTutor titulo="Primer Apellido" value={user?.persona.lastName} enable={false} />
          <InputTutor titulo="Segundo Apellido" value={user?.persona.secondLastName} enable={false} />
          <InputTutor titulo="Teléfono" value={user?.persona.phone} enable={false} />
        </div>
      </div>
      <ModalSuccess isOpen={isOpenModalSucess} 
                      message={!!user?.id?"Se guardaron los cambios satisfactoriamente":"Se creó el usuario satisfactoriamente"}
                      onClose={()=>{
                        setIsOpenModalSucess(false);
                        navigate("/usuarios");
                      }}
                      />
      <ModalError isOpen={isOpenModalError} message='Ocurrió un error al intentar procesar el usuario. Intente nuevamente'
                  onClose={()=>setIsOpenModalError(false)}
                  />
      </div> 
    </div>
  )
}

export default DatosPersona