import React, { useState } from 'react';
import { PlusIcon } from "@heroicons/react/20/solid";
import { useNavigate } from 'react-router-dom';


const CreateNew = ({ placeholder, buttonName, createFunction, editable, navigateSuccess, navigateFail }) => {
    const [Name, setName] = useState("");
    const [isEditing, setEditing] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            createFunction(Name, navigate, navigateSuccess, navigateFail);
        }
    };

    const handleBlur = () => {
        setEditing(false);
        setName('');
    };


    return (
        isEditing ? (
            <div className='pl-6 w-full flex justify-between '>
                <input
                    type="text"
                    name="Name"
                    id="Name"
                    value={Name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="placeholder:text-xs text-xs block w-full rounded-sm text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 py-0 px-1"
                    placeholder={placeholder}
                    autoFocus
                />
            </div>
        ) : (
            <div
                className='text-gray-500 pl-6 w-full text-xs flex items-center justify-between cursor-pointer rounded-md hover:bg-gray-100 hover:text-indigo-600'
                onClick={() => { editable ? setEditing(!isEditing) : navigate(navigateSuccess) }}>
                <p>{buttonName}</p>
                <div>
                    <PlusIcon className="h-6 w-6 shrink-0" />
                </div>
            </div>
        )
    );
};

export default CreateNew;
