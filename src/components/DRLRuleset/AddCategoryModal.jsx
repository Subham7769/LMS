import React from "react";
import Modal from "../Common/Modal/Modal";
import InputText from "../Common/InputText/InputText";
import { addCategoryToParametersData, handleChangeAddCategoryData } from "../../redux/Slices/drlRulesetSlice";
import { useDispatch, useSelector } from "react-redux";

const AddCategoryModal = ({ isOpen, onClose, tag }) => {
  const { addCategoryData } = useSelector((state) => state.drlRuleset);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeAddCategoryData({ name, value }));
  };
  const handleAddCategory = () => {
    dispatch(
      addCategoryToParametersData({
        tagType: tag?.type, // "STRING" or "NUMBER"
        tagName: tag?.name, // used to find the right param group
      })
    );
    onClose(); // Close modal after adding
  };
  
  if (!isOpen) return null;
  return (
    <>
      <Modal
        title={"Add Category"}
        primaryButtonName="Add"
        primaryOnClick={handleAddCategory}
        secondaryOnClick={onClose}
      >
        <div className="flex gap-5">
          {tag?.type === "NUMBER" && (
            <>
              <InputText
                labelName={"Minimum"}
                inputName="minimum"
                inputValue={addCategoryData?.minimum}
                onChange={handleChange}
              />
              <InputText
                labelName={"Maximum"}
                inputName="maximum"
                inputValue={addCategoryData?.maximum}
                onChange={handleChange}
              />
            </>
          )}
          {tag?.type === "STRING" && (
            <>
              <InputText
                labelName={"Category Value"}
                inputName={"name"}
                inputValue={addCategoryData.name}
                onChange={handleChange}
              />
            </>
          )}
          <InputText
            labelName={"Numerical Score"}
            inputName={"value"}
            inputValue={addCategoryData.value}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
