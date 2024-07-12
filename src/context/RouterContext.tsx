import React, { ReactElement, ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { RouteObject, RouterProvider, createBrowserRouter, Router, NonIndexRouteObject, Navigate } from "react-router-dom";
import App from "../App";
import { Role, SidebarLink } from "../store/types";
import { Routes } from "../data/routes";
import { useAuth } from "./AuthContext";
import PageInicioTutor from "../pages/tutor/inicio/PageInicioTutor";


type RouterChildren = {
    path: string;
    element: ReactElement;
};

type NavBarOption = {
    rol : "STUDENT"|"SPECIALTYMANAGER"|"FACULTYMANAGER" |"ADMIN"|"TUTOR"|"DERIVATION"
        |"CAREMANAGER"|"SUPPORTFACULTY"|"SUPPORTSPECIALTY";
    title: string;
    links: SidebarLink[];
  }

type RouterContextType = {
    //setRoute:(routes:RouteObject[])=>void;
    //routes:RouteObject[];
    //handleSetRoutes:(roles:Role[])=>void;
    router: ReturnType<typeof createBrowserRouter>;
    sideBarOption: NavBarOption[];
};

const RouterContext = createContext<RouterContextType>({} as RouterContextType);

const useRouter = () => {
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error("useAuth solo se puede usar dentro del RouterProvider");
    }
    return context;
};


const RouterContextProvider = () => {
    //const [routes,setRoutes] = useState<RouteObject[]>(initialRoutes);
    //const [childrenArray,setChildrenArray] = useState<RouteObject[]>([]);
    const [sideBarOption, setSideBarOptions] = useState<NavBarOption[]>([]);
    const { userData } = useAuth();
    const routes: RouteObject[] = useMemo(() => {
        
        let childrenArrayFound: RouteObject[] = [];
        let sideBarOptionsFound: NavBarOption[] = [];
        
        !!userData && userData.userInfo?.roles.map((rol: Role) => {
            switch (rol.type) {
                case "TUTOR":
                    childrenArrayFound = childrenArrayFound.concat(Routes.tutor.pages);
                    if(! (sideBarOptionsFound.some((item)=>item.rol==="TUTOR"))){
                        sideBarOptionsFound = sideBarOptionsFound.concat({
                            rol:"TUTOR",
                            title:"Tutor",
                            links:Routes.tutor.navBarLink
                        });
                    }
                    break;
                case "STUDENT":
                    childrenArrayFound = childrenArrayFound.concat(Routes.alumno.pages);
                    if(! (sideBarOptionsFound.some((item)=>item.rol==="STUDENT"))){
                        sideBarOptionsFound = sideBarOptionsFound.concat({
                            rol:"STUDENT",
                            title:"Alumno",
                            links:Routes.alumno.navBarLink
                        });
                    }
                    break;
                case "FACULTYMANAGER":
                    childrenArrayFound = childrenArrayFound.concat(Routes.coordinadorFacultad.pages);
                    if(! (sideBarOptionsFound.some((item)=>item.rol==="FACULTYMANAGER"))){
                        sideBarOptionsFound = sideBarOptionsFound.concat({
                            rol:"FACULTYMANAGER",
                            title:"Coord. Facultad",
                            links:Routes.coordinadorFacultad.navBarLink
                        });
                    }
                    break;
                case "SPECIALTYMANAGER":
                    childrenArrayFound = childrenArrayFound.concat(Routes.coordinadorEspecialidad.pages);
                    if(! (sideBarOptionsFound.some((item)=>item.rol==="SPECIALTYMANAGER"))){
                        sideBarOptionsFound = sideBarOptionsFound.concat({
                            rol:"SPECIALTYMANAGER",
                            title:"Coord. Especialidad",
                            links:Routes.coordinadorEspecialidad.navBarLink
                        });
                    }
                    break;
                case "SUPPORTFACULTY":
                    childrenArrayFound = childrenArrayFound.concat(Routes.coordinadorFacultad.pages);
                    if(! (sideBarOptionsFound.some((item)=>item.rol==="SUPPORTFACULTY"))){
                        sideBarOptionsFound = sideBarOptionsFound.concat({
                            rol:"SUPPORTFACULTY",
                            title:"Apoyo Facultad",
                            links:Routes.coordinadorFacultad.navBarLink
                        });
                    }
                    break;
                case "SUPPORTSPECIALTY":
                    childrenArrayFound = childrenArrayFound.concat(Routes.coordinadorEspecialidad.pages);
                    if(! (sideBarOptionsFound.some((item)=>item.rol==="SUPPORTSPECIALTY"))){
                        sideBarOptionsFound = sideBarOptionsFound.concat({
                            rol:"SUPPORTSPECIALTY",
                            title:"Apoyo Especialidad",
                            links:Routes.coordinadorEspecialidad.navBarLink
                        });
                    }
                    break;
                case "ADMIN":
                    childrenArrayFound = childrenArrayFound.concat(Routes.administrador.pages);
                    if(! (sideBarOptionsFound.some((item)=>item.rol==="ADMIN"))){
                        sideBarOptionsFound = sideBarOptionsFound.concat({
                            rol:"ADMIN",
                            title:"Administrador",
                            links:Routes.administrador.navBarLink
                        });
                    }
                    break;
                case "DERIVATION":
                    childrenArrayFound = childrenArrayFound.concat(Routes.derivation.pages);
                    if(! (sideBarOptionsFound.some((item)=>item.rol==="DERIVATION"))){
                        sideBarOptionsFound = sideBarOptionsFound.concat({
                            rol:"DERIVATION",
                            title:"Derivación",
                            links:Routes.derivation.navBarLink
                        });
                    }
                    break;
                case "CAREMANAGER":
                    childrenArrayFound = childrenArrayFound.concat(Routes.bienestar.pages);
                    if(! (sideBarOptionsFound.some((item)=>item.rol==="CAREMANAGER"))){
                        sideBarOptionsFound = sideBarOptionsFound.concat({
                            rol:"CAREMANAGER",
                            title:"Coord. Bienestar",
                            links:Routes.derivation.navBarLink
                        });
                    }
                    break;
            };
        });
        
        setSideBarOptions(sideBarOptionsFound);
        return [{
            path: '/',
            element: <App />,
            children: [
                ...childrenArrayFound,
                {
                    path: "*",
                    element: <Navigate to="/" />
                }
            ]
        }];
    }, [userData]);
    const router = useMemo(() => createBrowserRouter(routes), [routes]);

    useEffect(() => {
        //console.log("Set routes"); POR MIENTRAS
        //console.log(routes); POR MIENTRAS
    }, [router]);

    // const handleSetRoutes=useCallback((roles:Role[])=>{
    //     roles.forEach(rol=>{
    //         const childrenArrayFound:RouteObject[] = rol.type==="TUTOR"?Routes.tutor.pages:rol.type==="MANAGER"?Routes.coordinador.pages:Routes.alumno.pages;
    //         const sideOptionsFound:SidebarLink[] = rol.type==="TUTOR"?Routes.tutor.navBarLink:rol.type==="MANAGER"?Routes.coordinador.navBarLink:Routes.alumno.navBarLink;
    //         //const mergedChildren:RouteObject[]=[...(routes[0].children||[]),...(childrenArray||[])]
    //         setChildrenArray(prevArray=>[...prevArray,...childrenArrayFound]);
    //         setSideBarOptions(prevArray=>[...prevArray,...sideOptionsFound]);
    //     });
    // },[]);
    // useEffect(()=>{
    //     console.log("USER INFO: ",userData);
    //     if(userData.userInfo && userData.userInfo.isVerified){
    //       //console.log("Se alteran rutas");
    //         //handleSetRoutes(userData.userInfo.roles);
    //     }
    //     else{
    //         //setChildrenArray([]);
    //         //setSideBarOptions([]);
    //     }
    //   },[userData.userInfo])
    return (
        <RouterContext.Provider value={{ router, sideBarOption }}>
            <RouterProvider router={router} />
        </RouterContext.Provider>
    );
};

export { RouterContext, RouterContextProvider, useRouter };