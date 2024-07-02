import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dropdown } from '../../../components';
import { AddCircleIcon, UserPlus, ArrowDown, ArrowDownload, ArrowUpload, AddIcon } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../store/hooks/useUser';
import { writeFile, utils } from 'xlsx';

type InputProps = {
  rol: "estudiante" | "usuario";
};

export default function ListadoUsuariosSearchBar({ rol }: InputProps) {
  const navigate = useNavigate();
  const { loading, userData, fetchUsers, fetchStudents } = useUser();
  const [triggerDownload, setTriggerDownload] = useState(false); // Estado para controlar la descarga

  const handleClickNuevoUsuario = () => {
    navigate(`/${rol}s/nuevo`, { state: { userData: null } });
  };

  const capitalize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const handleClickImportarMasivo = () => {
    navigate(`/${rol}s/cargaMasiva`, { state: { rol: rol } });
  };

  const handleClickDescargar = async () => {
    if(rol === "estudiante") await fetchStudents(); // Espera a que se carguen los datos en userData
    else await fetchUsers(); // Espera a que se carguen los datos en userData

    // pequeño retraso para aseguraR que datos estén disponibles
    await new Promise(resolve => setTimeout(resolve, 500));

    // Indicar que se debe iniciar la descarga
    setTriggerDownload(true);
  };

  useEffect(() => {
    if (userData.length > 0 && triggerDownload) {
      // Procesar userData para filtrar y descargar el archivo
      const filteredData = userData.map(user => ({
        CorreoInstitucional: user.institutionalEmail,
        CodigoPUCP: user.pucpCode,
        Nombres: user.persona.name,
        PrimerApellido: user.persona.lastName,
        SegundoApellido: user.persona.secondLastName,
        Telefono: user.persona.phone,
        Activo: user.isActive,
        CreationDate: user.creationDate,
        ModificationDate: user.modificationDate,
        ...(rol === "estudiante" && {
          Facultad: user.estudiante?.facultyName,
          Especialidad: user.estudiante?.specialtyName
        })
      }));

      const hoja = utils.json_to_sheet(filteredData);
      const libro = utils.book_new();
      utils.book_append_sheet(libro, hoja, `${rol}s`);
      writeFile(libro, `${rol}s.xlsx`);

      // Reiniciar el estado de triggerDownload después de la descarga
      setTriggerDownload(false);
    }
  }, [userData, triggerDownload]); // Dependencias: userData y triggerDownload

  return (
    <div className='flex w-1/2 h-full flex-row'>
      <div className='flex w-full justify-end gap-5'>
        <Button onClick={handleClickNuevoUsuario} text={`Agregar ${capitalize(rol)}`} icon={UserPlus} />
        <Button onClick={handleClickImportarMasivo} text="Importar" variant='primario' icon={ArrowUpload} />
        <Button onClick={handleClickDescargar} text="Descargar" variant='secundario' icon={ArrowDownload} />
      </div>
    </div>

  );
}

/*
        


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
