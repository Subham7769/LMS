import { useState } from "react";
import {
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import Button from "../Common/Button/Button";
import ProductInputFields from "./ProductInputFields";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { productName } = useParams();

  const [formData, setFormData] = useState({
    id: "0",
    blockEmployersTempId: "",
    creditScoreEqTempId: "",
    creditScoreEtTempId: "663c8ec2-33fd-4388-8c46-695098bdbd74",
    dbcTempId: "",
    disableRac: false,
    eligibleCustomerType: "",
    fee: "",
    interestEligibleTenure: [],
    loanProductId: "0",
    managementFeeVat: "",
    numberOfEmisForEarlySettlement: "",
    overdraft: null,
    productType: productName,
    projectId: "",
    racId: "",
    refinancedWith: false,
    rulePolicyTempId: "",
    tclFileId: "",
    recoveryEquationTempId: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({ ...prevState, [name]: checked }));
      console.log(formData);
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
      console.log(formData);
    }
  };

  const handleDelete = (index) => {
    const deleteList = [...formData.interestEligibleTenure];
    deleteList.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      interestEligibleTenure: deleteList,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    try {
      // Filter out objects with empty fields
      const filteredInterestEligibleTenure =
        formData.interestEligibleTenure.filter(
          (item) =>
            item.interestRate &&
            item.interestPeriodType &&
            item.loanTenure &&
            item.loanTenureType &&
            item.repaymentTenure &&
            item.repaymentTenureType
        );
      // Create a copy of formData with filtered interestEligibleTenure
      const filteredFormData = {
        ...formData,
        interestEligibleTenure: filteredInterestEligibleTenure,
      };

      // POST request to add new fields
      const postResponse = await fetch(
        `${import.meta.env.VITE_PRODUCT_CREATE}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(filteredFormData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Success"}
            message={"Product Created Successfully !!"}
          />
        ));
        setTimeout(() => {
          navigate("/product/");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

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
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <ProductInputFields
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
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
              {formData.interestEligibleTenure.length < 1 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Data To Show Yet
                  </td>
                </tr>
              ) : (
                formData.interestEligibleTenure.map((item, index) => (
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
                          className={
                            "bg-red-600 p-2 hover:bg-red-500 focus-visible:outline-red-600"
                          }
                        />
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

      </div>
      <div className="flex mt-4  justify-end ">
        {/* Submit Button */}
        <Button
          buttonIcon={CheckCircleIcon}
          buttonName={"Create"}
          onClick={handleSave}
          rectangle={true}
          className="flex items-center justify-center mt-3 w-44"

        />
      </div>
    </>
  );
};

export default CreateProduct;
