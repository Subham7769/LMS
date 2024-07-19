import { useState, useEffect } from "react";
import { Passed } from "../components/Toasts";
import toast from "react-hot-toast";

const useCityFormState = (initialState, City, fetchData) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    setFormData((prevState) => ({ ...prevState, name: City }));
  }, [City]);

  //   console.log(fetchData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const addTag = async () => {
    if (formData.city) {
      if (isSimilarTag(formData.city)) {
        alert("city already exists");
        return;
      }

      // Extract the latest values from formData
      const { city, points, ruleName, rulePolicyTempId, fieldType } = formData;

      // Update formData with the new tag
      setFormData((prevState) => ({
        ...prevState,
        tags: [
          ...prevState.tags,
          {
            city,
            points,
            ruleName,
            rulePolicyTempId: rulePolicyTempId,
            fieldType,
          },
        ],
        city: "",
        points: "",
        ruleName: "0",
        rulePolicyId: prevState.rulePolicyTempId,
        fieldType: "Employer",
      }));

      const token = localStorage.getItem("authToken");
      const postData = {
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
        const postResponse = await fetch(
          "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/city-point-rule",
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

  const isSimilarTag = (city) => {
    return formData.tags.some((tag) => tag.city === city);
  };

  const deleteTag = async (tagToDelete) => {
    setFormData((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter((tag) => tag !== tagToDelete),
    }));

    // Extract the latest values from formData
    const { rulePolicyTempId } = formData;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp/${rulePolicyTempId}/city-point-rule/${tagToDelete.ruleName}`,
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

  return { formData, handleChange, addTag, deleteTag, setFormData };
};

export default useCityFormState;
