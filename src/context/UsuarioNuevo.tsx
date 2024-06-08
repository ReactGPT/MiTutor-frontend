import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { User } from '../store/types/User';

// Propiedades del proveedor de contexto
type ContextProps = {
  children: ReactElement; // Componentes hijos envueltos por el proveedor
  user: User | null;
};

type ContextContent = {
  user:User;
  onChangeUser: (name:string,value:any)=>void;
  onChangeUserObject:(value:any)=>void;
}

// Creación del contexto
const UserContext = createContext<ContextContent>({} as ContextContent);

// Hook para acceder al contexto
const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

function UserProvider({children,user:inputUsuario}:ContextProps){
  const defaultNewUser:User ={
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
    },
    roles: null,
    isVerified: true
  }
  const [user,setUser] = useState<User>({...(inputUsuario?inputUsuario:defaultNewUser)});
  useEffect(()=>{
      setUser({...(user?user:defaultNewUser)});
  },[inputUsuario]);

  const handleChangeUsuarioObject=(value:any)=>{
      setUser({...value});
  }

  const handleChangeUsuario=(name:string,value:any)=>{
    setUser({...user,
          [name]:value
      })
  }
  return (
      <UserContext.Provider value={{ user:user, onChangeUser:handleChangeUsuario,onChangeUserObject:handleChangeUsuarioObject }}>
        {children}
      </UserContext.Provider>
    );
};

export { UserContext, UserProvider, useUserContext};