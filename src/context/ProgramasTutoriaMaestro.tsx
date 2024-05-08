import { createContext } from "react";
import { TutoringProgram } from "../store/types";


type ProgramasTutoriaMaestroContextType = {
    data: TutoringProgram[];
    fetchData : ()=>Promise<void>;
}

const ProgramasTutoriasMaestroContext = createContext<ProgramasTutoriaMaestroContextType>({
    data:[],
    fetchData : async()=>{}
})
type ContextProps = {
    children: React.ReactElement;
};
/*
function ProgramasTutoriaMaestroProvider = ({children}: ContextProps){
    const value:ProgramasTutoriaMaestroContextType = use
    return <ProgramasTutoriasMaestroContext.Provider value={value}>{children}</ProgramasTutoriasMaestroContext.Provider>;
};*/