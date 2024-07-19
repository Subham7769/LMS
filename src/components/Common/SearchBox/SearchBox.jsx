import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const SearchBox = () => {
    const location = useLocation();
    const [borrowerID, setBorrowerID] = useState("");
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
            navigate("/user/" + borrowerID + "/user-info");
            setBorrowerNotFound(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = () => {
        { location.pathname === '/customer-care' 
            ? checkBorrowerInfoCustomer(borrowerID) 
            : checkBorrowerInfoUser(borrowerID) 
        }
    }

    return (
        <>
            <div className="flex items-center gap-5 justify-center mt-10">
                <div>{location.pathname === '/customer-care' ? 'Customer ID' : 'Borrower ID'}</div>
                <div>
                    <input
                        type="number"
                        name="borrowerID"
                        id="borrowerID"
                        value={borrowerID}
                        onChange={(e) => {
                            setBorrowerID(e.target.value);
                        }}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="1234567890"
                    />
                </div>
                <div>
                    <button
                        onClick={handleClick}
                        type="button"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Search
                    </button>
                </div>
            </div>
            {borrowerNotFound && (
                <div className="text-red-600 mt-4 text-center">Record Not Found</div>
            )}
        </>
    )
}

export default SearchBox