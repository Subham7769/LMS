import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeField, handleChangeNumberField, handleChangeStringField } from '../../redux/Slices/DynamicRacSlice';
import InputNumber from "../Common/InputNumber/InputNumber";
import InputTextMulti from "../Common/InputTextMulti/InputTextMulti";
import { TrashIcon } from '@heroicons/react/20/solid';

const FieldComponent = ({ field, fieldId, isEditorMode, sectionId }) => {
  const dispatch = useDispatch();

  const handleNumberInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(handleChangeNumberField({ sectionId, fieldId, name, value, type, checked }));
  };

  const handleStringInputChange = (newValues) => {
    console.log(newValues)
    dispatch(handleChangeStringField({ sectionId, fieldId, values: newValues })); // Dispatch to Redux
  };

  switch (field?.fieldType) {
    case "NUMBER":
      return (
        <div className="flex justify-between items-center gap-2 ">
          <InputNumber
            labelName={field.name}
            inputName={field.name}
            inputValue={parseInt(field.criteriaValues[0]) || ""}
            onChange={handleNumberInputChange}
            disabled={isEditorMode}
          />
          {isEditorMode && (
            <TrashIcon
              onClick={() => dispatch(removeField({ sectionId, fieldId }))}
              className="h-4 w-4 mt-4 hover:text-red-500 hover:cursor-pointer"
            />
          )}
        </div>
      );

    case "STRING":
      return (
        <div className="flex justify-between items-center gap-2">
          <InputTextMulti
            tag={field?.criteriaValues}
            setTag={(newValues) => handleStringInputChange(newValues)}
            sectionId={sectionId}
            fieldId={fieldId}
          />
          {isEditorMode && (
            <TrashIcon
              onClick={() => dispatch(removeField({ sectionId, fieldId }))}
              className="h-4 w-4 mt-4 hover:text-red-500 hover:cursor-pointer"
            />
          )}
        </div>
      );

    default:
      return null;
  }
};

export default FieldComponent;
