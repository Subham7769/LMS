import React, { useEffect, useState } from "react";
import Select from "react-select";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import {
  addFields,
  setValidationError,
} from "../../../redux/Slices/validationSlice";
import {
  addUpdateFields,
  setUpdateMap,
} from "../../../redux/Slices/notificationSlice";
import { hasViewOnlyAccess } from "../../../utils/roleUtils";

const InputSelect = ({
  labelName,
  inputName,
  inputValue,
  inputId,
  inputOptions,
  onChange,
  placeHolder,
  disabled,
  hidden = false,
  isMulti = false,
  searchable = false,
  isClearable = false,
  dropdownTextSize = "small", // New prop to control dropdown text size
  isValidation = false,
  isIndex,
  isSectionId,
  isRuleId,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);
  const { updateFields } = useSelector((state) => state.notification);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
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

  const handleChange = (selectedOption) => {
    onChange({
      target: {
        name: inputName,
        value: selectedOption ? selectedOption.value : "",
        label:selectedOption ? selectedOption.label : "",
        id: inputId,
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
      fontFamily: "inherit", // Set font to inherit #242e3c
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
      color: isDarkMode ? "#f3f4f6" : "#1f2937",

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
    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure dropdown is on top
  };

  let validationKey = isIndex ? `${inputName}_${isIndex}` : inputName;

  if (isSectionId && isRuleId) {
    validationKey = `${inputName}_${isSectionId}_${isRuleId}`;
  }
  if (isValidation) {
    useEffect(() => {
      if (!fields.includes(inputName)) {
        dispatch(addFields({ inputName }));
      }
    }, [inputName, dispatch]);
  }

  if (disabled === undefined) {
    disabled = hasViewOnlyAccess(roleName);
  }
  useEffect(() => {
    if (!updateFields.includes(inputName)) {
      dispatch(addUpdateFields({ inputName }));
    }
  }, [inputName, dispatch]);

  return (
    <div
      className="flex flex-col shadow-l"
      onClick={(e) => e.stopPropagation()}
    >
      {labelName && (
        <label
          className={`block text-sm font-medium mb-1 ${
            validationError[validationKey]
              ? "text-red-600"
              : "text-gray-600 dark:text-gray-400"
          } px-1`}
          htmlFor={inputName}
        >
          {validationError[validationKey] ? "Field required" : labelName}{" "}
          {isValidation && <span className="text-red-600">*</span>}
        </label>
      )}
      <Select
        name={inputName}
        styles={customStyles} // Apply custom styles
        options={inputOptions}
        getOptionLabel={(e) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {e.label}
            {e.value === inputValue && (
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
          isMulti
            ? inputValue
            : inputOptions?.find((option) => option.value === inputValue) ||
              null
        }
        inputId={inputId}
        onChange={handleChange}
        isClearable={isClearable}
        isSearchable={searchable}
        placeholder={placeHolder}
        onFocus={() => {
          dispatch(setValidationError(validationKey));
          dispatch(setUpdateMap(inputName));
        }} // Call onFocus to reset the error state -- hasViewOnlyAccess(roleName) ||
        isDisabled={disabled}
        isHidden={hidden}
        isMulti={isMulti}
        menuPortalTarget={document.body} // Render dropdown outside of overflow
      />
    </div>
  );
};

// Wrap the entire component with ElementErrorBoundary
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <InputSelect {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
