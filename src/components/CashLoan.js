import { Outlet } from "react-router-dom";

const CashLoan = () => {
  return (
    <div className="container mx-4 mt-4">
      <h2 className="mb-5">
        Poduct Name: <b>Cash Loan</b>
      </h2>
      <div className="pr-2">
        <Outlet />
      </div>
    </div>
  );
};

export default CashLoan;
