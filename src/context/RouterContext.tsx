import React, { ReactElement, ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { RouteObject, RouterProvider, createBrowserRouter,Router, NonIndexRouteObject } from "react-router-dom";
import App from "../App";
import { Role } from "../store/types";
import { Routes } from "../data/routes";



type RouterChildren={
    path:string;
    element:ReactElement;
}


type RouterContextType = {
    setRoute:(routes:RouteObject[])=>void;
    //routes:RouteObject[];
    router: any;
}

const RouterContext = createContext<RouterContextType>({} as RouterContextType);

const useRouter = ()=>{
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error("useAuth solo se puede usar dentro del RouterProvider");
      }
      return context;
};
const initialRoutes: RouteObject[] = [
    {
      path: '/',
      element: <App/>,
      children: []
    },
  ];
type RouterProviderProps={
    children:ReactNode;
};

const RouterContextProvider:React.FC<RouterProviderProps> = ({ children }) => {
    const [routes,setRoutes] = useState<RouteObject[]>(initialRoutes);
    
    const router = useMemo(()=>{
        createBrowserRouter(routes);
    },[routes]);
    const handleSetRoutes=(roles:Role[])=>{
        roles.map((rol)=>{
            const newRoot = rol.type==="TUTOR"?Routes.tutor:rol.type==="MANAGER"?Routes.coordinador:Routes.alumno
            const mergedChildren=[...(routes[0].children||[]),...(newRoot[0].children||[])]
            setRoutes([{...newRoot[0]}]);
        })
    }
    return (
        <RouterContext.Provider value={{setRoute:setRoutes,router:router}}>
            {children}
        </RouterContext.Provider>
      );
}

export { RouterContext, RouterContextProvider, useRouter };