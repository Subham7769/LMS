import React, { useState } from 'react';
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const ListTable = ({ ListName, ListHeader, ListItem, HandleAction, Searchable }) => {
  const HeaderCellWidth = ListHeader.length + 1; // Calculate cell width based on header length

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(ListItem);

  // Function to handle search input change
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = ListItem.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Use filteredData instead of ListItem for rendering
  const dataToRender = searchTerm ? filteredData : ListItem;

  return (
    <div className="bg-gray-100 py-6 rounded-xl mt-4">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Search bar if Searchable prop is true */}
        {Searchable && (
          <div className="mb-5 w-full">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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

        {/* Table title */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">{ListName}</h1>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      {ListHeader.map((header, index) => (
                        <th
                          key={index}
                          scope="col"
                          className={`px-3 py-3 w-1/${HeaderCellWidth} text-center text-sm font-medium text-gray-900`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {dataToRender.map((product, index) => (
                      <tr key={index}>
                        {Object.keys(product).map((key, idx) => (
                          // Do not create cell for href key in the object of array
                          key !== "href" ? (
                            <td key={idx} className={`w-1/${HeaderCellWidth} whitespace-nowrap text-center py-3 px-3 text-sm text-gray-500`}>
                              {product.href ? (
                                // If product has a href attribute then create a clickable Link 
                                <Link className="w-full block" to={product.href}>
                                  {product[key]}
                                </Link>
                              ) : (
                                // Else create a simple text
                                product[key]
                              )}
                            </td>
                          ) : null
                        ))}
                        {/* Add Actions column if present */}
                        {ListHeader.includes('Actions') && (
                          <td className={`w-1/${HeaderCellWidth} whitespace-nowrap text-center py-4 px-3 text-sm text-gray-500`}>
                            <button
                              onClick={() => HandleAction(index)}
                              type="button"
                              className="w-8 h-8 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                              <TrashIcon className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTable;
