import React, { useEffect } from "react";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";

const Pagination = ({
  dispatcherFunction,
  totalElements,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatcherFunction) {
      dispatcherFunction(currentPage, pageSize);
    }
  }, [dispatch, currentPage, pageSize]);


  const indexOfLastItem = (currentPage + 1) * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;

  const totalItems = totalElements;
  const startCount = totalItems === 0 ? 0 : indexOfFirstItem + 1;
  const endCount = indexOfLastItem > totalItems ? totalItems : indexOfLastItem;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  if (totalElements === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="mb-4 sm:mb-0 sm:order-1"
        role="navigation"
        aria-label="Navigation"
      >
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <Button
              onClick={() =>
                currentPage > 0 && handlePageChange(currentPage - 1)
              }
              disabled={currentPage === 0}
              buttonType="secondary"
              buttonName="&lt;- Previous"
            />
          </li>
          <li className="ml-3 first:ml-0">
            <Button
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
              disabled={currentPage === (totalPages - 1)}
              buttonType="secondary"
              buttonName="Next -&gt;"
              className="min-w-[100px]"
            />
          </li>
        </ul>
      </nav>
      <div className="text-sm text-gray-500 text-center sm:text-left">
        Showing{" "}
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {startCount}
        </span>{" "}
        to{" "}
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {endCount}
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {totalItems}
        </span>{" "}
        results
      </div>
    </div>
  );
};

export default Pagination;
