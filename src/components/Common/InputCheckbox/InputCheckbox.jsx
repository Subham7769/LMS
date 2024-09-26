import React from 'react';
import ElementErrorBoundary from '../../ErrorBoundary/ElementErrorBoundary';

const InputCheckbox = ({ labelName, inputName, inputChecked, onChange, disabled = false, className }) => {
    const handleChange = (e) => {
        onChange({
            target: {
                name: e.target.name,
                checked: e.target.checked,
                type: 'checkbox'
            }
        });
    };

    return (
        <label className={`flex items-center  mt-3 w-full  ${className} gap-3`}>
            <input
                type="checkbox"
                name={inputName}
                checked={inputChecked || false}
                onChange={handleChange}
                className="form-checkbox rounded-md p-2"
                disabled={disabled}
            />
            <span className={`text-xs w-full  ${className}`}>{labelName}</span>
        </label>
    );
};


// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
    return (
      <ElementErrorBoundary>
        <InputCheckbox {...props} />
      </ElementErrorBoundary>
    );
  };
  
  export default WithErrorBoundary;


