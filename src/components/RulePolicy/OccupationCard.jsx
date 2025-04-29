import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TagInput from "../TagInput/TagInput";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import {
  addOccupationTagRule,
  deleteOccupationTagRule,
  fetchRulePolicyData,
  setOccupationFormData,
} from "../../redux/Slices/rulePolicySlice";
import { validateForm } from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { toast } from "react-toastify";
import { hasViewOnlyAccess } from "../../utils/roleUtils";

const OccupationCard = ({ occupationData, loading, error }) => {
  const { rulePolicyId } = useParams();
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const { occupationFormData } = useSelector((state) => state.rulePolicy);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    if (occupationData) {
      setTags(
        occupationData
          .filter((data) => data.rulePolicyTempId === rulePolicyId)
          .map((data) => ({
            occupation: data.employmentSectorName,
            occpoints: data.point,
            ruleName: data.ruleName,
            rulePolicyTempId: data.rulePolicyTempId,
            fieldType: data.fieldType,
          }))
      );
    }
  }, [occupationData, rulePolicyId]);

  useEffect(() => {
    // if (tags.length > 0) {
    dispatch(setOccupationFormData({ name: "tags", value: tags }));
    // }
  }, [tags, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(setOccupationFormData({ name, value, rulePolicyId }));
    }
  };

  const addTag = async () => {
    await dispatch(validateForm(occupationFormData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      if (occupationFormData.occupation) {
        if (isSimilarTag(occupationFormData.occupation)) {
          toast.warn("occupation already exists");
          return;
        }

        // Extract the latest values from formData
        const { occupation, occpoints, ruleName, rulePolicyTempId, fieldType } =
          occupationFormData;

        dispatch(
          setOccupationFormData({
            name: "tags",
            value: [
              ...tags,
              { occupation, occpoints, ruleName, rulePolicyTempId, fieldType },
            ],
          })
        );

        const occupationPostData = {
          employmentSectorRules: [
            {
              ruleName: "0",
              fieldType: "Employer",
              rulePolicyTempId: rulePolicyTempId,
              employmentSectorName: occupation,
              point: occpoints,
            },
          ],
        };

        try {
          await dispatch(addOccupationTagRule(occupationPostData)).unwrap();
          dispatch(fetchRulePolicyData(rulePolicyId));
        } catch (error) {
          console.error("Failed to update data:", error);
        }
      }
    }
  };

  const isSimilarTag = (occupation) => {
    return occupationFormData.tags.some((tag) => tag.occupation === occupation);
  };

  const deleteTag = async (tagToDelete) => {
    dispatch(
      setOccupationFormData({
        name: "tags",
        value: occupationFormData.tags.filter((tag) => tag !== tagToDelete),
      })
    );

    // Extract the latest values from formData
    const tagToDeleteRuleName = tagToDelete.ruleName;

    try {
      await dispatch(
        deleteOccupationTagRule({ rulePolicyId, tagToDeleteRuleName })
      ).unwrap();
      dispatch(fetchRulePolicyData(rulePolicyId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContainerTile className={"p-5"} loading={loading} error={error}>
      <div className="text-lg mb-3">Occupation</div>
      <TagInput
        formData={occupationFormData}
        handleChange={handleChange}
        inputTextName={"occupation"}
        inputTextLabel={"Add Occupation"}
        addTag={addTag}
        deleteTag={deleteTag}
        inputNumberName={"occpoints"}
        inputNumberLabel={"Add Points"}
        isValidation={true}
        isValidation2={true}
      />
    </ContainerTile>
  );
};

export default OccupationCard;
