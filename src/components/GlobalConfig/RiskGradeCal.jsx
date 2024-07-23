import { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";

const RiskGradeCal = () => {
  const token = localStorage.getItem("authToken");
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newForm, setNewForm] = useState({
    id: Date.now(),
    from: "",
    to: "",
    grade: "",
  });

  const handleNewInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setNewForm((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setNewForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/risk-gradings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const json = await data.json();
      setAllData(json);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddFields = async () => {
    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/risk-gradings/add",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newForm),
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
        setNewForm({
          id: Date.now(),
          from: "",
          to: "",
          grade: "",
        });
        fetchData();
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;

    setAllData((prevAllData) =>
      prevAllData.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSave = async (id) => {
    const itemToUpdate = allData.find((item) => item.id === id);

    try {
      // PUT request to update the data
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/risk-gradings/${id}`,
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
        fetchData();
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleDelete = async (deleteURL) => {
    try {
      const deleteResponse = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/risk-gradings/${deleteURL}`,
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
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="mb-6">
        <b
          title="Risk Grading Calculation"
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          Risk Grading Calculation
        </b>
      </h2>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600 my-7">
        <div className="flex gap-10 mt-2 items-end border-b border-gray-300 pb-5">
          <div className="mb-3">
            <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-4">
              <div className="relative">
                <InputNumber
                  labelName="From"
                  inputName="from"
                  inputValue={newForm.from}
                  onChange={handleNewInputChange}
                  placeHolder="10"
                />
              </div>
              <div className="relative">
                <InputNumber
                  labelName="To"
                  inputName="to"
                  inputValue={newForm.to}
                  onChange={handleNewInputChange}
                  placeHolder="30"
                />
              </div>
              <div className="relative">
                <InputText
                  labelName="Risk Grade"
                  inputName="grade"
                  inputValue={newForm.grade}
                  onChange={handleNewInputChange}
                  placeHolder="R1"
                />
              </div>
              <div className="relative mt-5">
                <button
                  onClick={handleAddFields}
                  type="button"
                  className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {allData.map((rgdata) => (
          <div key={rgdata.id} className="flex gap-10 mt-2 items-end">
            <div className="mb-3">
              <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-4">
                <div className="relative">
                  <InputNumber
                    labelName="From"
                    inputName="from"
                    inputValue={rgdata.from}
                    onChange={(e) => handleChange(e, rgdata.id)}
                  />
                </div>
                <div className="relative">
                  <InputNumber
                    labelName="To"
                    inputName="to"
                    inputValue={rgdata.to}
                    onChange={(e) => handleChange(e, rgdata.id)}
                  />
                </div>
                <div className="relative">
                  <InputText
                    labelName="Risk Grade"
                    inputName="grade"
                    inputValue={rgdata.grade}
                    onChange={(e) => handleChange(e, rgdata.id)}
                  />
                </div>
                <div className="relative flex items-center gap-4">
                  <button
                    onClick={() => handleSave(rgdata.id)}
                    type="button"
                    className="mt-4 w-9 h-9 rounded-md bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleDelete(rgdata.id)}
                    type="button"
                    className="mt-4 w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RiskGradeCal;
