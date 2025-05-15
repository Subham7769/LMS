import React from "react";
import InputFile from "../InputFile/InputFile";
import InputCheckbox from "../InputCheckbox/InputCheckbox";

const DocumentUploaderVerifier = ({
  label,
  inputFileName,
  inputFileValue,
  onFileChange,
  onFileDelete,
  checkboxName,
  checkboxChecked,
  onCheckboxChange,
}) => {
  return (
    <div className="md:flex justify-between items-center border-b border-gray-300 dark:border-gray-600 mb-3 pb-3">
      <div className="mb-1 md:mb-0">{label}</div>
      <div className="flex gap-x-5 items-center justify-between">
        <InputFile
          inputName={inputFileName}
          inputValue={inputFileValue}
          onChange={onFileChange}
          onDelete={onFileDelete}
        />
        {checkboxName && (
          <div>
            <InputCheckbox
              labelName={"Verified"}
              inputChecked={checkboxChecked}
              onChange={onCheckboxChange}
              inputName={checkboxName}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploaderVerifier;
