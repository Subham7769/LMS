import { useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";

const BorrowerInfoTabs = () => {
  const { subID } = useParams();
  const [activeLink, setActiveLink] = useState(
    "/borrower/" + subID + "/personal-info"
  );

  // useEffect(() => {
  //   if (purl === "loan-product-config") {
  //     setActiveLink("/product/cash-loan/loan-product-config");
  //   }
  // }, [purl]);

  return (
    <div className="mt-4">
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
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default BorrowerInfoTabs;
