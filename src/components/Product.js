import { Outlet } from "react-router-dom";

const Product = () => {
  return (
    <>
      <div className="flex gap-4">{/* <p>Product</p> */}</div>

      <Outlet />
    </>
  );
};

export default Product;
