import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TagInput from "../TagInput/TagInput";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import {
  addCityTagRule,
  deleteCityTagRule,
  fetchRulePolicyData,
  setCityFormData,
} from "../../redux/Slices/rulePolicySlice";
import { validateForm } from "../../redux/Slices/validationSlice";

import { toast } from "react-toastify";
import store from "../../redux/store";

const CityCard = ({ cityData, loading, error }) => {
  const { rulePolicyId } = useParams();
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const { cityFormData } = useSelector((state) => state.rulePolicy);

  useEffect(() => {
    if (cityData) {
      console.log("Entered here");
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

  useEffect(() => {
    // if (tags.length > 0) {
    dispatch(setCityFormData({ name: "tags", value: tags }));
    // }
  }, [tags, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCityFormData({ name, value, rulePolicyId }));
  };

  const addTag = async () => {
    await dispatch(validateForm(cityFormData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      if (cityFormData.city) {
        if (isSimilarTag(cityFormData.city)) {
          toast.warn("city already exists");
          return;
        }

        // Extract the latest values from formData
        const { city, points, ruleName, rulePolicyTempId, fieldType } =
          cityFormData;

        dispatch(
          setCityFormData({
            name: "tags",
            value: [
              ...tags,
              { city, points, ruleName, rulePolicyTempId, fieldType },
            ],
          })
        );

        const cityPostData = {
          cityRules: [
            {
              ruleName: "0",
              fieldType: "Employer",
              rulePolicyTempId: rulePolicyTempId,
              cityName: city,
              point: points,
            },
          ],
        };

        try {
          await dispatch(addCityTagRule(cityPostData)).unwrap();
          dispatch(fetchRulePolicyData(rulePolicyId));
        } catch (error) {
          console.error("Failed to update data:", error);
        }
      }
    }
  };

  const isSimilarTag = (city) => {
    return cityFormData.tags.some((tag) => tag.city === city);
  };

  const deleteTag = async (tagToDelete) => {
    dispatch(
      setCityFormData({
        name: "tags",
        value: cityFormData.tags.filter((tag) => tag !== tagToDelete),
      })
    );

    // Extract the latest values from formData
    const tagToDeleteRuleName = tagToDelete.ruleName;

    try {
      await dispatch(
        deleteCityTagRule({ rulePolicyId, tagToDeleteRuleName })
      ).unwrap();
      dispatch(fetchRulePolicyData(rulePolicyId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContainerTile className={"w-full"} loading={loading} error={error}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg">City</div>
      </div>
      <TagInput
        formData={cityFormData}
        handleChange={handleChange}
        inputTextName={"city"}
        inputTextLabel={"Add City"}
        addTag={addTag}
        deleteTag={deleteTag}
        inputNumberName={"points"}
        inputNumberLabel={"Add Points"}
        isValidation={true}
        isValidation2={true}
      />
    </ContainerTile>
  );
};

export default CityCard;
