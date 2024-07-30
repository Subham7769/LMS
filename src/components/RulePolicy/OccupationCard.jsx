import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useOccupationFormState from "../../utils/useOccupationFormState";
import TagInput from "../TagInput/TagInput";

const OccupationCard = ({ occupationData, fetchData }) => {
  const { rulePolicyId } = useParams();
  const [tags, setTags] = useState([]);

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

  const { formData, handleChange, addTag, deleteTag, setFormData } =
    useOccupationFormState(
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

  return (
    <>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600 w-full">
        <div className="text-lg mb-3">Occupation</div>
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
      </div>
    </>
  );
};

export default OccupationCard;
