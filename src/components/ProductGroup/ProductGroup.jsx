import React, { useEffect, useCallback } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Common/Button/Button";
import TagInput from "../TagInput/TagInput";
import DynamicName from "../Common/DynamicName/DynamicName";
import LoadingState from "../Common/Loader/Loader";
import InputNumber from "../Common/InputNumber/InputNumber";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import {
  fetchPGroups,
  setFormData,
} from "../../redux/Slices/productGroupSlice";

const ProductGroup = () => {
  const { configId } = useParams();
  const location = useLocation();
  const isNewGroup = configId === "newGroup";
  const newGroupName = location.state?.Name || "New Group";

  const dispatch = useDispatch();
  const { formData, productTypeOptions, loading } = useSelector(
    (state) => state.productGroup
  );

  useEffect(() => {
    dispatch(fetchPGroups());
    if (isNewGroup) {
      dispatch(setFormData({ name: newGroupName }));
    } else {
      dispatch(setFormData({ name: configId }));
    }
  }, [dispatch, configId, isNewGroup, newGroupName]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(setFormData({ [name]: value }));
    },
    [dispatch]
  );

  const handleSave = useCallback(
    (newName) => {
      dispatch(setFormData({ name: newName }));
    },
    [dispatch]
  );

  const addTag = useCallback(
    (tag) => {
      if (formData.tags.includes(tag)) {
        alert("This product already exists!");
      } else {
        alert("Cannot add product for now!");
      }
    },
    [dispatch, formData.tags]
  );

  const deleteTag = useCallback(
    (tag) => {
      dispatch(setFormData({ tags: formData.tags.filter((t) => t !== tag) }));
    },
    [dispatch, formData.tags]
  );

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <DynamicName initialName={formData.name} onSave={handleSave} />
      </div>
      <ContainerTile>
        <div className="mt-5 grid grid-cols-3 gap-4 pb-2">
          <InputNumber
            labelName="Percentage from Equated Installments"
            inputName="overduePercentage"
            inputValue={formData.overduePercentage}
            onChange={handleInputChange} 
          />
          <InputNumber
            labelName="Finance Hard Limit"
            inputName="hardLimit"
            inputValue={formData.hardLimit}
            onChange={handleInputChange} 
          />
        </div>
        <div className="border-b pb-4 mb-2">
          <TagInput
            formData={formData}
            handleChange={handleInputChange} 
            inputSelectName={"product"}
            inputSelectLabel={"Add Products"}
            handleSelectChange={handleInputChange} 
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
      </ContainerTile>
    </>
  );
};

export default ProductGroup;
