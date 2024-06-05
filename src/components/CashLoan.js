import { useEffect, useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";

const CashLoan = () => {
  const [activeLink, setActiveLink] = useState(
    "/product/cash-loan/loan-product-config/UNSECURED_RETAIL_LOAN"
  );
  const { purl } = useParams();
  useEffect(() => {
    if (purl === "loan-product-config") {
      setActiveLink(
        "/product/cash-loan/loan-product-config/UNSECURED_RETAIL_LOAN"
      );
    }
  }, [purl]);

  return (
    <div className="mt-4">
      <h2 className="mb-5">
        Name: <b>Cash Loan</b>
      </h2>
      <div className="flex mb-5">
        <div className="border-r border-gray-400 px-2">
          <Link
            to="/product/cash-loan/loan-product-config/UNSECURED_RETAIL_LOAN"
            className={`py-1 px-1.5  ${
              activeLink ===
              "/product/cash-loan/loan-product-config/UNSECURED_RETAIL_LOAN"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink(
                "/product/cash-loan/loan-product-config/UNSECURED_RETAIL_LOAN"
              )
            }
          >
            Product Config
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to="/product/cash-loan/credit-score/183c8ec2-33fd-4388-8c46-695098bdbd74"
            className={`py-1 px-1.5 rounded ${
              activeLink ===
              "/product/cash-loan/credit-score/183c8ec2-33fd-4388-8c46-695098bdbd74"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink(
                "/product/cash-loan/credit-score/183c8ec2-33fd-4388-8c46-695098bdbd74"
              )
            }
          >
            Credit Score
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to="/product/cash-loan/debt-burden-config"
            className={`py-1 px-1.5 rounded ${
              activeLink === "/product/cash-loan/debt-burden-config"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink("/product/cash-loan/debt-burden-config")
            }
          >
            Debt Burden Config
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to="/product/cash-loan/credit-policy/183c8ec2-33fd-4388-8c46-695098bdbd74"
            className={`py-1 px-1.5 rounded ${
              activeLink ===
              "/product/cash-loan/credit-policy/183c8ec2-33fd-4388-8c46-695098bdbd74"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink(
                "/product/cash-loan/credit-policy/183c8ec2-33fd-4388-8c46-695098bdbd74"
              )
            }
          >
            Credit Policy
          </Link>
        </div>
        <div className="px-2">
          <Link
            to="/product/cash-loan/blocked-employer/183c8ec2-33fd-4388-8c46-695098bdbd74"
            className={`py-1 px-1.5 rounded ${
              activeLink ===
              "/product/cash-loan/blocked-employer/183c8ec2-33fd-4388-8c46-695098bdbd74"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink(
                "/product/cash-loan/blocked-employer/183c8ec2-33fd-4388-8c46-695098bdbd74"
              )
            }
          >
            Blocked Employer
          </Link>
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default CashLoan;
