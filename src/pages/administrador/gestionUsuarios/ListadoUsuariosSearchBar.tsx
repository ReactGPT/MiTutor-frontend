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

  const handleClickActualizarMasivo = () => {
    navigate(`/${rol}s/updateMasivo`);
  }

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
        {rol === "estudiante" && <Button onClick={handleClickActualizarMasivo} text="Actualizar" variant='primario' icon={ArrowUpload} />}
        <Button onClick={handleClickDescargar} text="Descargar" variant='secundario' icon={ArrowDownload} />
      </div>
    </div>

  );
}
