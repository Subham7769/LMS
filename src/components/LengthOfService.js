import { useEffect, useState } from "react";
import InequalityNumber from "./InequalityNumber";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "./Toasts";

const LengthofService = ({
  LOSData,
  operatorOptions,
  LOSOperators,
  fetchData,
  projectId,
}) => {
  const [firstLengthOfServiceOperator, setfirstLengthOfServiceOperator] =
    useState([]);
  const [secondLengthOfServiceOperator, setsecondLengthOfServiceOperator] =
    useState([]);
  const [LOSInputList, setLOSInputList] = useState([]);
  const [firstLengthOfService, setfirstLengthOfService] = useState("");
  const [secondLengthOfService, setsecondLengthOfService] = useState("");
  const [point, setpoint] = useState("");

  useEffect(() => {
    if (LOSData.length === 0) {
      console.log("Fetching Data");
    } else {
      setLOSInputList(LOSData);
      const formattedfirstLengthOfServiceOperator = {
        value: LOSOperators?.firstLengthOfServiceOperator,
        label: LOSOperators?.firstLengthOfServiceOperator,
      };
      const formattedsecondLengthOfServiceOperator = {
        value: LOSOperators?.secondLengthOfServiceOperator,
        label: LOSOperators?.secondLengthOfServiceOperator,
      };
      setfirstLengthOfServiceOperator(formattedfirstLengthOfServiceOperator);
      setsecondLengthOfServiceOperator(formattedsecondLengthOfServiceOperator);
    }
  }, [LOSData]);

  const token = localStorage.getItem("authToken");
  const API_URL =
    "https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/length-of-service-point-rule";
  const handleAddFields = async () => {
    const token = localStorage.getItem("authToken");
    const postData = {
      operators: {
        firstLengthOfServiceOperator: firstLengthOfServiceOperator.value,
        secondLengthOfServiceOperator: secondLengthOfServiceOperator.value,
      },
      lengthOfServiceRules: [
        {
          firstLengthOfService: firstLengthOfService,
          secondLengthOfService: secondLengthOfService,
          point: point,
          projectId: projectId,
          ruleName: "0",
          fieldType: "Employer",
        },
      ],
    };

    try {
      const postResponse = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/length-of-service-point-rule",
        {
          method: "POST",
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
            message={"The item has been added successfully"}
          />
        ));
      }
      fetchData();
      setfirstLengthOfService("");
      setsecondLengthOfService("");
      setpoint("");
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...LOSInputList];
    list[index][name] = value;
    setLOSInputList(list);
  };
  const handleDelete = async (ruleName) => {
    try {
      const response = await fetch(`${API_URL}/${ruleName}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Delete request failed");
      } else if (response.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Delete Successful"}
            message={"The item was deleted successfully"}
          />
        ));
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");

    const postData = {
      operators: {
        firstLengthOfServiceOperator: firstLengthOfServiceOperator.value,
        secondLengthOfServiceOperator: secondLengthOfServiceOperator.value,
      },
      lengthOfServiceRules: LOSInputList,
    };
    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/length-of-service-point-rule",
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
      // Refresh the data after a successful update
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600 my-7">
        <div className="flex items-center justify-between ">
          <div className="text-lg">Length of Service</div>
          <button
            onClick={handleAddFields}
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex gap-8 mt-2 items-end border-b border-gray-300 pb-6 mb-6">
          <div className="mb-3">
            <label htmlFor="firstLengthOfService" className="block">
              Minimum Length Of Service:
            </label>
            <div className="flex gap-4">
              <Select
                className="min-w-20"
                options={operatorOptions}
                value={firstLengthOfServiceOperator}
                onChange={(firstLengthOfServiceOperator) =>
                  setfirstLengthOfServiceOperator(firstLengthOfServiceOperator)
                }
                isSearchable={false}
              />
              <input
                type="number"
                name="firstLengthOfService"
                id="firstLengthOfService"
                value={firstLengthOfService}
                onChange={(e) => setfirstLengthOfService(e.target.value)}
                placeholder={"1"}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="secondLengthOfService" className="block">
              Maximum Length Of Service:
            </label>
            <div className="flex gap-4">
              <Select
                className="min-w-20"
                options={operatorOptions}
                value={secondLengthOfServiceOperator}
                onChange={(secondLengthOfServiceOperator) =>
                  setsecondLengthOfServiceOperator(
                    secondLengthOfServiceOperator
                  )
                }
                isSearchable={false}
              />
              <input
                type="number"
                name="secondLengthOfService"
                id="secondLengthOfService"
                value={secondLengthOfService}
                onChange={(e) => setsecondLengthOfService(e.target.value)}
                placeholder={"4"}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="point" className="block">
              Point
            </label>
            <input
              type="number"
              name="point"
              value={point}
              onChange={(e) => setpoint(e.target.value)}
              className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.4"
            />
          </div>
        </div>
        {LOSInputList.map((item, index) => (
          <div key={index} className="flex gap-8 mt-2 items-end">
            <div className="mb-3">
              <label htmlFor="firstLengthOfService" className="block">
                Minimum Length Of Service:
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={firstLengthOfServiceOperator}
                  onChange={(firstLengthOfServiceOperator) =>
                    setfirstLengthOfServiceOperator(
                      firstLengthOfServiceOperator
                    )
                  }
                  isSearchable={false}
                />
                <input
                  type="number"
                  name="firstLengthOfService"
                  id="firstLengthOfService"
                  value={item.firstLengthOfService}
                  onChange={(e) => handleChange(e, index)}
                  placeholder={"1"}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="secondLengthOfService" className="block">
                Maximum Length Of Service:
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={secondLengthOfServiceOperator}
                  onChange={(secondLengthOfServiceOperator) =>
                    setsecondLengthOfServiceOperator(
                      secondLengthOfServiceOperator
                    )
                  }
                  isSearchable={false}
                />
                <input
                  type="number"
                  name="secondLengthOfService"
                  id="secondLengthOfService"
                  value={item.secondLengthOfService}
                  onChange={(e) => handleChange(e, index)}
                  placeholder={"4"}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="point" className="block">
                Point
              </label>
              <input
                type="number"
                name="point"
                value={item.point}
                onChange={(e) => handleChange(e, index)}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.4"
              />
            </div>
            <button
              onClick={() => handleDelete(item.ruleName)}
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
            onClick={handleSave}
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

export default LengthofService;
