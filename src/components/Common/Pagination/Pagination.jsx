import React from "react";
import Button from "../Button/Button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center gap-4 items-center mt-4">
      <Button
        buttonName="Previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        rectangle={true}
        className={"w-[6rem]"}

      />
      <span>
        Page {currentPage + 1} of {totalPages}
      </span>
      <Button
        buttonName="Next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        rectangle={true}
        className={"w-[6rem]"}
      />
    </div>
  );
};

export default Pagination;
