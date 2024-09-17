import React, { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import { convertDate } from "../../utils/convertDate";

const LedgerListTable = ({ ListName, ListHeader, ListItem }) => {
  const tableRef = useRef(null);
  const paginationRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState(ListItem);
  const [borrowerIdQuery, setBorrowerIdQuery] = useState("");

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  const selectOptions = [
    { value: 1, label: "1 entry" },
    { value: 2, label: "2 entry" },
    { value: 5, label: "5 entries" },
    { value: 10, label: "10 entries" },
    { value: 20, label: "20 entries" },
    { value: 50, label: "50 entries" },
    { value: 100, label: "100 entries" },
  ];

  useEffect(() => {
    const adjustPaginationWidth = () => {
      if (tableRef.current && paginationRef.current) {
        paginationRef.current.style.width = `${tableRef.current.offsetWidth}px`;
      }
    };

    adjustPaginationWidth();
    window.addEventListener("resize", adjustPaginationWidth);
    return () => window.removeEventListener("resize", adjustPaginationWidth);
  }, []);

  useEffect(() => {
    setFilteredData(
      ListItem.filter((entry) =>
        entry.userId.toString().includes(borrowerIdQuery)
      )
    );
    setCurrentPage(1);
  }, [borrowerIdQuery, ListItem]);

  const handlePageSizeChange = (selectedOption) => {
    setPageSize(selectedOption.value);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  // Custom Styling
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "48px",
      borderRadius: "0.375rem",
      borderColor: "#D1D5DB",
      boxShadow: "none",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 0.75rem",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "48px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0 8px",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: "0 8px",
    }),
  };

  return (
    <div className="bg-gray-100 py-10 rounded-xl flex flex-col items-center w-full">
      <div className="px-4 sm:px-6 lg:px-8 w-full">
        {/* Search */}
        <div className="flex gap-4 mb-5 w-1/2">
          <div className="">
            <label htmlFor="search" className="sr-only">
              Search by Borrower ID
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                type="search"
                name="search"
                className="block w-full h-[50px] rounded-md border-0 bg-white py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter Borrower ID"
                value={borrowerIdQuery}
                onChange={(e) => setBorrowerIdQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-40">
            <label htmlFor="entriesSelect" className="sr-only">
              Entries Per Page
            </label>
            <Select
              id="entriesSelect"
              options={selectOptions}
              defaultValue={{ value: 10, label: "10 entries" }}
              onChange={handlePageSizeChange}
              className="block w-full"
              styles={customSelectStyles}
              isSearchable={false}
              isMulti={false}
            />
          </div>
        </div>

        {/* Table Name */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              {ListName}
            </h1>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table
                  className="min-w-full divide-y divide-gray-300"
                  ref={tableRef}
                >
                  <thead className="bg-gray-50">
                    <tr>
                      {ListHeader.map((header, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-3 py-3.5 w-1/6 text-center text-sm font-medium text-gray-900"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {currentData.length !== 0 ? (
                      currentData.map((item) => (
                        <React.Fragment key={item.id}>
                          {item.accounts.map((accountItem, idx) => (
                            <tr key={`${item.id}-${idx}`}>
                              <td className="w-1/6 whitespace-nowrap text-center py-4 px-3 text-sm text-gray-500">
                                {convertDate(accountItem?.transactionDate)}
                              </td>
                              <td className="w-1/6 whitespace-nowrap text-center py-4 px-3 text-sm text-gray-500">
                                {accountItem?.entryId}
                              </td>
                              <td className="w-1/6 whitespace-nowrap text-center py-4 px-3 text-sm text-gray-500">
                                {accountItem?.entryName}
                              </td>
                              <td className="w-1/6 whitespace-nowrap text-center py-4 px-3 text-sm text-gray-500">
                                {item.userId}
                              </td>
                              <td className="w-1/6 whitespace-nowrap text-center py-4 px-3 text-sm text-gray-500">
                                {accountItem?.debitValue === 0
                                  ? "-"
                                  : accountItem?.debitValue}
                              </td>
                              <td className="w-1/6 whitespace-nowrap text-center py-4 px-3 text-sm text-gray-500">
                                {accountItem?.creditValue === 0
                                  ? "-"
                                  : accountItem?.creditValue}
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={ListHeader.length}
                          className="w-1/6 whitespace-nowrap text-center py-4 px-3 text-sm text-gray-500"
                        >
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {currentData.length !== 0 ? (
        <div
          ref={paginationRef}
          className="mt-6 flex justify-center gap-5 items-center"
        >
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center px-2 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-500 text-white cursor-pointer"
            }`}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center px-2 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-500 text-white cursor-pointer"
            }`}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default LedgerListTable;
