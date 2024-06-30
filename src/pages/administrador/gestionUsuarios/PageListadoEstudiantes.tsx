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
import { useUser } from '../../../store/hooks/useUser';
import { Spinner } from '../../../components';
import DeleteIcon from '../../../assets/svg/DeleteIcon';
//import { getEliminarTutoria } from '../../../store/services';
import ModalConfirmation from '../../../components/ModalConfirmation';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import { User } from '../../../store/types/User';
//import { Student } from '../../../store/types/User';


export default function PageListadoEstudiantes() {
  const navigate = useNavigate();
  //const history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);
  //const {isLoading,programaTutoriaData,fetchProgramaTutorias,postEliminarProgramaTutoria} = useProgramaTutoria();
  const { loading, userData, fetchStudents, deleteUser } = useUser();
  //const [programaSelected, setProgramaSelected] = useState<ProgramaTutoria | null>(null);
  const [studentSelected, setStudentSelected] = useState<User | null>(null);
  //const [programaTutoriaFiltered,setProgramaTutoriaFiltered] = useState<ProgramaTutoria[]|null>(null)
  useEffect(() => {
    //console.log("llamada fetch prog tutoria");
    //fetchProgramaTutorias();
    fetchStudents();
  }, []);

  const handleNavigation = (data: User) => {
    console.log(data);
    navigate("/estudiantes/detalle", { state: { userData: data } });
  };
  const handleOnSelectStudent = (estudiante: User) => {
    setStudentSelected(estudiante);
  };
  useEffect(() => {
    if (studentSelected) {
      setIsOpen(true);
    }
  }, [studentSelected]);
  const handleOnConfirmDeleteUsuario = () => {
    if (studentSelected && !!studentSelected.id) {
      deleteUser(studentSelected?.id)
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
    floatingFilter: true,
  };
  const columnDefs: ColDef[] = [

    { headerName: 'Código', field: 'pucpCode', filter: 'agTextColumnFilter', minWidth: 110, maxWidth: 120 },
    { headerName: 'Nombres', field: 'persona.name', filter: 'agTextColumnFilter', minWidth: 150 },
    { headerName: 'Primer Apellido', field: 'persona.lastName', filter: 'agTextColumnFilter', minWidth: 150 },
    { headerName: 'Segundo Apellido', field: 'persona.secondLastName', filter: 'agTextColumnFilter', minWidth: 150 },
    { headerName: 'Correo', field: 'institutionalEmail', filter: 'agTextColumnFilter', minWidth: 300, maxWidth: 300 },
    { headerName: 'Facultad', field: 'estudiante.facultyName', filter: 'agTextColumnFilter', minWidth: 300, maxWidth: 300 },
    { headerName: 'Especialidad', field: 'estudiante.specialtyName', filter: 'agTextColumnFilter', minWidth: 300, maxWidth: 300 },
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
          <button className='text-primary' onClick={() => handleOnSelectStudent(rowData.data)}>
            <DeleteIcon size={6} />
          </button>
        );
      }
    }

  ];
  return (
    <div className='flex w-full h-full flex-col gap-5'>
      <div className='flex w-full h-fit'>
        <div className="text-base text-primary font-medium w-1/2 flex flex-col items-start justify-center">
          <label>
            • Los alumnos tendrán acceso al sistema.
          </label>
        </div>
        <ListadoUsuariosSearchBar rol='estudiante' />
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
      <ModalConfirmation isOpen={isOpen} message={`¿Está seguro de eliminar definitivamente el usuario : ${studentSelected && studentSelected.institutionalEmail}?`}
        onClose={() => {
          setIsOpen(false);
        }}
        onConfirm={() => {
          handleOnConfirmDeleteUsuario();
          setIsOpen(false);
        }}
        isAcceptAction={true}
      />
      <ModalSuccess isOpen={isOpenModalSuccess} message={`Se eliminó con éxito el usuario : ${studentSelected && studentSelected.institutionalEmail}`}
        onClose={() => {
          setStudentSelected(null);
          setIsOpenModalSuccess(false);
          fetchStudents();
        }}
      />
      <ModalError isOpen={isOpenModalError} message='Ocurrió un problema inesperado. Intente nuevamente'
        onClose={() => {
          setStudentSelected(null);
          setIsOpenModalError(false);
        }}
      />
    </div>
  );
}