import { Outlet } from "react-router-dom";

const CashLoanRAC = () => {
  return (
    <div className="mt-4">
      <h2 className="mb-5">
        Name: <b>Cash Loan</b>
      </h2>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default CashLoanRAC;
