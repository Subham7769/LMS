import { useEffect, useState } from "react";
import { PlusIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import useOccupationFormState from "../../utils/useOccupationFormState";
import TagInput from "../TagInput/TagInput";

const OccupationCard = ({ occupationData, fetchData }) => {
  const { rulePolicyId } = useParams();
  const [tags, setTags] = useState([]);

  const addTags = async () => {
    if (tagValue) {
      setTags([...tags, tagValue]);
      setTagValue({
        occupation: "",
        points: "",
        ruleName: "0",
        rulePolicyTempId: rulePolicyId,
        fieldType: "Employer",
      });
      const token = localStorage.getItem("authToken");
      const postData = {
        employmentSectorRules: [
          {
            ruleName: "0",
            fieldType: "Employer",
            rulePolicyTempId: rulePolicyId,
            employmentSectorName: tagValue.occupation,
            point: tagValue.points,
          },
        ],
      };

      try {
        const postResponse = await fetch(
          "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/employment-sector-point-rule",
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
          .filter((data) => data.rulePolicyTempId === rulePolicyId)
          .map((data) => ({
            occupation: data.employmentSectorName,
            points: data.point,
            ruleName: data.ruleName,
            rulePolicyTempId: data.rulePolicyTempId,
            fieldType: data.fieldType,
          }))
      );
    }
  }, [occupationData, rulePolicyId]);

  const {
    formData,
    handleChange,
    addTag,
    deleteTag,
    setFormData,
  } = useOccupationFormState(
    {
      name: "",
      occupation: "",
      points: "",
      ruleName: "0",
      rulePolicyTempId: rulePolicyId,
      fieldType: "Employer",
      tags: [],
    },
    "Occupation",
    fetchData
  );

  useEffect(() => {
    if (tags.length > 0) {
      setFormData((prevState) => ({ ...prevState, tags: tags }));
    }
  }, [tags, setFormData]);

  const deleteTags = async (value) => {
    console.log(value);
    const remainTags = tags.filter((t) => t !== value);
    setTags(remainTags);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp/${rulePolicyId}/employment-sector-point-rule/${value.ruleName}`,
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
        <TagInput
          formData={formData}
          handleChange={handleChange}
          inputTextName={"occupation"}
          inputTextLabel={"Add Occupation"}
          addTag={addTag}
          deleteTag={deleteTag}
          inputNumberName={"points"}
          inputNumberLabel={"Add Points"}
        />
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
