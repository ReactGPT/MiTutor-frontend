import React, { ReactElement, createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageTitles } from "../data/pageTitles";

type TitleContextType = {
  title: string;
  handleSetTitle: (title: string) => void;
};

const TitleContext = createContext<TitleContextType>({} as TitleContextType);

const useTitle = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error("useTitle solo se puede usar dentro del TitleProvider");
  }
  return context;
};

type TitleProviderProps = {
  children: ReactElement;
};





const TitleProvider: React.FC<TitleProviderProps> = ({ children }) => {
  const location = useLocation();
  const [title, setTitle] = useState<string>('');

  const handleSetTitle = (title: string) => {
    setTitle(title);
  };

  useEffect(() => {
    handleSetTitle("Inicio");
  }, []);

  useEffect(() => {
    const actualPage = PageTitles.find((item) => item.path === location.pathname);
    //console.log(actualPage)
    setTitle(!!actualPage ? actualPage.pageName : '');
  }, [location.pathname]);

  return (
    <TitleContext.Provider value={{ title, handleSetTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

export { TitleContext, TitleProvider, useTitle };