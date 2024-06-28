import React, { useEffect, useState } from 'react'
import { Button } from '../../../components'
import { User } from '../../../store/types/User'
import { useLocation, useNavigate } from 'react-router-dom'
import ModalConfirmation from '../../../components/ModalConfirmation'
import InputTutor from '../../../components/Tutor/InputTutor'
import DatosPersona from './DatosPersona'
import { UserProvider, useUserContext } from '../../../context/UsuarioNuevo'
import DatosCuenta from './DatosCuenta'
import { useUser } from '../../../store/hooks/useUser'
import ModalSuccess from '../../../components/ModalSuccess'
import ModalError from '../../../components/ModalError'
import { Spinner } from 'flowbite-react'
import { CloseIcon, SaveIcon } from '../../../assets'
import DatosEncabezadoCuenta from './DatosEncabezadoCuenta'
import DatosRol from './DatosRol'
import { Faculty, Specialty, TipoRol } from '../../../store/types'
import { ListUnitDerivation } from '../../../store/types/ListUnitDerivation'
import { UnitDerivation } from '../../../store/types/UnitDerivation'
import { setUnitDerivations } from '../../../store/slices'


export default function PageUsuario() {
  const { state } = useLocation();
  const { userData } = state;
  //console.log(userData);
  const navigate = useNavigate();
  const {fetchRoles:fetchRolUsuario,loading:isLoadingFetchUserRoles}=useUser();
  const [rolesFetched,setRolesFetched]=useState<TipoRol[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<TipoRol[]>([...rolesFetched]);
  const [specialtySelected,setEspecialtySelected]=useState<Specialty|null>(null);
  const [facultySelected,setFacultySelected]=useState<Faculty|null>(null);
  const [derivationUnitSelected,setDerivationUnitSelected]=useState<UnitDerivation|null>(null);
  useEffect(()=>{
    //console.log(userData);
    if(!!userData){
      fetchRolUsuario(userData.id)
      .then((roles)=>{
      setRolesFetched(roles);
      })
    }
    
  },[])
  return (
    <UserProvider user={userData}>
      <div className="flex w-full h-full">
        <div className="flex flex-col w-full h-full gap-6 px-4">
          <DatosEncabezadoCuenta derivationUnit={derivationUnitSelected}
                 facultySelected={facultySelected}
                 specialtySelected={specialtySelected}
                 rol='usuario' selectedRoles={selectedRoles}/>
          <div className='flex flex-row gap-10 w-full h-[55%]'>
            <div className='flex flex-col gap-2 w-1/2 min-h-[240px] border-custom drop-shadow-md px-4 py-2'>
              <DatosPersona />
            </div>
            <div className='flex flex-col gap-2 w-1/2 min-h-[240px] border-custom drop-shadow-md px-4 py-2'>
              <DatosCuenta />
            </div>
          </div>
          <div className='flex flex-row gap-10 w-full h-[30%]'>
            <div className='flex flex-col gap-2 w-full border-custom drop-shadow-md px-4 py-2'>
              <DatosRol 
                        selectedRoles={selectedRoles} 
                        setSelectedRoles={(roles:TipoRol[])=>{setSelectedRoles(roles)}} 
                        isLoading={isLoadingFetchUserRoles} 
                        rolesUsuario={rolesFetched}
                        facultySelected={facultySelected}
                        setFacultySelected={(facultad:Faculty|null)=>{setFacultySelected(facultad)}}
                        specialtySelected={specialtySelected}
                        setEspecialtySelected={(especialidad:Specialty|null)=>{setEspecialtySelected(especialidad)}}
                        derivationUnit={derivationUnitSelected}
                        setUnitDerivation={(unidadDerivacion:UnitDerivation|null)=>{setUnitDerivations(unidadDerivacion)}}
                        />
            </div>
            
              
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
