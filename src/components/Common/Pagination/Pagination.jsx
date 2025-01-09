import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";

const Pagination = ({ dispatcherFunction, totalElements, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatcherFunction(currentPage, pageSize);
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    if (totalElements) {
      setTotalPages(Math.ceil(totalElements / pageSize));
    }
  }, [totalElements, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  if(totalElements === 0) return null;

  return (
    <div className="flex justify-center gap-4 items-center mt-4">
      <Button
        buttonName="Previous"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        rectangle={true}
        className={"w-[6rem]"}
      />
      <span>
        Page {currentPage + 1} of {totalPages}
      </span>
      <Button
        buttonName="Next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        rectangle={true}
        className={"w-[6rem]"}
      />
    </div>
  );
};

export default Pagination;
