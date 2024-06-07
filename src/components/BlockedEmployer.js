import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed } from "./Toasts";
import { useParams } from "react-router-dom";
import LoadingState from "./LoadingState";

const BlockedEmployer = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const { projectId } = useParams();

  async function fetchData() {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/block-employers-rule",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let responseData = await response.json();
      if (response.ok) {
        responseData = responseData.filter(
          (data) => data.projectId === projectId
        );
        setData(responseData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteItem(name, ruleName) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/${ruleName}/block-employers-rule/${name}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Item Deleted"}
            message={"Item has been deleted successfully"}
          />
        ));
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function postItem(e) {
    e.preventDefault();
    const payload = {
      blockEmployerName: name,
      fieldType: "Employer",
      projectId: projectId,
      result: 1,
      ruleName: data[0].ruleName,
    };
    try {
      if (name === "") {
        toast.custom((t) => (
          <Failed
            t={t}
            toast={toast}
            title={"Adding Failed"}
            message={"Cannot post empty data"}
          />
        ));
        return;
      }
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/block-employers-rule`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ blockEmployersRules: [payload] }),
        }
      );
      if (response.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Item Added"}
            message={"Item was added successfully"}
          />
        ));
        fetchData();
        setName("");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (data.length === 0) {
    return <LoadingState />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="flex items-center justify-between ">
          <div className="text-lg uppercase">Blocked Employer</div>
          <button
            type="button"
            onClick={postItem}
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex gap-5 border-b border-gray-300 pb-5">
          <div className="relative">
            <label htmlFor="name" className=" px-1 text-xs text-gray-900">
              Add Blocked Employer
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-[450px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Blocked Employer"
            />
          </div>
        </div>
        {data.map((item, index) => {
          return item.blockEmployersName.map((name, i) => (
            <div key={`${index}-${i}`} className="flex gap-5 items-end mt-5">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  className="block w-[450px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <button
                type="button"
                onClick={() => deleteItem(name, item.ruleName)}
                className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          ));
        })}
      </div>
    </>
  );
};

export default BlockedEmployer;
