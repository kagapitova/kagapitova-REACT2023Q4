import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import { useAppContext } from "./AppProvider";

interface SearchProps {
  onSearch: (searchTerm: string) => Promise<void>;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const { searchTerm: contextSearchTerm, updateSearchTerm } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      updateSearchTerm(savedSearchTerm);
      onSearch(savedSearchTerm).finally(() => setLoading(false));
    }
  }, []);

  const handleSearch = () => {
    const trimmedSearchTerm = contextSearchTerm.trim();
    setLoading(true);
    localStorage.setItem("searchTerm", trimmedSearchTerm);
    onSearch(trimmedSearchTerm).finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search..."
        value={contextSearchTerm}
        onChange={(e) => updateSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className={loading ? styles.showLoader : styles.loader} />
    </div>
  );
};

export default Search;
