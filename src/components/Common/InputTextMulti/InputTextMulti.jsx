import React, { useState } from 'react';
import { removeTag } from '../../../redux/Slices/DynamicRacSlice';
import { useDispatch } from 'react-redux';

const InputTextMulti = ({ label, tag, setTag,sectionId, fieldId }) => {
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
    <div className="w-full my-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      <div className="border gap-2 border-gray-300 rounded-md p-2 flex flex-col flex-wrap items-between">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddTag} // Handle key down events
          placeholder="Type and press Enter"
          className="flex-grow border-0 focus:outline-none p-1"
        />
        {tag.length > 0 &&
          <div className="border border-gray-300 rounded-md p-2 flex flex-wrap items-center">
            {tag.map((tagItem, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white rounded-full px-3 py-1 m-1 flex items-center"
              >
                {tagItem}
                <button
                  onClick={() => handleDeleteTag(tagItem)}
                  className="ml-2 text-white hover:text-gray-300 focus:outline-none"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default InputTextMulti;
