import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addFields, setValidationError } from "../../../redux/Slices/validationSlice";

const InputRadio = ({
  labelName,
  inputName,
  inputValue, // Renamed for clarity
  inputOptions,
  onChange,
  isValidation = false,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);

  if (!inputName || typeof onChange !== "function") {
    throw new Error(
      `Invalid props: inputName is required, and onChange must be a function.`
    );
  }

  const validationKey = inputName;

  // Add the field to the validation state if isValidation is true
  useEffect(() => {
    if (isValidation && !fields.includes(inputName)) {
      dispatch(addFields({ inputName }));
    }
  }, [inputName, isValidation, dispatch]);

  return (
    <div className="flex flex-col">
      {labelName && (
        <label
          className={`px-1 text-sm font-semibold mb-2 ${
            validationError[validationKey] ? "text-red-600" : "text-gray-700"
          }`}
        >
          {validationError[validationKey] ? "Field required" : labelName}
        </label>
      )}
      <div className="flex flex-wrap gap-4">
        {inputOptions.map((option, index) => (
          <label
            key={index}
            className={`flex items-center gap-2 cursor-pointer ${
              validationError[validationKey] ? "text-red-600" : "text-gray-700"
            }`}
          >
            <input
              type="radio"
              name={inputName}
              value={option.value} // Set each option's value
              checked={inputValue === option.value} // Ensure the correct radio is selected
              onChange={onChange}
              className={`form-radio ${
                validationError[validationKey]
                  ? "text-red-600 focus:ring-red-600"
                  : "text-blue-500 focus:ring-blue-500"
              }`}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

// Define prop types for the component
InputRadio.propTypes = {
  labelName: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  inputOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  inputValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isValidation: PropTypes.bool,
};

export default InputRadio;
