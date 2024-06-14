import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UnidadDerivacion } from "../store/types/UnidadDerivacion";

type ContextProps = {
  children: ReactElement; // Componentes hijos envueltos por el proveedor
  unidad: UnidadDerivacion | null;
};

type ContextContent = {
  unidad:UnidadDerivacion;
  onChangeUnidad: (name:string,value:any)=>void;
  onChangeUnidadObject:(value:any)=>void;
}

// Creación del contexto
const UnidadContext = createContext<ContextContent>({} as ContextContent);

// Hook para acceder al contexto
const useUnidadContext = () => {
  const context = useContext(UnidadContext);
  return context;
};

function UnidadProvider({children,unidad:inputUnidad}:ContextProps){
  const defaultNewUnidad:UnidadDerivacion ={
    unidadDerivacionId: 0,
    nombre: "",
    siglas: "",
    responsable: "",
    email: "",
    telefono: "",
    estado: true,
    esPadre: true,
    fechaCreacion: "",
  }
  const [unidad,setUnidad] = useState<UnidadDerivacion>({...(inputUnidad?inputUnidad:defaultNewUnidad)});
  useEffect(()=>{
    setUnidad({...(unidad?unidad:defaultNewUnidad)});
  },[inputUnidad]);

  const handleChangeUnidadObject=(value:any)=>{
    setUnidad({...value});
  }

  const handleChangeUnidad=(name:string,value:any)=>{
    setUnidad({...unidad,
          [name]:value
      })
  }
  return (
      <UnidadContext.Provider value={{ unidad:unidad, onChangeUnidad:handleChangeUnidad,onChangeUnidadObject:handleChangeUnidadObject }}>
        {children}
      </UnidadContext.Provider>
    );
};

export { UnidadContext, UnidadProvider, useUnidadContext};