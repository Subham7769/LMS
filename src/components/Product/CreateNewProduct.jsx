import { useEffect, useState } from "react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import Button from "../Common/Button/Button";
import ProductInputFields from "./ProductInputFields";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../redux/Slices/sidebarSlice";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import {
  deleteInterestTenure,
  setFormData,
  updateFormField,
  createProductData,
} from "../../redux/Slices/productSlice";
import LoadingState from "../LoadingState/LoadingState";

const CreateNewProduct = () => {
  const navigate = useNavigate();
  const { productName } = useParams();
  const dispatch = useDispatch();
  const { formData, loading, error } = useSelector((state) => state.product);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    dispatch(updateFormField({ name, value: fieldValue }));
  };

  useEffect(() => {
    if (productName) {
      dispatch(setFormData({ productType: productName }));
    }
  }, [dispatch, productName]);

  const handleDelete = (index) => {
    dispatch(deleteInterestTenure({ index: index }));
  };

  const handleCreateProduct = async () => {
    try {
      await dispatch(createProductData(formData)).unwrap();
      dispatch(fetchProductData());
      navigate("/product/");
    } catch (error) {
      console.error("Failed to create product:", error);
      // Optionally, you could use a toast notification here to notify the user of the error
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    <p>Error: {error}</p>;
  }

  console.log(formData);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="mb-5">
        <b
          title={productName}
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          {productName}
        </b>
      </h2>
      <ContainerTile>
        <ProductInputFields formData={formData} handleChange={handleChange} />
        <div>
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Simple Interest",
                  "PER",
                  "Tenure",
                  "Tenure Type",
                  "Repayment Tenure",
                  "Repayment Tenure Type",
                  "Actions",
                ].map((item, index) => (
                  <th scope="col" key={index}>
                    <div
                      className={`py-3 text-center text-[12px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer`}
                    >
                      {item}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formData?.interestEligibleTenure?.length < 1 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Data To Show Yet
                  </td>
                </tr>
              ) : (
                formData?.interestEligibleTenure?.map((item, index) => (
                  <tr
                    key={index}
                    className="text-gray-900 text-sm sm:text-sm sm:leading-6 text-center"
                  >
                    <td className="py-2 whitespace-nowrap">
                      {item.interestRate}
                    </td>
                    <td className="py-2 whitespace-nowrap">
                      {item.interestPeriodType}
                    </td>
                    <td className="py-2 whitespace-nowrap">
                      {item.loanTenure}
                    </td>
                    <td className="py-2 whitespace-nowrap">
                      {item.loanTenureType}
                    </td>
                    <td className="py-2 whitespace-nowrap">
                      {item.repaymentTenure}
                    </td>
                    <td className="py-2 whitespace-nowrap">
                      {item.repaymentTenureType}
                    </td>
                    <td className="py-2">
                      <Button
                        buttonIcon={TrashIcon}
                        onClick={() => handleDelete(index)}
                        circle={true}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </ContainerTile>

      <div className="flex mt-4  justify-end ">
        {/* Submit Button */}
        <Button
          buttonIcon={CheckCircleIcon}
          buttonName={"Create"}
          onClick={handleCreateProduct}
          rectangle={true}
          className="flex items-center justify-center mt-3 w-44"
        />
      </div>
    </>
  );
};

export default CreateNewProduct;
