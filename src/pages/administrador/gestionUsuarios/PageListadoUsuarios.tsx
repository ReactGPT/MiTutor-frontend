import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import ListadoUsuariosSearchBar from './ListadoUsuariosSearchBar';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import CustomUsuariosGridButton from './CustomUsuariosGridButton';
import { DetailsIcon } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { useProgramaTutoria } from '../../../store/hooks';
import { useUser } from '../../../store/hooks/useUser';
import { Spinner } from '../../../components';
import { ProgramaTutoria, Tutor } from '../../../store/types';
//import { useHistory } from 'react-router-dom';
import { useTitle } from '../../../context';
import DeleteIcon from '../../../assets/svg/DeleteIcon';
//import { getEliminarTutoria } from '../../../store/services';
import ModalConfirmation from '../../../components/ModalConfirmation';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import { User } from '../../../store/types/User';


export default function PageListadoUsuarios() {
  const navigate = useNavigate();
  //const history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);
  //const {isLoading,programaTutoriaData,fetchProgramaTutorias,postEliminarProgramaTutoria} = useProgramaTutoria();
  const { loading, userData, fetchUsers, deleteUser } = useUser();
  //const [programaSelected, setProgramaSelected] = useState<ProgramaTutoria | null>(null);
  const [userSelected, setUserSelected] = useState<User | null>(null);
  //const [programaTutoriaFiltered,setProgramaTutoriaFiltered] = useState<ProgramaTutoria[]|null>(null)
  useEffect(() => {
    //console.log("llamada fetch prog tutoria");
    //fetchProgramaTutorias();
    fetchUsers();
  }, []);

  const handleNavigation = (data: User) => {
    console.log(data);
    navigate("/usuarios/detalle", { state: { userData: data } });
  };
  const handleOnSelectUser = (usuario: User) => {
    setUserSelected(usuario);
  };
  useEffect(() => {
    if (userSelected) {
      setIsOpen(true);
    }
  }, [userSelected]);
  const handleOnConfirmDeleteUsuario = () => {
    if (userSelected && !!userSelected.id) {
      deleteUser(userSelected?.id)
        .then((result) => {
          if (result) {
            setIsOpenModalSuccess(true);
          }
          else {
            setIsOpenModalError(true);
          }
          setIsOpen(false);
          //setProgramaSelected(null);
        });
    }
  };
  const [filters, setFilters] = useState<any>({
    idSpeciality: null,
    idFaculty: null,
    name: null
  });
  const handleOnChangeFilters = (filter: any) => {
    setFilters(filter);
  };
  const UserFiltered: User[] = useMemo(() => {
    return [...(userData).filter((item) =>
      item.persona.name.toLowerCase().includes(filters.name ? filters.name : "")
      //&&(filters.idSpeciality?filters.idSpeciality===item.especialidadId:true)&&(filters.idFaculty?filters.idFaculty===item.facultadId:true)
    )];
  }, [userData, filters]);


  const defaultColDef = {
    suppressHeaderMenuButton: true,
    flex: 1,
    sortable: true,
    resizable: true,
    cellStyle: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
    },
    //filter: 'agTextColumnFilter',
    floatingFilter: true,
  };
  const columnDefs: ColDef[] = [

    { headerName: 'Código', field: 'pucpCode', filter: 'agNumberColumnFilter', minWidth: 100 },
    { headerName: 'Nombres', field: 'persona.name', filter: 'agTextColumnFilter', minWidth: 150 },
    { headerName: 'Primer Apellido', field: 'persona.lastName', filter: 'agTextColumnFilter', minWidth: 150 },
    { headerName: 'Segundo Apellido', field: 'persona.secondLastName', filter: 'agTextColumnFilter', minWidth: 150 },
    { headerName: 'Correo', field: 'institutionalEmail', filter: 'agTextColumnFilter', minWidth: 300, maxWidth: 300 },
    { headerName: 'Teléfono', field: 'persona.phone', filter: 'agNumberColumnFilter', minWidth: 100, maxWidth: 100 },
    {
      headerName: 'Activo',
      field: 'isActive',
      filter: 'agSetColumnFilter',
      minWidth: 80, maxWidth: 80
    },
    {
      headerName: '',
      field: '',
      maxWidth: 60,
      minWidth: 40,
      cellRenderer: (rowData: any) => {
        return (
          <CustomUsuariosGridButton icon={DetailsIcon} iconSize={4} onClick={() => (handleNavigation(rowData.data))} />
        );
      }
    },
    {
      headerName: '',
      field: '',
      maxWidth: 60,
      minWidth: 40,
      cellRenderer: (rowData: any) => {
        return (
          <button className='text-primary' onClick={() => handleOnSelectUser(rowData.data)}>
            <DeleteIcon size={6} />
          </button>
        );
      }
    }

  ];
  return (
    <div className='flex w-full h-full flex-col'>
      <div className='flex w-full h-fit'>
        <ListadoUsuariosSearchBar handleOnChangeFilters={handleOnChangeFilters} rol='usuario' />
      </div>
      <div className='flex w-full h-full ag-theme-alpine items-center justify-center'>
        {loading ? <Spinner size='lg' /> : <div className='w-full h-full'>
          <AgGridReact
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowData={UserFiltered}
            pagination={true}
            paginationAutoPageSize
            suppressMovableColumns
          />
        </div>}
      </div>
      <ModalConfirmation isOpen={isOpen} message={`¿Esta seguro de eliminar definitivamente el usuario : ${userSelected && userSelected.institutionalEmail}?`}
        onClose={() => {
          setIsOpen(false);
        }}
        onConfirm={() => {
          handleOnConfirmDeleteUsuario();
          setIsOpen(false);
        }}
        isAcceptAction={true}
      />
      <ModalSuccess isOpen={isOpenModalSuccess} message={`Se elimino con éxito el usuario : ${userSelected && userSelected.institutionalEmail}`}
        onClose={() => {
          setUserSelected(null);
          setIsOpenModalSuccess(false);
          fetchUsers();
        }}
      />
      <ModalError isOpen={isOpenModalError} message='Ocurrió un problema inesperado. Intente nuevamente'
        onClose={() => {
          setUserSelected(null);
          setIsOpenModalError(false);
        }}
      />
    </div>
  );
}