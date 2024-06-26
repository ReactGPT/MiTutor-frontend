import {
    ReactElement,
    createContext,
    useContext,
    useEffect,
    useState,
  } from 'react';
  import { useAppDispatch } from '../store/hooks';
  import { tutoringProgramSlice } from '../store/slices';
  import { ProgramaTutoria } from '../store/types';
  
  type ContextProps = {
    children: ReactElement;
    tutoringProgram: ProgramaTutoria | null;
  };
  
  type ContextContent = {
    tutoringProgram: ProgramaTutoria;
    onChangeTutoringProgram: (name: string, value: any) => void;
    onChangeTutoringProgramObject: (value: any) => void;
    updateAlumnos: (alumnos: any[]) => void;
  };
  
  const TutoringProgramContext = createContext<ContextContent>(
    {} as ContextContent
  );
  
  const useTutoringProgramContext = () => {
    const context = useContext(TutoringProgramContext);
    return context;
  };
  
  function TutoringProgramProvider({
    children,
    tutoringProgram: inputTutoria,
  }: ContextProps) {
    const defaultNewTutoringProgram: ProgramaTutoria = {
      presencial: true,
      virtual: false,
      grupal: false,
      obligatorio: false,
      cant_integrantes: 1,
      cant_tutores: 0,
      nombre: '',
      descripcion: '',
      vigente: true,
      duracion: '30 mins',
      facultadId: 0,
      facultadNombre: '',
      especialidadId: 0,
      especialidadNombre: '',
      tutores: [],
      alumnos: [],
      cant_alumnos: 0,
      tutorTypeId: 1,
      tutorTypeDescription: 'Fijo Asignado',
    };
  
    const [tutoringProgram, setTutoringProgram] = useState<ProgramaTutoria>({
      ...(inputTutoria ? inputTutoria : defaultNewTutoringProgram),
    });
  
    const dispatch = useAppDispatch();
    const { setTutoringProgram: setTutoringProgramAction } =
      tutoringProgramSlice.actions;
  
    useEffect(() => {
      setTutoringProgram({
        ...(inputTutoria ? inputTutoria : defaultNewTutoringProgram),
      });
    }, [inputTutoria]);
  
    useEffect(() => {
      dispatch(setTutoringProgramAction({ ...tutoringProgram }));
    }, [tutoringProgram, dispatch, setTutoringProgramAction]);
  
    const handleChangeTutoriaObject = (value: any) => {
      setTutoringProgram({ ...value });
    };
  
    const handleChangeTutoringProgram = (name: string, value: any) => {
      setTutoringProgram((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const updateAlumnos = (alumnos: any[]) => {
      setTutoringProgram((prev) => ({
        ...prev,
        alumnos,
        cant_alumnos: alumnos.length,
      }));
    };
  
    return (
      <TutoringProgramContext.Provider
        value={{
          tutoringProgram,
          onChangeTutoringProgram: handleChangeTutoringProgram,
          onChangeTutoringProgramObject: handleChangeTutoriaObject,
          updateAlumnos,
        }}
      >
        {children}
      </TutoringProgramContext.Provider>
    );
  }
  
  export {
    TutoringProgramContext,
    TutoringProgramProvider,
    useTutoringProgramContext,
  };
  