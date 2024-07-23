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
import useInList from "../../utils/useInList";

const CreateProdGroup = () => {
  const { configId, groupName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isNewGroup = groupName === "newGroup";
  const newGroupName = location.state?.Name || "New Group";
  const options = useInList();
  const [productTypeOptions, setProductTypeOptions] = useState([]);

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
    if (options) {
      const formattedOptions = options.map((option) => ({
        label: option,
        value: option,
      }));
      setProductTypeOptions(formattedOptions);
    }
  }, [options]);

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
      <div className="shadow-md rounded-xl p-5 border border-red-600 w-full mt-5">
        <div className="mt-5 grid grid-cols-3 gap-4 pb-2">
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

export default CreateProdGroup;
