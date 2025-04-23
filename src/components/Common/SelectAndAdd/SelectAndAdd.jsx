import React from "react";
import Select from "react-select";
import { PlusIcon } from "@heroicons/react/20/solid";
import Button from "../Button/Button";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";

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

const SelectAndAdd = ({
  ListName,
  SelectOptions,
  SelectedOption,
  HandleChange,
  ButtonName,
  onClick,
}) => {
  return (
    <div className="w-1/2 flex gap-4">
      <div className="w-2/4">
        <label htmlFor="entriesSelect" className="sr-only">
          {ListName}
        </label>
        <Select
          className="block w-full"
          options={SelectOptions}
          value={SelectedOption}
          onChange={HandleChange}
          isMulti={false}
          isSearchable={false}
          styles={customSelectStyles}
        />
      </div>
      <div className="w-2/4">
        <Button
          buttonIcon={PlusIcon}
          onClick={onClick}
          circle={true}
          buttonType="secondary"
        />
      </div>
    </div>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <SelectAndAdd {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
