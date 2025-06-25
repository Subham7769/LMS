import React from "react";
import InputText from "../InputText/InputText";
import InputNumber from "../InputNumber/InputNumber";
import InputEmail from "../InputEmail/InputEmail";
import InputDate from "../InputDate/InputDate";
import InputSelect from "../InputSelect/InputSelect";
import InputFile from "../InputFile/InputFile";
import InputTextArea from "../InputTextArea/InputTextArea";
import InputSelectCreatable from "../InputSelectCreatable/InputSelectCreatable";

const DynamicForm = ({
  details,
  config,
  sectionName,
  handleInputChange,
  handleFileUploads,
  handleFileRemove,
  columnsPerRow = 4,
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-${columnsPerRow} gap-5`}
    >
      {config.map((field, index) => {
        switch (field.type) {
          case "text":
            return (
              <InputText
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName] || ""}
                onChange={(e) => handleInputChange(e, sectionName)}
                placeHolder={`Enter ${field.labelName}`}
                isValidation={field.validation || false}
                disabled={field.disabled || false}
                maxLength={field.maxLength || null}
              />
            );
          case "number":
            return (
              <InputNumber
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName] || ""}
                onChange={(e) => handleInputChange(e, sectionName)}
                placeHolder={
                  field.labelName === "Credit Score"
                    ? "Enter between 0 to 1"
                    : `Enter ${field.labelName}`
                }
                isValidation={field.validation || false}
                disabled={field.disabled || false}
                maxLength={field.maxLength || null}
              />
            );
          case "select":
            return (
              <div className={`md:col-span-${field.colSpan}`}>
                <InputSelect
                  key={index}
                  labelName={field.labelName}
                  inputName={field.inputName}
                  inputOptions={field.options}
                  inputValue={details[field.inputName] || ""}
                  onChange={(e) => handleInputChange(e, sectionName)}
                  isValidation={field.validation || false}
                  searchable={field.searchable || false}
                  disabled={field.disabled || false}
                />
              </div>
            );
          case "date":
            return (
              <div className="col-span-1" key={index}>
                <InputDate
                  labelName={field.labelName}
                  inputName={field.inputName}
                  inputValue={details[field.inputName] || ""}
                  onChange={(e) => handleInputChange(e, sectionName)}
                  isValidation={field.validation || false}
                  minSelectableDate={field.minSelectableDate || null}
                  maxSelectableDate={field.maxSelectableDate || null}
                  isDisabled={field.disabled || false}
                />
              </div>
            );
          case "email":
            return (
              <InputEmail
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName]}
                onChange={(e) => handleInputChange(e, sectionName)}
                placeHolder={`Enter ${field.labelName}`}
                isValidation={field.validation || false}
                disabled={field.disabled || false}
              />
            );
          case "file":
            return (
              <InputFile
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName]}
                onChange={(e) => handleFileUploads && handleFileUploads(e)}
                onDelete={() =>
                  handleFileRemove && handleFileRemove(sectionName)
                }
                accept={field.accept || "*"}
                isValidation={field.validation || false}
                disabled={field.disabled || false}
              />
            );
          case "textarea":
            return (
              <InputTextArea
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName] || ""}
                onChange={(e) => handleInputChange(e, sectionName)}
                rowCount={field.rowCount || 3}
                isValidation={field.validation || false}
              />
            );
          case "InputSelectCreatable":
            return (
              <InputSelectCreatable
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputOptions={field.options}
                inputValue={details[field.inputName] || ""}
                onChange={(e) => handleInputChange(e, sectionName)}
                isValidation={field.validation || false}
                isClearable={field.clearable || false}
                searchable={field.searchable || false}
                setInputOptions={field.setEmployerOptions}
                onCreateOption={
                  field.onCreateOption
                    ? (inputValue) =>
                        field.onCreateOption(inputValue, (e) =>
                          handleInputChange(e, sectionName)
                        )
                    : null
                }
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default DynamicForm;
