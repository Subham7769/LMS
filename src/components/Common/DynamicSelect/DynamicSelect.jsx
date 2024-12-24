import React, { useEffect } from "react";
import Select from "react-select";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import {
  addFields,
  setValidationError,
} from "../../../redux/Slices/validationSlice";

const SelectInput = ({
  labelName,
  inputName,
  inputValue,
  inputOptions,
  onChange,
  placeHolder,
  className,
  isDisabled,
  isSearchable,
  isMulti,
  defaultValue,
  isValidation = false,
  isIndex,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);

  const validationKey = isIndex ? `${inputName}_${isIndex}` : inputName;
  if (isValidation) {
    useEffect(() => {
      if (!fields.includes(inputName)) {
        dispatch(addFields({ inputName }));
      }
    }, [inputName, dispatch]);
  }
  return (
    <>
      <div className="flex flex-col">
        {labelName && (
          <label
            className={`block ${
              validationError[validationKey] ? "text-red-600" : "text-gray-700"
            } px-1  text-sm font-semibold`}
            htmlFor={inputName}
          >
            {validationError[validationKey] ? "Field required" : labelName}
          </label>
        )}
        <Select
          name={inputName}
          className={`${className} focus:ring focus:ring-blue-600`}
          options={inputOptions}
          value={inputValue}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeHolder}
          isSearchable={isSearchable}
          onFocus={() => dispatch(setValidationError(validationKey))} // Call onFocus to reset the error state
          isDisabled={isDisabled}
          isMulti={isMulti}
        />
      </div>
    </>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <SelectInput {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
