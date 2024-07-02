import React from 'react';

const InputCheckbox = ({ labelName, inputName, inputValue, inputChecked, onChange }) => {
    const handleChange = (e) => {
        onChange({target:{name:e.target.name, checked:e.target.checked}});
    };

    return (
        <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                name={inputName}
                value={inputValue}
                checked={inputChecked}
                onChange={handleChange}
                className="form-checkbox rounded-md"
            />
            <span>{labelName}</span>
        </label>
    );
};

export default InputCheckbox;
