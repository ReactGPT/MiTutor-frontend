import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Facultad from "../store/types/Facultad";

type ContextProps = {
  children: ReactElement; // Componentes hijos envueltos por el proveedor
  facultad: Facultad | null;
};

type ContextContent = {
  facultad:Facultad;
  onChangeFacultad: (name:string,value:any)=>void;
  onChangeFacultadObject:(value:any)=>void;
}

// Creación del contexto
const FacultadContext = createContext<ContextContent>({} as ContextContent);

// Hook para acceder al contexto
const useFacultadContext = () => {
  const context = useContext(FacultadContext);
  return context;
};

function FacultadProvider({children,facultad:inputFacultad}:ContextProps){
  const defaultNewFacultad:Facultad ={
    id: 0,
    name: "",
    acronym: "",
    numberStudents: 0,
    numberTutors: 0,
    isActive: true,
    facultyManager: {
        id: 0,
        institutionalEmail: "",
        pucpCode: "",
        isActive: true,
        persona: {
            id: 0,
            name: "",
            lastName: "",
            secondLastName: "",
            phone: "",
            isActive: true,
            usuario: null,
        },
        roles: null,
        isVerified: true,
    },
    specialties: null,
    tutoringPrograms: null,
  }
  const [facultad,setFacultad] = useState<Facultad>({...(inputFacultad?inputFacultad:defaultNewFacultad)});
  useEffect(()=>{
    setFacultad({...(facultad?facultad:defaultNewFacultad)});
  },[inputFacultad]);

  const handleChangeFacultadObject=(value:any)=>{
    setFacultad({...value});
  }

  const handleChangeFacultad=(name:string,value:any)=>{
    setFacultad({...facultad,
          [name]:value
      })
  }
  return (
      <FacultadContext.Provider value={{ facultad:facultad, onChangeFacultad:handleChangeFacultad,onChangeFacultadObject:handleChangeFacultadObject }}>
        {children}
      </FacultadContext.Provider>
    );
};

export { FacultadContext, FacultadProvider, useFacultadContext};