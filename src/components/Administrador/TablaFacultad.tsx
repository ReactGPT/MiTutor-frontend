import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../SearchInput';
import DeleteIcon from '../../assets/svg/DeleteIcon';
import { DetailsIcon } from '../../assets';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import Button from '../Button';
import CustomUnidadGridButton from '../../pages/administrador/gestionUnidad/CustomUnidadGridButton';
import ModalInput from './ModalInput';
import ModalConfirmation from '../ModalConfirmation';
import ModalSuccess from '../ModalSuccess';
import ModalError from '../ModalError';
import { useFacultades } from '../../store/hooks/useFacultades';
import Facultad from '../../store/types/Facultad';

type FacultadDelete = {
  id: number,
  name: string,
};

type TablaProps = {
  titulo: string,
  abreviatura: string,
  defaultColDef: object,
};

const facultadInicial: Facultad = {
  id: 0,
  name: "",
  acronym: "",
  numberStudents: 0,
  numberTutors: 0,
  isActive: true,
  facultyManager: {
    id: 0,
    institutionalEmail: "",
    pucpCode: "",
    isActive: true,
    persona: {
      id: 0,
      name: "",
      lastName: "",
      secondLastName: null,
      phone: null,
      isActive: true,
      usuario: null,
    },
    roles: null,
    isVerified: false,
  },
  specialties: null,
  tutoringPrograms: null,
};

const Tabla: React.FC<TablaProps> = ({
  titulo,
  abreviatura,
  defaultColDef,
}: TablaProps) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (query: string) => {
    setSearchValue(query);
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);
  const [isOpenModalInput, setIsOpenModalInput] = useState<boolean>(false);

  const { facultadData, fetchFacultadData, deleteFacultad } = useFacultades();
  const [facultadSelected, setFacultadSelected] = useState<FacultadDelete | null>(null);

  useEffect(() => { fetchFacultadData(); }, [isOpenModalInput]);

  const handleOnConfirmDeleteFacultad = () => {
    // console.log("uni selec nombre",facultadSelected?.nombre);
    if (facultadSelected && !!facultadSelected) {
      deleteFacultad(facultadSelected.id)
        .then((result) => {
          if (result) {
            setIsOpenModalSuccess(true);
          }
          else {
            setIsOpenModalError(true);
          }
          setIsOpen(false);
        });
    }
  };

  const handleOnSelectFacultad = (facultad: FacultadDelete) => {
    setFacultadSelected(facultad);
  };
  useEffect(() => {
    if (facultadSelected) {
      setIsOpen(true);
    }
  }, [facultadSelected]);
  const handleNavigationFacultad = (data: Facultad) => {
    navigate("/facultades/editarFacultad", { state: { facultadEstado: data } });
  };
  const getFacultadById = (id: number) => {
    let facultadNoNula = facultadData.find(facultad => facultad.id === id);
    if (!facultadNoNula) facultadNoNula = facultadInicial;
    return facultadNoNula;
  };

  const columnFac: ColDef[] = [
    { headerName: 'Nombre', field: 'name', minWidth: 240 },
    { headerName: 'Acrónimo', field: 'acronym', minWidth: 150, maxWidth: 180 },
    { headerName: 'Núm. de Estudiantes', field: 'numberStudents', minWidth: 130, maxWidth: 180 },
    { headerName: 'Núm. de Tutores', field: 'numberTutors', minWidth: 130, maxWidth: 180 },
    { headerName: 'Administrador', valueGetter: p => p.data?.facultyManager?.persona ? p.data?.facultyManager?.persona?.name + " " + p.data?.facultyManager?.persona?.lastName : "No asignado", minWidth: 200 },
    { headerName: 'Email', valueGetter: p => p.data?.facultyManager?.institutionalEmail ? p.data?.facultyManager?.institutionalEmail : "No asignado", minWidth: 250 },
    { headerName: 'Estado', valueGetter: p => p.data?.isActive ? "Activo" : "Inactivo", minWidth: 100, maxWidth: 100 },
    {
      headerName: 'Modificar',
      field: '',
      maxWidth: 100,
      minWidth: 80,
      cellRenderer: (rowData: any) => {
        return (
          <CustomUnidadGridButton
            icon={DetailsIcon}
            iconSize={4}
            onClick={() => {
              const facultad = getFacultadById(rowData.data.id);
              if (facultad)
                handleNavigationFacultad(facultad);
              else
                console.error("Facultad no encontrada");
            }} />
        );
      }
    },
    {
      headerName: 'Eliminar',
      field: '',
      maxWidth: 100,
      minWidth: 80,
      cellRenderer: (rowData: any) => {
        return (
          <button className='text-primary' onClick={() => {
            const facultad: FacultadDelete = {
              id: rowData.data.id,
              name: rowData.data.nombre
            };
            handleOnSelectFacultad(facultad);
          }}>
            <DeleteIcon size={6} />
          </button>
        );
      }
    }

  ];

  return (
    <div className='w-full h-full flex flex-col'>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-[#2F2F2F]">
          {titulo}
        </h1>
        <Button
          className=""
          onClick={() => { setIsOpenModalInput(true); }}
          text={`Agregar ${abreviatura}`} />
      </div>

      <div className="w-full mt-[1%]">
        <SearchInput
          onSearch={handleSearch}
          handleOnChangeFilters={() => { }}
          placeholder={`Siglas o nombre de la ${abreviatura}`}
          selectDisabled={true}
        />
      </div>

      <div className="flex w-full h-full flex-col space-y-5 mt-5 ag-theme-alpine items-center">
        <div className="w-full h-full ag-theme-alpine items-center">
          <AgGridReact
            defaultColDef={defaultColDef}
            columnDefs={columnFac}
            rowData={facultadData.filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.acronym.toLowerCase().includes(searchValue.toLowerCase())
            )}
            paginationAutoPageSize
            suppressMovableColumns
          />
        </div>
      </div>

      <ModalInput
        isOpen={isOpenModalInput}
        message={`¿Esta seguro de inhabilitar la unidad: ?`}
        onClose={() => {
          setIsOpenModalInput(false);
        }}
        onAdd={() => {
          // handleOnConfirmDeleteFacultad();
          // handleOnAddAgregarFacultad();
          setIsOpenModalInput(false);
        }}
        isAcceptAction={true}
      />
      <ModalConfirmation isOpen={isOpen} message={`¿Esta seguro de inhabilitar la unidad: ${facultadSelected && facultadSelected.name}?`}
        onClose={() => {
          setIsOpen(false);
        }}
        onConfirm={() => {
          handleOnConfirmDeleteFacultad();
          setIsOpen(false);
        }}
        isAcceptAction={true}
      />
      <ModalSuccess isOpen={isOpenModalSuccess} message={`Se elimino con éxito la unidad: ${facultadSelected && facultadSelected.name}`}
        onClose={() => {
          setFacultadSelected(null);
          setIsOpenModalSuccess(false);
          fetchFacultadData();
        }}
      />
      <ModalError isOpen={isOpenModalError} message='Ocurrió un problema inesperado. Intente nuevamente'
        onClose={() => {
          setFacultadSelected(null);
          setIsOpenModalError(false);
        }}
      />
    </div>
  );
};

export default Tabla;