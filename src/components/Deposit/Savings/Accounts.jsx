import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Tab from "../../Common/Tab/Tab";

const Accounts = () => {
  const { userID } = useParams();
  const [activeTab, setActiveTab] = useState("summary");

  const tabs = [
    {
      id: "summary",
      path: `/deposit/savings/accounts/${userID}/summary`,
      label: "Summary",
    },
    {
      id: "update-profile",
      path: `/deposit/savings/accounts/${userID}/update-profile`,
      label: "Update Profile",
    },
    {
      id: "deposit-amount",
      path: `/deposit/savings/accounts/${userID}/deposit-amount`,
      label: "Deposit Amount",
    },
    {
      id: "withdraw-amount",
      path: `/deposit/savings/accounts/${userID}/withdraw-amount`,
      label: "Withdraw Amount",
    },
    {
      id: "transaction",
      path: `/deposit/savings/accounts/${userID}/transaction`,
      label: "Transaction",
    },
    {
      id: "transfer",
      path: `/deposit/savings/accounts/${userID}/transfer/self`,
      label: "Transfer",
    },
  ];
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-4 ">
        <ul className="flex flex-wrap">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              label={tab.label}
              to={tab.path}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Accounts;
