import { useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";

const UserInfoTabs = () => {
  const { userID } = useParams();
  const [activeLink, setActiveLink] = useState(
    "/user/" + userID + "/user-info"
  );

  return (
    <div className="mt-4">
      <div className="flex mb-10">
        <div className="border-r border-gray-400 px-2">
          <Link
            to={"/user/" + userID + "/user-info"}
            className={`py-1 px-1.5  ${
              activeLink === "/user/" + userID + "/user-info"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveLink("/user/" + userID + "/user-info")}
          >
            User Info
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to={"/user/" + userID + "/credit-profile"}
            className={`py-1 px-1.5 ${
              activeLink === "/user/" + userID + "/credit-profile"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveLink("/user/" + userID + "/credit-profile")}
          >
            Credit Profile
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to={"/user/" + userID + "/kyc"}
            className={`py-1 px-1.5 ${
              activeLink === "/user/" + userID + "/kyc"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveLink("/user/" + userID + "/kyc")}
          >
            KYC Details
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to={"/user/" + userID + "/loanNpayment"}
            className={`py-1 px-1.5 ${
              activeLink === "/user/" + userID + "/loanNpayment"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveLink("/user/" + userID + "/loanNpayment")}
          >
            Loan & Payment History
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to={"/user/" + userID + "/rejection-history"}
            className={`py-1 px-1.5 ${
              activeLink === "/user/" + userID + "/rejection-history"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink("/user/" + userID + "/rejection-history")
            }
          >
            Rejection History
          </Link>
        </div>
        <div className=" px-2">
          <Link
            to={"/user/" + userID + "/credit-bureau-details"}
            className={`py-1 px-1.5 ${
              activeLink === "/user/" + userID + "/credit-bureau-details"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink("/user/" + userID + "/credit-bureau-details")
            }
          >
            Credit Bureau Details
          </Link>
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default UserInfoTabs;
