import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const CashLoan = () => {
  const [activeLink, setActiveLink] = useState(null);

  return (
    <div className="mt-4">
      <h2 className="mb-5">
        Name: <b>Cash Loan</b>
      </h2>
      <div className="flex gap-4 mb-5">
        <Link
          to="/product/cash-loan/credit-score"
          className={`py-1 px-1.5 rounded ${
            activeLink === "/product/cash-loan/credit-score"
              ? "text-white bg-indigo-500"
              : "text-indigo-500"
          }`}
          onClick={() => setActiveLink("/product/cash-loan/credit-score")}
        >
          Credit Score
        </Link>
        <Link
          to="/product/cash-loan/debt-burden-config"
          className={`py-1 px-1.5 rounded ${
            activeLink === "/product/cash-loan/debt-burden-config"
              ? "text-white bg-indigo-500"
              : "text-indigo-500"
          }`}
          onClick={() => setActiveLink("/product/cash-loan/debt-burden-config")}
        >
          Debt Burden Configuration
        </Link>
        <Link
          to="/product/cash-loan/credit-policy"
          className={`py-1 px-1.5 rounded ${
            activeLink === "/product/cash-loan/credit-policy"
              ? "text-white bg-indigo-500"
              : "text-indigo-500"
          }`}
          onClick={() => setActiveLink("/product/cash-loan/credit-policy")}
        >
          Credit Policy
        </Link>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default CashLoan;
