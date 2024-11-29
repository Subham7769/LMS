import React, { useState, useMemo, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import InputNumber from "../InputNumber/InputNumber";
import SectionErrorBoundary from "../../ErrorBoundary/SectionErrorBoundary";

const ListTable = ({
  ListName,
  ListNameAlign = "left",
  ListHeader,
  ListItem,
  ListAction, // actions to be executed in list
  Searchable = false,
  SearchBy,
  Divider = false,
  Sortable = false,
  Editable = false,
  editAllFields = false,
  Paginated = true,
  PageSize = 10,
  handleEditableFields,
  loading,
  error,
}) => {
  const HeaderCellWidth = ListHeader.length + 1; // Calculate cell width based on header length

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [filteredData, setFilteredData] = useState(ListItem);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PageSize);
  const [editingRowIndex, setEditingRowIndex] = useState(null);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  useEffect(() => {
    setFilteredData(ListItem);
  }, [ListItem]);

  const toggleEdit = (rowIndex, buttonIndex) => {
    // Toggle only the PencilIcon (index 0) and ignore the TrashIcon (index 1)
    if (buttonIndex === 0) {
      setEditingRowIndex(editingRowIndex === rowIndex ? null : rowIndex);
    }
  };

  // Compare function
  const compareFunction = (a, b) => {
    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (
      sortConfig.key === "createdOn" ||
      sortConfig.key === "openedOn" ||
      sortConfig.key === "opened"
    ) {
      valA = new Date(valA.split("/").reverse().join("-"));
      valB = new Date(valB.split("/").reverse().join("-"));
    } else if (
      sortConfig.key === "totalDisbursedPrincipal" ||
      sortConfig.key === "recoveredAmount" ||
      sortConfig.key === "outstandingAmount" ||
      sortConfig.key === "debtAmount" ||
      sortConfig.key === "outstandingAmount"
    ) {
      valA = parseInt(valA.replace("$", "").replace("M", ""));
      valB = parseInt(valB.replace("$", "").replace("M", ""));
    } else if (sortConfig.key === "totalBlockedDuration") {
      valA = parseInt(valA.replace(" months", ""));
      valB = parseInt(valB.replace(" months", ""));
    } else if (
      sortConfig.key === "openLoans" ||
      sortConfig.key === "totalProcessed" ||
      sortConfig.key === "tenure" ||
      sortConfig.key === "financeAmount"
    ) {
      valA = parseInt(valA, 10);
      valB = parseInt(valB, 10);
    } else if (sortConfig.key === "approved") {
      valA = parseInt(valA.replace("%", ""));
      valB = parseInt(valB.replace("%", ""));
    }

    if (valA < valB) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (valA > valB) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  };

  // Function to handle search input change
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = ListItem.filter((item) =>
      item[SearchBy]?.toString().toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  // Handle Sort Functionality
  const handleSort = (column) => {
    if (!Sortable) return;

    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });
  };

  // Sort the data before rendering
  const sortedData = useMemo(() => {
    if (sortConfig.key && sortConfig.direction) {
      return [...filteredData].sort(compareFunction);
    }
    if (filteredData) {
      return filteredData;
    }
    return ListItem;
  }, [filteredData, sortConfig]);

  // Get Icons for filters
  const getSortIcon = (column) => {
    if (!Sortable) return null;

    if (sortConfig.key === column) {
      if (sortConfig.direction === "asc") {
        return <FaSortAmountDown className="ml-1" />;
      } else if (sortConfig.direction === "desc") {
        return <FaSortAmountUp className="ml-1" />;
      }
    }
    return <FaSort className="ml-1" title="Sort Data" />;
  };

  // String conversion toLowerCamelCase
  const toLowerCamelCase = (str) => {
    return str
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
  };

  // Use sortedData instead of ListItem for rendering
  const dataToRender = searchTerm ? filteredData : sortedData;
  // console.log(dataToRender)
  const currentData = Paginated
    ? dataToRender.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : dataToRender;

  const indexOfLastItem = currentPage * PageSize;
  const indexOfFirstItem = indexOfLastItem - PageSize;

  const ShimmerTable = () => {
    return (
      <div className="grid grid-cols-4 gap-4 animate-pulse">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col gap-4 shadow-md bg-gray-100 border border-gray-300 rounded-xl pb-8 pt-6 px-5">
          <ShimmerTable />
          <ShimmerTable />
          <ShimmerTable />
        </div>
      ) : error ? (
        <div className="flex flex-col gap-4 shadow-md bg-gray-100 border border-gray-300 rounded-xl pb-8 pt-6 px-5 text-red-500 text-center">
          <p>Oops! Something went wrong. Please try again later.</p>
        </div>
      ) : (
        <div
          className={
            "shadow-md bg-gray-100 border-gray-300 border p-5 rounded-xl mt-4"
          }
        >
          {Searchable && (
            <div className="mb-5 w-full">
              <label htmlFor="search" className="sr-only">
                Search
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
                  name="search"
                  className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Search"
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          )}

          <div className="sm:flex sm:items-center">
            <div className={`sm:flex-auto text-${ListNameAlign}`}>
              <h1 className="font-semibold leading-6 text-gray-900 mb-4">
                {ListName}
              </h1>
            </div>
          </div>

          <div className="flow-root overflow-hidden ">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr className={Divider ? "divide-x divide-gray-200" : ""}>
                  {ListHeader.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className={`w-1/${HeaderCellWidth} max-w-24`}
                      onClick={() => handleSort(toLowerCamelCase(header))}
                    >
                      {/* {false ? "demo" : (() => { throw new Error("Simulated Error"); })()}{ } */}
                      <div className="p-3 text-center text-[12px] font-medium text-gray-900 uppercase tracking-wider cursor-pointer flex justify-center items-center">
                        {header}
                        {getSortIcon(toLowerCamelCase(header))}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentData.map((product, rowIndex) => (
                  <tr
                    className={Divider ? "divide-x divide-gray-200" : ""}
                    key={indexOfFirstItem + rowIndex}
                  >
                    {Object.keys(product).map((key, idx) =>
                      key !== "href" ? (
                        <td
                          key={idx}
                          className={`w-1/${HeaderCellWidth} text-center py-3 px-3 text-[14px] text-gray-500`}
                        >
                          {product.href ? (
                            <Link className="w-full block" to={product.href}>
                              {product[key]}
                            </Link>
                          ) : Editable ||
                            editingRowIndex === indexOfFirstItem + rowIndex ? (
                            <>
                              <InputNumber
                                inputName={key}
                                inputValue={product[key]}
                                onChange={(e) =>
                                  handleEditableFields(
                                    e,
                                    indexOfFirstItem + rowIndex
                                  )
                                }
                                placeHolder="3"
                                isValidation={true}
                              />
                            </>
                          ) : product[key] ? (
                            product[key]
                          ) : (
                            "-"
                          )}
                        </td>
                      ) : null
                    )}
                    {ListHeader.includes("Actions") && (
                      <td
                        className={`flex justify-center gap-2 align-middle whitespace-nowrap text-center py-4 px-3 text-sm text-gray-500`}
                      >
                        {ListAction.map((item, buttonIndex) => (
                          <Button
                            buttonIcon={
                              ListAction.length > 1 && buttonIndex === 0
                                ? editingRowIndex ===
                                  indexOfFirstItem + rowIndex
                                  ? CheckCircleIcon
                                  : item.icon
                                : item.icon // Ensure TrashIcon or any other icon shows correctly
                            }
                            onClick={
                              () =>
                                ListAction.length > 1 && buttonIndex === 0
                                  ? editingRowIndex ===
                                    indexOfFirstItem + rowIndex
                                    ? item.action(indexOfFirstItem + rowIndex)
                                    : toggleEdit(
                                        indexOfFirstItem + rowIndex,
                                        buttonIndex
                                      )
                                  : item.action(indexOfFirstItem + rowIndex) // Keep original action for the other button
                            }
                            circle={item.circle}
                            key={buttonIndex} // Use key to uniquely identify each button
                          />
                        ))}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          {Paginated && totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center gap-5">
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
          )}
        </div>
      )}
    </>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <SectionErrorBoundary>
      <ListTable {...props} />
    </SectionErrorBoundary>
  );
};

export default WithErrorBoundary;
