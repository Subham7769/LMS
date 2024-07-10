import React from 'react';
import { PlusIcon, XCircleIcon } from '@heroicons/react/20/solid';
import Button from '../Common/Button/Button';
import InputSelect from '../Common/InputSelect/InputSelect';
import InputNumber from '../Common/InputNumber/InputNumber';

const TagInput = ({ formData, handleChange, addTag, deleteTag, productTypeOptions }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <InputSelect
        labelName={"Add Products"}
        inputName={"product"}
        inputOptions={productTypeOptions}
        inputValue={formData.selectedOption}
        onChange={handleChange}
      />
      <InputNumber
        labelName={"Max Product Limit"}
        inputName={"limit"}
        inputValue={formData.limit}
        onChange={handleChange}
        placeHolder={"2"}
      />
      <div className="flex justify-center md:justify-start items-center">
        <Button buttonIcon={PlusIcon} onClick={addTag} circle={true} />
      </div>
    </div>
    <div className="flex flex-wrap">
      {formData.tags.map((tag, index) => (
        <div key={index} className="bg-yellow-400 m-2 p-2 rounded-md flex items-center gap-2">
          <button className="mr-1 cursor-auto">{tag.product} | {tag.limit}</button>
          <XCircleIcon onClick={() => deleteTag(tag)} className="block h-5 w-5 cursor-pointer" aria-hidden="true" />
        </div>
      ))}
    </div>
  </>
);

export default TagInput;
