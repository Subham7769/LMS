import React from 'react'
import ElementErrorBoundary from '../../ErrorBoundary/ElementErrorBoundary';

const InputDate = ({labelName, inputName, inputValue, onChange }) => {
    
    return (
        <>
            <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="startDate"
            >
                {labelName}
            </label>
            <input
                type="date"
                name={inputName}
                value={inputValue}
                onChange={onChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </>
    )
}


// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
    return (
      <ElementErrorBoundary>
        <InputDate {...props} />
      </ElementErrorBoundary>
    );
  };
  
  export default WithErrorBoundary;