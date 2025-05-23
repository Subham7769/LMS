import React from "react";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import { MagnifyingGlassIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
const SearchView = ({
  heading,
  subHeading,
  borrowerID,
  onChange,
  handleSearch,
  searchIDArray,
  searchShowArray,
  borrowerNotFound,
}) => {
  return (
    <div className="flex flex-col gap-5 px-5">
      <h2 className="font-bold text-3xl">{heading}</h2>
      <p className="font-semibold text-gray-400">{subHeading}</p>
      <div className="flex gap-5 justify-between items-center">
        <div className="flex-1">
          <InputText
            labelName={"Unique ID"}
            inputName="borrowerID"
            inputValue={borrowerID}
            onChange={onChange}
            placeHolder="Enter the ID used during loan Registration (e.g. Passport: AB123456)"
            isValidation={true}
          />
        </div>
        <div className="mt-5">
          <Button
            buttonIcon={MagnifyingGlassIcon}
            buttonName={"Search"}
            onClick={handleSearch}
            rectangle={true}
          />
        </div>
      </div>
      {borrowerNotFound && (
        <div className="text-red-700 rounded mt-4 text-center p-5 bg-red-100">
          User Not Found or Invalid ID
        </div>
      )}
      <div className="bg-sky-500/20 mt-4 rounded-xl p-10">
        <h3 className="font-semibold">
          Search using ID provided during loan registration:
        </h3>
        <ul className="list-disc list-inside">
          {searchIDArray.map((searchID) => (
            <li key={searchID}>{searchID}</li>
          ))}
        </ul>
        <h3 className="font-semibold mt-4">This search will show you:</h3>
        <ul className="list-disc list-inside">
          {searchShowArray.map((searchShow) => (
            <li key={searchShow}>{searchShow}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchView;
