import React, { useState } from 'react';
import { PlusIcon } from "@heroicons/react/20/solid";
import { useNavigate } from 'react-router-dom';

const CreateNew = ({ placeholder, buttonName }) => {
    const [Name, setName] = useState("");
    const [isEditing, setEditing] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            createNewRac(Name);
        }
    };

    const handleBlur = () => {
        setName('');
        setEditing(!isEditing);
    };

    async function createNewRac(Name) {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(
                "http://10.10.10.70:32014/carbon-product-service/xtracash/rules/rac/" + Name,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem("authToken");
                navigate("/login");
                return;
            }
            const racDetails = await response.json();
            console.log(racDetails);
            navigate("/newrac/" + racDetails.racId);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        isEditing ? (
            <div className='pl-6 w-full flex justify-between '>
                <input
                    type="text"
                    name="Name"
                    id="Name"
                    value={Name}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    className="placeholder:text-xs text-sm block w-full rounded-sm text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 py-0 px-1"
                    placeholder={placeholder}
                />
            </div>

        ) : (
            <div className='text-gray-500 pl-6 w-full text-sm flex items-center justify-between cursor-pointer rounded-md hover:bg-gray-100 hover:text-indigo-600' onClick={() => setEditing(!isEditing)}>
                <p>{buttonName}</p>
                <div>

                <PlusIcon className="h-6 w-6 shrink-0" />
                </div>
            </div>
        )
    );
};

export default CreateNew;
