import React, { useState, Suspense, useEffect } from "react";
import LoadingState from "../LoadingState/LoadingState";
import InputSelect from "../Common/InputSelect/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  getOverdraftLoanAccount,
  updateAccountNumber,
  getOverdraftAccountNumberList,
} from "../../redux/Slices/overdraftLoanOffersSlice";
import { useParams } from "react-router-dom";
import Tab from "../Common/Tab/Tab";

const GeneralDetails = React.lazy(() => import("./GeneralDetails"));
const OutstandingDetails = React.lazy(() => import("./OutstandingDetails"));
const PIFDetails = React.lazy(() => import("./PIFDetails"));

const tabComponents = {
  "general-details": GeneralDetails,
  "outstanding-details": OutstandingDetails,
  "pif-details": PIFDetails,
};

const tabs = [
  { id: "general-details", label: "General Details" },
  { id: "outstanding-details", label: "Outstanding Details" },
  { id: "pif-details", label: "PIF Details" },
];

const OverdraftDetailsTab = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const { accountNumberList, accountNumber } = useSelector(
    (state) => state.overdraftLoanOffers
  );
  const [activeTab, setActiveTab] = useState("general-details");
  const ActiveComponent = tabComponents[activeTab];

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateAccountNumber(value));
    dispatch(getOverdraftLoanAccount(value));
  };

  useEffect(() => {
    if (!accountNumberList) {
      dispatch(getOverdraftAccountNumberList(userID));
    }
  }, [accountNumberList, userID, dispatch]);

  useEffect(() => {
    if (accountNumber) {
      dispatch(getOverdraftLoanAccount(accountNumber));
    }
  }, [accountNumber, dispatch]);

  return (
    <div className="mt-4">
      {/* Tab Navigation */}
      <div className="flex justify-between align-middle text-sm font-medium  text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              label={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </ul>
        <div className="w-1/4 -mt-2">
          <InputSelect
            labelName="Account Number List"
            inputOptions={accountNumberList}
            inputName="accountNumber"
            inputValue={accountNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <Suspense fallback={<LoadingState />}>
        <ActiveComponent />
      </Suspense>
    </div>
  );
};

export default OverdraftDetailsTab;
