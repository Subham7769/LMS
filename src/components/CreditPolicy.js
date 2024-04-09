import { useState } from "react";
import InequalityNumber from "./InequalityNumber";
import MaxFinAmtTen from "./MaxFinAmtTen";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import LengthofService from "./LengthOfService";
import TagsComp from "./TagsComp";

const options = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const CreditPolicy = () => {
  const [inputList, setInputList] = useState([
    {
      id: 1,
      simpleInterest: "",
      per: "",
    },
  ]);
  const handleAddFields = () => {
    setInputList([
      ...inputList,
      {
        id: Date.now(),
        simpleInterest: "",
        per: "",
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
    <>
      <MaxFinAmtTen />
      <div className="border-b border-gray-300 pb-8 my-8">
        <div className=" text-center my-4">
          Risk Based Pricing = [(Credit Score*A%) + (Employment Sector*B%) +
          (*Length of Service*C%) + (*Cities*D%)]
        </div>
        <div className="flex justify-center">
          <table className="divide-y divide-gray-300 w-5/6">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th className="py-3.5 px-2 text-center text-gray-900">A</th>
                <th className="py-3.5 px-2 text-center text-gray-900">B</th>
                <th className="py-3.5 px-2 text-center text-gray-900">C</th>
                <th className="py-3.5 px-2 text-center text-gray-900">D</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="divide-x divide-gray-200 text-center">
                <td className="whitespace-nowrap py-4 px-2 text-gray-900">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="flex items-center justify-between ">
          <div className="">Risk Based Pricing</div>
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
            <InequalityNumber
              labelText={"Minimum Risk Based Pricing:"}
              placeholder={"0.5"}
            />
            <InequalityNumber
              labelText={"Maximum Risk Based Pricing:"}
              placeholder={"2"}
            />
            <div className="mb-3">
              <label htmlFor={`simpleInterest_${item.id}`} className="block">
                Simple Interest
              </label>
              <input
                type="number"
                name="simpleInterest"
                id={`simpleInterest_${item.id}`}
                value={item.simpleInterest}
                onChange={(e) => handleChange(e, item.id)}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="4000"
              />
            </div>
            <div className="relative mb-3">
              <label htmlFor={`per_${item.id}`} className="block">
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
      <LengthofService />
      <div className="flex gap-10">
        <TagsComp label={"City"} />
        <TagsComp label={"Occupation"} />
      </div>
    </>
  );
};

export default CreditPolicy;
