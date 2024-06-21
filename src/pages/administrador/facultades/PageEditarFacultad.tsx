import React, { useEffect, useState } from 'react';
import { Button } from '../../../components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import SearchInput from '../../../components/SearchInput';
import { DetailsIcon, PencilIcon } from '../../../assets';
import { useEspecialidad } from '../../../store/hooks/useEspecialidad';
import CustomUnidadGridButton from '../gestionUnidad/CustomUnidadGridButton';
import Facultad from '../../../store/types/Facultad';
import { FacultadProvider, useFacultadContext } from '../../../context/FacultadContext';
import { useLocation, useNavigate } from 'react-router-dom';
import InputAdmin2 from '../../../components/Administrador/InputAdmin2';
import ModalSearch from '../../../components/Administrador/ModalSearch';
import { useFacultades } from '../../../store/hooks/useFacultades';

const circleButtonStyles = 'bg-[rgba(235,236,250,1)]';

const PageEditarFacultad = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [editable, setEditable] = useState(false);
  const { state } = useLocation();
  const { facultadEstado } = state;
  const [facultadBorrador, setFacultadBorrador] = useState<Facultad>(facultadEstado);
  const { updateFacultad } = useFacultades();
  const { especialidadData, fetchEspecialidadPorFacultadData } = useEspecialidad();
  const [isOpenModalSearch, setIsOpenModalSearch] = useState<boolean>(false);

  useEffect(() => {
    setFacultadBorrador(facultadBorrador);
    fetchEspecialidadPorFacultadData(facultadEstado.id);
  }, [isOpenModalSearch]);

  const handleSearch = (query: string) => {
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

  const columnEsp: ColDef[] = [
    { headerName: 'Nombre', field: 'name', minWidth: 240 },
    { headerName: 'Acrónimo', field: 'acronym', minWidth: 150, maxWidth: 180 },
    { headerName: 'Numero de Estudiantes', field: 'numberStudents', minWidth: 130, maxWidth: 180 },
  ];

  const handleEditSaveButton = () => {
    if (editable) {
      if (facultadBorrador) {
        updateFacultad(facultadBorrador);
      }
    }
    setEditable(!editable);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFacultadBorrador((prevState) => {
      if (!prevState) {
        return facultadEstado;
      }
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleNavigation = () => {
    navigate("/unidades");
  };

  return (
    <FacultadProvider facultad={facultadBorrador}>
      <div className="w-full h-full">
        <div className="w-full h-fit flex justify-between items-center">
          <h1 className="text-4xl font-bold text-[#2F2F2F]">
            {`${facultadBorrador?.name}`}
          </h1>
          <Button className="" onClick={() => { handleEditSaveButton(); }} text={`${editable ? "Guardar" : "Editar"}`} />
        </div>
        <div className="h-fit grid grid-cols-2 gap-4 p-4">
          <div className='grid grid-cols-1'>
            <InputAdmin2
              titulo="Nombre de la Facultad"
              valor={facultadBorrador?.name}
              enable={editable}
              name="name"
              onChange={handleInputChange} />
            <div className='flex'>
              <InputAdmin2
                titulo="Código del Responsable" valor={facultadBorrador?.facultyManager?.pucpCode ? facultadBorrador?.facultyManager.pucpCode : '-'} enable={false} />
              <div className='w-[70%]'>
                <InputAdmin2
                  titulo="Nombre del Responsable"
                  className={`${facultadBorrador?.facultyManager?.persona ? "" : " text-[#b20000] "}`}
                  valor={facultadBorrador?.facultyManager?.persona?.name ? facultadBorrador?.facultyManager?.persona?.name + ' ' + facultadBorrador?.facultyManager?.persona?.lastName + ' ' + (facultadBorrador?.facultyManager?.persona?.secondLastName ? facultadBorrador?.facultyManager?.persona?.secondLastName : '') : "¡Falta Asignar Responsable!"}
                  onChange={handleInputChange}
                  enable={false} />
              </div>
              <div className='flex flex-col items-center justify-center p-4'>
                <button className={`flex text-primary rounded-full w-12 h-12 justify-center items-center shadow-custom border border-solid border-[rgba(116,170,255,0.70)] ${!editable ? 'bg-[rgba(225,_229,_232,_1.00)]' : circleButtonStyles}`} onClick={() => { setIsOpenModalSearch(true); }} disabled={!editable} >
                  <PencilIcon className='flex flex-col justify-center items-center' size={6} />
                </button>
              </div>

            </div>

          </div>
          <div className='grid grid-cols-2'>
            <InputAdmin2
              titulo="Siglas"
              valor={facultadBorrador?.acronym}
              onChange={handleInputChange}
              name="acronym"
              enable={editable} />
            <InputAdmin2 titulo="Estado" valor={facultadBorrador?.isActive ? 'Activa' : 'Inactiva'} enable={false} />
            <InputAdmin2 titulo="Número de Estudiantes" valor={facultadBorrador?.numberStudents.toString()} enable={false} />
            <InputAdmin2 titulo="Número de Tutores" valor={facultadBorrador?.numberTutors.toString()} enable={false} />
          </div>
        </div>

        <div className="w-full h-fit flex justify-between items-center mt-6">
          <h1 className="text-4xl font-bold text-[#2F2F2F]">
            Especialidades
          </h1>
        </div>

        <div className="w-full h-fit mt-[1%]">
          <SearchInput
            onSearch={handleSearch}
            handleOnChangeFilters={() => { }}
            placeholder="Ingresar acrónimo o nombre de la Especialidad"
            selectDisabled={true}
          />
        </div>

        <div className="flex w-full h-[40%] flex-col space-y-10 mt-10">
          <div className="flex w-full h-[85%] ag-theme-alpine items-center justify-center">
            <div className="w-full h-full">
              <AgGridReact
                defaultColDef={defaultColDef}
                columnDefs={columnEsp}
                rowData={especialidadData.filter((item) =>
                  item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.acronym.toLowerCase().includes(searchValue.toLowerCase())
                )
                }
              />
            </div>
          </div>
        </div>
        <ModalSearch
          isOpen={isOpenModalSearch}
          message={`¿Esta seguro de inhabilitar la unidad: ?`}
          onClose={() => {
            setIsOpenModalSearch(false);
          }}
          onAdd={() => {
            // handleOnConfirmDeleteFacultad();
            // handleOnAddAgregarFacultad();
            setIsOpenModalSearch(false);
            // fetch
          }}
          isAcceptAction={true}
          defaultColDef={defaultColDef}
          facultad={facultadBorrador}
          setFacultadData={(facultad: Facultad) => { setFacultadBorrador(facultad); }}
        />
      </div>
    </FacultadProvider>
  );
};

export default PageEditarFacultad;
