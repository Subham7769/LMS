import React, { useState, useEffect } from "react";
import DynamicName from "../Common/DynamicName/DynamicName";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import CreditPolicy from "./CreditPolicy";

const NewCreditPolicy = () => {
  const [creditPolicyName, setCreditPolicyName] = useState("");
  const [cloneRP, setCloneRP] = useState(false);
  const [cloneRPName, setCloneRPName] = useState("");
  const { rulePolicyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCSEInfo();
  }, [rulePolicyId]);

  async function getCSEInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp/id/" +
          rulePolicyId,
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
      setCreditPolicyName(CreditScoreDetails.name.replace(/-/g, " "));
      // console.log(CreditScoreEqData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClone = () => {
    setCloneRP(true);
  };

  const createCloneRP = async (cloneRPName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp/" +
          rulePolicyId +
          "/clone/" +
          cloneRPName,
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
      const rpDetails = await data.json();
      console.log(rpDetails);
      navigate("/rule-policy/" + rpDetails.rulePolicyTempId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCP = async (updateCpName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp/" +
          rulePolicyId +
          "/name/" +
          updateCpName,
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
      const rpDetails = await data.json();
      console.log(rpDetails);
      navigate("/rule-policy/" + rpDetails.rulePolicyTempId);
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
        `http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp/${deleteURL}`,
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
      navigate("/rule-policy");
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
        <DynamicName initialName={creditPolicyName} onSave={handleUpdateCP} />
        <div className="flex items-center justify-between gap-6">
          <button
            type="button"
            onClick={handleClone}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Clone
          </button>
          <button
            onClick={() => handleDelete(rulePolicyId)}
            type="button"
            className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        {cloneRP ? (
          <>
            <div>Create Clone Rule Policy</div>
            <div className="my-5">
              <input
                type="text"
                name="cseName"
                id="cseName"
                value={cloneRPName}
                onChange={(e) => {
                  setCloneRPName(e.target.value);
                }}
                className="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Clonned  Name"
              />
            </div>
            <div>
              <button
                onClick={() => createCloneRP(cloneRPName)}
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Clone
              </button>
            </div>
          </>
        ) : (
          <CreditPolicy />
        )}
      </div>
    </>
  );
};

export default NewCreditPolicy;
