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
  user: User;
  onChangeUser: (name: string, value: any) => void;
  onChangeUserObject: (value: any) => void;
}

// Creación del contexto
const UserContext = createContext<ContextContent>({} as ContextContent);

// Hook para acceder al contexto
const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

function UserProvider({ children, user: inputUsuario }: ContextProps) {
  const defaultNewUser: User = {
    id: -1,
    institutionalEmail: "",
    pucpCode: "",
    isActive: true,
    creationDate: new Date(),
    modificationDate: new Date(),
    persona: {
      id: -1,
      name: "",
      lastName: "",
      secondLastName: "",
      phone: "",
      isActive: true,
    },
    roles: null,
    isVerified: true,
    estudiante: {
      isRisk: false,
      specialityId: -1,
      specialtyName: "",
      specialtyAcronym: "",
      facultyId: -1,
      facultyName:"",
      facultyAcronym: "",
    }
  }
  const [user, setUser] = useState<User>({ ...(inputUsuario ? inputUsuario : defaultNewUser) });
  useEffect(() => {
    setUser({ ...(user ? user : defaultNewUser) });
  }, [inputUsuario]);

  const handleChangeUsuarioObject = (value: any) => {
    setUser({ ...value });
  }

  const handleChangeUsuario = (name: string, value: any) => {
    //console.log("name: ", name, "value: ", value);
    const [part1, part2] = name.split('.');
    //console.log(typeof (part1))
    //console.log("part1: ", part1, "part2: ", part2);
    if (part2 != undefined) {
      if (part1 === "persona" && part2 in user.persona) {
        setUser({
          ...user,
          persona: {
            ...user.persona,
            [part2]: value
          }
        })
      } else if (part1 === "estudiante" && user.estudiante && part2 in user.estudiante) {
        setUser({
          ...user,
          estudiante: {
            ...user.estudiante,
            [part2]: value
          }
        })
      }
    } else {
      setUser({
        ...user,
        [name]: value
      })
    }
  }
  return (
    <UserContext.Provider value={{ user: user, onChangeUser: handleChangeUsuario, onChangeUserObject: handleChangeUsuarioObject }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, useUserContext };