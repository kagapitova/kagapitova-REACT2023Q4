import React from "react";
import Search from "./Search";
import Results from "./Results";
import { Result } from "./Types";
import ErrorBoundary from "./ErrorBoundary";
import ErrorComponent from "./ErrorComponent";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppContext } from "./AppProvider";

type ApiData = {
  results: Result[];
};

const App: React.FC = () => {
  const { updateResults, updateSearchTerm } = useAppContext();

  const handleSearch = (searchTerm: string) => {
    const uri = searchTerm
      ? `https://swapi.dev/api/people/?search=${searchTerm}`
      : `https://swapi.dev/api/people/`;
    return fetch(uri)
      .then((response) => response.json() as Promise<ApiData>)
      .then((data: ApiData) => {
        updateResults(data.results);
        updateSearchTerm(searchTerm);
      });
  };

  return (
    <Router>
      <div>
        <h1>Star Wars Search</h1>
        <h4>Here you can find a character by name.</h4>
        <ErrorBoundary>
          <ErrorComponent />
          <Search onSearch={handleSearch} />
          <Results />
        </ErrorBoundary>
      </div>
    </Router>
  );
};

export default App;
