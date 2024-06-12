import { useState, useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "./Toasts";
import { useParams } from "react-router-dom";

const MaxFinAmtTen = ({ FAWTData, fetchData }) => {
  const [inputList, setInputList] = useState([]);
  const { projectId } = useParams();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const filteredData = FAWTData.filter(
      (item) => item.projectId === projectId
    );
    setInputList(filteredData);
  }, [FAWTData]);

  const handleAddFields = () => {
    setInputList([...inputList, { amount: "", tenure: "" }]);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleClear = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleDelete = (index) => {
    const ruleToDelete = inputList[index];
    fetch(
      `https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/finance-amount-with-tenure-rule/${ruleToDelete.ruleName}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        if (data) {
          return JSON.parse(data);
        } else {
          console.log("Empty response");
        }
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        fetchData();
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Delete Successful"}
            message={"The item was deleted successfully"}
          />
        ));
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  const handleUpdate = (index) => {
    const payload = {
      financeAmountWithTenureRules: inputList.map((item, idx) => ({
        ruleName: inputList[idx].ruleName,
        fieldType: "Employer",
        projectId: inputList[index].projectId,
        financeAmount: item.financeAmount,
        tenure: item.tenure,
      })),
    };

    fetch(
      `https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/finance-amount-with-tenure-rule`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else if (response.ok) {
          toast.custom((t) => (
            <Passed
              t={t}
              toast={toast}
              title={"Update Successful"}
              message={"The item was updated successfully"}
            />
          ));
        }
        return response.text();
      })
      .then((data) => {
        if (data) {
          return JSON.parse(data);
        } else {
          console.log("Empty response");
        }
        console.log("Data successfully updated:", data);
        fetchData();
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const handleSave = () => {
    const payload = {
      financeAmountWithTenureRules: [
        {
          ruleName: "0",
          fieldType: "Employer",
          projectId: inputList[0].projectId,
          financeAmount: inputList[inputList.length - 1].financeAmount,
          tenure: inputList[inputList.length - 1].tenure,
        },
      ],
    };

    fetch(
      "http://10.10.10.70:32014/carbon-product-service/xtracash/rules/finance-amount-with-tenure-rule",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else if (response.ok) {
          toast.custom((t) => (
            <Passed
              t={t}
              toast={toast}
              title={"Adding Successful"}
              message={"The item was added successfully"}
            />
          ));
        }
        return response.text();
      })
      .then((data) => {
        if (data) {
          return JSON.parse(data);
        } else {
          console.log("Empty response");
        }
        console.log("Data successfully saved:", data);
        fetchData();
      })
      .catch((error) => console.error("Error saving data:", error));
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 mx-auto max-w-[660px] border border-red-600">
        <div className="flex items-center justify-between">
          <div className="text-lg">Max Finance Amount With Tenure</div>
          <button
            onClick={handleAddFields}
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {inputList.map((item, index) => (
          <div key={index} className="flex gap-5 items-end mt-5">
            <div className="relative">
              <label
                htmlFor={`amount-${index}`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                Amount
              </label>
              <input
                type="number"
                name="financeAmount"
                id={`financeAmount-${index}`}
                value={item.financeAmount}
                onChange={(e) => handleChange(e, index)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="999"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`tenure-${index}`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                Tenure
              </label>
              <input
                type="number"
                name="tenure"
                id={`tenure-${index}`}
                value={item.tenure}
                onChange={(e) => handleChange(e, index)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="6"
              />
            </div>
            {item.fieldType && (
              <>
                <button
                  onClick={() => handleDelete(index)}
                  type="button"
                  className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => handleUpdate(index)}
                  type="button"
                  className="w-9 h-9 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {item.financeAmount === "" ? (
                  <button
                    onClick={() => handleClear(index)}
                    type="button"
                    className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                ) : null}
              </>
            )}
          </div>
        ))}
        <div className="text-right mt-7">
          <button
            onClick={handleSave}
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
