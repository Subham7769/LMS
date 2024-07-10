import React, { useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useParams, useLocation } from 'react-router-dom';
import { productTypeOptions } from '../../data/OptionsData';
import Button from '../Common/Button/Button';
import TagInput from '../TagInput/TagInput';
import useGroupFormState from '../../utils/useGroupFormState';

const ProductGroup = () => {
  const { groupName } = useParams();
  const location = useLocation();
  const isNewGroup = groupName === 'newGroup';
  const newGroupName = location.state?.Name || 'New Group';
  console.log("isNewGroup ->" + isNewGroup)
  console.log("groupName ->" + groupName)
  console.log("location.state?.Name ->" + location.state?.Name)


  const { formData, handleChange, handleSelectChange, addTag, deleteTag, setFormData } = useGroupFormState({
    name: isNewGroup ? newGroupName : groupName,
    product: '',
    limit: '',
    tags: [],
    selectedOption: null,
  });

  useEffect(() => {
    if (isNewGroup) {
      setFormData((prevState) => ({ ...prevState, name: newGroupName }));
    } else {
      setFormData((prevState) => ({ ...prevState, name: groupName }));
    }
  }, [groupName, isNewGroup, newGroupName, setFormData]);

  return (
    <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600 w-full mt-5">
      <div className="flex items-center justify-between mb-3 text-lg">{formData.name}</div>
      <TagInput
        formData={formData}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        addTag={addTag}
        deleteTag={deleteTag}
        productTypeOptions={productTypeOptions}
      />
      <div className="text-center md:text-right mt-5">
        <Button buttonIcon={CheckCircleIcon} buttonName="Save" rectangle={true} />
      </div>
    </div>
  );
};

export default ProductGroup;
