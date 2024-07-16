import React from 'react';
import Select from "react-select";

const InputSelect = ({ labelName, inputName, inputValue, inputOptions, onChange, placeHolder, disabled=false , hidden=false, isMulti }) => {
    const handleChange = (selectedOption) => {
        onChange({ target: { name: inputName, value: selectedOption ? selectedOption.value : '' } });
    };

    return (
        <div className='flex flex-col'>
            {labelName && (
                <label
                    className="block text-gray-700 px-1 text-[14px]"
                    htmlFor={inputName}
                >
                    {labelName}
                </label>
            )}
            <Select
                name={inputName}
                className="block w-full max-w-30 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm "
                options={inputOptions}
                value={inputOptions.find(option => option.value === inputValue)}
                onChange={handleChange}
                isSearchable={true}
                placeholder={placeHolder}
                isDisabled={disabled}
                isHidden={hidden}
                isMulti={isMulti}
            />
        </div>
    );
};

export default InputSelect;
