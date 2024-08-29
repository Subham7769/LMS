import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import InputNumber from '../InputNumber/InputNumber';

const SearchBox = () => {
    const location = useLocation();
    const [borrowerID, setBorrowerID] = useState("3333333361");
    const [borrowerNotFound, setBorrowerNotFound] = useState(false);
    const navigate = useNavigate(); // Adding useNavigate  for navigation

    async function checkBorrowerInfoCustomer(borrowerID) {
        try {
            const token = localStorage.getItem("authToken");
            const data = await fetch(
                "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/borrowers/" +
                borrowerID,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (data.status === 404) {
                console.log("Borrower Not Found"); // Clear the token
                setBorrowerNotFound(true);
                navigate("/customer-care"); // Redirect to customer-care page
                return; // Stop further execution
            }
            // Check for token expiration or invalid token
            if (data.status === 401 || data.status === 403) {
                localStorage.removeItem("authToken"); // Clear the token
                navigate("/login"); // Redirect to login page
                return; // Stop further execution
            }
            navigate("/borrower/" + borrowerID + "/personal-info");
            setBorrowerNotFound(false);
        } catch (error) {
            console.error(error);
        }
    }

    async function checkBorrowerInfoUser(borrowerID) {
        try {
            const token = localStorage.getItem("authToken");
            const data = await fetch(
                "https://api-test.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1/borrowers/" +
                borrowerID +
                "/check-availability/14-11-1981",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (data.status === 404) {
                console.log("User Not Found"); // Clear the token
                setBorrowerNotFound(true);
                navigate("/user"); // Redirect to login page
                return; // Stop further execution
            }
            // Check for token expiration or invalid token
            if (data.status === 401 || data.status === 403) {
                localStorage.removeItem("authToken"); // Clear the token
                navigate("/login"); // Redirect to login page
                return; // Stop further execution
            }
            navigate("/user/" + borrowerID + "/user-eligibilty");
            setBorrowerNotFound(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = () => {
        {
            location.pathname === '/customer-care'
                ? checkBorrowerInfoCustomer(borrowerID)
                : checkBorrowerInfoUser(borrowerID)
        }
    }

    return (
        <>
            <div className="flex items-center gap-5 justify-center mt-10">
                <div>{location.pathname === '/customer-care' ? 'Customer ID' : 'Borrower ID'}</div>
                <div>
                    <InputNumber
                        inputName="borrowerID"
                        inputValue={borrowerID}
                        onChange={(e) => {
                            setBorrowerID(e.target.value);
                        }}
                        placeHolder="1234567890"
                    />
                </div>
                <div>
                    <Button buttonName={"Search"} onClick={handleClick} rectangle={true} />
                </div>
            </div>
            {borrowerNotFound && (
                <div className="text-red-600 mt-4 text-center p-5 bg-red-300 ">
                    Borrower Not Found or Invalid ID
                    </div>
            )}
        </>
    )
}

export default SearchBox