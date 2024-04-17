import { useState } from "react";
import InequalityNumber from "../InequalityNumber";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
const GcCreditPolicyComp = (props) => {
  const { labelProp } = props;
  const { cardTitle, label1, label2, placeholder1, placeholder2 } = labelProp;
  const [inputList, setInputList] = useState([
    {
      id: 1,
      maxAmt: "",
      saudi: "",
    },
  ]);
  const handleAddFields = () => {
    setInputList([
      ...inputList,
      {
        id: Date.now(),
        maxAmt: "",
        saudi: "",
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
  const handleDelete = (index) => {
    const deleteList = [...inputList];
    deleteList.splice(index, 1);
    setInputList(deleteList);
  };
  return (
    <>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600 my-7">
        <div className="flex items-center justify-between ">
          <div className="text-lg">{cardTitle}</div>
          <button
            onClick={handleAddFields}
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {inputList.map((item, index) => (
          <div key={item.id} className="flex gap-8 mt-2 items-end">
            <InequalityNumber labelText={label1} placeholder={placeholder1} />
            <InequalityNumber labelText={label2} placeholder={placeholder2} />
            <div className="mb-3">
              <label htmlFor={`maxAmt_${item.id}`} className="block">
                Max Amount For Expats
              </label>
              <input
                type="number"
                name="maxAmt"
                id={`maxAmt_${item.id}`}
                value={item.maxAmt}
                onChange={(e) => handleChange(e, item.id)}
                className="block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Add Amount"
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`saudi_${item.id}`} className="block">
                For Saudi :
              </label>
              <input
                type="number"
                name="saudi"
                id={`saudi_${item.id}`}
                value={item.saudi}
                onChange={(e) => handleChange(e, item.id)}
                className="block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Add Saudi Max Amount"
              />
            </div>
            <button
              onClick={() => handleDelete(index)}
              type="button"
              className="mb-3 w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
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

export default GcCreditPolicyComp;
