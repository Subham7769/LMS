import { useEffect, useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";

const Overdraft = () => {
  const [activeLink, setActiveLink] = useState(
    "/product/overdraft/loan-product-config/UNSECURED_RETAIL_LOAN_V2"
  );
  const { purl } = useParams();
  useEffect(() => {
    if (purl === "loan-product-config") {
      setActiveLink(
        "/product/overdraft/loan-product-config/UNSECURED_RETAIL_LOAN_V2"
      );
    }
  }, [purl]);

  return (
    <div className="mt-4">
      <h2 className="mb-5">
        Name: <b>Overdraft</b>
      </h2>
      <div className="flex mb-5">
        <div className="border-r border-gray-400 px-2">
          <Link
            to="/product/overdraft/loan-product-config/UNSECURED_RETAIL_LOAN_V2"
            className={`py-1 px-1.5  ${
              activeLink ===
              "/product/overdraft/loan-product-config/UNSECURED_RETAIL_LOAN_V2"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink(
                "/product/overdraft/loan-product-config/UNSECURED_RETAIL_LOAN_V2"
              )
            }
          >
            Product Config
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to="/product/overdraft/credit-score/283c8ec2-33fd-4388-8c46-695098bdbd74"
            className={`py-1 px-1.5 rounded ${
              activeLink ===
              "/product/overdraft/credit-score/283c8ec2-33fd-4388-8c46-695098bdbd74"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink(
                "/product/overdraft/credit-score/283c8ec2-33fd-4388-8c46-695098bdbd74"
              )
            }
          >
            Credit Score
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to="/product/overdraft/debt-burden-config"
            className={`py-1 px-1.5 rounded ${
              activeLink === "/product/overdraft/debt-burden-config"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink("/product/overdraft/debt-burden-config")
            }
          >
            Debt Burden Config
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to="/product/overdraft/credit-policy/283c8ec2-33fd-4388-8c46-695098bdbd74"
            className={`py-1 px-1.5 rounded ${
              activeLink ===
              "/product/overdraft/credit-policy/283c8ec2-33fd-4388-8c46-695098bdbd74"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink(
                "/product/overdraft/credit-policy/283c8ec2-33fd-4388-8c46-695098bdbd74"
              )
            }
          >
            Credit Policy
          </Link>
        </div>
        <div className="px-2">
          <Link
            to="/product/overdraft/blocked-employer/283c8ec2-33fd-4388-8c46-695098bdbd74"
            className={`py-1 px-1.5 rounded ${
              activeLink ===
              "/product/overdraft/blocked-employer/283c8ec2-33fd-4388-8c46-695098bdbd74"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink(
                "/product/overdraft/blocked-employer/283c8ec2-33fd-4388-8c46-695098bdbd74"
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

export default Overdraft;
