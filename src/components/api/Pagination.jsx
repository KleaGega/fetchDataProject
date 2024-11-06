import React, { useCallback } from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  
  const decrement = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage, setCurrentPage]);

  const increment = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }, [currentPage, totalPages, setCurrentPage]);

  return (
    <div className="pagination">
      <button onClick={decrement} disabled={currentPage <= 1}>Previous</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={increment} disabled={currentPage >= totalPages}>Next</button>
    </div>
  );
};

export default Pagination;
