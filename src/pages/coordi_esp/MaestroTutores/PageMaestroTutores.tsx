import React, { useEffect, useMemo, useState } from 'react';
import UsuariosTable from './UsuariosTable';
import AlumnosTable from './AlumnosTable';
import TutoresTable from './TutoresTable';
import { Button, Spinner } from '../../../components';
import { AddCircleIcon, SaveIcon } from '../../../assets';
import { useProgramaTutoria, useTutor } from '../../../store/hooks';
import { Tutor } from '../../../store/types';
import ModalConfirmation from '../../../components/ModalConfirmation';
import { useUser } from '../../../store/hooks/useUser';
import { User } from '../../../store/types/User';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';

function PageMaestroTutoresEsp() {
  const { isLoading, fetchTutoresByProgramaTutoria: fetchTutores, tutorListByProgramId: tutorList } = useProgramaTutoria();
  const [isUsuariosViewSelected, setIsUsuariosViewSelected] = useState<boolean>(true);
  //const [tutoresModified,setTutoresModified] = useState<Tutor[]>([]);
  const [studentsModified, setStudentsModified] = useState<User[]>([]);
  const [usersModified, setUsersModified] = useState<User[]>([]);
  const [isOpenConfirmationDelete, setIsOpenConfirmationDelete] = useState<boolean>(false);
  const [tutorSelectedForDelete, setTutorSelectedForDelete] = useState<Tutor | null>(null);
  const [tutoresFetched, setTutoresFetched] = useState<Tutor[]>([]);
  const { loading: loadingUsers, fetchUsersSingleSet: fetchUsers, fetchStudentsSingleSet: fetchStudents } = useUser();
  const [usersAdded, setUsersAdded] = useState<User[]>([]);
  const { isLoading: isLoadingPostTutores, postTutores } = useTutor();
  const [isOpenModalSucess, setIsOpenModalSucess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);

  const tutorsAdded: Tutor[] = useMemo(() => {
    const tutores = usersAdded.map((user) => {
      return {
        idTutor: -1,
        nombre: user.persona.name,
        apellido_paterno: user.persona.lastName,
        apellido_materno: user.persona.secondLastName,
        pucpCode: user.pucpCode,
        userAccountId: user.id,
        meetingRoom: '',
        email: user.institutionalEmail,
        fullname: `${user.persona.lastName} ${user.persona.secondLastName}, ${user.persona.name}`
      };
    });
    return tutores;
  }, [usersAdded]);

  const handleOnSelectUsuariosView = (type: 'Usuarios' | 'Alumnos') => {
    switch (type) {
      case 'Usuarios':
        setIsUsuariosViewSelected(true);
        break;
      case 'Alumnos':
        setIsUsuariosViewSelected(false);
    }
  };

  const handleResetFetches = () => {
    fetchTutores(-1)
      .then((tutores) => {
        setTutoresFetched(tutores);
      });

    fetchUsers()
      .then((users: User[]) => {
        setUsersModified([...users]);
      });
    fetchStudents()
      .then((students: User[]) => {
        //console.log(students);
        setStudentsModified([...students]);
      });
    setUsersAdded([]);
  };

  useEffect(() => {
    fetchTutores(-1)
      .then((tutores) => {
        setTutoresFetched(tutores);
      });
    fetchUsers()
      .then((users: User[]) => {
        setUsersModified([...users]);
      });
    fetchStudents()
      .then((students: User[]) => {
        console.log(students);
        setStudentsModified([...students]);
      });
  }, []);
  const tutoresModified: Tutor[] = useMemo(() => {
    return [...tutoresFetched, ...tutorsAdded];
  }, [tutoresFetched, tutorsAdded]);

  useEffect(() => {
    if (tutorSelectedForDelete) {
      setIsOpenConfirmationDelete(true);
    }
  }, [tutorSelectedForDelete]);

  const handleDeleteTutorSelected = () => {
    //setTutoresModified([...(tutoresModified.filter((tutor)=>tutor.idTutor!==tutorSelectedForDelete?.idTutor))]);
    setUsersAdded([...(usersAdded.filter((user) => user.id !== tutorSelectedForDelete?.userAccountId))]);
    setTutoresFetched([...(tutoresFetched.filter((tutor) => tutor.idTutor !== tutorSelectedForDelete?.idTutor))]);
    setTutorSelectedForDelete(null);
  };
  const handleOnAddUser = (userToAdd: User) => {
    setUsersAdded([...usersAdded, userToAdd]);

  };

  const usersToShowTable: User[] = useMemo(() => {
    //console.log(tutoresModified);
    //console.log(usersModified);
    return usersModified.filter((user) =>
    ((
      (!usersAdded.some((useradded) => useradded.id === user.id))
      && (!studentsModified.some((student) => student.id === user.id))
      && (!tutoresFetched.some((tutor: Tutor) => { tutor.userAccountId === user.id; }))
    )
    ));
  }, [usersModified, usersAdded, studentsModified, tutoresModified]);
  const studentsToShowTable: User[] = useMemo(() => {
    return studentsModified.filter((user) =>
      (!usersAdded.some((useradded) => useradded.id === user.id))
      && !(tutoresModified.some((tutor) => tutor.userAccountId === user.id))
    );
  }, [usersAdded, tutoresModified]);
  //console.log(usersToShowTable);
  return (
    <div className='flex flex-col w-full h-full gap-1'>

      <div className='flex flex-row w-full h-fit justify-between items-center'>
        <h2 className='text-lg font-semibold text-black'>Tutores</h2>
        {isLoadingPostTutores ?
          <Spinner /> :
          <Button text='Guardar'
            icon={SaveIcon}
            onClick={() => {
              postTutores(tutoresModified)
                .then((success) => {
                  if (success) {
                    setIsOpenModalSucess(true);
                    handleResetFetches();
                  }
                  else {
                    setIsOpenModalError(false);
                  }
                });

            }} />}
      </div>

      <TutoresTable className='flex w-full h-[50%] items-center justify-center'
        tutores={tutoresModified}
        loadingTutores={isLoading}
        setTutorSelectedForDelete={(tutor: Tutor) => { setTutorSelectedForDelete(tutor); }}
      />
      <div className='flex flex-row w-full h-[5%] justify-between'>
        <h2 className='text-lg font-semibold text-black'>Usuarios</h2>
        <div className='flex flex-row h-full max-h-[80px] w-[180px] border-custom shadow-custom overflow-hidden items-center'>
          <button className={`flex h-full w-[50%] text-primary font-semibold px-2 items-center justify-center ${isUsuariosViewSelected && 'bg-primary text-white'}`} onClick={() => handleOnSelectUsuariosView('Usuarios')}>
            Usuarios
          </button>
          <button className={`flex h-full w-[50%] text-primary font-semibold px-2 items-center justify-center ${!isUsuariosViewSelected && 'bg-primary text-white'}`} onClick={() => handleOnSelectUsuariosView('Alumnos')}>
            Alumnos
          </button>
        </div>
      </div>
      <div className='flex w-full h-[45%]'>
        {isUsuariosViewSelected ?
          <UsuariosTable className='flex w-full h-full flex-col'
            usuarios={usersToShowTable}
            handleAddUser={handleOnAddUser}
          /> :
          <AlumnosTable className='flex w-full h-full flex-col'
            students={studentsToShowTable}
            handleAddUser={handleOnAddUser}
          />}
      </div>
      <ModalConfirmation isOpen={isOpenConfirmationDelete}
        message={`¿Esta seguro de querer eliminar a ${tutorSelectedForDelete?.fullname} de la lista de tutores?`}
        onClose={() => {
          setIsOpenConfirmationDelete(false);
          setTutorSelectedForDelete(null);
        }}
        onConfirm={() => {
          handleDeleteTutorSelected();
          setIsOpenConfirmationDelete(false);
        }}
        isAcceptAction={true}
      />
      <ModalSuccess isOpen={isOpenModalSucess}
        message='Se actualizaron los tutores satisfactoriamente'
        onClose={() => {
          setIsOpenModalSucess(false);
        }}
      />
      <ModalError isOpen={isOpenModalError}
        message='Ocurrió un problema inesperado. Intente nuevamente'
        onClose={() => {
          setIsOpenModalError(false);
        }}
      />
    </div>
  );
}

export default PageMaestroTutoresEsp;