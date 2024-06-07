import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import useGlobalConfig from "../utils/useGlobalConfig";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import LoadingState from "../LoadingState";

const typeOptions = [
  { value: "LOAN", label: "Loan" },
  { value: "DEPENDENTS", label: "Dependents" },
  { value: "CHILDREN", label: "Children" },
  { value: "DOMESTIC_WORKERS", label: "Domestic Workers" },
];

const frequencyOptions = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "YEARLY", label: "Yearly" },
];

const BareMinimumExp = () => {
  const [ExpenseDataNew, setExpenseDataNew] = useState([]);
  const [expensesName, setExpensesName] = useState("");
  const [expensesFrequency, setExpensesFrequency] = useState("");
  const [bareMinimum, setBareMinimum] = useState("");
  const [dependantType, setDependantType] = useState("");

  const url = "expenses";
  const ExpenseData = useGlobalConfig(url);
  // console.log(ExpenseData.expenses);

  if (ExpenseData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }
  const handleAddFields = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      // You need to define the structure of the data you are posting
      // For example:
      // id: Date.now(),
      expensesName: expensesName,
      expensesFrequency: expensesFrequency.value,
      bareMinimum: bareMinimum,
      dependantType: dependantType.value,
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/configs/expenses/add",
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
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Added Successfully"}
            message={"Item has been added successfully"}
          />
        ));
      }

      // If the POST was successful, make a GET request to fetch the updated data
      const getResponse = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/configs/expenses",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!getResponse.ok) {
        throw new Error(`HTTP error! Status: ${getResponse.status}`);
      }

      const updatedData = await getResponse.json(); // Assuming the server returns JSON
      // Update your state with the fetched data
      setExpenseDataNew(updatedData.expenses); // Replace 'setYourStateHere' with your actual state update function
      setExpensesName("");
      setExpensesFrequency("");
      setBareMinimum("");
      setDependantType("");
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const newList =
      ExpenseDataNew.length === 0 ? ExpenseData.expenses : ExpenseDataNew;
    const updatedList = newList.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setExpenseDataNew(updatedList);
  };

  const handleDDChange = (propName, selectedOption, id) => {
    const name = propName;
    const newList =
      ExpenseDataNew.length === 0 ? ExpenseData.expenses : ExpenseDataNew;
    const updatedList = newList.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: selectedOption.value };
      }
      return item;
    });
    setExpenseDataNew(updatedList);
  };
  const handleSave = async (id) => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Find the item to be updated
    const itemToUpdate = ExpenseDataNew.find((item) => item.id === id);

    try {
      // PUT request to update the data
      const response = await fetch(
        `https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/configs/expenses/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(itemToUpdate),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else if (response.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Updated Successfully"}
            message={"Data has been updated successfully"}
          />
        ));
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleDelete = async (deleteURL) => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming you store your token in localStorage

      // First, send a DELETE request
      const deleteResponse = await fetch(
        `https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/configs/expenses/${deleteURL}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the item");
      } else if (deleteResponse.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Deleted Successfully"}
            message={"The item has been deleted successfully"}
          />
        ));
      }

      // After deletion, fetch the updated data list
      const getResponse = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/configs/expenses",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!getResponse.ok) {
        throw new Error("Failed to fetch updated data");
      }

      const updatedData = await getResponse.json();

      setExpenseDataNew(updatedData.expenses); // Assuming you have a state or function like this to update your UI
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
        <div className="flex gap-4 items-end mt-5 border-b border-gray-300 pb-5">
          <div className="relative">
            <label
              htmlFor="expensesName"
              className=" bg-white px-1 text-xs text-gray-900"
            >
              Expenses
            </label>
            <input
              type="text"
              name="expensesName"
              // id={`expense_${item.id}`}
              value={expensesName}
              onChange={(e) => setExpensesName(e.target.value)}
              className="block w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Food and Living"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="dependantType"
              className=" bg-white px-1 text-xs text-gray-900"
            >
              Type
            </label>
            <Select
              className="w-64"
              options={typeOptions}
              // id={`type_${item.id}`}
              name="dependantType"
              value={dependantType}
              onChange={(selectedOption) => setDependantType(selectedOption)}
              isSearchable={false}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="expensesFrequency"
              className=" bg-white px-1 text-xs text-gray-900"
            >
              Expenses Frequency
            </label>
            <Select
              className="w-64"
              options={frequencyOptions}
              // id={`frequency_${item.id}`}
              name="expensesFrequency"
              value={expensesFrequency}
              onChange={(selectedOption) =>
                setExpensesFrequency(selectedOption)
              }
              isSearchable={false}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="bareMinimum"
              className=" bg-white px-1 text-xs text-gray-900"
            >
              Bare Minimum Expense Per Person
            </label>
            <input
              type="text"
              name="bareMinimum"
              // id={`minExpense_${item.id}`}
              value={bareMinimum}
              onChange={(e) => setBareMinimum(e.target.value)}
              className="block w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="200"
            />
          </div>
        </div>
        {(ExpenseDataNew.length === 0
          ? ExpenseData.expenses
          : ExpenseDataNew
        ).map((expdata) => (
          <div key={expdata.id} className="flex gap-4 items-end mt-5">
            <div className="relative">
              <label
                htmlFor={`expense_${expdata.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Expenses
              </label>
              <input
                type="text"
                name="expensesName"
                id={`expense_${expdata.id}`}
                value={expdata.expensesName}
                onChange={(e) => handleChange(e, expdata.id)}
                className="block w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Food and Living"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`type_${expdata.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Type
              </label>
              <Select
                className="w-64"
                options={typeOptions}
                id={`type_${expdata.id}`}
                name="dependantType"
                value={typeOptions.find(
                  (option) => option.value === expdata.dependantType
                )}
                onChange={(selectedOption) =>
                  handleDDChange("dependantType", selectedOption, expdata.id)
                }
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`frequency_${expdata.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Expenses Frequency
              </label>
              <Select
                className="w-64"
                options={frequencyOptions}
                id={`frequency_${expdata.id}`}
                name="expensesFrequency"
                value={frequencyOptions.find(
                  (option) => option.value === expdata.expensesFrequency
                )}
                onChange={(selectedOption) =>
                  handleDDChange(
                    "expensesFrequency",
                    selectedOption,
                    expdata.id
                  )
                }
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`minExpense_${expdata.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Bare Minimum Expense Per Person
              </label>
              <input
                type="text"
                name="bareMinimum"
                id={`minExpense_${expdata.id}`}
                value={expdata.bareMinimum}
                onChange={(e) => handleChange(e, expdata.id)}
                className="block w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="200"
              />
            </div>
            <button
              onClick={() => handleSave(expdata.id)}
              type="button"
              className="w-9 h-9 rounded-md bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => handleDelete(expdata.id)}
              type="button"
              className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default BareMinimumExp;
