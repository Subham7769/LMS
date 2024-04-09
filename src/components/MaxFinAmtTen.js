import { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const MaxFinAmtTen = () => {
  const [inputList, setInputList] = useState([{ amount: "", tenure: "" }]);
  const handleAddFields = () => {
    setInputList([...inputList, { amount: "", tenure: "" }]);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  const handleDelete = (index) => {
    const deleteList = [...inputList];
    deleteList.splice(index, 1);
    setInputList(deleteList);
  };
  return (
    <>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 mx-auto max-w-[660px] border border-red-600">
        <div className="flex items-center justify-between ">
          <div className="">Max Finance Amount With Tenure </div>
          <button
            onClick={handleAddFields}
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {inputList.map((item, index) => (
          <div className="flex gap-5 items-end mt-5">
            <div className="relative">
              <label
                htmlFor="amount"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={item.amount}
                onChange={(e) => handleChange(e, index)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="999"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="tenure"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
              >
                Tenure
              </label>
              <input
                type="number"
                name="tenure"
                id="tenure"
                value={item.tenure}
                onChange={(e) => handleChange(e, index)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="6"
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
    </>
  );
};

export default MaxFinAmtTen;
