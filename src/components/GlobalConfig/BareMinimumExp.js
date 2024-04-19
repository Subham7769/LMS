import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";

const typeOptions = [
  { value: "loan", label: "Loan" },
  { value: "dependents", label: "Dependents" },
  { value: "children", label: "Children" },
  { value: "domesticWorkers", label: "Domestic Workers" },
];

const frequencyOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const BareMinimumExp = () => {
  const [inputList, setInputList] = useState([
    {
      id: 1,
      expense: "",
      type: "",
      frequency: "",
      minExpense: "",
    },
  ]);
  const handleAddFields = () => {
    setInputList([
      ...inputList,
      {
        id: Date.now(),
        expense: "",
        type: "",
        frequency: "",
        minExpense: "",
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
        <div className="text-lg">Bare Minimum Expenses</div>
        <button
          onClick={handleAddFields}
          type="button"
          className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {inputList.map((item, index) => (
        <div key={item.id} className="flex gap-4 items-end mt-5">
          <div className="relative">
            <label
              htmlFor={`expense_${item.id}`}
              className=" bg-white px-1 text-xs text-gray-900"
            >
              Expenses
            </label>
            <input
              type="text"
              name="expense"
              id={`expense_${item.id}`}
              value={item.expense}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Food and Living"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`type_${item.id}`}
              className=" bg-white px-1 text-xs text-gray-900"
            >
              Type
            </label>
            <Select
              className="w-64"
              options={typeOptions}
              id={`type_${item.id}`}
              name="type"
              value={typeOptions.find((option) => option.value === item.type)}
              onChange={(selectedOption) =>
                handleDDChange("type", selectedOption, item.id)
              }
              isSearchable={false}
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`frequency_${item.id}`}
              className=" bg-white px-1 text-xs text-gray-900"
            >
              Expenses Frequency
            </label>
            <Select
              className="w-64"
              options={frequencyOptions}
              id={`frequency_${item.id}`}
              name="frequency"
              value={frequencyOptions.find(
                (option) => option.value === item.frequency
              )}
              onChange={(selectedOption) =>
                handleDDChange("frequency", selectedOption, item.id)
              }
              isSearchable={false}
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`minExpense_${item.id}`}
              className=" bg-white px-1 text-xs text-gray-900"
            >
              Bare Minimum Expense Per Person
            </label>
            <input
              type="text"
              name="minExpense"
              id={`minExpense_${item.id}`}
              value={item.minExpense}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="200"
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

export default BareMinimumExp;
