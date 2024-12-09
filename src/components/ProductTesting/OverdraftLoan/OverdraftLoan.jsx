import { useLocation, Link, useParams, Outlet } from "react-router-dom";
import { getOverdraftAccountNumberList } from "../../../redux/Slices/overdraftLoanSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const OverdraftLoan = () => {
  const { userID } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentPath = location.pathname;

  const tabs = [
    {
      path: `/product-testing/overdraft-loan/${userID}/overdraft-offer`,
      label: "Overdraft Offer",
    },
    {
      path: `/product-testing/overdraft-loan/${userID}/account-details`,
      label: "Account Details",
    },
    {
      path: `/product-testing/overdraft-loan/${userID}/debit-amount`,
      label: "Debit Amount",
    },
    {
      path: `/product-testing/overdraft-loan/${userID}/pay-amount`,
      label: "Pay Amount",
    },
    {
      path: `/product-testing/overdraft-loan/${userID}/overdraft-details`,
      label: "Overdraft Details",
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
      <div className="flex mb-10">
        {tabs.map((tab) => (
          <div className="px-2" key={tab.path}>
            <Link
              to={tab.path}
              className={`py-1 px-1.5 text-[16px] rounded ${
                currentPath === tab.path
                  ? "text-white bg-indigo-500 "
                  : "text-indigo-500  hover:bg-gray-200 hover:text-indigo-900 hover:font-medium"
              }`}
            >
              {tab.label}
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default OverdraftLoan;
