import React, { useEffect, useState } from "react";
import { removeTag } from "../../../redux/Slices/dynamicRacSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addFields,
  setValidationError,
} from "../../../redux/Slices/validationSlice";

const InputTextMulti = ({
  label,
  inputName,
  tag,
  setTag,
  sectionId,
  dynamicRacRuleId,
  disabled = false,
  isValidation,
  required,
}) => {
  const [included, setIncluded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);

  const handleDeleteTag = (tagToDelete) => {
    setTag(tag.filter((existingTag) => existingTag !== tagToDelete)); // Update local state
    dispatch(
      removeTag({ sectionId, dynamicRacRuleId, tagToRemove: tagToDelete })
    ); // Dispatch to Redux
  };

  const handleAddTag = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !tag.includes(trimmedValue)) {
        setTag([...tag, trimmedValue]); // Add new tag if it's valid
        setInputValue(""); // Reset input value after adding tag
      } else {
        setIncluded(true);
      }
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setIncluded(false);
  };

  if (isValidation) {
    useEffect(() => {
      if (!fields.includes(inputName)) {
        dispatch(addFields({ inputName }));
      }
    }, [inputName, dispatch]);
  }

  const validationKey =
    sectionId && dynamicRacRuleId
      ? `criteriaValues_${sectionId}_${dynamicRacRuleId}`
      : inputName;

  return (
    <div className="w-full">
      <label
        className={`block relative ${
          validationError[validationKey]
            ? "text-red-600"
            : "text-gray-700 dark:text-gray-400"
        } px-1 h-[22px] text-sm font-medium mb-1`}
      >
        {validationError[validationKey] ? "Field required" : label}
        {required && <span className="ml-1 text-red-600">*</span>}
        {inputValue && (
          <span className="text-[10px] ml-1 text-gray-400">
            (Type and press Enter)
          </span>
        )}
        <span
          className={
            "absolute right-1 -bottom-7 text-xs text-red-500 font-light"
          }
        >
          {included && "Value already included"}
        </span>
      </label>

      <div className=" gap-2 rounded-md flex flex-col flex-wrap items-between">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleAddTag} // Handle key down events
          onFocus={() => dispatch(setValidationError(validationKey))}
          placeholder="Type and press Enter"
          className={`form-input w-full dark:disabled:placeholder:text-gray-600 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed 
          ${
            validationError[validationKey]
              ? "ring-red-600 focus:ring-red-600"
              : ""
          } 
          `}
          style={{
            appearance: "none", // General rule for most modern browsers
          }}
          disabled={disabled}
          required={required}
        />
      </div>
      {tag?.length > 0 && !disabled && (
        <div className="flex flex-wrap items-center mt-2">
          {tag?.map((tagItem, index) => (
            <span
              key={index}
              className="text-sky-700 bg-sky-500/20 text-[14px] rounded-full px-3 py-1 m-1 flex items-center"
            >
              {tagItem}
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent default form submission behavior
                  handleDeleteTag(tagItem);
                }}
                className="ml-2"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputTextMulti;
