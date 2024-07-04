import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import { Passed } from "../Toasts";
import { FaInfoCircle } from "react-icons/fa";
import { PlusIcon } from "@heroicons/react/20/solid";
import DynamicName from "../Common/DynamicName/DynamicName";

const options = [
  { value: "Days", label: "Days" },
  { value: "Weeks", label: "Weeks" },
  { value: "Months", label: "Months" },
];

const RecoveryNew = () => {
  const [tenure, setTenure] = useState("");
  const [wallet, setWallet] = useState("");
  const [due, setDue] = useState("");
  const [dpd, setDpd] = useState("");
  const [deductionAmount, setDeductionAmount] = useState("");
  const [deductionEquation, setDeductionEquation] = useState("");
  const [edit, setEdit] = useState(false);
  const [notify, setNotify] = useState(false);
  const [name, setName] = useState("Recovery Config");

  const handleNameUpdate = (newName) => {
    setName(newName);
  };

  const saveSettings = () => {
    // Logic to save the settings
    toast.success("Recovery saved successfully!");
  };

  const deleteSettings = () => {
    // Logic to delete the settings
    setRecoveryOption([]);
    setTenure("");
    setWallet("");
    setDue("");
    setDeductionAmount("");
    setDeductionEquation(
      "( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )"
    );
    toast.error("Settings deleted!");
  };

  // Regex to allow only specified characters
  const allowedCharactersRegex = /^[\w\s0-9()+\-*/.]*$/;

  const handleEquationChange = (e) => {
    const { value } = e.target;
    if (allowedCharactersRegex.test(value)) {
      setDeductionEquation(value);
    } else {
      toast.error("Invalid character detected!");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="rounded-lg border bg-white shadow-md border-red-600">
        <div className="pr-6 py-6">
          <div className="flex items-center justify-between pl-4 mb-4">
            <DynamicName initialName={name} onSave={handleNameUpdate} />
            <div className="flex relative gap-3 h-10 items-center justify-center">
              <button
                type="button"
                onClick={tenure !== "" && saveSettings}
                className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-2 mb-4 flex space-x-5 pl-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tenure
              </label>
              <input
                type="number"
                className="form-input w-[100px] h-9 rounded-md border-gray-300  text-sm focus:border-primary focus:ring focus:ring-primary/50"
                value={tenure}
                placeholder="31"
                onChange={(e) => setTenure(Number(e.target.value))}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tenure Type
              </label>
              <Select
                options={options}
                isSearchable={false}
                className="w-full rounded-md border-gray-300 bg-gray-100 text-sm focus:border-primary focus:ring focus:ring-primary/50"
              />
            </div>
          </div>
          <div className="flex space-x-4 pl-6">
            <div className="flex-1">
              <label className="text-sm font-medium flex items-center gap-3 text-gray-700 mb-1">
                Deduction Equation
                <FaInfoCircle
                  className="text-yellow-500 duration-500 transition hover:scale-110 cursor-pointer"
                  title={`w is Wallet.
r is Repayment.
d is Days Past Due.`}
                />
              </label>
              <div className="flex items-center space-x-2 2xl:w-[50%] w-[70%]">
                {deductionEquation.length > 100 ? (
                  <textarea
                    rows="3"
                    className="form-input w-full rounded-md border-gray-300 text-sm p-2"
                    value={deductionEquation}
                    onChange={handleEquationChange}
                    placeholder="( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )"
                  />
                ) : (
                  <input
                    type="text"
                    className="form-input w-full h-10 rounded-md border-gray-300 text-sm p-2"
                    value={deductionEquation}
                    onChange={handleEquationChange}
                    placeholder="( w > r ) * r + ( w < r ) * w * 0.5..."
                  />
                )}
              </div>
              {notify && (
                <p className="text-red-500 text-sm">
                  NB! Please delete the whole equation to write a new one
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecoveryNew;
