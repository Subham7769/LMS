import React, { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Common/Button/Button";
import TagInput from "../TagInput/TagInput";
import InputNumber from "../Common/InputNumber/InputNumber";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { toast } from "react-toastify";
import {
  fetchLoanProducts,
  fetchPGroups,
  setFormData,
  updateProductGroup,
  handleChangeDispatch,
  deleteProductTag,
  addProductTag,
} from "../../redux/Slices/productGroupSlice";
import { fetchProdGroupData } from "../../redux/Slices/sidebarSlice";
import {
  clearValidationError,
  validateForm,
  validateUserRole,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";

const ProductGroup = () => {
  const dispatch = useDispatch();
  const { productGroupData, productTypeOptions, loading,error } = useSelector(
    (state) => state.productGroup
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    dispatch(fetchPGroups());
    dispatch(fetchLoanProducts());
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeDispatch({ name, value }));
  };

  const handleUpdatePGName = (updatePGName) => {
    dispatch(setFormData({ name: "configName", value: updatePGName }));
  };

  const handleTagInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ name, value }));
  };

  const addTag = async () => {
    const limit = productGroupData.limit;
    const product = productGroupData.product;
    await dispatch(validateForm(productGroupData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      const newTag = { product, limit };
      if (
        productGroupData.tags.some(
          (existingTag) => existingTag.product === newTag.product
        )
      ) {
        toast.warn("This product already exists!");
      } else {
        dispatch(addProductTag(newTag));
      }
    }
  };

  const deleteTag = (tag) => {
    dispatch(deleteProductTag(tag.product));
  };

  const handleUpdate = async () => {
    const percentageFromEmi =
      productGroupData?.overDuePercentage?.percentageFromEmi;
    const hardLimit = productGroupData?.financeHardLimit?.hardLimit;
    const renewInDays = productGroupData?.renewCreditReport?.renewInDays;
    const activeLoansCount = productGroupData?.activeLoansCount;
    const dataToValidate = {
      percentageFromEmi,
      hardLimit,
      renewInDays,
    };
    await dispatch(validateForm(dataToValidate));
    const state = store.getState();
    const isValid = state.validation.isValid;
    const isValid2 = validateUserRole(activeLoansCount, dispatch);
    if (!isValid2) {
      toast.warn("Add atleast 1 product");
    }
    if (isValid && isValid2) {
      await dispatch(updateProductGroup(productGroupData)).unwrap();
      await dispatch(fetchProdGroupData()).unwrap();
    }
  };

  return (
    <>
      <DynamicHeader
        itemName={productGroupData?.configName}
        handleNameUpdate={handleUpdatePGName}
<<<<<<< Updated upstream
        loading={loading}
        error={error}
=======
>>>>>>> Stashed changes
      />
      <ContainerTile
        loading={loading}
        error={error}
      >
        <div className="mt-5 grid grid-cols-3 gap-4 pb-2">
          <InputNumber
            labelName="Percentage from Equated Installments"
            inputName="percentageFromEmi"
            inputValue={productGroupData?.overDuePercentage?.percentageFromEmi}
            onChange={handleInputChange}
            isValidation={true}
          />
          <InputNumber
            labelName="Finance Hard Limit"
            inputName="hardLimit"
            inputValue={productGroupData?.financeHardLimit?.hardLimit}
            onChange={handleInputChange}
            isValidation={true}
          />
          <InputNumber
            labelName="Renew Credit Report"
            inputName="renewInDays"
            inputValue={productGroupData?.renewCreditReport?.renewInDays}
            onChange={handleInputChange}
            isValidation={true}
          />
        </div>
        <div className="border-b pb-4 mb-2">
          <TagInput
            formData={productGroupData}
            handleChange={handleTagInputChange}
            inputSelectName={"product"}
            inputSelectLabel={"Add Products"}
            addTag={addTag}
            deleteTag={deleteTag}
            productTypeOptions={productTypeOptions}
            inputNumberName={"limit"}
            inputNumberLabel={"Max Product Limit"}
            isValidation2={true}
            isValidation3={true}
            tagsPerRow={3}
          />
        </div>
        {roleName !== "ROLE_VIEWER" ? (
          <div className="text-center md:text-right mt-5">
            <Button
              buttonIcon={CheckCircleIcon}
              buttonName="Save"
              rectangle={true}
              onClick={handleUpdate}
            />
          </div>
        ) : (
          ""
        )}
      </ContainerTile>
    </>
  );
};

export default ProductGroup;
