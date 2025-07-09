import React from 'react';
import ElementErrorBoundary from '../../ErrorBoundary/ElementErrorBoundary';

const InputCheckbox = ({ labelName, inputName, inputChecked, onChange, disabled = false, className, upperLabel = false }) => {
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
      <label
        className={`flex ${
          upperLabel ? "flex-col" : "items-center"
        }  w-full ${className} gap-2`}
      >
        {upperLabel && (
          <span className={`text-xs ${className} -mb-2 text-center`}>
            {labelName}
          </span>
        )}
        <input
          type="checkbox"
          name={inputName}
          checked={inputChecked || false}
          onChange={handleChange}
          className="form-checkbox"
          disabled={disabled}
        />
        {!upperLabel && (
          <span className={`text-sm ${className}`}>{labelName}</span>
        )}
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