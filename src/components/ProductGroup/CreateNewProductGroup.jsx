import React, { useCallback, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Button from "../Common/Button/Button";
import TagInput from "../TagInput/TagInput";
import useGroupFormState from "../../utils/useGroupFormState";
import DynamicName from "../Common/DynamicName/DynamicName";
import InputNumber from "../Common/InputNumber/InputNumber";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { fetchInList } from "../../redux/Slices/productGroupSlice";
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon } from "../../assets/icons";

const CreateNewProductGroup = () => {
  const { configId, groupName } = useParams();
  const location = useLocation();
  const isNewGroup = groupName === "newGroup";
  const newGroupName = location.state?.Name || "New Group";
  const dispatch = useDispatch();
  const { inListOption } = useSelector((state) => state.productGroup);

  const {
    formData,
    handleChange,
    handleSelectChange,
    addTag,
    deleteTag,
    setFormData,
  } = useGroupFormState({
    name: isNewGroup ? newGroupName : groupName,
    product: "",
    limit: "",
    tags: [],
    selectedOption: null,
  });

  useEffect(() => {
    dispatch(fetchInList());
  }, [dispatch]);

  const handleSave = useCallback(
    (newName) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: newName,
      }));
    },
    [setFormData]
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <DynamicName initialName={configId} onSave={handleSave} />
      </div>
      <ContainerTile className={"pt-5"}>
        <div className="mt-5 grid grid-cols-3 gap-4 mb-2 px-5">
          <InputNumber
            labelName="Percentage from EMI"
            inputName="overduePercentage"
            inputValue={formData.overduePercentage}
          />
          <InputNumber
            labelName="Finance Hard Limit"
            inputName="hardLimit"
            inputValue={formData.hardLimit}
          />
        </div>
        <div className="border-b pb-5 px-5">
          <TagInput
            formData={formData}
            handleChange={handleChange}
            inputSelectName={"product"}
            inputSelectLabel={"Add Products"}
            handleSelectChange={handleSelectChange}
            addTag={addTag}
            deleteTag={deleteTag}
            productTypeOptions={inListOption}
            inputNumberName={"limit"}
            inputNumberLabel={"Max Product Limit"}
          />
        </div>
        <div className="text-center md:text-right p-5">
          <Button
            buttonIcon={CheckIcon}
            buttonName="Save"
          />
        </div>
      </ContainerTile>
    </>
  );
};

export default CreateNewProductGroup;
