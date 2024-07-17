import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCityFormState from "../../utils/useCityFormState";
import TagInput from "../TagInput/TagInput";

const CityCard = ({ cityData, fetchData }) => {
  const { rulePolicyId } = useParams();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (cityData) {
      setTags(
        cityData
          .filter((data) => data.rulePolicyTempId === rulePolicyId)
          .map((data) => ({
            city: data.cityName,
            points: data.point,
            ruleName: data.ruleName,
            rulePolicyTempId: data.rulePolicyTempId,
            fieldType: data.fieldType,
          }))
      );
    }
  }, [cityData]);

  const {
    formData,
    handleChange,
    addTag,
    deleteTag,
    setFormData,
  } = useCityFormState(
    {
      name: "",
      city: "",
      points: "",
      ruleName: "0",
      rulePolicyTempId: rulePolicyId,
      fieldType: "Employer",
      tags: [],
    },
    "City",
    fetchData
  );

  useEffect(() => {
    if (tags.length > 0) {
      setFormData((prevState) => ({ ...prevState, tags: tags }));
    }
  }, [tags, setFormData]);

  return (
    <>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600 w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg">City</div>
        </div>
        <TagInput
          formData={formData}
          handleChange={handleChange}
          inputTextName={"city"}
          inputTextLabel={"Add City"}
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

export default CityCard;
