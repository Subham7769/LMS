import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid"; // or use HeroIcons / any SVG
import { useDispatch, useSelector } from 'react-redux';
import { updateAddLoanDataGeneralDetailsField, updatePersonalBorrowerField } from '../../../redux/Slices/B2CLoansSlice';

const PersonDetailsSection = () => {
    const location = useLocation();
    const { pathname } = location;
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const { personalBorrower } = useSelector((state) => state.B2CLoans)

    const handleInputChange = (e, section) => {
        const { name, value, type, checked } = e.target;
        if (name === 'uniqueID') {
            dispatch(updatePersonalBorrowerField({ section: "personalDetails", field: "uniqueID", value, type, checked }));
            dispatch(updatePersonalBorrowerField({ section: "cachedDetails", field: "cachedEmail", value, type, checked }));
            dispatch(updateAddLoanDataGeneralDetailsField({ field: "borrowerId", value }));
        } else if (name === 'basicPay') {
            dispatch(updatePersonalBorrowerField({ section: "cachedDetails", field: "cachedBasicPay", value, type, checked }));
            dispatch(updatePersonalBorrowerField({ section: "incomeOnPaySlip", field: "basicPay", value, type, checked }));

        }
        else if (name === 'cachedPassword') {
            dispatch(updatePersonalBorrowerField({ section: "cachedDetails", field: "cachedPassword", value, type, checked }));
        }
        else {
            dispatch(updatePersonalBorrowerField({ section, field: name, value, type, checked }));
        }
    };


    return (
        <>
            <input
                className={`form-input w-full mb-4 py-4 ${pathname.includes("loan-offers") && "hidden"}`}
                type="email"
                placeholder="Email"
                value={personalBorrower.personalDetails.uniqueID}
                name="uniqueID"
                onChange={(e) => handleInputChange(e, "personalDetails")}
                required
                disabled={pathname.includes("loan-offers")}
            />
            <input
                className="form-input w-full mb-4 py-4"
                type="number"
                placeholder="Basic Pay"
                name="basicPay"
                value={personalBorrower.incomeOnPaySlip.basicPay}
                onChange={(e) => handleInputChange(e, "incomeOnPaySlip")}
                required
            />
            {/* <div className={`relative group w-full ${pathname.includes("loan-offers") && "hidden"} `} > */}
                {/* <input
                    className="form-input w-full mb-4 py-4 pr-12"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Password"
                    name="cachedPassword"
                    value={personalBorrower.cachedDetails.cachedPassword}
                    onChange={(e) => handleInputChange(e, "cachedDetails")}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                    required
                /> */}

                {/* 👁 Password Toggle Icon */}
                {/* <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-4 top-7 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    {showPassword ? <EyeSlashIcon className='h-5 w-5' /> : <EyeIcon className='h-5 w-5' />}
                </button> */}

                {/* 🧠 Tooltip on hover */}
                {/* <div className="absolute bottom-full left-0 mb-2 hidden w-32 rounded bg-gray-900 text-[9px] text-white p-1 group-hover:block z-10 shadow-lg">
                    • At least 8 characters<br />
                    • One uppercase letter<br />
                    • One lowercase letter<br />
                    • One number
                </div> */}
            {/* </div> */}
        </>
    )
}

export default PersonDetailsSection