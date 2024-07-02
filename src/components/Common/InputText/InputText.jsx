import React from 'react'

const InputText = ({labelName, inputName, inputValue, onChange, placeHolder}) => {
    return (
        <>
            <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor={inputName}
            >
                {labelName}
            </label>
            <input
                type="text"
                name={inputName}
                value={inputValue}
                onChange={onChange}
                placeholder={placeHolder}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
            />
        </>
    )
}

export default InputText