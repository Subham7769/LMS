import { useEffect, useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";

const BNPL = () => {
  const [activeLink, setActiveLink] = useState(
    "/product/bnpl/loan-product-config/BNPL"
  );
  const { purl } = useParams();
  useEffect(() => {
    if (purl === "loan-product-config") {
      setActiveLink(
        "/product/bnpl/loan-product-config/BNPL"
      );
    }
  }, [purl]);

  return (
    <div className="mt-4">
      <h2 className="mb-5">
        Name: <b>BNPL</b>
      </h2>
      <div className="flex mb-5">
        <div className="border-r border-gray-400 px-2">
          <Link
            to="/product/bnpl/loan-product-config/BNPL"
            className={`py-1 px-1.5  ${
              activeLink ===
              "/product/bnpl/loan-product-config/BNPL"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink(
                "/product/bnpl/loan-product-config/BNPL"
              )
            }
          >
            Product Config
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to="/product/bnpl/credit-score/4486edd6-8e24-46ce-b6ea-67d6a2c1032b"
            className={`py-1 px-1.5 rounded ${
              activeLink ===
              "/product/bnpl/credit-score/4486edd6-8e24-46ce-b6ea-67d6a2c1032b"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink(
                "/product/bnpl/credit-score/4486edd6-8e24-46ce-b6ea-67d6a2c1032b"
              )
            }
          >
            Credit Score
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to="/product/bnpl/debt-burden-config"
            className={`py-1 px-1.5 rounded ${
              activeLink === "/product/bnpl/debt-burden-config"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveLink("/product/bnpl/debt-burden-config")}
          >
            Debt Burden Config
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to="/product/bnpl/credit-policy/4486edd6-8e24-46ce-b6ea-67d6a2c1032b"
            className={`py-1 px-1.5 rounded ${
              activeLink ===
              "/product/bnpl/credit-policy/4486edd6-8e24-46ce-b6ea-67d6a2c1032b"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink(
                "/product/bnpl/credit-policy/4486edd6-8e24-46ce-b6ea-67d6a2c1032b"
              )
            }
          >
            Credit Policy
          </Link>
        </div>
        <div className="px-2">
          <Link
            to="/product/bnpl/blocked-employer/4486edd6-8e24-46ce-b6ea-67d6a2c1032b"
            className={`py-1 px-1.5 rounded ${
              activeLink ===
              "/product/bnpl/blocked-employer/4486edd6-8e24-46ce-b6ea-67d6a2c1032b"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() =>
              setActiveLink(
                "/product/bnpl/blocked-employer/4486edd6-8e24-46ce-b6ea-67d6a2c1032b"
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

export default BNPL;
