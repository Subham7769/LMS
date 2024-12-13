import { useEffect } from "react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Common/Button/Button";
import ProductInputFields from "./ProductInputFields";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../redux/Slices/sidebarSlice";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import {
  deleteInterestTenure,
  setProductData,
  updateProductDataField,
  createProductData,
} from "../../redux/Slices/productSlice";
import store from "../../redux/store";
import { validateForm } from "../../redux/Slices/validationSlice";

const CreateNewProduct = () => {
  const navigate = useNavigate();
  const { productName } = useParams();
  const dispatch = useDispatch();
  const { productData, error } = useSelector((state) => state.product);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    dispatch(updateProductDataField({ name, value: fieldValue }));
  };

  useEffect(() => {
    if (productName) {
      dispatch(setProductData({ productType: productName }));
    }
  }, [dispatch, productName]);

  const handleDelete = (index) => {
    dispatch(deleteInterestTenure({ index: index }));
  };

  const handleCreateProduct = async () => {
    await dispatch(validateForm(productData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      try {
        const newProductData = {
          ...productData,
          routingLink: `/loan/loan-product/${productName}/loan-product-config/${productData.projectId}/`,
          section: "Product",
        };
        await dispatch(
          createProductData({ productData: newProductData, roleName })
        ).then((action) => {
          console.log(action.payload);
          // navigate(`/product/${action.payload.productType}/${action.payload.projectId}`);
          navigate(`/loan/loan-product/`);
        });
        dispatch(fetchProductData());
      } catch (error) {
        console.error("Failed to create product:", error);
        // Optionally, you could use a toast notification here to notify the user of the error
      }
    }
  };

  // console.log(productData);

  return (
    <>
      <h2 className="mb-5">
        <b
          title={productName}
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          {productName}
        </b>
      </h2>
      <ContainerTile>
        <ProductInputFields
          productData={productData}
          handleChange={handleChange}
        />
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
              {productData?.interestEligibleTenure?.length < 1 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Data To Show Yet
                  </td>
                </tr>
              ) : (
                productData?.interestEligibleTenure?.map((item, index) => (
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
