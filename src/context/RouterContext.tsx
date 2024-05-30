import React, { ReactElement, ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { RouteObject, RouterProvider, createBrowserRouter,Router, NonIndexRouteObject } from "react-router-dom";
import App from "../App";
import { Role, SidebarLink } from "../store/types";
import { Routes } from "../data/routes";
import { useAuth } from "./AuthContext";


type RouterChildren={
    path:string;
    element:ReactElement;
}


type RouterContextType = {
    //setRoute:(routes:RouteObject[])=>void;
    //routes:RouteObject[];
    handleSetRoutes:(roles:Role[])=>void;
    router: ReturnType<typeof createBrowserRouter>;
    sideBarOption:SidebarLink[];
}

const RouterContext = createContext<RouterContextType>({} as RouterContextType);

const useRouter = ()=>{
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error("useAuth solo se puede usar dentro del RouterProvider");
      }
      return context;
};

type RouterProviderProps={
    children:ReactNode;
    
};

const RouterContextProvider = () => {
    //const [routes,setRoutes] = useState<RouteObject[]>(initialRoutes);
    const [childrenArray,setChildrenArray] = useState<RouteObject[]>([]);
    const [sideBarOption,setSideBarOptions]= useState<SidebarLink[]>([]);
    const {userData}=useAuth();
    const routes:RouteObject[]=useMemo(()=>{
        return [{
            path:'/',
            element:<App/>,
            children:[...childrenArray]
        }]
    },[childrenArray])
    const router = useMemo(()=>createBrowserRouter(routes),[routes]);
    useEffect(()=>{
        console.log(routes);
    },[router])
    const handleSetRoutes=useCallback((roles:Role[])=>{
        roles.forEach(rol=>{
            const childrenArrayFound:RouteObject[] = rol.type==="TUTOR"?Routes.tutor.pages:rol.type==="MANAGER"?Routes.coordinador.pages:Routes.alumno.pages;
            const sideOptionsFound:SidebarLink[] = rol.type==="TUTOR"?Routes.tutor.navBarLink:rol.type==="MANAGER"?Routes.coordinador.navBarLink:Routes.alumno.navBarLink
            //const mergedChildren:RouteObject[]=[...(routes[0].children||[]),...(childrenArray||[])]
            setChildrenArray(prevArray=>[...prevArray,...childrenArrayFound]);
            setSideBarOptions(prevArray=>[...prevArray,...sideOptionsFound]);
        });
    },[]);
    useEffect(()=>{
        //console.log("USER INFO: ",userData);
        if(userData.userInfo && userData.userInfo.isVerified){
          //console.log("Se alteran rutas");
            handleSetRoutes(userData.userInfo.roles);
        }
        else{
            setChildrenArray([]);
            setSideBarOptions([]);
        }
      },[userData.userInfo])
    return (
        <RouterContext.Provider value={{handleSetRoutes,router,sideBarOption}}>
            <RouterProvider router={router}/>
        </RouterContext.Provider>
      );
}

export { RouterContext, RouterContextProvider, useRouter };