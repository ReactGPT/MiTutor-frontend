import React, { useEffect, useState } from 'react'
import { Button } from '../../../components'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import SearchInput from '../../../components/SearchInput';
import DeleteIcon from '../../../assets/svg/DeleteIcon';
import { DetailsIcon } from '../../../assets';
import { useTitle } from '../../../context';
import { useNavigate } from 'react-router-dom';
import { useEspecialidad } from '../../../store/hooks/useEspecialidad';
import { useFacultades } from '../../../store/hooks/useFacultades';
import CustomUnidadGridButton from './CustomUnidadGridButton';
import { Facultad } from '../../../store/types/Facultad';
import { FacultadProvider, useFacultadContext } from '../../../context/FacultadContext';
import InputTutor from '../../../components/Tutor/InputTutor';
import { useLocation } from 'react-router-dom';

const PageEditarFacultad = () => {
  const [searchValue, setSearchValue] = useState('');
  const { state } = useLocation();
  const { facultadData } = state;
  
  const { especialidadData, fetchEspecialidadData } = useEspecialidad();

  const handleSearch = (query: string) => {
    setSearchValue(query);
  }
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
    { headerName: 'Nombre', field: 'nombre',minWidth:240 },
    { headerName: 'Acrónimo', field: 'acronimo', minWidth:150, maxWidth:180},
    { headerName: 'Numero de Estudiantes', field: 'numeroEstudiantes', minWidth:130, maxWidth:180},
    {
        headerName:'Ver más',
        field:'',
        maxWidth:100,
        minWidth:80,
        cellRenderer: (rowData:any)=>{
          return(
            <CustomUnidadGridButton 
            icon={DetailsIcon} 
            iconSize={4} 
            onClick={()=>{
              // const facultad = getFacultadById(rowData.data.id);
              // if(facultad)
              //   // handleNavigationFacultad(facultad);
              // else
              //   console.error("Facultad no encontrada");
            }}/>
          )
        }
    }
  ];
  return (
    <FacultadProvider facultad={facultadData}>
      <div className="w-full h-full">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-4xl font-bold text-[#2F2F2F]">
            {`${facultadData?.name}`}
          </h1>
          <Button className="" onClick={() => {}} text="Editar" />
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
          <InputTutor titulo="Nombre de la Facultad" value={facultadData?.name} enable={false} />
          <InputTutor titulo="Siglas" value={facultadData?.acronym} enable={false} />
          <InputTutor titulo="Estado" value={facultadData?.isActive ? 'Activa' : 'Inactiva'} enable={false} />
          <InputTutor titulo="Responsable" value={facultadData?.name} enable={false} />
          <InputTutor titulo="Número de Estudiantes" value={facultadData?.numberStudents} enable={false} />
          <InputTutor titulo="Número de Tutores" value={facultadData?.numberTutors} enable={false} />
        </div>
        

        <div className="w-full flex justify-between items-center mt-6">
          <h1 className="text-4xl font-bold text-[#2F2F2F]">
            Especialidades
          </h1>
        </div>

        

        <div className="w-full mt-[1%]">
          <SearchInput
            onSearch={handleSearch}
            handleOnChangeFilters={() => {}}
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
                rowData={especialidadData
                  .map((especialidad) => ({
                    nombre: especialidad.name,
                    siglas: especialidad.acronym,
                    numeroEstudiantes: especialidad.numberStudents,
                    // email: especialidad.email,
                    // telefono: especialidad.telefono,
                    // estado: especialidad.estado ? "Activo" : "Inactivo",
                    // fechaCreacion: especialidad.fechaCreacion,
                  }))
                  // .filter((item) =>
                  //   // item.nombre.toLowerCase().includes(searchValue.toLowerCase()) || item.siglas.toLowerCase().includes(searchValue.toLowerCase())
                  // )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </FacultadProvider>
  );
}

export default PageEditarFacultad;
