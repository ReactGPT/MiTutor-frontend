import {
    ReactElement,
    createContext,
    useContext,
    useEffect,
    useState,
  } from 'react';
import { ProgramaTutoria } from '../store/types';
type ContextProps = {
    children: ReactElement;
    tutoringProgram: ProgramaTutoria|null;
};

type ContextContent = {
    tutoringProgram:ProgramaTutoria;
    onChangeTutoringProgram: (name:string,value:any)=>void;
    onChangeTutoringProgramObject:(value:any)=>void;
}

const TutoringProgramContext = createContext<ContextContent>({} as ContextContent);

const useTutoringProgramContext = ()=>{
    const context = useContext(TutoringProgramContext);
    return context;
}

function TutoringProgramProvider({children,tutoringProgram:inputTutoria}:ContextProps){
    const defaultNewTutoringProgram:ProgramaTutoria ={
        presencial :true,
        virtual: false,
        grupal:false  ,
        obligatorio:false,
        cant_integrantes:1,
        cant_tutores:0,
        nombre:"",
        descripcion:"",
        vigente:true,
        duracion:"30 mins",
        facultadId:0,
        facultadNombre:"",
        especialidadId:0,
        especialidadNombre:"",
        tutores:[],
        alumnos:[],
        cant_alumnos:0,
        tutorTypeId:1,
        tutorTypeDescription:"Fijo Asignado"
        // tipoTutor:{
        //     id:1,
        //     variable:false,
        //     fijoAsignado:true,
        //     fijoSolicitado:false
        // }
    }
    const [tutoringProgram,setTutorinProgram] = useState<ProgramaTutoria>({...(inputTutoria?inputTutoria:defaultNewTutoringProgram)});
    useEffect(()=>{
        setTutorinProgram({...(tutoringProgram?tutoringProgram:defaultNewTutoringProgram)});
    },[inputTutoria]);

    const handleChangeTutoriaObject=(value:any)=>{
        setTutorinProgram({...value});
    }

    const handleChangeTutoringProgram=(name:string,value:any)=>{
        setTutorinProgram({...tutoringProgram,
            [name]:value
        })
    }
    return (
        <TutoringProgramContext.Provider value={{ tutoringProgram:tutoringProgram, onChangeTutoringProgram:handleChangeTutoringProgram,onChangeTutoringProgramObject:handleChangeTutoriaObject }}>
          {children}
        </TutoringProgramContext.Provider>
      );
};

export {TutoringProgramContext,TutoringProgramProvider,useTutoringProgramContext}


  