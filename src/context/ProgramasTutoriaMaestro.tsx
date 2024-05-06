import { createContext } from "react";
import { TutoringProgram } from "../store/types";


type ProgramasTutoriaMaestroContextType = {
    data: TutoringProgram[];
    fetchData : ()=>Promise<void>;
}

export const ProgramasTutoriasMaestroContext = createContext<ProgramasTutoriaMaestroContextType>({
    data:[],
    fetchData : async()=>{}
})

//export const ProgramasTutoriaMaestroProvider : React.FC = ({children}=>{

//},[]);