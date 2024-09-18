import React, { useState } from 'react';
import { PlusIcon } from "@heroicons/react/20/solid";
import { useNavigate } from 'react-router-dom';
import { fetchRACData, fetchDBRData, fetchBEData, fetchProjectData, fetchProductData, fetchCreditScoreEqData, fetchRulePolicyData, fetchTCLData,fetchProdGroupData,fetchRecoveryData, fetchCreditScoreEligibleTenureData } from '../../../redux/Slices/sidebarSlice'
import { useDispatch } from 'react-redux';


const CreateNew = ({ placeholder, buttonName, createFunction, menuTitle, editable, navigateSuccess, navigateFail }) => {
    const [Name, setName] = useState("");
    const [isEditing, setEditing] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const handleChange = (e) => {
        setName(e.target.value);
    };
    function dispatchType(menuTitle) {
        switch (menuTitle) {
            case 'RAC' : case 'Dynamic RAC':
                return fetchRACData;
            case 'DBR Config':
                return fetchDBRData;
            case 'Blocked Employer':
                return fetchBEData;
            case 'Project':
                return fetchProjectData;
            case 'Product':
                return fetchProductData;
            case 'Credit Score':
                return fetchCreditScoreEqData;
              case 'Rule Policy':
                return fetchRulePolicyData;
              case 'TCL':
                return fetchTCLData;
              case 'Product Group':
                return fetchProdGroupData;
              case 'Recovery':
                return fetchRecoveryData;
              case 'Credit Score Eligible Tenure':
                return fetchCreditScoreEligibleTenureData;
            default:
                return null;
        }
    }


    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            await createFunction(Name, navigate, navigateSuccess, navigateFail);
            const dispatcherFunction = dispatchType(menuTitle)
            dispatch(dispatcherFunction())
            setEditing(false);
            setName('');
        }
    };

    const handleBlur = () => {
        setEditing(false);
        setName('');
    };


    return (
        isEditing ? (
            <div className='flex justify-center'>
                <input
                    type="text"
                    name="Name"
                    id="Name"
                    value={Name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="placeholder:text-xs text-xs focus:ring-1 focus:ring-inset focus:ring-indigo-600 w-11/12 rounded-sm text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 py-0 px-1 -mx-2"
                    placeholder={placeholder}
                    autoFocus
                />
            </div>
        ) : (
            <div
                className='text-gray-500 pl-5 pr-1 w-full text-xs flex items-center justify-between cursor-pointer rounded-md hover:bg-gray-100 hover:text-indigo-600'
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
