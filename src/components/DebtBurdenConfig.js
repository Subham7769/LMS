import { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Select from "react-select";

const empOptions = [
  { value: "true", label: "true" },
  { value: "false", label: "false" },
];

const DebtBurdenConfig = () => {
  const [inputList, setInputList] = useState([
    {
      id: 1,
      startincome: "",
      endincome: "",
      productLevel: "",
      consumerDBR: "",
      gdbrWOmtg: "",
      empRtr: "",
      gdbrWmtg: "",
    },
  ]);
  const handleAddFields = () => {
    setInputList([
      ...inputList,
      {
        id: Date.now(),
        startincome: "",
        endincome: "",
        productLevel: "",
        consumerDBR: "",
        gdbrWOmtg: "",
        empRtr: "",
        gdbrWmtg: "",
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
        <div className="">Cash loan Loans</div>
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
              htmlFor={`startincome_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Start Net Income Bracket In SA Rule
            </label>
            <input
              type="number"
              name="startincome"
              id={`startincome_${item.id}`}
              value={item.startincome}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-56 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="10000"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`endincome_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              End Net Income Bracket In SA Rule
            </label>
            <input
              type="number"
              name="endincome"
              id={`endincome_${item.id}`}
              value={item.endincome}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-56 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="20000"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`productLevel_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Product Level
            </label>
            <input
              type="number"
              name="productLevel"
              id={`productLevel_${item.id}`}
              value={item.productLevel}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-28 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="33%"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`consumerDBR_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Consumer DBR
            </label>
            <input
              type="number"
              name="consumerDBR"
              id={`consumerDBR_${item.id}`}
              value={item.consumerDBR}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-28 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="65%"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`gdbrWOmtg_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              GDBR (Without MTG)
            </label>
            <input
              type="number"
              name="gdbrWOmtg"
              id={`gdbrWOmtg_${item.id}`}
              value={item.gdbrWOmtg}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-40 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="65%"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`empRtr_${item.id}`}
              className="absolute z-[2] -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Emplyer Retired
            </label>
            <Select
              className="w-28"
              defaultValue={empOptions[1]}
              options={empOptions}
              id={`empRtr_${item.id}`}
              name="empRtr"
              value={empOptions.find((option) => option.value === item.empRtr)}
              onChange={(selectedOption) =>
                handleDDChange("empRtr", selectedOption, item.id)
              }
              isSearchable={false}
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`gdbrWmtg_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              GDBR (including MTG)
            </label>
            <input
              type="number"
              name="gdbrWmtg"
              id={`gdbrWmtg_${item.id}`}
              value={item.gdbrWmtg}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-40 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="65%"
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

export default DebtBurdenConfig;
