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
  },
  {
    name: "BNPL TCL",
    minTCL: "300",
    maxTCL: "400",
    avgTCL: "350",
    totalUser: "20",
    uploadedDate: "1 Sept 2023",
  },
  {
    name: "Overdraft TCL",
    minTCL: "500",
    maxTCL: "600",
    avgTCL: "550",
    totalUser: "30",
    uploadedDate: "1 Oct 2023",
  },
];

const TclComponent2 = () => {
  const [fileSelectedOption, setFileSelctedOption] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  const handleChange = (value) => {
    const updatedCurrentData = data.filter((item) => item.name === value);
    setCurrentData(updatedCurrentData[0]);
  };
  return (
    <>
      <div className="mt-3 mb-10">
        <label htmlFor="gender" className="block">
          Select File
        </label>
        <div className="flex items-center gap-5">
          <Select
            className="w-[230px]"
            options={fileoptions}
            value={fileSelectedOption}
            onChange={(selectedOption) => {
              setFileSelctedOption(selectedOption);
              handleChange(selectedOption.value);
            }}
            isMulti={false}
            isSearchable={false}
          />
        </div>
      </div>
      {currentData === null ? (
        ""
      ) : (
        <div className="flex gap-5 border border-red-600 rounded-md w-fit p-5">
          <div className="border-r border-gray-300 pr-5">
            <div className="mb-3">Min TCL : {currentData.minTCL}</div>
            <div>Max TCL : {currentData.maxTCL}</div>
          </div>
          <div className="border-r border-gray-300 pr-5">
            <div className="mb-3">Avg TCL : {currentData.avgTCL}</div>
            <div>Total User : {currentData.totalUser}</div>
          </div>
          <div>Uploaded Date : {currentData.uploadedDate}</div>
        </div>
      )}
    </>
  );
};

export default TclComponent2;
