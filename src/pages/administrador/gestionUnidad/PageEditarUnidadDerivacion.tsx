import React, { useEffect, useState } from 'react'
import { Button } from '../../../components'
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
import { UnidadDerivacion } from '../../../store/types/UnidadDerivacion';
import { UnidadProvider, useUnidadContext } from '../../../context/UnidadDerivacionContext';
import { useLocation } from 'react-router-dom';
import InputAdmin from '../../../components/Administrador/InputAdmin';

const circleButtonStyles = 'bg-[rgba(235,236,250,1)] shadow-custom border border-solid border-[rgba(116,170,255,0.70)]';

const PageEditarUnidadDerivacion = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { state } = useLocation();
  const { unidadData } = state;
  const { subUnidadData, fetchSubUnidadData } = useUnidadDerivacion();
  const { unidad, onChangeUnidad } = useUnidadContext();

  console.log("unidad",unidadData);
  useEffect(() => {fetchSubUnidadData(unidadData.id)}, []);
  

  const handleSearch = (query: string) => {
    console.log(unidadData);
    setSearchValue(query);
  }

  const handleNavigationSubUnidadDerivacion = (data: UnidadDerivacion) => {
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
  const columnUni: ColDef[] = [
    { headerName: 'Siglas', field: 'siglas', minWidth:150},
    { headerName: 'Nombre', field: 'nombre',minWidth:240 },
    { headerName: 'Responsable', field: 'responsable', minWidth:200 },
    { headerName: 'Email', field: 'email', minWidth:200 },
    { headerName: 'Teléfono', field: 'telefono', minWidth:200 },
    { headerName: 'Estado', field: 'estado', minWidth:100, maxWidth:100},
    { headerName: 'Fecha de Creacion', field: 'fechaCreacion', minWidth:100, maxWidth:100},
    {
      headerName:'Editar',
      field:'',
      maxWidth:100,
      minWidth:80,
      cellRenderer: (rowData:any)=>{
        return(
          <CustomUnidadGridButton 
            icon={DetailsIcon} 
            iconSize={4} 
            onClick={()=>{
              handleNavigationSubUnidadDerivacion(rowData.data);
            }}/>
        )
      }
    },
    {
      headerName:'Eliminar',
      field:'',
      maxWidth:100,
      minWidth:80,
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
    <UnidadProvider unidad={unidadData}> 
      <div className="w-full h-full">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[28px] font-bold text-[#2F2F2F]">
            Unidades de Derivación
          </h1>
          <Button className="" onClick={() => {}} text="Agregar Unidad" />
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
            <div className='grid grid-cols-1'>
              <InputAdmin titulo="Nombre de la Unidad de Derivación" value={unidadData?.nombre} enable={false}/>
              <div className='flex'>
                <div className='w-full'>
                  <InputAdmin 
                    titulo="Nombre del Responsable" 
                    value={unidadData?.responsable}
                    enable={false} />
                </div>
                
              </div>
              
            </div>
            <div className='grid grid-cols-2'>
              <InputAdmin titulo="Siglas" value={unidadData?.siglas} enable={false} />
              <InputAdmin titulo="Estado" value={unidadData?.estado} enable={false} />
              <InputAdmin titulo="Fecha de Creación" value={unidadData?.fechaCreacion} enable={false} />
            </div>
            
          </div>

        <div className="w-full flex justify-between items-center">
          <h1 className="text-[28px] font-bold text-[#2F2F2F]">
            SubUnidades
          </h1>
          
        </div>  
        <div className='grid grid-cols-2 gap-4 p-4 items-end'>
          <SearchInput
            onSearch={handleSearch}
            handleOnChangeFilters={() => {}}
            placeholder="Siglas o nombre de la SubUnidad"
            selectDisabled={true}
          />
          <div className='flex items-end align-center justify-between gap-4'>
            <Button variant="primario" onClick={() => {}} text="Crear SubUnidad" className='w-[20%]'/>
            <InputAdmin titulo="Total SubUnidades" value={subUnidadData.length.toString()} enable={false} noPad={true}/>
          </div>
        </div>

        <div className="flex w-full h-[35%] flex-col space-y-10 mt-10">
          <div className="flex w-full h-[85%] ag-theme-alpine items-center justify-center">
            <div className="w-full h-full">
              <AgGridReact
                defaultColDef={defaultColDef}
                columnDefs={columnUni}
                rowData={subUnidadData
                  .map((unidad) => ({
                    siglas: unidad.siglas,
                    nombre: unidad.nombre,
                    responsable: unidad.responsable,
                    email: unidad.email,
                    telefono: unidad.telefono,
                    estado: unidad.estado ? "Activo" : "Inactivo",
                    fechaCreacion: unidad.fechaCreacion,
                  }))
                  .filter((item) =>
                    (item.nombre.toLowerCase().includes(searchValue.toLowerCase()) || item.siglas.toLowerCase().includes(searchValue.toLowerCase()))
                  )}
              />
            </div>
          </div>
        </div>
      </div>
    </UnidadProvider>
  );
}

export default PageEditarUnidadDerivacion;