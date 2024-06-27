import React from 'react';
import Select from "react-select";
import Body from '../Body/Body';
import { PlusIcon } from "@heroicons/react/20/solid";

// Custom Styling
const customSelectStyles = {
    control: (provided) => ({
        ...provided,
        minHeight: '48px',
        borderRadius: '0.375rem',
        borderColor: '#D1D5DB',
        boxShadow: 'none',
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '0 0.75rem',
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '48px',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: '0 8px',
    }),
    clearIndicator: (provided) => ({
        ...provided,
        padding: '0 8px',
    }),
};

const SelectAndAdd = ({ ListName, SelectOptions, SelectedOption, HandleChange, ButtonName, onClick }) => {
    return (
        <Body>
            <div className="flex gap-4 bg-gray-100 p-10 rounded-xl">
                <div className="w-2/4">
                    <label htmlFor="entriesSelect" className="sr-only">
                        {ListName}
                    </label>
                    <Select
                        className="block w-full"
                        options={SelectOptions}
                        value={SelectedOption}
                        onChange={HandleChange}
                        isMulti={false}
                        isSearchable={false}
                        styles={customSelectStyles}
                    />
                </div>
                <div className="w-2/4">
                    <label htmlFor="search" className="sr-only">
                        {ButtonName}
                    </label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={onClick}
                            className="w-full h-10 rounded bg-indigo-600 flex gap-2 justify-center items-center text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            <PlusIcon className="h-6 w-6" aria-hidden="true" />
                            <p>{ButtonName}</p>
                        </button>
                    </div>
                </div>
            </div>
        </Body>
    );
};

export default SelectAndAdd;
