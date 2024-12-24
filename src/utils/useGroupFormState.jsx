import { useState, useEffect } from 'react';

const useGroupFormState = (initialState, groupName) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    setFormData((prevState) => ({ ...prevState, name: groupName }));
  }, [groupName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const addTag = () => {
    if (formData.product) {
      if (isSimilarTag(formData.product)) {
        alert("Product already exists");
        return;
      }

      setFormData((prevState) => ({
        ...prevState,
        tags: [...prevState.tags, { product: prevState.product, limit: prevState.limit }],
        product: "",
        limit: "",
        selectedOption: null,
      }));
    }
  };

  const isSimilarTag = (product) => {
    return formData.tags.some(tag => tag.product === product);
  };

  const deleteTag = (tagToDelete) => {
    setFormData((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter(tag => tag !== tagToDelete),
    }));
  };

  return { formData, handleChange, addTag, deleteTag, setFormData };
};

export default useGroupFormState;
