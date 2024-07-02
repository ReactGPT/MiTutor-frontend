import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
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
import CustomUsuariosGridButton from '../../administrador/gestionUsuarios/CustomUsuariosGridButton';
import { DerivationBienestar } from '../../../store/types/Derivation';
import EtiquetaCompromiso from '../../../components/Tutor/EtiquetaCompromiso';


export default function PageListadoDerivaciones() {
  const navigate = useNavigate();
  const [DerivationData, setDerivationData] = useState<DerivationBienestar[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  //const { loading, DerivationData, fetchDerivaciones} = useDerivaciones(); AQUÍ TRAEMOS EL LISTADO DE DERIVACIONES
  const [derivationSelected, setDerivationSelected] = useState<DerivationBienestar | null>(null);
  
  //derivaciones ejemplo:
  const fetchDerivaciones = () => {
    // Aquí deberías hacer el fetch a tu API para obtener las derivaciones
    const exampleData: DerivationBienestar[] = [
      {
        derivationId: 1,
        reason: "Se deriva por mal comportamiento.",
        comment: "Conversar seriamente.",
        status: "Pendiente",
        creationDate: "2024-06-22",
        unitDerivationName: "Suboficina de rendimiento",
        correoAlumno: "estudiante1@ejemplo.com",
        nombreAlumno: "Nuevo Estudiante Prueba",
        codigoAlumno: "25836974",
        correoTutor: "tutor1@ejemplo.com",
        nombreTutor: "Tutor Ejemplo 1",
        codigoTutor: "12345678",
        programName: "Nueva tutoría de Teología Cachimbos",
        observaciones: "Se debe conversar seriamente con el estudiante."
      },
      {
        derivationId: 2,
        reason: "Asistencia irregular.",
        comment: "Revisión de asistencia.",
        status: "Atendido",
        creationDate: "2024-06-20",
        unitDerivationName: "Oficina de Asistencia",
        correoAlumno: "estudiante2@ejemplo.com",
        nombreAlumno: "Estudiante Ejemplo 2",
        codigoAlumno: "87654321",
        correoTutor: "tutor2@ejemplo.com",
        nombreTutor: "Tutor Ejemplo 2",
        codigoTutor: "87654321",
        programName: "Tutoría de Asistencia",
        observaciones: "Se debe revisar la asistencia del estudiante."
      },
      {
        derivationId: 3,
        reason: "Asistencia irregular.",
        comment: "Revisión de asistencia.",
        status: "Observado",
        creationDate: "2024-06-20",
        unitDerivationName: "Oficina de Asistencia",
        correoAlumno: "estudiante2@ejemplo.com",
        nombreAlumno: "Estudiante Ejemplo 2",
        codigoAlumno: "87654321",
        correoTutor: "tutor2@ejemplo.com",
        nombreTutor: "Tutor Ejemplo 2",
        codigoTutor: "87654321",
        programName: "Tutoría de Asistencia",
        observaciones: "Se debe revisar la asistencia del estudiante."
      }
    ];

    setDerivationData(exampleData);
  };
  
  
  useEffect(() => {
    //DESCOMENTAR ESTA LÍNEA
    fetchDerivaciones();
  }, []);

  const handleNavigation = (data: DerivationBienestar) => {
    console.log(data);
    navigate("/derivaciones/detalle", { state: { derivationData: data } });
  };

  const handleOnSelectStudent = (derivation: DerivationBienestar) => {
    setDerivationSelected(derivation);
  };

  useEffect(() => {
    if (derivationSelected) {
      //setIsOpen(true);
    }
  }, [derivationSelected]);

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

    { headerName: 'Código Alumno', field: 'codigoAlumno', filter: 'agTextColumnFilter', minWidth: 150, maxWidth: 150 },
    { headerName: 'Nombres Alumno', field: 'nombreAlumno', filter: 'agTextColumnFilter', minWidth: 180 },
    { headerName: 'Código Tutor', field: 'codigoTutor', filter: 'agTextColumnFilter', minWidth: 150 },
    { headerName: 'Nombres Tutor', field: 'nombreTutor', filter: 'agTextColumnFilter', minWidth: 180 },
    { headerName: 'Unidad Derivación', field: 'unitDerivationName', filter: 'agTextColumnFilter', minWidth: 280, maxWidth: 300 },
    { headerName: 'Fecha Creación', field: 'creationDate', filter: 'agTextColumnFilter', minWidth: 150, maxWidth: 150 },
    { 
      headerName: 'Estado', 
      field: 'status', 
      filter: true,
      filterParams: { values: ["Pendiente", "Observado", "Completado"] },
      minWidth: 150, 
      maxWidth: 150,
      cellRenderer: (params: { value: string }) => <EtiquetaCompromiso variant={params.value} />,
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
    }
  ];
  return (
    <div className='flex w-full h-full flex-col'>
      <div className='flex w-full h-full ag-theme-alpine items-center justify-center'>
        {loading ? <Spinner size='lg' /> : <div className='w-full h-full'>
          <AgGridReact
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowData={DerivationData}
            rowHeight={60}
            pagination={true}
            paginationAutoPageSize
            suppressMovableColumns
          />
        </div>}
      </div>
    </div>
  );
}