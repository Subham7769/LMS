import { useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";

const BorrowerInfoTabs = () => {
  const { subID } = useParams();
  const [activeLink, setActiveLink] = useState(
    "/borrower/" + subID + "/personal-info"
  );

  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <div className="flex mb-10">
          <div className="border-r border-gray-400 px-2">
            <Link
              to={"/borrower/" + subID + "/personal-info"}
              className={`py-1 px-1.5  ${
                activeLink === "/borrower/" + subID + "/personal-info"
                  ? "text-white bg-indigo-500 rounded"
                  : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
              }`}
              onClick={() =>
                setActiveLink("/borrower/" + subID + "/personal-info")
              }
            >
              Personal Info
            </Link>
          </div>
          <div className="border-r border-gray-400 px-2">
            <Link
              to={"/borrower/" + subID + "/credit-profile"}
              className={`py-1 px-1.5 ${
                activeLink === "/borrower/" + subID + "/credit-profile"
                  ? "text-white bg-indigo-500 rounded"
                  : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
              }`}
              onClick={() =>
                setActiveLink("/borrower/" + subID + "/credit-profile")
              }
            >
              Credit Profile
            </Link>
          </div>
          <div className="border-r border-gray-400 px-2">
            <Link
              to={"/borrower/" + subID + "/kyc"}
              className={`py-1 px-1.5 ${
                activeLink === "/borrower/" + subID + "/kyc"
                  ? "text-white bg-indigo-500 rounded"
                  : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
              }`}
              onClick={() => setActiveLink("/borrower/" + subID + "/kyc")}
            >
              KYC Details
            </Link>
          </div>
          <div className="border-r border-gray-400 px-2">
            <Link
              to={"/borrower/" + subID + "/loanNpayment"}
              className={`py-1 px-1.5 ${
                activeLink === "/borrower/" + subID + "/loanNpayment"
                  ? "text-white bg-indigo-500 rounded"
                  : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
              }`}
              onClick={() =>
                setActiveLink("/borrower/" + subID + "/loanNpayment")
              }
            >
              Loan & Payment History
            </Link>
          </div>
          <div className="border-r border-gray-400 px-2">
            <Link
              to={"/borrower/" + subID + "/rejection-history"}
              className={`py-1 px-1.5 ${
                activeLink === "/borrower/" + subID + "/rejection-history"
                  ? "text-white bg-indigo-500 rounded"
                  : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
              }`}
              onClick={() =>
                setActiveLink("/borrower/" + subID + "/rejection-history")
              }
            >
              Rejection History
            </Link>
          </div>
          <div className=" px-2">
            <Link
              to={"/borrower/" + subID + "/credit-bureau-details"}
              className={`py-1 px-1.5 ${
                activeLink === "/borrower/" + subID + "/credit-bureau-details"
                  ? "text-white bg-indigo-500 rounded"
                  : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
              }`}
              onClick={() =>
                setActiveLink("/borrower/" + subID + "/credit-bureau-details")
              }
            >
              Credit Bureau Details
            </Link>
          </div>
        </div>
        <div className=" px-2">
          <Link
            to={"/user/" + subID + "/user-info"}
            className={`bg-gray-500 rounded py-1 px-1.5 ${
              activeLink === "/user/" + subID + "/user-info"
                ? "text-white bg-indigo-500 rounded"
                : "text-white hover:border-b hover:border-red-600 hover:font-medium"
            }`}
            onClick={() => setActiveLink("/user/" + subID + "/user-info")}
          >
            Back to User Page
          </Link>
        </div>
      </div>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default BorrowerInfoTabs;
