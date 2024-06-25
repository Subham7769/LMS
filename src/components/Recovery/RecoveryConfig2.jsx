import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";

const Recovery2 = () => {
  const [recoveryOption, setRecoveryOption] = useState("daily");
  const [tenure, setTenure] = useState("");
  const [wallet, setWallet] = useState("");
  const [due, setDue] = useState("");
  const [deductionAmount, setDeductionAmount] = useState("");
  const [deductionEquation, setDeductionEquation] = useState(
    "(recovery < 1000) * (1000 - recovery) + (recovery > 1000) * (1000 * 0.5)"
  );
  const [edit, setEdit] = useState(false);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="rounded-lg border bg-white shadow-md border-red-600">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Recovery Configuration</h3>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recovery Option
              </label>
              <div className="flex space-x-4">
                {["daily", "weekly", "monthly"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center space-x-2 cursor-pointer ${
                      recoveryOption === option ? "bg-gray-200" : "bg-gray-100"
                    } rounded-md p-2`}
                  >
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-primary"
                      name="recovery-option"
                      value={option}
                      checked={recoveryOption === option}
                      onChange={() => setRecoveryOption(option)}
                    />
                    <span>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6 2xl:w-[50%] w-[70%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tenure
            </label>
            <input
              type="number"
              className="form-input w-full h-10 rounded-md border-gray-300 bg-gray-100 text-sm focus:border-primary focus:ring focus:ring-primary/50"
              value={tenure}
              placeholder="0"
              onChange={(e) => setTenure(Number(e.target.value))}
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deduction Equation
              </label>
              <div className="flex items-center space-x-2 2xl:w-[50%] w-[70%]">
                {edit ? (
                  <input
                    type="text"
                    className="form-input w-full h-10 rounded-md border-gray-300 bg-gray-100 text-sm"
                    value={deductionEquation}
                    onChange={(e) => setDeductionEquation(e.target.value)}
                    placeholder="0"
                    onMouseLeave={() => setEdit(false)}
                  />
                ) : (
                  <p className="h-10 w-full rounded-md bg-gray-100 text-sm flex items-center pl-2">
                    {deductionEquation}
                  </p>
                )}
                <button
                  className="bg-indigo-500 text-white rounded-md px-3 py-2 text-sm hover:bg-indigo-300 focus:outline-none focus:ring focus:ring-primary/50"
                  onClick={() => setEdit(true)}
                >
                  Edit
                </button>
              </div>
              <div className="flex justify-end items-center 2xl:w-[50%] w-[70%] py-4"></div>
            </div>
          </div>

          <div className="flex 2xl:w-[50%] w-[70%] gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wallet
              </label>
              <input
                type="number"
                className="w-full h-10 rounded-md border-gray-300 bg-gray-100 text-sm"
                value={wallet}
                placeholder="0"
                onChange={(e) => setWallet(Number(e.target.value))}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due
              </label>
              <input
                type="number"
                className="w-full h-10 rounded-md border-gray-300 bg-gray-100 text-sm"
                value={due}
                placeholder="0"
                onChange={(e) => setDue(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deduction Amount
            </label>
            <input
              type="number"
              className="form-input 2xl:w-[50%] w-[70%] h-10 rounded-md border-gray-300 bg-gray-100 text-sm"
              value={deductionAmount}
              onChange={(e) => setDeductionAmount(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="py-6 pl-6 2xl:w-[50%] w-[70%] border-t flex justify-end">
          <button
            className="bg-indigo-500 text-white rounded-md px-6 py-2 text-sm hover:bg-indogo-300 focus:outline-none focus:ring focus:ring-primary/50"
            onClick={() =>
              toast.custom((t) => (
                <Passed
                  t={t}
                  toast={toast}
                  title={"Total"}
                  message={`The Deduction Amount = ${deductionAmount}`}
                />
              ))
            }
          >
            submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Recovery2;
