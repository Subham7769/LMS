import React from 'react';
import Select from "react-select";

const InputSelect = ({ labelName, inputName, inputValue, inputOptions, onChange, placeHolder }) => {
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
                className="focus:ring focus:ring-blue-600 pb-2"
                options={inputOptions}
                value={inputOptions.find(option => option.value === inputValue)}
                onChange={handleChange}
                isSearchable={true}
                placeholder={placeHolder}
                
            />
        </div>
    );
};

export default InputSelect;
