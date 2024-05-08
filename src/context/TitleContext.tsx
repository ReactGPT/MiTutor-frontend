import React, { createContext, useContext, useState } from "react";

type TitleContextType = {
  title: string;
  setTitle: (title: string) => void;
};

const TitleContext = createContext<TitleContextType | undefined>(undefined);

export const useTitle = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error("useTitle solo se puede usar dentro del TitleProvider");
  }
  return context;
};

type TitleProviderProps = {
  children: React.ReactNode;
};

export const TitleProvider: React.FC<TitleProviderProps> = ({ children }) => {
  const [title, setTitle] = useState<string>('');

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};