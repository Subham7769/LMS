import React, { useEffect, useState } from "react";
import Select from "react-select";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch } from "react-redux";
import {
  addFields,
  setValidationError,
} from "../../../redux/Slices/validationSlice";
import { useSelector } from "react-redux";

const SelectAndNumber = ({
  labelName,
  inputSelectName,
  inputSelectValue,
  inputSelectOptions,
  onChangeSelect,
  disabledSelect = false,
  hiddenSelect = false,
  inputNumberName,
  inputNumberId,
  inputNumberValue,
  onChangeNumber,
  placeHolderNumber,
  isValidation = false,
  dropdownTextSize = "small", // New prop to control dropdown text size
  isIndex,
  isValidation1 = false,
  isIndex1,

  inputSelect2Name,
  inputSelect2Value,
  inputSelect2Options,
  onChangeSelect2,
  disabledSelect2 = false,
  hiddenSelect2 = false,
  inputNumber2Name,
  inputNumber2Id,
  inputNumber2Value,
  onChangeNumber2,
  placeHolderNumber2,
  isValidation2 = false,
  isIndex2,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (inputSelectValue === null || inputSelectValue === undefined) {
    throw new Error(`Invalid inputValue for ${labelName}`);
  }

  const handleSelectChange = (selectedOption) => {
    onChangeSelect({
      target: {
        name: inputSelectName,
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const handleSelect2Change = (selectedOption) => {
    onChangeSelect2({
      target: {
        name: inputSelect2Name,
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const handleNumberChange = (e) => {
    const { value, id } = e.target;
    onChangeNumber({
      target: {
        name: inputNumberName,
        value: value === "" ? "" : Number(value),
        id: id,
      },
    });
  };

  const handleNumber2Change = (e) => {
    const { value, id } = e.target;
    onChangeNumber2({
      target: {
        name: inputNumber2Name,
        value: value === "" ? "" : Number(value),
        id: id,
      },
    });
  };

  // Define custom styles based on dropdownTextSize prop
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize:
        dropdownTextSize === "small"
          ? "0.875rem"
          : dropdownTextSize === "large"
          ? "1rem"
          : "0.875rem", // Change font size
      fontFamily: "inherit", // Set font to inherit
      padding: "8px 12px",
      backgroundColor: isDarkMode
        ? "#1f2937" // Tailwind's gray-800
        : "#fff",
      color: isDarkMode ? "#bfc4cd" : state.isSelected ? "#8e51ff" : "#4a5565",
      fontWeight: 500,
      borderBottom: isDarkMode ? "1px solid #374151" : "1px solid #e2e8f0",
      "&:hover": {
        backgroundColor: isDarkMode ? "#242e3c" : "#f9fafb",
        color: isDarkMode
          ? "#bfc4cd"
          : state.isSelected
          ? "#8e51ff"
          : "#4a5565",
      },
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: isDarkMode ? "#1f2937" : "#fff",
      border: isDarkMode ? "1px solid #374151" : "1px solid #e5e7eb",
      padding: 0,
      boxShadow: "none",
      height: 28,
      borderRadius: "0.5rem",
      "&:hover": {
        border: isDarkMode ? "1px solid #4b5563" : "1px solid #aaa",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure menu appears above other elements
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // Tailwind's shadow-lg
      borderRadius: "0.5rem", // Optional: match rounded-lg
      border: isDarkMode ? "1px solid #374151" : "1px solid #e5e7eb",
      backgroundColor: isDarkMode ? "#1f2937" : "#fff",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontFamily: "inherit",
      fontSize:
        dropdownTextSize === "small"
          ? "0.875rem"
          : dropdownTextSize === "large"
          ? "1rem"
          : "0.875rem", // Convert px to rem
      color: "#9ca3af", // Equivalent to Tailwind's text-gray-400
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize:
        dropdownTextSize === "small"
          ? "0.875rem"
          : dropdownTextSize === "large"
          ? "1rem"
          : "0.875rem", // Change font size
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#9ca3af", // Tailwind's text-gray-400
      "&:hover": {
        color: "#9ca3af", // maintain the same color on hover
      },
    }),
    indicatorSeparator: () => ({
      display: "none", // safety check for visual separation
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      display: "flex",
      backgroundColor: state.isDisabled ? "#f3f4f6" : "", // Tailwind's bg-gray-100
      color: state.isDisabled ? "#9ca3af" : "", // Tailwind's text-gray-900
    }),
  };

  // console.log(validationError);
  const validationKey = isIndex
    ? `${inputNumberName}_${isIndex}`
    : inputNumberName;
  if (isValidation) {
    useEffect(() => {
      if (!fields.includes(inputNumberName)) {
        dispatch(addFields({ inputName: inputNumberName }));
      }
    }, [inputNumberName, dispatch]);
  }

  const validationKey1 = isIndex1
    ? `${inputSelectName}_${isIndex}`
    : inputSelectName;
  if (isValidation1) {
    useEffect(() => {
      if (!fields.includes(inputSelectName)) {
        dispatch(addFields({ inputName: inputSelectName }));
      }
    }, [inputSelectName, dispatch]);
  }

  const validationKey2 = isIndex2
    ? `${inputNumber2Name}_${isIndex}`
    : inputNumber2Name;
  if (isValidation2) {
    useEffect(() => {
      if (!fields.includes(inputNumber2Name)) {
        dispatch(addFields({ inputName: inputNumber2Name }));
      }
    }, [inputNumber2Name, dispatch]);
  }

  return (
    <div>
      {labelName && (
        <label
          className={`block text-sm font-medium mb-1 ${
            validationError[validationKey] ||
            validationError[validationKey1] ||
            validationError[validationKey2]
              ? "text-red-600"
              : "text-gray-600 dark:text-gray-400"
          } px-1`}
          htmlFor={inputSelectName}
        >
          {validationError[validationKey] ||
          validationError[validationKey1] ||
          validationError[validationKey2]
            ? "Field required"
            : labelName}
        </label>
      )}
      <div className="flex items-center space-x-2">
        <Select
          name={inputSelectName}
          styles={customStyles}
          defaultValue={inputSelectValue}
          options={inputSelectOptions}
          className="block w-full max-w-30"
          getOptionLabel={(e) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              {e.label}
              {e.value === inputSelectValue && (
                <span
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  <svg
                    className="shrink-0 mr-2 fill-current text-violet-500"
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                  >
                    <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                  </svg>
                </span>
              )}
            </div>
          )}
          components={{
            SingleValue: ({ data, innerRef, innerProps }) => (
              <div
                ref={innerRef}
                {...innerProps}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize:
                    dropdownTextSize === "small"
                      ? "0.875rem"
                      : dropdownTextSize === "large"
                      ? "1rem"
                      : "0.875rem", // Convert px to rem
                }}
              >
                {data.label}
              </div>
            ),
          }}
          value={
            inputSelectOptions.find(
              (option) => option.value === inputSelectValue
            ) || null
          }
          onChange={handleSelectChange}
          isDisabled={disabledSelect}
          isHidden={hiddenSelect}
          isSearchable={false}
          onFocus={() => dispatch(setValidationError(validationKey1))}
        />
        <input
          type="number"
          name={inputNumberName}
          id={inputNumberId}
          value={inputNumberValue}
          onChange={handleNumberChange}
          onFocus={() => dispatch(setValidationError(validationKey))}
          placeholder={placeHolderNumber}
          className={`form-input w-full dark:disabled:placeholder:text-gray-600 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed
            ${validationError[validationKey] ? "border-red-300" : ""} 
          `}
        />
        {inputSelect2Name && (
          <>
            <Select
              name={inputSelect2Name}
              defaultValue={inputSelect2Value}
              options={inputSelect2Options}
              className="block w-full max-w-30 "
              getOptionLabel={(e) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {e.label}
                  {e.value === inputSelect2Value && (
                    <span
                      style={{
                        marginLeft: "auto",
                      }}
                    >
                      <svg
                        className="shrink-0 mr-2 fill-current text-violet-500"
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                      >
                        <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                      </svg>
                    </span>
                  )}
                </div>
              )}
              components={{
                SingleValue: ({ data, innerRef, innerProps }) => (
                  <div
                    ref={innerRef}
                    {...innerProps}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize:
                        dropdownTextSize === "small"
                          ? "0.875rem"
                          : dropdownTextSize === "large"
                          ? "1rem"
                          : "0.875rem", // Convert px to rem
                    }}
                  >
                    {data.label}
                  </div>
                ),
              }}
              value={
                inputSelect2Options.find(
                  (option) => option.value === inputSelect2Value
                ) || null
              }
              onChange={handleSelect2Change}
              isDisabled={disabledSelect2}
              isHidden={hiddenSelect2}
              isSearchable={false}
            />
            <input
              type="number"
              name={inputNumber2Name}
              id={inputNumber2Id}
              value={inputNumber2Value}
              onChange={handleNumber2Change}
              onFocus={() => dispatch(setValidationError(validationKey2))}
              placeholder={placeHolderNumber2}
              className={`form-input w-full dark:disabled:placeholder:text-gray-600 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed 
                ${validationError[validationKey2] ? "border-red-300" : ""} 
                `}
            />
          </>
        )}
      </div>
    </div>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <SelectAndNumber {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
