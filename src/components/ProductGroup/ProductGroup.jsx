import React, { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Common/Button/Button";
import TagInput from "../TagInput/TagInput";
import DynamicName from "../Common/DynamicName/DynamicName";
import LoadingState from "../Common/Loader/Loader";
import InputNumber from "../Common/InputNumber/InputNumber";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
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

const ProductGroup = () => {
  const dispatch = useDispatch();
  const { productGroupData, productTypeOptions, loading } = useSelector(
    (state) => state.productGroup
  );

  useEffect(() => {
    dispatch(fetchPGroups());
    dispatch(fetchLoanProducts());
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

  const addTag = () => {
    // console.log(tag);
    const newTag = {
      product: productGroupData.product,
      limit: productGroupData.limit, // You can pass the limit from the input fields or set a default value
    };
    if (
      productGroupData.tags.some(
        (existingTag) => existingTag.product === newTag.product
      )
    ) {
      alert("This product already exists!");
    } else {
      dispatch(addProductTag(newTag));
    }
  };

  const deleteTag = (tag) => {
    dispatch(deleteProductTag(tag.product));
  };

  const handleUpdate = async () => {
    await dispatch(updateProductGroup(productGroupData)).unwrap();
    await dispatch(fetchProdGroupData());
  };

  if (loading) {
    return <LoadingState />;
  }

  // console.log(formData);

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <DynamicName
          initialName={productGroupData?.configName}
          onSave={handleUpdatePGName}
        />
      </div>
      <ContainerTile>
        <div className="mt-5 grid grid-cols-3 gap-4 pb-2">
          <InputNumber
            labelName="Percentage from Equated Installments"
            inputName="overduePercentage"
            inputValue={productGroupData?.overDuePercentage?.percentageFromEmi}
            onChange={handleInputChange}
          />
          <InputNumber
            labelName="Finance Hard Limit"
            inputName="hardLimit"
            inputValue={productGroupData?.financeHardLimit?.hardLimit}
            onChange={handleInputChange}
          />
          <InputNumber
            labelName="Renew Credit Report"
            inputName="renewInDays"
            inputValue={productGroupData?.renewCreditReport?.renewInDays}
            onChange={handleInputChange}
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
          />
        </div>
        <div className="text-center md:text-right mt-5">
          <Button
            buttonIcon={CheckCircleIcon}
            buttonName="Save"
            rectangle={true}
            onClick={handleUpdate}
          />
        </div>
      </ContainerTile>
    </>
  );
};

export default ProductGroup;
