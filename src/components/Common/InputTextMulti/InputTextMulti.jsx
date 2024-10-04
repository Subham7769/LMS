import React, { useState } from 'react';
import { removeTag } from '../../../redux/Slices/DynamicRacSlice';
import { useDispatch } from 'react-redux';

const InputTextMulti = ({ label, tag, setTag, disabled, sectionId, fieldId }) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleDeleteTag = (tagToDelete) => {
    setTag(tag.filter(existingTag => existingTag !== tagToDelete)); // Update local state
    dispatch(removeTag({ sectionId, fieldId, tagToRemove: tagToDelete })); // Dispatch to Redux
  };

  const handleAddTag = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !tag.includes(trimmedValue)) {
        setTag([...tag, trimmedValue]); // Add new tag if it's valid
        setInputValue(''); // Reset input value after adding tag
      }
    }
  };
  

  return (
    <div className="w-full">
      <label className={`block text-gray-700" px-1 text-[14px]`}>{label}</label>

      <div className="border gap-2 border-gray-300 rounded-md flex flex-col flex-wrap items-between">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddTag} // Handle key down events
          placeholder="Type and press Enter"
          className={`block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset ring-gray-300 focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200`}
          style={{
            appearance: "none", // General rule for most modern browsers
          }}
          disabled={disabled}
        />
      </div>
      {tag.length > 0 && !disabled &&
        <div className="flex flex-wrap items-center">
          {tag.map((tagItem, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white text-[14px] rounded-full px-3 py-1 m-1 flex items-center"
            >
              {tagItem}
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent default form submission behavior
                  handleDeleteTag(tagItem);
                }}
                className="ml-2 text-white hover:text-gray-300 focus:outline-none"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      }
    </div>
  );
};

export default InputTextMulti;
