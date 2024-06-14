import React, { useEffect, useState } from 'react'
import { Button } from '../../components'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import SearchInput from '../../components/SearchInput';
import DeleteIcon from '../../assets/svg/DeleteIcon';
import { useTitle } from '../../context';
import { useUnidadDerivacion } from '../../store/hooks/useUnidadDerivacion';
import { useFaculties } from '../../store/hooks/useFaculties';

const PageUnidadFacultad = () => {
    const {faculties, fetchFaculties} = useFaculties();
    const {unidadData, fetchUnidadData} = useUnidadDerivacion();
    const {handleSetTitle} = useTitle();
    const [searchValue, setSearchValue] = useState('');
    handleSetTitle("Facultades y Unidades");

    useEffect(() => {fetchUnidadData()}, []);

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
    const columnDefs: ColDef[] = [
        
        { headerName: 'Siglas', field: 'siglas', minWidth:150},
        { headerName: 'Nombre', field: 'nombre',minWidth:240 },
        { headerName: 'Responsable', field: 'responsable', minWidth:200 },
        { headerName: 'Email', field: 'email', minWidth:200 },
        { headerName: 'Teléfono', field: 'telefono', minWidth:200 },
        {
          headerName: 'Estado',
          field: 'estado',
          minWidth:100,maxWidth:100
        },
        {
            headerName:'',
            field:'',
            maxWidth:60,
            minWidth:40,
            cellRenderer: (rowData:any)=>{
                /*return(
                    <CustomProgramaTutoriaGridButton icon={DetailsIcon} iconSize={4} onClick={()=>(handleNavigation(rowData.data))}/>
                )*/
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
    const columnFac: ColDef[] = [
        
      
      { headerName: 'Nombre', field: 'nombre',minWidth:240 },
      { headerName: 'Acronimo', field: 'acronimo', minWidth:150},
      { headerName: 'Numero de Estudiantes', field: 'numeroEstudiantes', minWidth:150},
      { headerName: 'Numero de Tutores', field: 'numeroTutores', minWidth:150},
      { headerName: 'Administrador', field: 'nombreAdmin', minWidth:200 },
      { headerName: 'Email', field: 'email', minWidth:200 },
      {
          headerName:'',
          field:'',
          maxWidth:60,
          minWidth:40,
          cellRenderer: (rowData:any)=>{
              /*return(
                  <CustomProgramaTutoriaGridButton icon={DetailsIcon} iconSize={4} onClick={()=>(handleNavigation(rowData.data))}/>
              )*/
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


        <div className="flex w-full h-[50%] ag-theme-alpine items-center justify-center">
          <div className="w-full h-full">
            <AgGridReact
              defaultColDef={defaultColDef}
              columnDefs={columnFac}
              rowData={faculties
                .map((facultad) => ({
                  nombre: facultad.Name,
                  acronimo: facultad.Acronym,
                  numeroEstudiantes: facultad.NumberOfStudents,
                  numeroTutores: facultad.NumberOfTutors,
                  nombreAdmin: facultad.FacultyManager.Persona.Name + " " + facultad.FacultyManager.Persona.LastName,
                  email: facultad.FacultyManager.InstitutionalEmail,
                }))
                .filter((item) =>
                  item.nombre.toLowerCase().includes(searchValue.toLowerCase())
                )}
            />
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

      <div className="flex w-full h-[70%] flex-col space-y-10 mt-10">
        <div className="flex w-full h-[50%] ag-theme-alpine items-center justify-center">
          <div className="w-full h-full">
            <AgGridReact
              defaultColDef={defaultColDef}
              columnDefs={columnDefs}
              rowData={unidadData
                .map((unidad) => ({
                  siglas: unidad.siglas,
                  nombre: unidad.nombre,
                  responsable: unidad.responsable,
                  email: unidad.email,
                  telefono: unidad.telefono,
                  estado: unidad.estado ? "Activo" : "Inactivo",
                }))
                .filter((item) =>
                  item.nombre.toLowerCase().includes(searchValue.toLowerCase())
                )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageUnidadFacultad;
