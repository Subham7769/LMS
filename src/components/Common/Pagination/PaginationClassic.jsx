import React from "react";
import Button from "../Button/Button";
import { toast } from "react-toastify";

const PaginationClassic = ({
  sortedItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalItems = sortedItems.length;
  const startCount = totalItems === 0 ? 0 : indexOfFirstItem + 1;
  const endCount = indexOfLastItem > totalItems ? totalItems : indexOfLastItem;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
    toast(`You have switched to page: ${newPage}`);
  };

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
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              disabled={currentPage === 1}
              buttonType="secondary"
              buttonName="&lt;- Previous"
            />
          </li>
          <li className="ml-3 first:ml-0">
            <Button
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              buttonType="secondary"
              buttonName="Next -&gt;"
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

export default PaginationClassic;
