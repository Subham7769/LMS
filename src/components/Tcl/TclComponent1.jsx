import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import Select from "react-select";

const fileoptions = [
  { value: "Cash Loan TCL", label: "Cash Loan TCL" },
  { value: "BNPL TCL", label: "BNPL TCL" },
  { value: "Overdraft TCL", label: "Overdraft TCL" },
];

const data = [
  {
    name: "Cash Loan TCL",
    minTCL: "100",
    maxTCL: "200",
    avgTCL: "150",
    totalUser: "10",
    uploadedDate: "1 Aug 2023",
    totalRows: 3,
  },
  {
    name: "BNPL TCL",
    minTCL: "300",
    maxTCL: "400",
    avgTCL: "350",
    totalUser: "20",
    uploadedDate: "1 Sept 2023",
    totalRows: 5,
  },
  {
    name: "Overdraft TCL",
    minTCL: "500",
    maxTCL: "600",
    avgTCL: "550",
    totalUser: "30",
    uploadedDate: "1 Oct 2023",
    totalRows: 7,
  },
];

const TclComponent1 = () => {
  const [fileSelectedOption, setFileSelectedOption] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (selectedOption) => {
    setFileSelectedOption(selectedOption);
    setMessage(""); // Reset message on selection change
  };

  const addData = () => {
    if (!fileSelectedOption) {
      setMessage("Please select a file first.");
      return;
    }

    const selectedFileData = data.find(
      (item) => item.name === fileSelectedOption.value
    );

    if (selectedFileData) {
      const alreadyExists = tableData.some(
        (item) => item.name === selectedFileData.name
      );

      if (alreadyExists) {
        setMessage("The selected file is already added to the table.");
      } else {
        setTableData((prevData) => [selectedFileData, ...prevData]);
        setMessage(""); // Clear message if data is successfully added
      }
    }
  };

  const handleDelete = (index) => {
    setTableData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="mt-3 mb-10 flex items-center gap-4">
        <div>
          <label htmlFor="file-select" className="block">
            Select File
          </label>
          <div className="flex items-center gap-5">
            <Select
              className="w-[230px]"
              options={fileoptions}
              value={fileSelectedOption}
              onChange={handleChange}
              isMulti={false}
              isSearchable={false}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={addData}
          className="w-9 h-9 mt-6 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {message && <div className="mb-4 text-red-500">{message}</div>}

      <table className="divide-y divide-gray-300 min-w-[60%] max-w-[80%]">
        <thead>
          <tr className="divide-x divide-gray-200">
            <th className="py-3.5 px-4 text-center">File Name</th>
            <th className="py-3.5 px-4 text-center">Min TCL</th>
            <th className="py-3.5 px-4 text-center">Max TCL</th>
            <th className="py-3.5 px-4 text-center">Avg TCL</th>
            <th className="py-3.5 px-4 text-center">Total User</th>
            <th className="py-3.5 px-4 text-center">Uploaded Date</th>
            <th className="py-3.5 px-4 text-center">Total Rows</th>
            <th className="py-3.5 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {tableData.length === 0 ? (
            <tr className="divide-x divide-gray-200 text-center w-full">
              <td colSpan="8" className="text-center py-4">
                No data available
              </td>
            </tr>
          ) : (
            tableData.map((row, index) => (
              <tr
                key={index}
                className="divide-x divide-gray-200 text-center w-full"
              >
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {row.name}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {row.minTCL}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {row.maxTCL}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {row.avgTCL}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {row.totalUser}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {row.uploadedDate}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {row.totalRows}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    <button
                      onClick={() => handleDelete(index)}
                      type="button"
                      className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default TclComponent1;
