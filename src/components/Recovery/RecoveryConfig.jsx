import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaInfoCircle } from "react-icons/fa";
import { PencilIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import DynamicName from "../Common/DynamicName/DynamicName";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import InputText from "../Common/InputText/InputText";

const options = [
  { value: "Days", label: "Days" },
  { value: "Weeks", label: "Weeks" },
  { value: "Months", label: "Months" },
];

const RecoveryConfig = () => {
  const [formData, setFormData] = useState({
    name: "Recovery Config",
    tenure: "",
    wallet: "",
    due: "",
    dpd: "",
    deductionAmount: "",
    deductionEquation: "( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )",
    tenureType: ""
  });

  const [isEditingEquation, setIsEditingEquation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "deductionEquation") {
      const allowedCharactersRegex = /^[\w\s0-9()+\-*/.]*$/;
      if (!allowedCharactersRegex.test(value)) {
        toast.error("Invalid character detected!");
        return;
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNameUpdate = (newName) => {
    setFormData((prevState) => ({
      ...prevState,
      name: newName,
    }));
  };

  const saveSettings = () => {
    // Logic to save the settings
    toast.success("Recovery saved successfully!");
    toggleEditEquation()
  };

  const deleteSettings = () => {
    // Logic to delete the settings
    setFormData({
      name: "Recovery Config",
      tenure: "",
      wallet: "",
      due: "",
      dpd: "",
      deductionAmount: "",
      deductionEquation: "( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )",
      tenureType: ""
    });
    setIsEditingEquation(false);
    toast.error("Settings deleted!");
  };

  const toggleEditEquation = () => {
    setIsEditingEquation(!isEditingEquation);
  };


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" flex flex-col gap-4 rounded-lg border bg-white shadow-md border-red-600 p-6 ">
          <div className="flex justify-between">
            <DynamicName initialName={formData.name} onSave={handleNameUpdate} />
            <div className="flex relative gap-3 h-10 items-center justify-center">

              {isEditingEquation
                ?
                <button className="inline-flex w-20 items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={saveSettings} >
                  <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />Save
                </button>
                :
                <button className="inline-flex w-20 items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={toggleEditEquation} >
                  <PencilIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />Edit
                </button>
              }
              <button
                type="button"
                onClick={deleteSettings}
                className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="flex gap-4 space-x-2 2xl:w-[50%] w-[75%]">
            <div className="flex-1">
              <InputNumber
                labelName={"Tenure"}
                inputName={"tenure"}
                inputValue={formData.tenure}
                onChange={handleChange}
                placeHolder={"24"}
              />
            </div>
            <div className="flex-1">
              <InputSelect
                labelName="Tenure Type"
                inputName="tenureType"
                inputValue={formData.tenureType}
                inputOptions={options}
                onChange={handleChange}
                placeHolder="Select Tenure Type"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="text-sm font-medium flex items-center gap-3 text-gray-700 mb-1">

              </label>
              <div className="flex flex-col space-x-2 2xl:w-[50%] w-[75%]" >
                {
                  isEditingEquation && isEditingEquation ?
                    (
                      <InputTextArea
                        labelName={"Deduction Equation"}
                        inputName={"deductionEquation"}
                        rowCount={"3"}
                        inputValue={formData.deductionEquation}
                        onChange={handleChange}
                        placeHolder="( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )"
                      />)
                    :
                    (
                      <div className="flex items-center space-x-2 w-full">
                        <InputText
                          labelName={"Deduction Equation"}
                          inputName="deductionEquation"
                          inputValue={formData.deductionEquation}
                          onChange={handleChange}
                          placeHolder="( w > r ) * r + ( w < r ) * w * 0.5..."
                          readOnly={true}
                        />
                      </div>
                    )
                }
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default RecoveryConfig;
