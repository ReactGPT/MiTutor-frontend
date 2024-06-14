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
import { UnidadDerivacion } from '../../../store/types/UnidadDerivacion';
import { useUnidadContext } from '../../../context/UnidadDerivacionContext';
import InputTutor from '../../../components/Tutor/InputTutor';

const PageEditarUnidadDerivacion = () => {
  const [searchValue, setSearchValue] = useState('');

  const { unidad, onChangeUnidad } = useUnidadContext();

  const handleSearch = (query: string) => {
    console.log(unidad);
    setSearchValue(query);
  }

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-[#2F2F2F]">
          Unidades de Derivación
        </h1>
        <Button className="" onClick={() => {}} text="Agregar Unidad" />
      </div>

      <InputTutor titulo="Nombre" value={unidad?.nombre} enable={false} />

      <div className="w-full flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-[#2F2F2F]">
          Especialidades
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
            {/* <AgGridReact
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
                  fechaCreacion: unidad.fechaCreacion,
                }))
                .filter((item) =>
                  // item.nombre.toLowerCase().includes(searchValue.toLowerCase()) || item.siglas.toLowerCase().includes(searchValue.toLowerCase())
                )}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageEditarUnidadDerivacion;