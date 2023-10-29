import { Component } from "react";
import "./Search.module.css";

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
      this.props.onSearch(savedSearchTerm);
    }
  }

  handleSearch = () => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    localStorage.setItem("searchTerm", trimmedSearchTerm);
    this.props.onSearch(trimmedSearchTerm);
  };

  render() {
    return (
      <div className="container">
        <input
          className="input"
          type="text"
          placeholder="Search..."
          value={this.state.searchTerm}
          onChange={(e) => this.setState({ searchTerm: e.target.value })}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
