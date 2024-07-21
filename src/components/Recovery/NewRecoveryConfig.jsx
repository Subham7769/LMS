import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PlusIcon } from "@heroicons/react/20/solid";
import DynamicName from "../Common/DynamicName/DynamicName";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import { useParams } from "react-router-dom";

const options = [
  { value: "Days", label: "Days" },
  { value: "Weeks", label: "Weeks" },
  { value: "Months", label: "Months" },
];

const NewRecoveryConfig = () => {
  const { recoveryName } = useParams();
  const [formData, setFormData] = useState({
    name: recoveryName,
    tenure: "",
    wallet: "",
    due: "",
    dpd: "",
    deductionAmount: "",
    deductionEquation: "( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )",
    tenureType: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value)

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
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" flex flex-col gap-4 rounded-lg border bg-white shadow-md border-red-600 p-6 ">
          <div className="flex justify-between">
            <DynamicName initialName={formData.name} onSave={handleNameUpdate} />
            <div className="flex relative gap-3 h-10 items-center justify-center">

              <button
                type="button"
                onClick={saveSettings}
                className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
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
              <div className="flex flex-col space-x-2 2xl:w-[50%] w-[75%]" >
                <InputTextArea
                  labelName={"Deduction Equation"}
                  inputName={"deductionEquation"}
                  rowCount={"3"}
                  inputValue={formData.deductionEquation}
                  onChange={handleChange}
                  placeHolder="( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )"
                />
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default NewRecoveryConfig;
