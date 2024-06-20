import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import useRacRules from "../utils/useRACRules";
import toast from "react-hot-toast";
import { RowChanged } from "./Toasts";

const DeliquencyEq = () => {
  const { racID } = useParams();
  const deURL1 = "/delinquency-rule/";
  const deURL2 = "delinquency";
  const deliquencyEqData = useRacRules(deURL1, deURL2);

  const [inputList, setInputList] = useState([
    { periodInMonths: "", noOfLateMonths: "", noOfLateTimes: "" },
  ]);

  useEffect(() => {
    if (deliquencyEqData.rules && deliquencyEqData.rules.length > 0) {
      const availableDeliquency = deliquencyEqData.rules[0].delinquencyRules;
      if (availableDeliquency && availableDeliquency.length > 0) {
        setInputList(availableDeliquency);
      }
    }
  }, [deliquencyEqData]);

  const handleAddAllFields = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      delinquencies: inputList,
      racId: racID,
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: "USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/xtracash/rules/delinquency-rule/" +
          racID,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddFields = () => {
    setInputList([
      ...inputList,
      { periodInMonths: "", noOfLateMonths: "", noOfLateTimes: "" },
    ]);
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
    <div className="shadow-md rounded-xl pb-8 pt-6 px-5 max-w-[660px] border border-red-600">
      <div className="flex items-center justify-between ">
        <div className="">Deliquency Equation : </div>
        <button
          onClick={handleAddFields}
          type="button"
          className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {inputList.map((item, index) => (
        <div className="flex gap-2 items-end mt-5">
          <div className="relative">
            <label
              htmlFor="noOfLateMonths"
              className="inline-block bg-white px-1 text-xs text-gray-900"
            >
              No. of late months From
            </label>
            <input
              type="number"
              name="noOfLateMonths"
              id="noOfLateMonths"
              value={item.noOfLateMonths}
              onChange={(e) => handleChange(e, index)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="2"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="noOfLateTimes"
              className="inline-block bg-white px-1 text-xs text-gray-900"
            >
              To
            </label>
            <input
              type="number"
              name="noOfLateTimes"
              id="noOfLateTimes"
              value={item.noOfLateTimes}
              onChange={(e) => handleChange(e, index)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="3"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="periodInMonths"
              className="inline-block bg-white px-1 text-xs text-gray-900"
            >
              Period in months
            </label>
            <input
              type="number"
              name="periodInMonths"
              id="periodInMonths"
              value={item.periodInMonths}
              onChange={(e) => handleChange(e, index)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="3"
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
          onClick={handleAddAllFields}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Save
        </button>
      </div>
    </div>
  );
};

export default DeliquencyEq;
