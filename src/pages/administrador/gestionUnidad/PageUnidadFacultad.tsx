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
import { useUnidadDerivacion } from '../../../store/hooks/useUnidadDerivacion';
import { useFacultades } from '../../../store/hooks/useFacultades';
import CustomUnidadGridButton from './CustomUnidadGridButton';
import { Facultad } from '../../../store/types/Facultad';
import { UnidadDerivacion } from '../../../store/types/UnidadDerivacion';

const PageUnidadFacultad = () => {
  const navigate = useNavigate();
  const {facultadData, fetchFacultadData} = useFacultades();
  const {unidadData, fetchUnidadData} = useUnidadDerivacion();
  const {handleSetTitle} = useTitle();
  const [searchValue, setSearchValue] = useState('');
  handleSetTitle("Unidades");

  useEffect(() => {fetchFacultadData()}, []);
  useEffect(() => {fetchUnidadData()}, []);

  const handleSearch = (query: string) => {
    setSearchValue(query);
  }
  const handleNavigationFacultad = (data: Facultad) => {
    console.log(data);
    navigate("/unidades/editarFacultad",{state:{facultadData:data}});
  };
  const getFacultadById = (id: number) => {
    return facultadData.find(facultad => facultad.id === id);
  };
  const handleNavigationUnidadDerivacion = (data: UnidadDerivacion) => {
    console.log(data);
    navigate("/unidades/editarUnidadDerivacion",{state:{userData:data}});
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
  const columnFac: ColDef[] = [
    { headerName: 'Nombre', field: 'nombre',minWidth:240 },
    { headerName: 'Acrónimo', field: 'acronimo', minWidth:150, maxWidth:180},
    { headerName: 'Núm. de Estudiantes', field: 'numeroEstudiantes', minWidth:130, maxWidth:180},
    { headerName: 'Núm. de Tutores', field: 'numeroTutores', minWidth:130, maxWidth:180},
    { headerName: 'Administrador', field: 'nombreAdmin', minWidth:200 },
    { headerName: 'Email', field: 'email', minWidth:200 },
    {
        headerName:'Modificar',
        field:'',
        maxWidth:100,
        minWidth:80,
        cellRenderer: (rowData:any)=>{
          return(
            <CustomUnidadGridButton 
            icon={DetailsIcon} 
            iconSize={4} 
            onClick={()=>{
              const facultad = getFacultadById(rowData.data.id);
              if(facultad)
                handleNavigationFacultad(facultad);
              else
                console.error("Facultad no encontrada");
            }}/>
          )
        }
    },
    {
        headerName:'',
        field:'',
        maxWidth:60,
        minWidth:40,
        cellRenderer:(rowData:any)=>{
            return(
                <button className='text-primary' onClick={()=>{}}>
                    <DeleteIcon size={6}/>
                </button>
            )
        }
    }

  ];
  const columnUni: ColDef[] = [
    { headerName: 'Siglas', field: 'siglas', minWidth:150},
    { headerName: 'Nombre', field: 'nombre',minWidth:240 },
    { headerName: 'Responsable', field: 'responsable', minWidth:200 },
    { headerName: 'Email', field: 'email', minWidth:200 },
    { headerName: 'Teléfono', field: 'telefono', minWidth:200 },
    { headerName: 'Estado', field: 'estado', minWidth:100, maxWidth:100},
    { headerName: 'Fecha de Creacion', field: 'fechaCreacion', minWidth:100, maxWidth:100},
    {
      headerName:'',
      field:'',
      maxWidth:60,
      minWidth:40,
      cellRenderer: (rowData:any)=>{
        return(
          <CustomUnidadGridButton 
            icon={DetailsIcon} 
            iconSize={4} 
            onClick={()=>{
              handleNavigationUnidadDerivacion(rowData.data);
            }}/>
        )
      }
    },
    {
      headerName:'',
      field:'',
      maxWidth:60,
      minWidth:40,
      cellRenderer:(rowData:any)=>{
        return(
          <button className='text-primary' onClick={()=>{}}>
            <DeleteIcon size={6}/>
          </button>
        )
      }
    }
  ];
  

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-[#2F2F2F]">
          Facultades
        </h1>
        <Button className="" onClick={() => {}} text="Agregar Facultad" />
      </div>

      <div className="w-full mt-[1%]">
        <SearchInput
          onSearch={handleSearch}
          handleOnChangeFilters={() => {}}
          placeholder="Siglas o nombre de la Facultad"
          selectDisabled={true}
        />
      </div>

      <div className="flex w-full h-[35%] flex-col mt-10">
        <div className="flex w-full h-[85%] ag-theme-alpine items-center justify-center">
          <div className="w-full h-full">
            <AgGridReact
              defaultColDef={defaultColDef}
              columnDefs={columnFac}
              rowData={facultadData
                .map((facultad) => ({
                  id: facultad.id,
                  nombre: facultad.name,
                  acronimo: facultad.acronym,
                  numeroEstudiantes: facultad.numberStudents,
                  numeroTutores: facultad.numberTutors,
                  nombreAdmin: facultad.facultyManager.persona.name + " " + facultad.facultyManager.persona.lastName,
                  email: facultad.facultyManager.institutionalEmail,

                }))
                .filter((item) =>
                  item.nombre.toLowerCase().includes(searchValue.toLowerCase()) || item.acronimo.toLowerCase().includes(searchValue.toLowerCase())
                )}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-[#2F2F2F]">
          Unidades de Derivación
        </h1>
        <Button className="" onClick={() => {}} text="Agregar Unidad" />
      </div>

      <div className="w-full mt-[1%]">
        <SearchInput
          onSearch={handleSearch}
          handleOnChangeFilters={() => {}}
          placeholder="Siglas o nombre de la Unidad"
          selectDisabled={true}
        />
      </div>

      <div className="flex w-full h-[35%] flex-col space-y-10 mt-10">
        <div className="flex w-full h-[85%] ag-theme-alpine items-center justify-center">
          <div className="w-full h-full">
            <AgGridReact
              defaultColDef={defaultColDef}
              columnDefs={columnUni}
              rowData={unidadData
                .map((unidad) => ({
                  id: unidad.unidadDerivacionId,
                  siglas: unidad.siglas,
                  nombre: unidad.nombre,
                  responsable: unidad.responsable,
                  email: unidad.email,
                  telefono: unidad.telefono,
                  estado: unidad.estado ? "Activo" : "Inactivo",
                  fechaCreacion: unidad.fechaCreacion,
                  esPadre: unidad.esPadre,
                }))
                .filter((item) =>
                  item.nombre.toLowerCase().includes(searchValue.toLowerCase()) || item.siglas.toLowerCase().includes(searchValue.toLowerCase())
                )}
            />
          </div>
        </div>
      </div>


    </div>
  );
}

export default PageUnidadFacultad;
