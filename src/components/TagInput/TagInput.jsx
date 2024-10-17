import React from "react";
import { PlusIcon, XCircleIcon } from "@heroicons/react/20/solid";
import Button from "../Common/Button/Button";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputText from "../Common/InputText/InputText";
import { useSelector } from "react-redux";

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
  isValidation = false,
  isIndex,
  isValidation2 = false,
  isIndex2,
  isValidation3 = false,
  isIndex3,
}) => {
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
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
            isValidation={isValidation3}
            isIndex={isIndex3}
          />
        )}
        {inputTextName && (
          <InputText
            labelName={inputTextLabel}
            inputName={inputTextName}
            inputValue={formData[inputTextName]}
            onChange={handleChange}
            placeHolder={inputTextPlaceholder}
            isValidation={isValidation}
            isIndex={isIndex}
          />
        )}
        {inputNumberName && (
          <InputNumber
            labelName={inputNumberLabel}
            inputName={inputNumberName}
            inputValue={formData[inputNumberName]}
            onChange={handleChange}
            placeHolder={"2"}
            isValidation={isValidation2}
            isIndex={isIndex2}
          />
        )}
        {roleName !== "ROLE_VIEWER" ? (
          <div className="">
            <Button buttonIcon={PlusIcon} onClick={addTag} circle={true} />
          </div>
        ) : (
          ""
        )}
      </div>
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
            <div>
              {
                tag[
                  inputSelectName
                    ? inputSelectName
                    : inputTextName || inputNumberName
                ]
              }
            </div>
            {inputNumberName && (inputTextName || inputSelectName) && (
              <>
                <div>|</div>
                <div>{tag[inputNumberName]}</div>
              </>
            )}
            {roleName !== "ROLE_VIEWER" ? (
              <div>
                <XCircleIcon
                  onClick={() => deleteTag(tag)}
                  className="block h-5 w-5 cursor-pointer text-gray-900"
                  aria-hidden="true"
                />
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TagInput;
