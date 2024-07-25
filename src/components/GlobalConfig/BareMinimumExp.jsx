import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import useGlobalConfig from "../../utils/useGlobalConfig";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import Button from "../Common/Button/Button";
import { typeOptions, frequencyOptions } from "../../data/OptionsData";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelectNew from "../Common/DynamicSelect/InputSelect";
import InputSelect from "../Common/InputSelect/InputSelect";

const BareMinimumExp = () => {
  const [ExpenseDataNew, setExpenseDataNew] = useState([]);
  const [formData, setFormData] = useState({
    expensesName: "",
    expensesFrequency: "",
    bareMinimum: "",
    dependantType: "",
  });

  const url = "expenses";
  const ExpenseData = useGlobalConfig(url);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleAddFields = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/expenses/add",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
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
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/expenses",
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
      setFormData({
        expensesName: "",
        expensesFrequency: "",
        bareMinimum: "",
        dependantType: "",
      });
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleChange = (e, id, propName = null, selectedOption = null) => {
    let name, value;

    if (e) {
      // Handling input change
      ({ name, value } = e.target);
    } else if (propName && selectedOption) {
      // Handling dropdown change
      name = propName;
      value = selectedOption.value;
    }

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

  const handleSave = async (id) => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Find the item to be updated
    const itemToUpdate = ExpenseDataNew.find((item) => item.id === id);

    try {
      // PUT request to update the data
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/expenses/${id}`,
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
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/expenses/${deleteURL}`,
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
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/expenses",
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
    }
  };
  if (ExpenseData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="mb-6">
        <b
          title="Bare Minimum Expenses"
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          Bare Minimum Expenses
        </b>
      </h2>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="grid grid-cols-5 gap-4 items-end border-b border-gray-300 pb-5">
          <InputText
            labelName="Expenses"
            inputName="expensesName"
            inputValue={formData.expensesName}
            onChange={handleInputChange}
            placeHolder="Food and Living"
          />
          <InputSelect
            labelName="Type"
            inputOptions={typeOptions}
            inputName="dependantType"
            inputValue={formData.dependantType}
            onChange={handleInputChange}
            searchable={false}
          />
          <InputSelect
            labelName="Expenses Frequency"
            inputOptions={frequencyOptions}
            inputName="expensesFrequency"
            inputValue={formData.expensesFrequency}
            onChange={handleInputChange}
            searchable={false}
          />
          <InputNumber
            labelName="Bare Min Expense Per Person"
            inputName="bareMinimum"
            inputValue={formData.bareMinimum}
            onChange={handleInputChange}
            placeHolder="200"
          />
          <Button
            buttonIcon={PlusIcon}
            onClick={handleAddFields}
            circle={true}
          />
        </div>
        {(ExpenseDataNew.length === 0
          ? ExpenseData.expenses
          : ExpenseDataNew
        ).map((expdata) => (
          <div
            key={expdata.id}
            className="grid grid-cols-5 gap-4 items-end mt-5"
          >
            <InputText
              labelName="Expenses"
              inputName="expensesName"
              id={`expense_${expdata.id}`}
              inputValue={expdata.expensesName}
              onChange={(e) => handleChange(e, expdata.id)}
              placeHolder="Food and Living"
            />
            <InputSelectNew
              labelName="Type"
              inputOptions={typeOptions}
              id={`type_${expdata.id}`}
              inputName="dependantType"
              inputValue={expdata.dependantType}
              onChange={(selectedOption) =>
                handleChange(null, expdata.id, "dependantType", selectedOption)
              }
              searchable={false}
            />
            <InputSelectNew
              labelName="Expenses Frequency"
              inputOptions={frequencyOptions}
              id={`frequency_${expdata.id}`}
              inputName="expensesFrequency"
              inputValue={expdata.expensesFrequency}
              onChange={(selectedOption) =>
                handleChange(
                  null,
                  expdata.id,
                  "expensesFrequency",
                  selectedOption
                )
              }
              searchable={false}
            />
            <InputNumber
              labelName="Bare Min Expense Per Person"
              inputName="bareMinimum"
              inputId={`minExpense_${expdata.id}`}
              inputValue={expdata.bareMinimum}
              onChange={(e) => handleChange(e, expdata.id)}
              placeHolder="200"
            />
            <div className="flex items-center gap-4">
              <Button
                buttonIcon={CheckCircleIcon}
                onClick={() => handleSave(expdata.id)}
                circle={true}
              />
              <Button
                buttonIcon={TrashIcon}
                onClick={() => handleDelete(expdata.id)}
                circle={true}
                className={
                  "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
                }
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BareMinimumExp;
