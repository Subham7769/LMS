import React from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";

const InputText = ({
  labelName,
  inputName,
  inputValue,
  onChange,
  placeHolder,
  disabled = false,
  readOnly = false,
}) => {
  //   if (inputValue == "2%") {
  //   throw new Error(`Invalid inputValue for ${labelName}`);
  // }

  return (
    <div className="w-full">
      <label
        className="block text-gray-700 px-1 text-[14px]"
        htmlFor={inputName}
      >
        {labelName}
      </label>
      <input
        type="text"
        name={inputName}
        value={inputValue}
        onChange={onChange}
        placeholder={placeHolder}
        disabled={disabled}
        className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
        required
        readOnly={readOnly}
      />
    </div>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <InputText {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;

//   if (inputValue == null || inputValue === undefined) {
//     throw new Error(`Invalid inputValue for ${labelName}`);
//   }

// // Adding PropTypes validation
// InputText.propTypes = {
//   labelName: PropTypes.string.isRequired,
//   inputName: PropTypes.string.isRequired,
//   inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   onChange: PropTypes.func.isRequired,
//   placeHolder: PropTypes.string,
//   disabled: PropTypes.bool,
//   readOnly: PropTypes.bool,
// };

// // Default props in case some are not passed
// InputText.defaultProps = {
//   placeHolder: "",
//   disabled: false,
//   readOnly: false,
// };

// export default InputText;
