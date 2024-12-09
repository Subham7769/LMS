import { useLocation, Link, useParams, Outlet } from "react-router-dom";
import { getOverdraftAccountNumberList } from "../../redux/Slices/overdraftLoanOffersSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Tab from "../Common/Tab/Tab";

const OverdraftLoanOffers = () => {
  const { userID } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentPath = location.pathname;
  const [activeTab, setActiveTab] = useState("overdraft-offer");

  const tabs = [
    { id: "overdraft-offer", label: "Overdraft Offer", to: `/overdraft-loan-offers/${userID}/overdraft-offer` },
    { id: "account-details", label: "Account Details", to: `/overdraft-loan-offers/${userID}/account-details` },
    { id: "debit-amount", label: "Debit Amount", to: `/overdraft-loan-offers/${userID}/debit-amount` },
    { id: "pay-amount", label: "Pay Amount", to: `/overdraft-loan-offers/${userID}/pay-amount` },
    { id: "overdraft-details", label: "Overdraft Details", to: `/overdraft-loan-offers/${userID}/overdraft-details` },
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

export default OverdraftLoanOffers;
