import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <>
      <div className="flex gap-4">
        <p>Product component</p>
        <Link to="/product/cash-loan/credit-score">Credit Score</Link>
        <Link to="/product/cash-loan/loan-product-config">
          Loan Product Configuration
        </Link>
        <Link to="/product/cash-loan/debt-burden-config">
          Debt Burden Cab Ceilling Configuration
        </Link>
      </div>

      <Outlet />
    </>
  );
};

export default Product;
