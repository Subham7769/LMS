import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";

const options = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const tenureOptions = [
  { value: "days", label: "Days" },
  { value: "weeks", label: "Weeks" },
  { value: "months", label: "Months" },
  { value: "years", label: "Years" },
];

const racOptions = [
  { value: "r1", label: "R1" },
  { value: "r2", label: "R2" },
  { value: "r3", label: "R3" },
];

const LoanProductConfig = () => {
  const [inputList, setInputList] = useState([
    {
      id: 1,
      simpleInterest: "",
      per: "",
      tenure: "",
      tenureType: "",
      minCredit: "",
      maxCredit: "",
      rac: "",
    },
  ]);
  const handleAddFields = () => {
    setInputList([
      ...inputList,
      {
        id: Date.now(),
        simpleInterest: "",
        per: "",
        tenure: "",
        tenureType: "",
        minCredit: "",
        maxCredit: "",
        rac: "",
      },
    ]);
  };
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const list = [...inputList];
    const index = list.findIndex((item) => item.id === id);
    list[index][name] = value;
    setInputList(list);
  };
  const handleDDChange = (propName, selectedOption, id) => {
    const name = propName;
    const list2 = [...inputList];
    const index = list2.findIndex((item) => item.id === id);
    list2[index][name] = selectedOption.value;
    setInputList(list2);
  };

  const handleDelete = (index) => {
    const deleteList = [...inputList];
    deleteList.splice(index, 1);
    setInputList(deleteList);
  };
  return (
    <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
      <div className="flex items-center justify-between ">
        <div className="text-lg">Unsecured Retail Loan</div>
        <button
          onClick={handleAddFields}
          type="button"
          className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {inputList.map((item, index) => (
        <div key={item.id} className="flex gap-2 items-end mt-5">
          <div className="relative">
            <label
              htmlFor={`simpleInterest_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Simple Interest
            </label>
            <input
              type="number"
              name="simpleInterest"
              id={`simpleInterest_${item.id}`}
              value={item.simpleInterest}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="2%"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`per_${item.id}`}
              className="absolute z-[2] -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              PER
            </label>
            <Select
              className="w-36"
              options={options}
              id={`per_${item.id}`}
              name="per"
              value={options.find((option) => option.value === item.per)}
              onChange={(selectedOption) =>
                handleDDChange("per", selectedOption, item.id)
              }
              isSearchable={false}
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`tenure_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Tenure
            </label>
            <input
              type="number"
              name="tenure"
              id={`tenure_${item.id}`}
              value={item.tenure}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="3"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`tenureType_${item.id}`}
              className="absolute z-[2] -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Tenure Type
            </label>
            <Select
              className="w-36"
              options={tenureOptions}
              id={`tenureType_${item.id}`}
              name="tenureType"
              value={tenureOptions.find(
                (option) => option.value === item.tenureType
              )}
              // onChange={(newValue) => handleDDChange("tenureType", newValue, index)}
              onChange={(selectedOption) =>
                handleDDChange("tenureType", selectedOption, item.id)
              }
              isSearchable={false}
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`minCredit_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Min Credit Score
            </label>
            <input
              type="number"
              name="minCredit"
              id={`minCredit_${item.id}`}
              value={item.minCredit}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.3"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`maxCredit_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Max Credit Score
            </label>
            <input
              type="number"
              name="maxCredit"
              id={`maxCredit_${item.id}`}
              value={item.maxCredit}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="2"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`rac_${item.id}`}
              className="absolute z-[2] -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              RAC
            </label>
            <Select
              className="w-36"
              options={racOptions}
              id={`rac_${item.id}`}
              name="rac"
              value={racOptions.find((option) => option.value === item.rac)}
              // onChange={(newValue) => handleDDChange("rac", newValue, index)}
              onChange={(selectedOption) =>
                handleDDChange("rac", selectedOption, item.id)
              }
              isSearchable={false}
            />
          </div>
          <button
            onClick={() => handleDelete(index)}
            type="button"
            className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      ))}
      <div className="text-right mt-5">
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Save
        </button>
      </div>
    </div>
  );
};

export default LoanProductConfig;
