import React from "react";
import InputFile from "../InputFile/InputFile";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import { toast } from "react-toastify";

const MAX_FILE_SIZE_MB = 2;

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
  const handleValidatedFileChange = (e) => {
    const file = e.target?.files?.[0];
    if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(
        "File size exceeds the 2MB limit. Please upload a smaller file."
      );
      return;
    }
    onFileChange?.(e); // only call the parent handler if validation passes
  };
  return (
    <div className="md:flex justify-between items-center border-b border-gray-300 dark:border-gray-600 mb-3 pb-3">
      <div className="mb-1 md:mb-0">{label}</div>
      <div className="flex gap-x-5 items-center justify-between">
        <InputFile
          inputName={inputFileName}
          inputValue={inputFileValue}
          onChange={handleValidatedFileChange}
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
