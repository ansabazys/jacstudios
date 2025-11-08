import React from "react";
import { useSearchParams } from "react-router-dom";
import { usePage } from "../../context/PageContext";

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentPage, setCurrentPage, totalPages } = usePage();

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  console.log(totalPages)

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
    setSearchParams({ page });
  };
  return (
    <div className="w-full pt-10 px-10 flex justify-center">
      <div className="flex gap-10">
        <button
          onClick={() =>
            handleCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
          }
        >
          previous
        </button>
        <div className="flex items-center gap-10">
          {pages.map((pg, i) => (
            <button key={i} onClick={() => handleCurrentPage(pg)} className={`${currentPage === pg && "font-bold"}`}>{pg}</button>
          ))}
        </div>
        <button
          onClick={() =>
            handleCurrentPage(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
