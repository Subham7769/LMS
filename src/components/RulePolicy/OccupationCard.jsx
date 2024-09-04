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

import toast from "react-hot-toast";
import { Passed } from "../Toasts";

const OccupationCard = ({ occupationData }) => {
  const { rulePolicyId } = useParams();
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const { occupationFormData } = useSelector((state) => state.rulePolicy);

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

  console.log(occupationData);

  useEffect(() => {
    if (tags.length > 0) {
      dispatch(setOccupationFormData({ name: "tags", value: tags }));
    }
  }, [tags, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setOccupationFormData({ name, value, rulePolicyId }));
  };

  const addTag = async () => {
    if (occupationFormData.occupation) {
      if (isSimilarTag(occupationFormData.occupation)) {
        alert("occupation already exists");
        return;
      }

      // Extract the latest values from formData
      const { occupation, points, ruleName, rulePolicyTempId, fieldType } =
        occupationFormData;

      dispatch(
        setOccupationFormData({
          name: "tags",
          value: [
            ...tags,
            { occupation, points, ruleName, rulePolicyTempId, fieldType },
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
            point: points,
          },
        ],
      };

      try {
        await dispatch(addOccupationTagRule(occupationPostData)).unwrap();
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Added Successfully"}
            message={"The item has been added successfully"}
          />
        ));
        dispatch(fetchRulePolicyData(rulePolicyId));
      } catch (error) {
        console.error("Failed to update data:", error);
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
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Delete Successful"}
          message={"The item was deleted successfully"}
        />
      ));
      dispatch(fetchRulePolicyData(rulePolicyId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ContainerTile>
        <div className="text-lg mb-3">Occupation</div>
        <TagInput
          formData={occupationFormData}
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
