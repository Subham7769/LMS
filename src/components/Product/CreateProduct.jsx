import { useState } from "react";
import {
  PlusIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import Button from "../Common/Button/Button";
import ProductInputFields from "./ProductInputFields";
import ListTable from "../Common/ListTable/ListTable";

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
      const { recoveryType, ...postData } = { ...formData };
      // Create a copy of formData with filtered interestEligibleTenure
      const filteredFormData = {
        ...postData,
        interestEligibleTenure: filteredInterestEligibleTenure,
      };

      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products",
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
          <ListTable
            ListHeader={[
              "Simple Interest",
              "PER",
              "Tenure",
              "Tenure Type",
              "Repayment Tenure",
              "Repayment Tenure Type",
              "Actions",
            ]}
            ListItem={formData.interestEligibleTenure
              .filter(
                (item) =>
                  item.interestRate &&
                  item.interestPeriodType &&
                  item.loanTenure &&
                  item.loanTenureType &&
                  item.repaymentTenure &&
                  item.repaymentTenureType
              )
              .map((item) => ({
                interestRate: item.interestRate,
                interestPeriodType: item.interestPeriodType,
                loanTenure: item.loanTenure,
                loanTenureType: item.loanTenureType,
                repaymentTenure: item.repaymentTenure,
                repaymentTenureType: item.repaymentTenureType,
              }))}
            Divider={true}
            Sortable={true}
            Editable={true}
            HandleAction={handleDelete}
          />
        </div>

        <div className="text-right mt-5">
          <Button
            buttonIcon={CheckCircleIcon}
            buttonName={"Save"}
            onClick={handleSave}
            rectangle={true}
          />
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
