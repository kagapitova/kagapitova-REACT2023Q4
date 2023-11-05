import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Result } from "./Types";
import styles from "./Result.module.css";

interface ResultsProps {
  results: Result[];
  itemsPerPage: number;
}

const Results: React.FC<ResultsProps> = ({ results, itemsPerPage = 5 }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") || "1", 10);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    queryParams.set("page", page.toString());
    navigate(`?${queryParams.toString()}`);
  };

  return (
    <div>
      {results.slice(startIndex, endIndex).map((item, index) => (
        <div key={index} className={styles.item}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>
            {item.gender} {item.hair_color} {item.birth_year} {item.height}
          </p>
        </div>
      ))}

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= results.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Results;
