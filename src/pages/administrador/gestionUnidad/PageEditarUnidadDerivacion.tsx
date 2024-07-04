import React, { useEffect, useState } from 'react';
import { Button } from '../../../components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import SearchInput from '../../../components/SearchInput';
import DeleteIcon from '../../../assets/svg/DeleteIcon';
import { DetailsIcon, PencilIcon } from '../../../assets';
import { useTitle } from '../../../context';
import { useNavigate } from 'react-router-dom';
import { useUnidadDerivacion } from '../../../store/hooks/useUnidadDerivacion';
import { useFacultades } from '../../../store/hooks/useFacultades';
import CustomUnidadGridButton from './CustomUnidadGridButton';
import UnidadDerivacion from '../../../store/types/UnidadDerivacion';
import { UnidadProvider, useUnidadContext } from '../../../context/UnidadDerivacionContext';
import { useLocation } from 'react-router-dom';
import InputAdmin2 from '../../../components/Administrador/InputAdmin2';
import ModalInputUnidad from '../../../components/Administrador/ModalInputUnidad';
import ModalInputUnidadUpdate from '../../../components/Administrador/ModalInputUnidadUpdate';
import ModalConfirmation from '../../../components/ModalConfirmation';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';

const circleButtonStyles = 'bg-[rgba(235,236,250,1)] shadow-custom border border-solid border-[rgba(116,170,255,0.70)]';

const subUnidadInicial: UnidadDerivacion = {
  unidadDerivacionId: 0,
  nombre: '',
  siglas: '',
  responsable: '',
  email: '',
  telefono: '',
  estado: true,
  esPadre: false,
  fechaCreacion: '',
  parentId: 0,
};

const PageEditarUnidadDerivacion = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { state } = useLocation();
  const { unidadData } = state;
  const { subUnidadData, fetchSubUnidadData, updateUnidad, deleteUnidad } = useUnidadDerivacion();
  const { unidad, onChangeUnidad } = useUnidadContext();
  const [editable, setEditable] = useState(false);
  const [unidadBorrador, setUnidadBorrador] = useState<UnidadDerivacion | null>(unidadData);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);
  const [isOpenModalInput, setIsOpenModalInput] = useState<boolean>(false);
  const [isOpenModalInputUnidadUpdate, setIsOpenModalInputUnidadUpdate] = useState<boolean>(false);

  const [subUnidadSelected, setSubUnidadSelected] = useState<UnidadDerivacion>(subUnidadInicial);
  const [subUnidadEditarSelected, setSubUnidadEditarSelected] = useState<UnidadDerivacion>(subUnidadInicial);

  useEffect(() => {
    fetchSubUnidadData(unidadData.unidadDerivacionId);
  }, [isOpenModalInput, isOpenModalInputUnidadUpdate, isOpen]);

  const handleOnConfirmDeleteSubUnidad = () => {
    console.log("uni selec nombre", subUnidadSelected);
    if (subUnidadSelected && !!subUnidadSelected) {
      deleteUnidad(subUnidadSelected.unidadDerivacionId)
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

  const handleOnSelectSubUnidad = (subunidad: UnidadDerivacion) => {
    setSubUnidadSelected(subunidad);
  };

  const handleOnSelectSubUnidadEditar = (subunidad: UnidadDerivacion) => {
    setSubUnidadEditarSelected(subunidad);
  };

  useEffect(() => {
    if (subUnidadEditarSelected !== subUnidadInicial) {
      setIsOpenModalInputUnidadUpdate(true);
    }
  }, [subUnidadEditarSelected]);

  useEffect(() => {
    if (subUnidadSelected !== subUnidadInicial) {
      setIsOpen(true);
    }
  }, [subUnidadSelected]);

  const handleSearch = (query: string) => {
    console.log(unidadData);
    setSearchValue(query);
  };



  const defaultColDef = {
    suppressHeaderMenuButton: true,
    flex: 1,
    sortable: true,
    resizable: true,
    cellStyle: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
  };
  const columnUni: ColDef[] = [
    { headerName: 'Siglas', field: 'siglas', minWidth: 150 },
    { headerName: 'Nombre', field: 'nombre', minWidth: 240 },
    { headerName: 'Responsable', field: 'responsable', minWidth: 200 },
    { headerName: 'Email', field: 'email', minWidth: 200 },
    { headerName: 'Teléfono', field: 'telefono', minWidth: 200 },
    { headerName: 'Estado', valueGetter: p => p.data?.estado ? "Activo" : "Inactivo", minWidth: 100, maxWidth: 100 },
    { headerName: 'Fecha de Creacion', field: 'fechaCreacion', minWidth: 100, maxWidth: 100 },
    {
      headerName: 'Editar',
      field: '',
      maxWidth: 100,
      minWidth: 80,
      cellRenderer: (rowData: any) => {
        return (
          <CustomUnidadGridButton
            icon={DetailsIcon}
            iconSize={4}
            onClick={() => {
              handleOnSelectSubUnidadEditar(rowData.data);
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
          <button className='text-primary' onClick={() => { handleOnSelectSubUnidad(rowData.data); }}>
            <DeleteIcon size={6} />
          </button>
        );
      }
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUnidadBorrador((prevState) => {
      if (!prevState) {
        return null;
      }
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleEditSaveButton = () => {
    if (editable) {
      if (unidadBorrador) {
        updateUnidad(unidadBorrador);
      }
    }
    setEditable(!editable);
  };

  return (
    <UnidadProvider unidad={unidadData}>
      <div className="w-full h-full">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#2F2F2F]">
            {`${unidadData?.nombre}`}
          </h1>
          <Button className="" onClick={() => { handleEditSaveButton(); }} text={`${editable ? "Guardar" : "Editar"} Unidad`} />
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          <div className='grid grid-cols-1'>
            <InputAdmin2
              titulo="Nombre de la Unidad de Derivación"
              valor={unidadData?.nombre}
              enable={editable}
              onChange={handleInputChange} />
            <div className='flex'>
              <div className='w-[40%]'>
                <InputAdmin2
                  titulo="Nombre del Responsable"
                  valor={unidadData?.responsable}
                  name="responsable"
                  enable={editable}
                  onChange={handleInputChange} />
              </div>
              <div className='w-[60%]'>
                <InputAdmin2
                  titulo="Email del Responsable"
                  valor={unidadData?.email}
                  name="email"
                  enable={editable}
                  onChange={handleInputChange} />
              </div>

            </div>

          </div>
          <div className='grid grid-cols-2 h-fit'>
            <InputAdmin2
              titulo="Siglas"
              valor={unidadData?.siglas}
              name="siglas"
              enable={editable}
              onChange={handleInputChange}
            />
            {/* <InputAdmin2 titulo="Estado" valor={unidadData?.estado} enable={false} /> */}
            <InputAdmin2
              titulo="Teléfono del Responsable"
              valor={unidadData?.telefono}
              name="telefono"
              enable={editable}
              onChange={handleInputChange}
            />
            <div>

            </div>
            <div>

            </div>
            {/* <InputAdmin2 titulo="Fecha de Creación" valor={unidadData?.fechaCreacion} enable={false} /> */}
          </div>

        </div>

        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#2F2F2F]">
            SubUnidades
          </h1>

        </div>
        <div className='grid grid-cols-2 gap-4 p-4 items-end'>
          <SearchInput
            onSearch={handleSearch}
            handleOnChangeFilters={() => { }}
            placeholder="Siglas o nombre de la SubUnidad"
            selectDisabled={true}
          />
          <div className='flex items-end align-center justify-between gap-4'>
            <Button
              variant="primario"
              onClick={() => { setIsOpenModalInput(true); }}
              text="Crear SubUnidad" className='w-[20%]' />
            {/* <InputAdmin2 titulo="Total SubUnidades" valor={subUnidadData.length.toString()} enable={false} noPad={true} /> */}
          </div>
        </div>

        <div className="flex w-full h-[35%] flex-col">
          <div className="flex w-full h-full ag-theme-alpine items-center justify-center">
            <div className="w-full h-full">
              <AgGridReact
                defaultColDef={defaultColDef}
                columnDefs={columnUni}
                rowData={subUnidadData.filter((item) =>
                  (item.nombre.toLowerCase().includes(searchValue.toLowerCase()) || item.siglas.toLowerCase().includes(searchValue.toLowerCase()))
                )}
              />
            </div>
          </div>
        </div>
        <ModalInputUnidadUpdate
          isOpen={isOpenModalInputUnidadUpdate}
          // isOpen={false}
          message={`¿Esta seguro de modificar la unidad: ?`}
          onClose={() => {
            setIsOpenModalInputUnidadUpdate(false);
          }}
          onAdd={() => {
            // handleOnConfirmDeleteFacultad();
            // handleOnAddAgregarFacultad();
            setIsOpenModalInputUnidadUpdate(false);
          }}
          isAcceptAction={true}
          esHijo={true}
          unidadEstado={subUnidadEditarSelected}
        />
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
          esHijo={true}
          idPadre={unidadData.unidadDerivacionId}
        />
        <ModalConfirmation isOpen={isOpen} message={`¿Esta seguro de inhabilitar la subunidad: ${subUnidadSelected && subUnidadSelected.nombre}?`}
          onClose={() => {
            setIsOpen(false);
          }}
          onConfirm={() => {
            handleOnConfirmDeleteSubUnidad();
            setIsOpen(false);
          }}
          isAcceptAction={true}
        />
        <ModalSuccess isOpen={isOpenModalSuccess} message={`Se elimino con éxito la subunidad: ${subUnidadSelected && subUnidadSelected.nombre}`}
          onClose={() => {
            setSubUnidadSelected(subUnidadInicial);
            setIsOpenModalSuccess(false);
          }}
        />
        <ModalError isOpen={isOpenModalError} message='Ocurrió un problema inesperado. Intente nuevamente'
          onClose={() => {
            setSubUnidadSelected(subUnidadInicial);
            setIsOpenModalError(false);
          }}
        />
      </div>
    </UnidadProvider>
  );
};

export default PageEditarUnidadDerivacion;