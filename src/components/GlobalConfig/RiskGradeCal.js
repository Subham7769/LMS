import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import useGlobalConfig from "../utils/useGlobalConfig";
const RiskGradeCal = () => {
  const [RiskGradeDataNew, setRiskGradeDataNew] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [grade, setGrade] = useState("");
  const [inputList, setInputList] = useState([
    {
      id: 1,
      from: "",
      to: "",
      riskGrade: "",
    },
  ]);
  const url = "risk-gradings";
  const RiskGradeData = useGlobalConfig(url);
  if (RiskGradeData.length === 0) {
    return (
      <>
        <div>Fetching Data</div>
      </>
    );
  }
  const handleAddFields = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      // You need to define the structure of the data you are posting
      // For example:
      id: Date.now(),
      from: from,
      to: to,
      grade: grade,
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/configs/risk-gradings/add",
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
      }

      // If the POST was successful, make a GET request to fetch the updated data
      const getResponse = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/configs/risk-gradings",
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
      setRiskGradeDataNew(updatedData); // Replace 'setYourStateHere' with your actual state update function
      setFrom("");
      setTo("");
      setGrade("");
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const currentItem = (
      RiskGradeDataNew.length === 0 ? RiskGradeData : RiskGradeDataNew
    ).find((item) => item.id === id);
    console.log(currentItem);
    if (!currentItem) {
      console.error("Item not found!");
      return; // Handle error appropriately
    }
    const updatedData = {
      ...currentItem, // Spread all existing data
      [name]: value, // Use computed property names to set the key dynamically
    };
    console.log(updatedData);
    // const list = [...inputList];
    // const index = list.findIndex((item) => item.id === id);
    // list[index][name] = value;
    // setInputList(list);
  };
  const handleDelete = async (deleteURL) => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming you store your token in localStorage

      // First, send a DELETE request
      const deleteResponse = await fetch(
        `https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/configs/risk-gradings/${deleteURL}`,
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
      }

      // After deletion, fetch the updated data list
      const getResponse = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/configs/risk-gradings",
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
      setRiskGradeDataNew(updatedData); // Assuming you have a state or function like this to update your UI
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
    }
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
        <div className="flex gap-10 mt-2 items-end">
          <div className="mb-3">
            <div className="flex gap-3">
              <div className="relative">
                <label
                  htmlFor="from"
                  className="absolute z-[2] -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
                >
                  From
                </label>
                <input
                  type="number"
                  name="from"
                  // id={`from_${item.id}`}
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="10"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="to"
                  className="absolute z-[2] -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
                >
                  To
                </label>
                <input
                  type="number"
                  name="to"
                  // id={`to_${item.id}`}
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="30"
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="grade"
              // id={`riskGrade_${item.id}`}
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="R1"
            />
          </div>
        </div>
        {(RiskGradeDataNew.length === 0 ? RiskGradeData : RiskGradeDataNew).map(
          (rgdata) => (
            <div key={rgdata.id} className="flex gap-10 mt-2 items-end">
              <div className="mb-3">
                <div className="flex gap-3">
                  <div className="relative">
                    <label
                      htmlFor={`from_${rgdata.id}`}
                      className="absolute z-[2] -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
                    >
                      From
                    </label>
                    <input
                      type="number"
                      name="from"
                      id={`from_${rgdata.id}`}
                      value={rgdata.from}
                      onChange={(e) => handleChange(e, rgdata.id)}
                      className="block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="10"
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor={`to_${rgdata.id}`}
                      className="absolute z-[2] -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
                    >
                      To
                    </label>
                    <input
                      type="number"
                      name="to"
                      id={`to_${rgdata.id}`}
                      value={rgdata.to}
                      onChange={(e) => handleChange(e, rgdata.id)}
                      className="block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="30"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="grade"
                  id={`grade_${rgdata.id}`}
                  value={rgdata.grade}
                  onChange={(e) => handleChange(e, rgdata.id)}
                  className="block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="R1"
                />
              </div>
              <button
                onClick={() => handleDelete(rgdata.id)}
                type="button"
                className="mb-3 w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )
        )}
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
