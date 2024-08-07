import React, { useState, useMemo, useEffect } from "react";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/20/solid";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import InputNumber from "../InputNumber/InputNumber";

const ListTable = ({
  ListName,
  ListNameAlign = "left",
  ListHeader,
  ListItem,
  HandleAction,
  Searchable,
  Divider = false,
  Sortable = false,
  Editable = false,
  handleEditableFields,
}) => {
  const HeaderCellWidth = ListHeader.length + 1; // Calculate cell width based on header length

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [filteredData, setFilteredData] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredData(ListItem);
  }, [ListItem]);

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
      sortConfig.key === "totalProcessed"
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
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = ListItem.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
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
  return (
    <div className="bg-gray-100 py-6 rounded-xl mt-4">
      <div className="px-4 sm:px-6 lg:px-8">
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
            <h1 className="font-semibold leading-6 text-gray-900">
              {ListName}
            </h1>
          </div>
        </div>

        <div className="mt-4 flow-root overflow-hidden ">
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
                    <div className="p-3 text-center text-[12px] font-medium text-gray-900 uppercase tracking-wider cursor-pointer flex justify-center items-center">
                      {header}
                      {getSortIcon(toLowerCamelCase(header))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {dataToRender.map((product, index) => (
                <tr
                  className={Divider ? "divide-x divide-gray-200" : ""}
                  key={index}
                >
                  {Object.keys(product).map((key, idx) =>
                    key !== "href" ? (
                      <td
                        key={idx}
                        className={`w-1/${HeaderCellWidth} text-center py-3 px-3 text-sm text-gray-500`}
                      >
                        {product.href ? (
                          <Link className="w-full block" to={product.href}>
                            {product[key]}
                          </Link>
                        ) : Editable ? (
                          <>
                            <InputNumber
                              inputName={key}
                              inputValue={product[key]}
                              onChange={handleEditableFields}
                              placeHolder="3"
                            />
                          </>
                        ) : (
                          product[key]
                        )}
                      </td>
                    ) : null
                  )}
                  {ListHeader.includes("Actions") && (
                    <td
                      className={`w-1/${HeaderCellWidth} whitespace-nowrap text-center py-4 px-3 text-sm text-gray-500`}
                    >
                      <Button
                        buttonIcon={TrashIcon}
                        onClick={() => HandleAction(index)}
                        circle={true}
                        className={
                          "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
                        }
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListTable;
