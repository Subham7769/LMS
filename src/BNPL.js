import { useEffect, useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";

const BNPL = () => {
  const [activeLink, setActiveLink] = useState(
    "/product/bnpl/loan-product-config"
  );
  const { purl } = useParams();
  useEffect(() => {
    if (purl === "loan-product-config") {
      setActiveLink("/product/bnpl/loan-product-config");
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
            to="/product/bnpl/loan-product-config"
            className={`py-1 px-1.5  ${
              activeLink === "/product/bnpl/loan-product-config"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveLink("/product/bnpl/loan-product-config")}
          >
            Product Config
          </Link>
        </div>
        <div className="border-r border-gray-400 px-2">
          <Link
            to="/product/bnpl/credit-score"
            className={`py-1 px-1.5 rounded ${
              activeLink === "/product/bnpl/credit-score"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveLink("/product/bnpl/credit-score")}
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
        <div className="px-2">
          <Link
            to="/product/bnpl/credit-policy"
            className={`py-1 px-1.5 rounded ${
              activeLink === "/product/bnpl/credit-policy"
                ? "text-white bg-indigo-500"
                : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveLink("/product/bnpl/credit-policy")}
          >
            Credit Policy
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
