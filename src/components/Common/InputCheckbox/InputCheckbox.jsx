import React from 'react'

const InputCheckbox = ({labelName, inputName, inputValue, inputChecked, onChange }) => {
    return (
        <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                name={inputName}
                value={inputValue}
                checked={inputChecked}
                onChange={onChange}
                className="form-checkbox rounded-md"
            />
            <span>{labelName}</span>
        </label>
    )
}

export default InputCheckbox