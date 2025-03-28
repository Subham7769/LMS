import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import {
  fetchRACData,
  fetchDBRData,
  fetchBEData,
  fetchProjectData,
  fetchProductData,
  fetchCreditScoreEqData,
  fetchRulePolicyData,
  fetchTCLData,
  fetchProdGroupData,
  fetchRecoveryData,
  fetchAffordibilityData,
  fetchLoanApprovalData,
  fetchDocumentConfigData,
  fetchCreditScoreEligibleTenureData,
  fetchDynamicRacData,
  fetchReportingConfigData,
} from "../../../redux/Slices/sidebarSlice";
import { useDispatch } from "react-redux";

const CreateNew = ({
  placeholder,
  buttonName,
  createFunction,
  menuTitle,
  editable,
  navigateSuccess,
  navigateFail,
}) => {
  const [Name, setName] = useState("");
  const [isEditing, setEditing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    // Regex to allow letters, numbers, space, underscore, and hyphen
    const regex = /^[a-zA-Z0-9 _-]*$/;

    if (regex.test(value)) {
      setName(value);
    }
  };
  
  function dispatchType(menuTitle) {
    switch (menuTitle) {
      case "RAC":
        return fetchRACData;
      case "DBR Config":
        return fetchDBRData;
      case "Blocked Employer":
        return fetchBEData;
      case "Loan Schema":
        return fetchProjectData;
      case "Loan Product":
        return fetchProductData;
      case "Credit Score":
        return fetchCreditScoreEqData;
      case "Rule Policy":
        return fetchRulePolicyData;
      case "TCL":
        return fetchTCLData;
      case "Product Group":
        return fetchProdGroupData;
      case "Recovery":
        return fetchRecoveryData;
      case "Affordability":
        return fetchAffordibilityData;
      case "Approval Config":
        return fetchLoanApprovalData;
      case "Document Config":
        return fetchDocumentConfigData;
      case "Eligible Tenure":
        return fetchCreditScoreEligibleTenureData;
      case "Decision Engine":
        return fetchDynamicRacData;
      case "Reporting Config":
        return fetchReportingConfigData;
      default:
        return null;
    }
  }

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await createFunction(Name, navigate, navigateSuccess, navigateFail);
      const dispatcherFunction = dispatchType(menuTitle);
      dispatch(dispatcherFunction());
      setEditing(false);
      setName("");
    }
  };

  const handleBlur = () => {
    setEditing(false);
    setName("");
  };

  return isEditing ? (
    <div className="flex justify-center">
      <input
        type="text"
        name="Name"
        id="Name"
        value={Name}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="placeholder:text-xs text-xs focus:ring-1 focus:ring-inset focus:ring-blue-primary w-11/12 rounded-sm text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 py-0 px-1 -mx-2"
        placeholder={placeholder}
        autoFocus
      />
    </div>
  ) : (
    <div
      className="text-gray-500 pl-5 pr-1 w-full text-xs flex items-center justify-between cursor-pointer rounded-md hover:bg-background-light-secondary hover:text-blue-primary"
      onClick={() => {
        editable ? setEditing(!isEditing) : navigate(navigateSuccess);
      }}
    >
      <p>{buttonName}</p>
      <div>
        <PlusIcon className="h-6 w-6 shrink-0" />
      </div>
    </div>
  );
};

export default CreateNew;
