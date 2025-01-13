import { FiUpload, FiFile, FiX, FiDownload } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch } from "react-redux";
import {
  addFields,
  setValidationError,
} from "../../../redux/Slices/validationSlice";
import { useSelector } from "react-redux";
import {
  addUpdateFields,
  setUpdateMap,
} from "../../../redux/Slices/notificationSlice";

const InputFile = ({
  labelName,
  inputName,
  onChange,
  accept = "*",
  disabled = false,
  placeholder = "Click or drag to upload",
  isValidation = false,
  isIndex,
  multiple = false, // Allow multiple file uploads
  inputValue,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);
  const { updateFields } = useSelector((state) => state.notification);
  // Extract the file name if inputValue is provided
  const sanitizeFileName = (value) => (value ? value.split("\\").pop() : "");

  const [fileNames, setFileNames] = useState(
    inputValue ? [sanitizeFileName(inputValue)] : []
  ); // Local file names for display
  const [isDragging, setIsDragging] = useState(false);

  if (!inputName || (!disabled && typeof onChange !== "function")) {
    let errorMessage = "";

    if (!inputName) {
      errorMessage += "inputName is required";
    }

    if (!disabled && typeof onChange !== "function") {
      if (errorMessage) {
        errorMessage += ", "; // Add a separator if there is already an error message
      }
      errorMessage += "onChange (should be a function) is required";
    }

    throw new Error(errorMessage);
  }

  const validationKey = isIndex ? `${inputName}_${isIndex}` : inputName;

  if (isValidation) {
    useEffect(() => {
      if (!fields.includes(inputName)) {
        dispatch(addFields({ inputName }));
      }
    }, [inputName, dispatch]);
  }

  useEffect(() => {
    if (!updateFields.includes(inputName)) {
      dispatch(addUpdateFields({ inputName }));
    }
  }, [inputName, dispatch]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length) {
      setFileNames(files.map((file) => file.name));
      if (onChange) {
        onChange(event);
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    if (files.length) {
      setFileNames(files.map((file) => file.name));
      if (onChange) {
        onChange({ target: { files } });
      }
    }
  };

  const handleClearFiles = () => {
    setFileNames([]); // Clear local file names
    if (onChange) {
      onChange({ target: { name: inputName, value: null, type: "file" } });
    }
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-3 text-center transition-all ${
        isDragging
          ? "bg-indigo-50 border-indigo-500"
          : fileNames.length
          ? "bg-indigo-50 border-indigo-500"
          : "bg-gray-100 hover:border-indigo-500 hover:bg-indigo-50"
      }
    ${validationError[validationKey] ? "border-red-600" : "border-gray-500"}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onFocus={() => {
        dispatch(setValidationError(validationKey));
        dispatch(setUpdateMap(inputName));
      }}
    >
      <label
        className={`absolute -top-5 left-0 text-sm ${
          validationError[validationKey] ? "text-red-600" : "text-gray-500"
        }`}
      >
        {validationError[validationKey] ? "Field required" : labelName}
      </label>

      {!fileNames.length && !isDragging && (
        <>
          <FiUpload className="mx-auto text-gray-400 mb-2" size={20} />
          <span className="text-sm text-gray-500">{placeholder}</span>
        </>
      )}

      {isDragging && (
        <>
          <FiDownload className="mx-auto text-indigo-700 mb-2" size={20} />
          <span className="text-sm text-indigo-700">
            Drop your file here...
          </span>
        </>
      )}

      {fileNames.length > 0 && (
        <div className="text-indigo-700 text-sm font-semibold">
          {fileNames.map((fileName, index) => (
            <div
              key={index}
              className="flex items-center flex-col justify-between"
            >
              <FiFile className="mr-2" size={20} />
              <span className="truncate">{fileName}</span>
            </div>
          ))}
        </div>
      )}

      {fileNames.length > 0 && (
        <FiX
          className="mx-auto text-white p-1 font-semibold absolute -top-4 -right-4 bg-red-500 rounded-lg cursor-pointer"
          size={28}
          onClick={handleClearFiles}
        />
      )}
      <input
        type="file"
        name={inputName}
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept={accept}
        disabled={disabled}
        multiple={multiple}
      />
    </div>
  );
};

// Wrap the component with the error boundary
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <InputFile {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
