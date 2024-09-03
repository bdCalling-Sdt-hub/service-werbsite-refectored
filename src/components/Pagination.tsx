"use client";
import React, { Dispatch, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

function Pagination({currentPage, setCurrentPage, totalPages} : {
    currentPage: number ; setCurrentPage: Dispatch<React.SetStateAction<number>>; totalPages : number;
}) {
  

  return (
    <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}

export default Pagination;
