import { useState, useEffect, useMemo } from 'react';
import ListadoUsuariosSearchBar from '../../administrador/gestionUsuarios/ListadoUsuariosSearchBar';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import CustomUsuariosGridButton from '../../administrador/gestionUsuarios/CustomUsuariosGridButton';
import { AddIcon, DetailsIcon } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../store/hooks/useUser';
import { Button, Spinner } from '../../../components';
import DeleteIcon from '../../../assets/svg/DeleteIcon';
//import { getEliminarTutoria } from '../../../store/services';
import ModalConfirmation from '../../../components/ModalConfirmation';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import { User } from '../../../store/types/User';

type InputProps = {
  className: string;
  students: User[];
  handleAddUser: (user: User) => void;
};

function AlumnosTable({ className, students, handleAddUser }: InputProps) {
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
  // useEffect(() => {
  //   //console.log("llamada fetch prog tutoria");
  //   //fetchProgramaTutorias();
  //   fetchStudents();
  // }, []);

  // const handleNavigation = (data: User) => {
  //   console.log(data);
  //   navigate("/estudiantes/detalle", { state: { userData: data } });
  // };
  // const handleOnSelectStudent = (estudiante: User) => {
  //   setStudentSelected(estudiante);
  // }
  // useEffect(() => {
  //   if (studentSelected) {
  //     setIsOpen(true);
  //   }
  // }, [studentSelected])
  // const handleOnConfirmDeleteUsuario = () => {
  //   if (studentSelected && !!studentSelected.id) {
  //     deleteUser(studentSelected?.id)
  //       .then((result) => {
  //         if (result) {
  //           setIsOpenModalSuccess(true);
  //         }
  //         else {
  //           setIsOpenModalError(true);
  //         }
  //         setIsOpen(false);
  //         //setProgramaSelected(null);
  //       })
  //   }
  // }

  // const [filters, setFilters] = useState<any>({
  //   idSpeciality: null,
  //   idFaculty: null,
  //   name: null
  // });

  // const handleOnChangeFilters = (filter: any) => {
  //   setFilters(filter);
  // };

  // const UserFiltered: User[] = useMemo(() => {
  //   return [...(userData).filter((item) =>
  //     item.persona.name.toLowerCase().includes(filters.name ? filters.name : "")
  //     //&&(filters.idSpeciality?filters.idSpeciality===item.especialidadId:true)&&(filters.idFaculty?filters.idFaculty===item.facultadId:true)
  //   )]
  // }, [userData, filters]);


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

    { headerName: 'Código', field: 'pucpCode', filter: 'agNumberColumnFilter', minWidth: 100, maxWidth: 100, sort: 'asc' },
    { headerName: 'Nombres', valueGetter: p => `${p.data.persona.lastName} ${p.data.persona.secondLastName ? p.data.persona.secondLastName : ''}, ${p.data.persona.name} `, filter: 'agTextColumnFilter', minWidth: 150 },
    { headerName: 'Correo', field: 'institutionalEmail', filter: 'agTextColumnFilter', minWidth: 200, maxWidth: 200 },
    { headerName: 'Facultad', field: 'estudiante.facultyName', filter: 'agTextColumnFilter', minWidth: 150, maxWidth: 200 },
    { headerName: 'Especialidad', field: 'estudiante.specialtyName', filter: 'agTextColumnFilter', minWidth: 150, maxWidth: 200 },
    {
      headerName: 'Activo',
      field: 'isActive',
      filter: 'agSetColumnFilter',
      minWidth: 50,
      maxWidth: 100
    },
    {
      headerName: '',
      field: '',
      maxWidth: 50,
      minWidth: 30,
      cellRenderer: (rowData: any) => {
        return (
          <Button icon={AddIcon} onClick={() => { handleAddUser(rowData.data); }} iconSize={4} />
        );
      }
    }

  ];

  return (
    <div className={className}>
      <div className='flex w-full h-full ag-theme-alpine ag-small-row items-center justify-center'>
        {loading ? <Spinner size='lg' /> : <div className='w-full h-full'>
          <AgGridReact
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowData={students}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 15, 20]}
          />
        </div>}
      </div>

    </div>
  );
}

export default AlumnosTable;