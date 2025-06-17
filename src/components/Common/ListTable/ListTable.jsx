import React, { useState, useMemo, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import InputNumber from "../InputNumber/InputNumber";
import SectionErrorBoundary from "../../ErrorBoundary/SectionErrorBoundary";
import { CheckIcon } from "../../../assets/icons";
import PaginationClassic from "../Pagination/PaginationClassic";

const ListTable = ({
  ListName,
  ListNameAlign = "left",
  ListNameLength,
  ListHeader,
  ListItem,
  ListAction, // actions to be executed in list
  Searchable = false,
  SearchBy,
  Sortable = false,
  Editable = false,
  Paginated = true,
  PageSize = 10,
  handleEditableFields,
  loading,
  error,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [filteredData, setFilteredData] = useState(ListItem);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PageSize);
  const [editingRowIndex, setEditingRowIndex] = useState(null);

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
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col gap-4 shadow-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl pb-8 pt-6 px-5 mt-3">
          <ShimmerTable />
          <ShimmerTable />
          <ShimmerTable />
        </div>
      ) : error ? (
        <div className="flex flex-col gap-4 shadow-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl pb-8 pt-6 px-5 text-red-500 text-center">
          <p>Oops! Something went wrong. Please try again later.</p>
        </div>
      ) : (
        <>
          <div
            className={
              "bg-white dark:bg-gray-800 shadow-md border dark:border-gray-800 rounded-xl relative mb-8"
            }
          >
            {Searchable && (
              <div className="px-5 pt-4 w-full">
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
                    className="form-input w-full rounded-md py-1.5 pl-10 pr-3"
                    placeholder="Search"
                    type="search"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            )}

            {ListName && (
              <header className="px-5 py-4">
                <h2
                  className={`font-semibold text-gray-800 dark:text-gray-100 text-${ListNameAlign}`}
                >
                  {ListName}{" "}
                  <span className="text-gray-400 dark:text-gray-500 font-medium">
                    {ListNameLength}
                  </span>
                </h2>
              </header>
            )}

            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-gray-300 ">
                <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
                  <tr>
                    {ListHeader.map((header, index) => (
                      <th
                        key={index}
                        scope="col"
                        className={`px-4 py-4 whitespace-nowrap min-w-32`}
                        onClick={() => handleSort(toLowerCamelCase(header))}
                      >
                        {/* {false ? "demo" : (() => { throw new Error("Simulated Error"); })()}{ } */}
                        <div className="flex cursor-pointer items-center">
                          {header}
                          {getSortIcon(toLowerCamelCase(header))}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                  {currentData.map((product, rowIndex) => (
                    <tr key={indexOfFirstItem + rowIndex}>
                      {Object.keys(product).map((key, idx) =>
                        key !== "href" ? (
                          <td key={idx} className={`px-4 py-4 break-words `}>
                            {product.href ? (
                              <Link
                                className="w-full block whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]"
                                to={product.href}
                              >
                                {product[key]}
                              </Link>
                            ) : Editable ||
                              editingRowIndex ===
                                indexOfFirstItem + rowIndex ? (
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
                          className={`px-4 py-4 whitespace-nowrap flex gap-2`}
                        >
                          {ListAction.map((item, buttonIndex) => (
                            <Button
                              buttonName={item.name}
                              buttonIcon={
                                ListAction.length > 1 && buttonIndex === 0
                                  ? editingRowIndex ===
                                    indexOfFirstItem + rowIndex
                                    ? CheckIcon
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
                              buttonType={item.type}
                            />
                          ))}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {currentData.length > 0 && Paginated && (
            <PaginationClassic
              sortedItems={dataToRender}
              itemsPerPage={PageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </>
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
