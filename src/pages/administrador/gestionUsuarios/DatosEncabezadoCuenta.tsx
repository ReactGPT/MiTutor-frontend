import React, { useState } from 'react';
import { Button, Checkbox, Combobox, InputCell, Spinner, Toogle } from '../../../components';
import { SaveIcon, CloseIcon } from '../../../assets';
import { useUserContext } from '../../../context/UsuarioNuevo';
import { RootState } from '../../../store/store';
import { useUser } from '../../../store/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import InputTutor from '../../../components/Tutor/InputTutor';
import InputAdmin from '../../../components/Administrador/InputAdmin';

type InputProps = {
  rol: "estudiante" | "usuario";
}

function DatosEncabezadoCuenta({ rol }: InputProps) {
  const { user, onChangeUser } = useUserContext();
  const { postUser, postStudent, loading } = useUser();
  const navigate = useNavigate();
  const [isOpenModalConfirmation, setIsOpenModalConfirmation] = useState<boolean>(false);
  const [isOpenModalSucess, setIsOpenModalSucess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);

  const handleSaveUsuario = () => {
    console.log("User save: ", user);
    user.pucpCode = String(user.pucpCode);
    user.persona.phone = String(user.persona.phone);
    console.log("User save 2: ", user);

    if (rol === 'estudiante') {
      postStudent(user)
        .then((response) => response ? setIsOpenModalSucess(true) : setIsOpenModalError(true));
    } else {
      postUser(user)
        .then((response) => response ? setIsOpenModalSucess(true) : setIsOpenModalError(true));
    }
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row items-center w-full justify-between'>
        {user?.persona ? (
          <h1 className="font-montserrat text-3xl font-bold text-primary text-center">
            {`${user.persona.name} ${user.persona.lastName} ${user.persona.secondLastName}`}
          </h1>
        ) : (<h1 className="font-montserrat text-3xl font-bold text-primary text-center"></h1>)}

        <div className='flex flex-row gap-4'>
          {loading ? <Spinner /> : <Button text='Guardar' icon={SaveIcon} onClick={handleSaveUsuario} />}
          <Button text='Cancelar' variant='primario' icon={CloseIcon} iconSize={4} onClick={() => { navigate(-1); }} />
        </div>
      </div>
      <ModalSuccess isOpen={isOpenModalSucess}
        message={!!user?.id ? "Se guardaron los cambios satisfactoriamente" : "Se creó el usuario satisfactoriamente"}
        onClose={() => {
          setIsOpenModalSucess(false);
          navigate(`/${rol}s`);
        }}
      />
      <ModalError isOpen={isOpenModalError} message='Ocurrió un error al intentar procesar el usuario. Intente nuevamente'
        onClose={() => setIsOpenModalError(false)}
      />
    </div>
  );

}

export default DatosEncabezadoCuenta