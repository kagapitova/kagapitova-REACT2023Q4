import { Component } from "react";
import Search from "./Search";
import Results from "./Result";
import { Result } from "./Types";
import "./App.module.css";

interface AppState {
  searchTerm: string;
  results: Result[];
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: "",
      results: [],
    };
  }

  handleSearch = (searchTerm: string) => {
    if (searchTerm) {
      fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
        .then((response) => response.json())
        .then((data: { results: Result[] }) => {
          this.setState({ results: data.results });
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    } else {
      fetch(`https://swapi.dev/api/people/`)
        .then((response) => response.json())
        .then((data: { results: Result[] }) => {
          this.setState({ results: data.results });
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  };

  render() {
    return (
      <div>
        <h1>Star Wars Search</h1>
        <Search onSearch={this.handleSearch} />
        <Results results={this.state.results} />
      </div>
    );
  }
}

export default App;
