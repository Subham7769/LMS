import { useLocation, Link, useParams, Outlet } from "react-router-dom";
import { getOverdraftAccountNumberList } from "../../redux/Slices/overdraftLoanOffersSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const OverdraftLoanOffers = () => {
  const { userID } = useParams();
  const location = useLocation();
  const dispatch = useDispatch()
  const currentPath = location.pathname;

  const tabs = [
    { path: `/overdraft-loan-offers/${userID}/overdraft-offer`, label: "Overdraft Offer" },
    { path: `/overdraft-loan-offers/${userID}/account-details`, label: "Account Details" },
    { path: `/overdraft-loan-offers/${userID}/debit-amount`, label: "Debit Amount" },
    { path: `/overdraft-loan-offers/${userID}/pay-amount`, label: "Pay Amount" },
    { path: `/overdraft-loan-offers/${userID}/overdraft-details`, label: "Overdraft Details" },
  ];
    // First API call: Fetch account number
    useEffect(() => {
      if (userID) {
        dispatch(getOverdraftAccountNumberList(userID))
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

export default OverdraftLoanOffers;
