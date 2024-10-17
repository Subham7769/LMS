import React from "react";
import { PlusIcon, XCircleIcon } from "@heroicons/react/20/solid";
import Button from "../Common/Button/Button";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputText from "../Common/InputText/InputText";

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
  orderReverse = false,
}) => {
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
        <div className="">
          <Button buttonIcon={PlusIcon} onClick={addTag} circle={true} />
        </div>
      </div>
      <div
        className={`grid grid-cols-2 ${inputSelectName ? "md:grid-cols-3" : "md:grid-cols-2"
          } gap-3 mt-3`}
      >
        {formData.tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-300 border border-gray-400 my-1 p-2 rounded-md flex  justify-between items-center cursor-auto text-sm"
          >
            <div className="flex-1 flex justify-between align-middle">
              <>
                {/* Display inputSelectName and inputTextName, but not inputNumberName */}
                {inputSelectName && inputTextName && !inputNumberName && (
                  <>
                    {orderReverse ? (
                      <>
                        <div className="text-xs w-[50%] text-center">{tag[inputTextName]}</div>
                        <div className="text-xs text-center">|</div>
                        <div className="text-xs w-[50%] text-center">{tag[inputSelectName]}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-xs w-[65%] text-left">{tag[inputSelectName]}</div>
                        <div className="text-xs text-center">|</div>
                        <div className="text-xs w-[34%] text-right">{tag[inputTextName]}</div>
                      </>
                    )}
                  </>
                )}

                {/* Display inputSelectName and inputNumberName, but not inputTextName */}
                {inputSelectName && inputNumberName && !inputTextName && (
                  <>
                    {orderReverse ? (
                      <>
                        <div className="text-xs w-[50%] text-center">{tag[inputNumberName]}</div>
                        <div className="text-xs text-center">|</div>
                        <div className="text-xs w-[50%] text-center">{tag[inputSelectName]}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-xs w-[65%] text-center">{tag[inputSelectName]}</div>
                        <div className="text-xs text-center">|</div>
                        <div className="text-xs w-[34%] text-center">{tag[inputNumberName]}</div>
                      </>
                    )}
                  </>
                )}

                {/* Display inputTextName and inputNumberName, but not inputSelectName */}
                {inputTextName && inputNumberName && !inputSelectName && (
                  <>
                    {orderReverse ? (
                      <>
                        <div className="text-xs w-[50%] text-left">{tag[inputNumberName]}</div>
                        <div className="text-xs text-center">|</div>
                        <div className="text-xs w-[50%] text-right">{tag[inputTextName]}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-xs w-[65%] text-left">{tag[inputTextName]}</div>
                        <div className="text-xs text-center">|</div>
                        <div className="text-xs w-[34%] text-right">{tag[inputNumberName]}</div>
                      </>
                    )}
                  </>
                )}
              </>
              {/* Display single items without the | separator */}
              {!inputTextName && inputSelectName && !inputNumberName && (
                <div>{tag[inputSelectName]}</div>
              )}
              {!inputTextName && !inputSelectName && inputNumberName && (
                <div>{tag[inputNumberName]}</div>
              )}
              {!inputNumberName && inputTextName && !inputSelectName && (
                <div>{tag[inputTextName]}</div>
              )}
            </div>
            <XCircleIcon
              onClick={() => deleteTag(tag)}
              className="ml-4 block h-5 w-5 cursor-pointer text-gray-900 hover:text-red-600"
              aria-hidden="true"
            />
          </div>
        ))}
      </div >
    </>
  );
};

export default TagInput;
