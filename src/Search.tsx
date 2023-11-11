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
      setLoading(true);
      try {
        Promise.resolve(onSearch(savedSearchTerm))
          .then(() => console.log("Search completed successfully"))
          .catch((error) => console.error("Error during onSearch:", error))
          .finally(() => setLoading(false));
      } catch (error) {
        console.error("Error during onSearch:", error);
        setLoading(false);
      }
    }
  }, []);

  const handleSearch = () => {
    const trimmedSearchTerm = contextSearchTerm.trim();
    setLoading(true);
    localStorage.setItem("searchTerm", trimmedSearchTerm);
    try {
      Promise.resolve(onSearch(trimmedSearchTerm))
        .then(() => console.log("Search completed successfully"))
        .catch((error) => console.error("Error during onSearch:", error))
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Error during onSearch:", error);
      setLoading(false);
    }
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
