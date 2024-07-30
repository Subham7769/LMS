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

  const { formData, handleChange, addTag, deleteTag, setFormData } =
    useCityFormState(
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
      </div>
    </>
  );
};

export default CityCard;
