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
import ModalConfirmation from '../../../components/ModalConfirmation';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import { User } from '../../../store/types/User';
import { useAuth } from '../../../context';


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

  const { userData:userLogin } = useAuth(); 
  const roles = userLogin?.userInfo?.roles;
  useEffect(() => {
    //console.log("llamada fetch prog tutoria");
    //fetchProgramaTutorias();
    fetchStudents();
  }, []);

  const handleNavigation = (data: User) => {
    console.log(data);
    navigate("/estudiantes/detalle", { state: { userData: data, isAdmin } });
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

  let isAdmin: number = 0;

  const UserFiltered: User[] = useMemo(() => {
    let filteredUsers: User[]=[];
       
    // Filtrar por rol específico y facultad si aplica
    if (roles) { 
      //ADMIN GENERAL
      const adminRole = roles.find(role => role.type === "ADMIN");

      if (adminRole) {
        isAdmin = 1;
        filteredUsers = userData.filter((item) =>
          item.persona.name.toLowerCase().includes(filters.name ? filters.name.toLowerCase() : "")
        );
      } 
      //FACULTAD
      const uniqueStudentIds = new Set<number>();
  
      roles.forEach(role => {
        if (role.rolName === 'Responsable de Facultad') {
          const facultyId = parseInt((role.details as any).departmentId, 10);
  
          userData.forEach(user => {
            if (typeof user.id === 'number' && user.estudiante?.facultyId === facultyId) {
              if (!uniqueStudentIds.has(user.id)) {
                uniqueStudentIds.add(user.id);
                filteredUsers.push(user);
              }
            }
          });
        }
      });
    }
  
    return filteredUsers;
  }, [userData, filters, roles]);
  

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
    { headerName: 'Correo', field: 'institutionalEmail', filter: 'agTextColumnFilter', minWidth: 300, maxWidth: 300 },
    { headerName: 'Código', field: 'pucpCode', filter: 'agTextColumnFilter', minWidth: 110, maxWidth: 120 },
    { headerName: 'Nombres', field: 'persona.name', filter: 'agTextColumnFilter', minWidth: 150 },
    { headerName: 'Primer Apellido', field: 'persona.lastName', filter: 'agTextColumnFilter', minWidth: 150 },
    { headerName: 'Segundo Apellido', field: 'persona.secondLastName', filter: 'agTextColumnFilter', minWidth: 150 },
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
    ...(isAdmin === 1 ? [{
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
    }] : []) 
  ];
  return (
    <div className='flex w-full h-full flex-col gap-5'>
      {isAdmin === 1 && (
        <div className='flex w-full h-fit'>
          <div className="text-base text-primary font-medium w-1/2 flex flex-col items-start justify-center">
            <label>
              • Los alumnos tendrán acceso al sistema.
            </label>
          </div>
          <ListadoUsuariosSearchBar rol='estudiante' />
        </div>
      )}
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