import React from 'react'
import ElementErrorBoundary from '../../ErrorBoundary/ElementErrorBoundary';

const InputPassword = ({
  labelName,
  inputName,
  inputValue,
  onChange,
  placeHolder,
  disabled = false,
  readOnly=false,
}) => {
  return (
    <div className="w-full">
      <label
        className="block text-gray-700 px-1 text-[14px]"
        htmlFor={inputName}
      >
        {labelName}
      </label>
      <input
        type="password"
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
  )
}

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <InputPassword {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;