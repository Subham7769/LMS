import React from 'react';

const InputCheckbox = ({ labelName, inputName, inputChecked, onChange }) => {
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
        <label className="flex items-center space-x-4 mt-3 w-full">
            <input
                type="checkbox"
                name={inputName}
                checked={inputChecked || false}
                onChange={handleChange}
                className="form-checkbox rounded-md p-2"
            />
            <span className='text-xs w-full'>{labelName}</span>
        </label>
    );
};

export default InputCheckbox;


