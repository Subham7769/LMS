import React from "react";
import Modal from "../Common/Modal/Modal";
import InputText from "../Common/InputText/InputText";
import { handleChangeAddCategoryData } from "../../redux/Slices/drlRulesetSlice";
import { useDispatch } from "react-redux";

const AddCategoryModal = ({ isOpen, onClose, tag, addCategoryData }) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeAddCategoryData({ name, value }));
  };
  const handleAddCategory = () => {};
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
          {tag?.fieldType === "NUMBER" && (
            <>
              <InputText
                labelName={"Min"}
                inputName="min"
                inputValue={addCategoryData?.min}
                onChange={handleChange}
              />
              <InputText
                labelName={"Max"}
                inputName="max"
                inputValue={addCategoryData?.max}
                onChange={handleChange}
              />
            </>
          )}
          {tag?.fieldType === "STRING" && (
            <>
              <InputText
                labelName={"Category Value"}
                inputName={"categoryValue"}
                inputValue={addCategoryData.categoryValue}
                onChange={handleChange}
              />
            </>
          )}
          <InputText
            labelName={"Numerical Score"}
            inputName={"numericalScore"}
            inputValue={addCategoryData.numericalScore}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
