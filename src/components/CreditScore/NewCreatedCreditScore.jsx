import React, { useState, useEffect } from "react";
import DynamicName from "../Common/DynamicName/DynamicName";
import { TrashIcon } from "@heroicons/react/20/solid";
import useCreditScoreEq from "../../utils/useCreditScoreEq";
import { useNavigate, useParams } from "react-router-dom";
import CreditScore from "./CreditScore";

const NewCreatedCreditScore = () => {
  const [creditScoreName, setCreditScoreName] = useState("");
  const [cloneCSE, setCloneCSE] = useState(false);
  const [cloneCSEName, setCloneCSEName] = useState("");
  const { creditScoreId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCSEInfo();
  }, [creditScoreId]);

  async function getCSEInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/cse-temp/id/" +
          creditScoreId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const CreditScoreDetails = await data.json();
      setCreditScoreName(CreditScoreDetails.name.replace(/-/g, " "));
      // console.log(CreditScoreEqData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClone = () => {
    setCloneCSE(true);
  };

  const createCloneCSE = async (cloneCSEName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/cse-temp/" +
          creditScoreId +
          "/clone/" +
          cloneCSEName,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const cseDetails = await data.json();
      console.log(cseDetails);
      navigate("/credit-score/" + cseDetails.creditScoreEqTempId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCSE = async (updatecseName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/cse-temp/" +
          creditScoreId +
          "/name/" +
          updatecseName,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const cseDetails = await data.json();
      console.log(cseDetails);
      navigate("/credit-score/" + cseDetails.creditScoreEqTempId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (deleteURL) => {
    try {
      const token = localStorage.getItem("authToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/cse-temp/${deleteURL}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the item");
      }
      navigate("/credit-score");
      // Refresh the page after navigation
      window.location.reload();

      // After deletion, fetch the updated data list
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
    }
  };
  return (
    <>
      <div className="flex justify-between items-baseline border-b border-gray-300 pb-5">
        <DynamicName initialName={creditScoreName} onSave={handleUpdateCSE} />
        <div className="flex items-center justify-between gap-6">
          <button
            type="button"
            onClick={handleClone}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Clone
          </button>
          <button
            onClick={() => handleDelete(creditScoreId)}
            type="button"
            className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        {cloneCSE ? (
          <>
            <div>Create Clone Credit Score Equation</div>
            <div className="my-5">
              <input
                type="text"
                name="cseName"
                id="cseName"
                value={cloneCSEName}
                onChange={(e) => {
                  setCloneCSEName(e.target.value);
                }}
                className="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Clonned  Name"
              />
            </div>
            <div>
              <button
                onClick={() => createCloneCSE(cloneCSEName)}
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Clone
              </button>
            </div>
          </>
        ) : (
          <CreditScore />
        )}
      </div>
    </>
  );
};

export default NewCreatedCreditScore;
