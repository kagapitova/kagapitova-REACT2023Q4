import React, { createContext, useContext, useState, ReactNode } from "react";
import { Result } from "./Types";

interface AppContextProps {
  searchTerm: string;
  results: Result[];
  updateSearchTerm: (searchTerm: string) => void;
  updateResults: (data: Result[]) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  const updateSearchTerm = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const updateResults = (newResults: Result[]) => {
    setResults(newResults);
  };

  return (
    <AppContext.Provider
      value={{ searchTerm, results, updateSearchTerm, updateResults }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context must be used within an AppProvider");
  }
  return context;
};
