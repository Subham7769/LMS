import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
const RiskGradeCal = () => {
  const [inputList, setInputList] = useState([
    {
      id: 1,
      from: "",
      to: "",
      riskGrade: "",
    },
  ]);
  const handleAddFields = () => {
    setInputList([
      ...inputList,
      {
        id: Date.now(),
        from: "",
        to: "",
        riskGrade: "",
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
          <div className="text-lg mb-5">Risk Grading Calculation</div>
          <button
            onClick={handleAddFields}
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex gap-[345px]">
          <label className="block">Days Past Due:</label>
          <label className="block">Risk Grade :</label>
        </div>
        {inputList.map((item, index) => (
          <div key={item.id} className="flex gap-10 mt-2 items-end">
            <div className="mb-3">
              {/* <label htmlFor={`dpd_${item.id}`} className="block mb-3">
                Dayes Past Due:
              </label> */}
              <div className="flex gap-3">
                <div className="relative">
                  <label
                    htmlFor={`from_${item.id}`}
                    className="absolute z-[2] -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
                  >
                    From
                  </label>
                  <input
                    type="number"
                    name="from"
                    id={`from_${item.id}`}
                    value={item.from}
                    onChange={(e) => handleChange(e, item.id)}
                    className="block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="10"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor={`to_${item.id}`}
                    className="absolute z-[2] -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
                  >
                    To
                  </label>
                  <input
                    type="number"
                    name="to"
                    id={`to_${item.id}`}
                    value={item.to}
                    onChange={(e) => handleChange(e, item.id)}
                    className="block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="30"
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              {/* <label htmlFor={`riskGrade_${item.id}`} className="block mb-2">
                Risk Grade :
              </label> */}
              <input
                type="text"
                name="riskGrade"
                id={`riskGrade_${item.id}`}
                value={item.riskGrade}
                onChange={(e) => handleChange(e, item.id)}
                className="block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="R1"
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

export default RiskGradeCal;
