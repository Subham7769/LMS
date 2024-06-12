import { useEffect, useState } from "react";
import { PlusIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "./Toasts";

const OccupationCard = ({ occupationData, fetchData }) => {
  const { projectId } = useParams();
  const [tagValue, setTagValue] = useState([
    {
      occupation: "",
      points: "",
      ruleName: "0",
      projectId: projectId,
      fieldType: "Employer",
    },
  ]);
  const [tags, setTags] = useState([]);

  const addTags = async () => {
    if (tagValue) {
      setTags([...tags, tagValue]);
      setTagValue({
        occupation: "",
        points: "",
        ruleName: "0",
        projectId: projectId,
        fieldType: "Employer",
      });
      const token = localStorage.getItem("authToken");
      const postData = {
        employmentSectorRules: [
          {
            ruleName: "0",
            fieldType: "Employer",
            projectId: projectId,
            employmentSectorName: tagValue.occupation,
            point: tagValue.points,
          },
        ],
      };

      try {
        const postResponse = await fetch(
          "http://10.10.10.70:32014/carbon-product-service/xtracash/rules/employment-sector-point-rule",
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
      } catch (error) {
        console.error("Failed to update data:", error);
      }
    }
  };

  useEffect(() => {
    if (occupationData) {
      setTags(
        occupationData
          .filter((data) => data.projectId === projectId)
          .map((data) => ({
            occupation: data.employmentSectorName,
            points: data.point,
            ruleName: data.ruleName,
            projectId: data.projectId,
            fieldType: data.fieldType,
          }))
      );
    }
  }, [occupationData, projectId]);

  const deleteTag = async (value) => {
    console.log(value);
    const remainTags = tags.filter((t) => t !== value);
    setTags(remainTags);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/employment-sector-point-rule/${value.ruleName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  return (
    <>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600 w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg">Occupation</div>
        </div>
        <div className="flex gap-10">
          <div className="mb-3">
            <label htmlFor="occupation" className="block">
              Add Occupation
            </label>
            <input
              type="text"
              name="occupation"
              id="occupation"
              value={tagValue.occupation}
              onChange={(e) =>
                setTagValue({ ...tagValue, occupation: e.target.value })
              }
              className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Occupation"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="occupationPoints" className="block">
              Add Occupation Point
            </label>
            <input
              type="number"
              name="occupationPoints"
              id="occupationPoints"
              value={tagValue.points}
              onChange={(e) =>
                setTagValue({ ...tagValue, points: e.target.value })
              }
              className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.75"
            />
          </div>
          <div className="relative mt-6">
            <button
              onClick={addTags}
              type="button"
              className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          {tags.map((item, index) => {
            return (
              <>
                <div className="bg-yellow-400 m-2 p-2 w-[40%] rounded-md flex items-center justify-between gap-2">
                  <div className="flex-grow flex items-center justify-between gap-2">
                    <div className="flex w-[80%] items-start justify-start">
                      <button
                        key={index}
                        className="mr-1 cursor-auto flex-grow text-left"
                      >
                        <span className="w-full">{item.occupation}</span>
                      </button>
                    </div>
                    <p>|</p>
                    <div className="flex w-[20%] justify-end">
                      <span className="w-[70%] mr-2 text-center">
                        {parseFloat(item.points).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span
                      className="cursor-pointer"
                      onClick={() => deleteTag(item)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        {/* <div className="text-right mt-5">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Save
          </button>
        </div> */}
      </div>
    </>
  );
};

export default OccupationCard;
