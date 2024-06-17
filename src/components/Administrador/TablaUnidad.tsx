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
import UnidadDerivacion from '../../store/types/UnidadDerivacion';
import { useUnidadDerivacion } from '../../store/hooks/useUnidadDerivacion';
import CustomUnidadGridButton from '../../pages/administrador/gestionUnidad/CustomUnidadGridButton';
import ModalConfirmation from '../ModalConfirmation';
import ModalSuccess from '../ModalSuccess';
import ModalError from '../ModalError';
import ModalInputUnidad from './ModalInputUnidad';

type TablaProps = {
  titulo: string,
  abreviatura: string,
  defaultColDef: object,
};

const TablaUnidad: React.FC<TablaProps> = ({
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
  // GENERICO
  const { unidadData, fetchUnidadData, deleteUnidad } = useUnidadDerivacion();
  const [unidadSelected, setUnidadSelected] = useState<UnidadDerivacion | null>(null);
  useEffect(() => { fetchUnidadData(); }, [isOpenModalInput]);

  const handleOnConfirmDeleteUnidad = () => {
    console.log("uni selec nombre", unidadSelected?.nombre);
    if (unidadSelected && !!unidadSelected) {
      deleteUnidad(unidadSelected.unidadDerivacionId)
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
  const handleNavigationUnidadDerivacion = (data: UnidadDerivacion) => {
    console.log(data);
    navigate("/unidades/editarUnidadDerivacion", { state: { unidadData: data } });
  };
  const handleOnSelectUnidad = (unidad: UnidadDerivacion) => {
    setUnidadSelected(unidad);
  };
  useEffect(() => {
    if (unidadSelected) {
      setIsOpen(true);
    }
  }, [unidadSelected]);

  const columnUni: ColDef[] = [
    { headerName: 'Siglas', field: 'siglas', minWidth: 150 },
    { headerName: 'Nombre', field: 'nombre', minWidth: 240 },
    { headerName: 'Responsable', field: 'responsable', minWidth: 200 },
    { headerName: 'Email', field: 'email', minWidth: 200 },
    { headerName: 'Teléfono', field: 'telefono', minWidth: 200 },
    { headerName: 'Estado', valueGetter: p => p.data?.estado ? "Activo" : "Inactivo", minWidth: 100, maxWidth: 100 },
    { headerName: 'Fecha de Creacion', field: 'fechaCreacion', minWidth: 100, maxWidth: 100 },
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
              handleNavigationUnidadDerivacion(rowData.data);
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
          <button className='text-primary' onClick={() => { handleOnSelectUnidad(rowData.data); }}>
            <DeleteIcon size={6} />
          </button>
        );
      }
    }
  ];

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-[#2F2F2F]">
          {titulo}
        </h1>
        <Button className="" onClick={() => { setIsOpenModalInput(true); }} text={`Agregar ${abreviatura}`} />
      </div>

      <div className="w-full mt-[1%]">
        <SearchInput
          onSearch={handleSearch}
          handleOnChangeFilters={() => { }}
          placeholder={`Siglas o nombre de la ${abreviatura}`}
          selectDisabled={true}
        />
      </div>

      <div className="flex w-full h-[35%] flex-col space-y-5 mt-5">
        <div className="flex w-full h-[85%] ag-theme-alpine items-center justify-center">
          <div className="w-full h-full">
            <AgGridReact
              defaultColDef={defaultColDef}
              columnDefs={columnUni}
              rowData={unidadData.filter((item) =>
                item.nombre.toLowerCase().includes(searchValue.toLowerCase()) || item.siglas.toLowerCase().includes(searchValue.toLowerCase())
              )}
              paginationAutoPageSize
              suppressMovableColumns
            />
          </div>
        </div>
      </div>

      <ModalInputUnidad
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
      <ModalConfirmation isOpen={isOpen} message={`¿Esta seguro de inhabilitar la unidad: ${unidadSelected && unidadSelected.nombre}?`}
        onClose={() => {
          setIsOpen(false);
        }}
        onConfirm={() => {
          handleOnConfirmDeleteUnidad();
          setIsOpen(false);
        }}
        isAcceptAction={true}
      />
      <ModalSuccess isOpen={isOpenModalSuccess} message={`Se elimino con éxito la unidad: ${unidadSelected && unidadSelected.nombre}`}
        onClose={() => {
          setUnidadSelected(null);
          setIsOpenModalSuccess(false);
          fetchUnidadData();
        }}
      />
      <ModalError isOpen={isOpenModalError} message='Ocurrió un problema inesperado. Intente nuevamente'
        onClose={() => {
          setUnidadSelected(null);
          setIsOpenModalError(false);
        }}
      />
    </>
  );
};

export default TablaUnidad;