import React from "react";
import InputFile from "../InputFile/InputFile"
import InputCheckbox from "../InputCheckbox/InputCheckbox"

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
    <div className="flex justify-between items-center border-b border-gray-300 mb-3 pb-3">
      <div>{label}</div>
      <div className="flex gap-x-5 items-center">
        <InputFile
          inputName={inputFileName}
          inputValue={inputFileValue}
          onChange={onFileChange}
          onDelete={onFileDelete}
        />
        <div>
          <InputCheckbox
            labelName={"Verified"}
            inputChecked={checkboxChecked}
            onChange={onCheckboxChange}
            inputName={checkboxName}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentUploaderVerifier;
