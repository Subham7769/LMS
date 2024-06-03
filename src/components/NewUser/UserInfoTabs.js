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
            Eligibility
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to={"/user/" + userID + "/register"}
            className={`py-1 px-1.5  ${
              activeLink === "/user/" + userID + "/register"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveLink("/user/" + userID + "/register")}
          >
            Register
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to={"/user/" + userID + "/loan-config"}
            className={`py-1 px-1.5  ${
              activeLink === "/user/" + userID + "/loan-config"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveLink("/user/" + userID + "/loan-config")}
          >
            Loan Config
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to={"/user/" + userID + "/disbursement"}
            className={`py-1 px-1.5 ${
              activeLink === "/user/" + userID + "/disbursement"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveLink("/user/" + userID + "/disbursement")}
          >
            Disbursement Status
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
            Backend Repayments
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
