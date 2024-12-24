import { useParams, Outlet } from "react-router-dom";
import { getOverdraftAccountNumberList } from "../../../redux/Slices/overdraftLoanSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Tab from "../../Common/Tab/Tab";

const OverdraftLoan = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("overdraft-offer");

  const tabs = [
    {
      id: "overdraft-offer",
      label: "Overdraft Offer",
      to: `/loan/product-testing/overdraft-loan/${userID}/overdraft-offer`,
    },
    {
      id: "account-details",
      label: "Account Details",
      to: `/loan/product-testing/overdraft-loan/${userID}/account-details`,
    },
    {
      id: "debit-amount",
      label: "Debit Amount",
      to: `/loan/product-testing/overdraft-loan/${userID}/debit-amount`,
    },
    {
      id: "pay-amount",
      label: "Pay Amount",
      to: `/loan/product-testing/overdraft-loan/${userID}/pay-amount`,
    },
    {
      id: "overdraft-details",
      label: "Overdraft Details",
      to: `/loan/product-testing/overdraft-loan/${userID}/overdraft-details`,
    },
  ];
  // First API call: Fetch account number
  useEffect(() => {
    if (userID) {
      dispatch(getOverdraftAccountNumberList(userID));
    }
  }, [dispatch, userID]);

  return (
    <div className="mt-4">
      {/* Tab Navigation */}
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              label={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              to={tab.to}
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

export default OverdraftLoan;
