import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <>
      <div className="flex gap-4">
        <p>Product component</p>
        <Link to="/product/cash-loan/credit-score">Credit Score</Link>
        <Link to="/product/cash-loan/debt-burden-config">
          Debt Burden Capping Configuration
        </Link>
        <Link to="/product/cash-loan/credit-policy">Credit Policy</Link>
      </div>

      <Outlet />
    </>
  );
};

export default Product;
