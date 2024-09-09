import React from "react";
import { PlusIcon, XCircleIcon } from "@heroicons/react/20/solid";
import Button from "../Common/Button/Button";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputText from "../Common/InputText/InputText";
import SectionErrorBoundary from "../ErrorBoundary/SectionErrorBoundary";

const TagInput = ({
  inputSelectName,
  inputTextName,
  inputNumberName,
  inputSelectLabel,
  inputTextLabel,
  inputNumberLabel,
  inputTextPlaceholder,
  formData,
  handleChange,
  addTag,
  deleteTag,
  productTypeOptions,
}) => {
  const Content = () => (
    <div
      className={`grid grid-cols-2 ${
        inputSelectName ? "md:grid-cols-3" : "md:grid-cols-2"
      } gap-3 mt-3`}
    >
      {formData.tags.map((tag, index) => (
        <div
          key={index}
          className="bg-gray-300 border border-gray-400 my-1 p-2 rounded-md flex  justify-between items-center cursor-auto text-sm"
        >
          <div>{tag[inputSelectName ? inputSelectName : inputTextName]}</div>
          <div>|</div>
          <div>{tag[inputNumberName]}</div>
          <div>
            <XCircleIcon
              onClick={() => deleteTag(tag)}
              className="block h-5 w-5 cursor-pointer text-gray-900"
              aria-hidden="true"
            />
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
        {inputSelectName && (
          <InputSelect
            labelName={inputSelectLabel}
            inputName={inputSelectName}
            inputOptions={productTypeOptions}
            inputValue={formData[inputSelectName]}
            onChange={handleChange}
          />
        )}
        {inputTextName && (
          <InputText
            labelName={inputTextLabel}
            inputName={inputTextName}
            inputValue={formData[inputTextName]}
            onChange={handleChange}
            placeHolder={inputTextPlaceholder}
          />
        )}
        <InputNumber
          labelName={inputNumberLabel}
          inputName={inputNumberName}
          inputValue={formData[inputNumberName]}
          onChange={handleChange}
          placeHolder={"2"}
        />
        <div className="">
          <Button buttonIcon={PlusIcon} onClick={addTag} circle={true} />
        </div>
      </div>
      <SectionErrorBoundary>
        <Content />
      </SectionErrorBoundary>
    </>
  );
};

export default TagInput;
