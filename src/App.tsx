import React, { useState } from "react";
import Search from "./Search";
import Results from "./Results";
import { Result } from "./Types";
import ErrorBoundary from "./ErrorBoundary";
import ErrorComponent from "./ErrorComponent";

interface AppState {
  searchTerm: string;
  results: Result[];
}

type ApiData = {
  results: Result[];
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    searchTerm: "",
    results: [],
  });

  const handleSearch = (searchTerm: string) => {
    const uri = searchTerm
      ? `https://swapi.dev/api/people/?search=${searchTerm}`
      : `https://swapi.dev/api/people/`;
    return fetch(uri)
      .then((response) => response.json() as Promise<ApiData>)
      .then((data: ApiData) => {
        setAppState({ searchTerm, results: data.results });
      });
  };

  return (
    <div>
      <h1>Star Wars Search</h1>
      <h4>Here you can find a character by name.</h4>
      <ErrorBoundary>
        <ErrorComponent />
        <Search onSearch={handleSearch} />
        <Results results={appState.results} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
