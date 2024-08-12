import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useOccupationFormState from "../../utils/useOccupationFormState";
import TagInput from "../TagInput/TagInput";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

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
      <ContainerTile>
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
      </ContainerTile>
    </>
  );
};

export default OccupationCard;
