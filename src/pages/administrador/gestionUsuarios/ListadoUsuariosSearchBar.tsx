import React, { useEffect, useMemo, useState } from 'react'
import { Button, Dropdown } from '../../../components'
import { AddCircleIcon, UserPlus, ArrowDown, ArrowDownload,ArrowUpload, AddIcon } from '../../../assets'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../store/hooks/useUser';
import { writeFile, utils } from 'xlsx';

type InputProps = {
  handleOnChangeFilters: (filter: any) => void;
  rol: "estudiante" | "usuario";
}

export default function ListadoUsuariosSearchBar({ handleOnChangeFilters, rol }: InputProps) {
  const navigate = useNavigate();
  const { loading,  userData, fetchUsers } = useUser();

  const handleClickNuevoUsuario = () => {
    navigate(`/${rol}s/nuevo`, { state: { userData: null } });
  }

  const capitalize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  const handleClickImportarMasivo = () => {
    navigate(`/${rol}s/cargaMasiva`);
  }

  const handleClickDescargar = async () => {
    await fetchUsers();
    while(loading);
    // Filtrar y transformar los datos
    const filteredData = userData.map(user => ({
      CorreoInstitucional: user.institutionalEmail,
      CodigoPUCP: user.pucpCode,
      Nombres: user.persona.name,
      PrimerApellido: user.persona.lastName,
      SegundoApellido: user.persona.secondLastName,
      Telefono: user.persona.phone,
      Activo: user.isActive,
      CreationDate: user.creationDate,
      ModificationDate: user.modificationDate
    }));

    // Crear una hoja de trabajo
    const hoja = utils.json_to_sheet(filteredData);

    // Crear un libro de trabajo
    const libro = utils.book_new();
    utils.book_append_sheet(libro, hoja, 'Usuarios');

    // Descargar el archivo
    writeFile(libro, 'usuarios.xlsx');
  }

  return (
    <div className='flex w-full h-full flex-row py-0'>
      <div className='flex w-full h-12 justify-end space-x-4'>
        <Button onClick={handleClickNuevoUsuario} text={`Agregar ${capitalize(rol)}`} icon={UserPlus} />
      </div>
    </div>

  )
}

/*
        <Button onClick={handleClickImportarMasivo} text="Importar" variant='primario' icon={ArrowUpload} />
        <Button onClick={handleClickDescargar} text="Descargar" variant='secundario' icon={ArrowDownload} />


<form className="w-[70%] max-w-[70%] min-w-[70%] h-full flex flex-row gap-4" onSubmit={handleOnSubmit}>

        <Combobox className='w-[250px] ' text='Seleccione una Facultad' options={facultyList} onChange={handleOnChangeFaculty} value={facultySelected} />
        <Combobox className='w-[300px] ' text='Seleccione una especialidad' options={specialityOptions} onChange={setSpecialitySelected} value={specialitySelected} />
        <span className='flex gap-1'>
          <InputCell boxSize='w-[250px] h-[37px] mt-1' text={searchQuery} onChange={{ tipo: "simple", onChange: handleOnChangeQuery }} />

          <Button onClick={() => console.log(filters)} icon={MagnifyGlass} iconSize={4} />
        </span>
      </form>


<div className='flex w-full h-full flex-row'>
        <div className='flex flex-row w-[70%] h-full'>
            {<Cell boxSize='p-3'/>
            <Filters onChange={()=>{}} value={{entity_key:"1",entity_value:"Especialidad/Facultad"}} options={[]}/>}
            </div>
            <div>
                <Button onClick={()=>{}} text="Nueva Tutoria" icon={AddCircleIcon}/>
            </div>
            
        </div>


*/
