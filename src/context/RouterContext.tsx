import React, { ReactElement, ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { RouteObject, RouterProvider, createBrowserRouter,Router, NonIndexRouteObject } from "react-router-dom";
import App from "../App";
import { Role, SidebarLink } from "../store/types";
import { Routes } from "../data/routes";



type RouterChildren={
    path:string;
    element:ReactElement;
}


type RouterContextType = {
    //setRoute:(routes:RouteObject[])=>void;
    //routes:RouteObject[];
    handleSetRoutes:(roles:Role[])=>void;
    router: any;
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
// const initialRoutes: RouteObject[] = [
//     {
//       path: '/',
//       element: <App/>,
//       children: []
//     },
//   ];
type RouterProviderProps={
    children:ReactNode;
};

const RouterContextProvider:React.FC<RouterProviderProps> = ({ children }) => {
    //const [routes,setRoutes] = useState<RouteObject[]>(initialRoutes);
    const [childrenArray,setChildrenArray] = useState<RouteObject[]>([]);
    const [sideBarOption,setSideBarOptions]= useState<SidebarLink[]>([]);
    const routes:RouteObject[]=useMemo(()=>{
        return [{
            path:'/',
            element:<App/>,
            children:[...childrenArray]
        }]
    },[childrenArray])
    const router = useMemo(()=>{
        createBrowserRouter(routes);
    },[routes]);
    const handleSetRoutes=(roles:Role[])=>{
        roles.map((rol)=>{
            const childrenArrayFound:RouteObject[] = rol.type==="TUTOR"?Routes.tutor.pages:rol.type==="MANAGER"?Routes.coordinador.pages:Routes.alumno.pages;
            const sideOptionsFound:SidebarLink[] = rol.type==="TUTOR"?Routes.tutor.navBarLink:rol.type==="MANAGER"?Routes.coordinador.navBarLink:Routes.alumno.navBarLink
            //const mergedChildren:RouteObject[]=[...(routes[0].children||[]),...(childrenArray||[])]
            setChildrenArray(prevArray=>[...prevArray,...childrenArrayFound]);
            setSideBarOptions(prevArray=>[...prevArray,...sideOptionsFound]);
        });
    }
    
    return (
        <RouterContext.Provider value={{handleSetRoutes:handleSetRoutes,router:router,sideBarOption:sideBarOption}}>
            {children}
        </RouterContext.Provider>
      );
}

export { RouterContext, RouterContextProvider, useRouter };