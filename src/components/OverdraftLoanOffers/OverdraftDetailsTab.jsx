
import React, { useState, Suspense, useEffect } from "react";
import LoadingState from "../LoadingState/LoadingState";
import InputSelect from "../Common/InputSelect/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { getOverdraftLoanAccount,updateAccountNumber,getOverdraftAccountNumberList } from "../../redux/Slices/overdraftLoanOffersSlice";
import { useParams } from "react-router-dom";

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

const Tab = ({ id, label, activeTab, setActiveTab }) => (
  <div className="px-2">
    <div
      className={`py-1 px-1.5 cursor-pointer rounded text-[16px] ${activeTab === id
        ? "text-white bg-indigo-500 "
        : "text-indigo-500 hover:bg-gray-200 hover:text-indigo-900 hover:font-medium"
        }`}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </div>
  </div>
);

const ShimmerTable = () => {
  return (
    <div className="grid grid-cols-4 gap-4 animate-pulse">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
    </div>
  )
}

const OverdraftDetailsTab = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const { accountNumberList,accountNumber } = useSelector(state => state.overdraftLoanOffers)
  const [activeTab, setActiveTab] = useState("general-details");
  const ActiveComponent = tabComponents[activeTab];

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateAccountNumber(value))
    dispatch(getOverdraftLoanAccount(value))
  };


  useEffect(() => {
    if(!accountNumberList){
      dispatch(getOverdraftAccountNumberList(userID))
    }
  }, [accountNumberList,userID, dispatch]);

  useEffect(() => {
    if (accountNumber) {
      dispatch(getOverdraftLoanAccount(accountNumber));
    }
  }, [accountNumber, dispatch]);


  return (
    <div className="mt-4">
      <div className="flex w-full justify-between items-center mb-10">
        <div className="flex w-3/4 justify-start items-center">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              label={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>

        <div className="w-1/4">
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
