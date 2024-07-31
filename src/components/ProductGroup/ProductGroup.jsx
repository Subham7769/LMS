import React, { useCallback, useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { productTypeOptions } from "../../data/OptionsData";
import Button from "../Common/Button/Button";
import TagInput from "../TagInput/TagInput";
import useGroupFormState from "../../utils/useGroupFormState";
import DynamicName from "../Common/DynamicName/DynamicName";
import LoadingState from "../Common/Loader/Loader";
import InputNumber from "../Common/InputNumber/InputNumber";

const ProductGroup = () => {
  const { configId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isNewGroup = configId === "newGroup";
  const newGroupName = location.state?.Name || "New Group";
  const [loading, setLoading] = useState(false);
  const [productTypeOptions, setProductTypeOptions] = useState([]);

  const {
    formData,
    handleChange,
    handleSelectChange,
    addTag,
    deleteTag,
    setFormData,
  } = useGroupFormState({
    name: configId,
    product: "",
    limit: "",
    tags: [],
    selectedOption: null,
  });

  async function fetchPGroups() {
    setLoading(true);
    try {
      const auth = localStorage.getItem("authToken");

      const response = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/concurrent-loans/config",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }

      const data = await response.json();

      const formattedData = {
        name: data.configId,
        product: "",
        limit: "",
        tags: data.activeLoansCount.map((item) => ({
          product: item.productType,
          limit: item.activeLoansCount,
        })),
        selectedOption: null,
        inList: data.activeList.inList,
        hardLimit: data.financeHardLimit.hardLimit,
        overduePercentage: data.overDuePercentage.percentageFromEmi,
      };

      const formattedProductTypeOptions = data.activeLoansCount.map((item) => ({
        value: item.productType,
        label: item.productType,
      }));

      setProductTypeOptions(formattedProductTypeOptions);

      setFormData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  useEffect(() => {
    fetchPGroups();
    if (isNewGroup) {
      setFormData((prevState) => ({ ...prevState, name: newGroupName }));
    } else {
      setFormData((prevState) => ({ ...prevState, name: configId }));
    }
  }, [configId, isNewGroup, newGroupName, setFormData]);

  const handleSave = useCallback(
    (newName) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: newName,
      }));
    },
    [setFormData]
  );

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <DynamicName initialName={formData.name} onSave={handleSave} />
      </div>
      <div className="shadow-md rounded-xl p-5 border border-red-600 w-full mt-5">
        <div className="mt-5 grid grid-cols-3 gap-4 pb-2">
          <InputNumber
            labelName="Percentage from Equatted Installments"
            inputName="overduePercentage"
            inputValue={formData.overduePercentage}
          />
          <InputNumber
            labelName="Finance Hard Limit"
            inputName="hardLimit"
            inputValue={formData.hardLimit}
          />
        </div>
        <div className="border-b pb-4 mb-2">
          <TagInput
            formData={formData}
            handleChange={handleChange}
            inputSelectName={"product"}
            inputSelectLabel={"Add Products"}
            handleSelectChange={handleSelectChange}
            addTag={addTag}
            deleteTag={deleteTag}
            productTypeOptions={productTypeOptions}
            inputNumberName={"limit"}
            inputNumberLabel={"Max Product Limit"}
          />
        </div>
        <div className="text-center md:text-right mt-5">
          <Button
            buttonIcon={CheckCircleIcon}
            buttonName="Save"
            rectangle={true}
          />
        </div>
      </div>
    </>
  );
};

export default ProductGroup;
