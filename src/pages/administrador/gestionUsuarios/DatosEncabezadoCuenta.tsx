import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Combobox, InputCell, Spinner, Toogle } from '../../../components';
import { SaveIcon, CloseIcon } from '../../../assets';
import { useUserContext } from '../../../context/UsuarioNuevo';
import { RootState } from '../../../store/store';
import { useUser } from '../../../store/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import { useEspecialidad } from '../../../store/hooks/useEspecialidad';
import InputTutor from '../../../components/Tutor/InputTutor';
import InputAdmin from '../../../components/Administrador/InputAdmin';
import { User } from '../../../store/types/User';
import ModalAdvertencia from '../../../components/Tutor/ModalAdvertencia';
import { RiErrorWarningLine } from 'react-icons/ri';

type InputProps = {
  rol: "estudiante" | "usuario";
  fieldErrors: {
    phone: string;
    pucpCode: string;
    institutionalEmail: string;
    name: string;
    lastName: string;
    specialityId: string;
  };
  setFieldErrors: React.Dispatch<React.SetStateAction<{
    phone: string;
    pucpCode: string;
    institutionalEmail: string;
    name: string;
    lastName: string;
    specialityId: string;
  }>>;
}

interface Usuarios {
  code: string;
  email: string;
}

function DatosEncabezadoCuenta({ rol, fieldErrors, setFieldErrors }: InputProps) {
  const { user, onChangeUser } = useUserContext();
  const { postUser, postStudent, loading, fetchUsersSingleSet } = useUser();
  const { fetchEspecialidadData2, especialidadData } = useEspecialidad();
  const navigate = useNavigate();
  const [isOpenModalConfirmation, setIsOpenModalConfirmation] = useState<boolean>(false);
  const [existingUsers, setExistingUsers] = useState<User[]>([]);
  const [codeMails, setCodeMails] = useState<Usuarios[]>([]);
  const [isOpenModalSucess, setIsOpenModalSucess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);
  const [isOpenModalAdvertencia, setIsOpenModalAdvertencia] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailUsuario, setEmailUsuario] = useState<string>(user.institutionalEmail);
  const [codigoUsuario, setCodigoUsuario] = useState<string>(user.pucpCode);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUsersSingleSet();
      setExistingUsers(users);
      // users.forEach((item) => {
      //   codeMails.push({ code: item.pucpCode, email: item.institutionalEmail });
      // });
      // Crear una nueva lista de codeMails sin usar forEach
      const newCodeMails = users.map((item) => ({
        code: item.pucpCode,
        email: item.institutionalEmail,
      }));

      setCodeMails(newCodeMails); // Asumiendo que tienes un estado para codeMails
    };

    fetchData();
  }, []);

  const validatePhone = (phone: string): { isValid: boolean; errorMessage: string } => {
    if (phone === '' || phone === undefined || phone === "NaN") {
      return { isValid: true, errorMessage: '' };
    }
    const phoneRegex = /^\d{1,15}$/;
    if (!phoneRegex.test(phone)) {
      return { isValid: false, errorMessage: 'El teléfono solo debe contener números y tener máximo 15 dígitos' };
    }
    return { isValid: true, errorMessage: '' };
  };

  const validateCode = (code: string): { isValid: boolean; errorMessage: string } => {
    if (code.length < 7 || code.length > 15) {
      return { isValid: false, errorMessage: 'El código debe tener entre 7 y 15 caracteres' };
    }
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(code)) {
      return { isValid: false, errorMessage: 'El código solo puede contener letras y números' };
    }

    let index = -1;
    user.id != -1 ? index = codeMails.findIndex((item) => item.code === codigoUsuario) : index = -1;
    if (index !== -1) {
      codeMails.splice(index, 1);
    }

    // si el usuario es nuevo, se verifica que el código no esté en uso
    if (codeMails.some((item) => item.code === code)) {
      return { isValid: false, errorMessage: 'El código ya está en uso por otro estudiante' };
    }

    return { isValid: true, errorMessage: '' };
  }

  const validateEmail = (email: string): { isValid: boolean; errorMessage: string } => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, errorMessage: 'El correo no es válido' };
    }
    let index = -1;
    user.id != -1 ? index = codeMails.findIndex((item) => item.email === emailUsuario) : index = -1;
    if (index !== -1) {
      codeMails.splice(index, 1);
    }
    // en codeMails están los códigos y correos de los usuarios existentes
    if (codeMails.some((item) => item.email === email)) {
      return { isValid: false, errorMessage: 'El correo ya está en uso por otro usuario' };
    }

    return { isValid: true, errorMessage: '' };
  };

  const validateName = (name: string): { isValid: boolean; errorMessage: string } => {
    if (!name || name.trim() === '') {
      return { isValid: false, errorMessage: 'El nombre no puede estar vacío' };
    }
    return { isValid: true, errorMessage: '' };
  };

  const validateLastName = (lastName: string): { isValid: boolean; errorMessage: string } => {
    if (!lastName || lastName.trim() === '') {
      return { isValid: false, errorMessage: 'El primer apellido no puede estar vacío' };
    }
    return { isValid: true, errorMessage: '' };
  };

  const validateSpecialty = (specialtyId: number): { isValid: boolean; errorMessage: string } => {
    if (specialtyId === -1) {
      return { isValid: false, errorMessage: 'Debe seleccionar una especialidad' };
    }
    return { isValid: true, errorMessage: '' };
  };

  const validateUser = () => {
    const newFieldErrors = {
      phone: validatePhone(user.persona.phone).errorMessage,
      pucpCode: validateCode(user.pucpCode).errorMessage,
      institutionalEmail: validateEmail(user.institutionalEmail).errorMessage,
      name: validateName(user.persona.name).errorMessage,
      lastName: validateLastName(user.persona.lastName).errorMessage,
      specialityId: rol === 'estudiante' ? validateSpecialty(user.estudiante?.specialityId || -1).errorMessage : ''
    };

    setFieldErrors(newFieldErrors);

    return !Object.values(newFieldErrors).some(error => error !== '');
  };

  const handleSaveUsuario = () => {
    //console.log("Telefono: ", user.persona.phone)
    //console.log("User save: ", user);
    user.pucpCode = String(user.pucpCode);
    user.persona.phone = String(user.persona.phone);
    //console.log("User save 2: ", user);
    //console.log("Telefono: ", user.persona.phone, typeof user.persona.phone)

    if (!validateUser()) {
      setErrorMessage('Por favor, corrija los errores antes de guardar.');
      setIsOpenModalAdvertencia(true);
      return;
    }

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
      <ModalError isOpen={isOpenModalAdvertencia} message='Debe correjir los errores antes de guardar'
        onClose={() => setIsOpenModalAdvertencia(false)}
      />
    </div>
  );

}

export default DatosEncabezadoCuenta