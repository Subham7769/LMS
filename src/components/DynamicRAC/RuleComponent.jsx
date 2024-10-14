import { useDispatch } from "react-redux";
import { deleteRuleById, removeRule,fetchDynamicRacDetails,fetchOptionList, handleChangeNumberRule,updateRuleNumberCriteria, handleChangeStringRule } from '../../redux/Slices/DynamicRacSlice';
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputTextMulti from "../Common/InputTextMulti/InputTextMulti";
import { operatorOptions } from "../../data/OptionsData"
import { TrashIcon, EllipsisVerticalIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const RuleComponent = ({ rule, racId,dynamicRacRuleId, isEditorMode, sectionId }) => {
  const dispatch = useDispatch();

  // const handleNumberInputChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   dispatch(handleChangeNumberRule({ sectionId, dynamicRacRuleId, name, value, type, checked }));
  // };

  const handleInputChange = (inputName, value, index) => {
    const updates = {};

    if (inputName === 'firstOperator' || inputName === 'secondOperator') {
      updates[inputName] = value;
    } else if (inputName === 'minimum' || inputName === 'maximum') {
      updates.numberCriteriaRangeList = [{
        [inputName]: value,
      }];
    }

    dispatch(updateRuleNumberCriteria({ sectionId, dynamicRacRuleId: rule.dynamicRacRuleId, updates, numberCriteriaIndex: index }));
  };

  const handleRemoveRule = async (sectionId, dynamicRacRuleId) => {
    try {
      // First dispatch: removeRule
      dispatch(removeRule({ sectionId, dynamicRacRuleId }));
      console.log("removeRule")
      
      // Second dispatch: deleteRuleById
      await dispatch(deleteRuleById(dynamicRacRuleId)).unwrap();
      console.log("deleteRuleById")

      // Fourth dispatch: fetchOptionList
      await dispatch(fetchOptionList(racId)).unwrap();
      console.log("fetchOptionList")
      
      // Third dispatch: fetchDynamicRacDetails
      await dispatch(fetchDynamicRacDetails(racId)).unwrap();
      console.log("fetchDynamicRacDetails")
  
    } catch (error) {
      console.error("Error while performing operations: ", error);
    }
  };
  
  

  const handleStringInputChange = (newValues) => {
    console.log(newValues)
    dispatch(handleChangeStringRule({ sectionId, dynamicRacRuleId, values: newValues })); // Dispatch to Redux
  };

  switch (rule?.fieldType) {
    case "NUMBER":
      return (
        <div className="flex justify-between items-center gap-2">
          {isEditorMode && (
            <ChevronUpDownIcon className="h-5 w-5 hover:text-indigo-500 hover:cursor-pointer hover:bg-slate-200" />
          )}
          <div className="py-2 w-full">
            <label className={`block text-gray-700" px-1 text-[14px]`}>{rule.name}</label>
            <div className={`border-2 rounded-xl py-2 ${isEditorMode && 'bg-gray-100'}`}>
              {rule.numberCriteriaRangeList.map((range, index) => (
                <div key={index} className="flex-1 grid grid-cols-4 gap-2">
                  <InputSelect
                    labelName="First Operator"
                    inputOptions={operatorOptions}
                    inputName="firstOperator"
                    inputValue={rule.firstOperator} // Use range.firstOperator instead of rule.firstOperator
                    onChange={(e) => handleInputChange('firstOperator', e.target.value, index)}
                    disabled={isEditorMode}
                  />
                  <InputNumber
                    labelName="Min"
                    inputName="minimum"
                    inputValue={parseInt(range.minimum) || ''} // Use range.minimum instead of rule.numberCriteriaRangeList[index].minimum
                    onChange={(e) => handleInputChange('minimum', e.target.value, index)}
                    placeholder="0"
                    disabled={isEditorMode}
                  />
                  <InputSelect
                    labelName="Second Operator"
                    inputOptions={operatorOptions}
                    inputName="secondOperator"
                    inputValue={rule.secondOperator} // Use range.secondOperator instead of rule.secondOperator
                    onChange={(e) => handleInputChange('secondOperator', e.target.value, index)}
                    disabled={isEditorMode}
                  />
                  <InputNumber
                    labelName="Max"
                    inputName="maximum"
                    inputValue={parseInt(range.maximum) || ''} // Use range.maximum instead of rule.numberCriteriaRangeList[index].maximum
                    onChange={(e) => handleInputChange('maximum', e.target.value, index)}
                    placeholder="0"
                    disabled={isEditorMode}
                  />
                </div>
              ))}
            </div>
          </div>
          {isEditorMode && (
            <TrashIcon
              onClick={() => handleRemoveRule(sectionId, rule.dynamicRacRuleId )}
              className="h-4 w-4 mt-4 hover:text-indigo-500 hover:cursor-pointer"
            />
          )}
        </div>

      );

    case "STRING":
      return (
        <div className="flex justify-between items-center gap-2">
          {isEditorMode && (
            <ChevronUpDownIcon className="h-5 w-5 mt-4 hover:text-indigo-500 hover:cursor-pointer hover:bg-slate-200" />
          )}

          <InputTextMulti
            label={rule.name}
            tag={rule?.criteriaValues}
            setTag={(newValues) => handleStringInputChange(newValues)}
            sectionId={sectionId}
            dynamicRacRuleId={dynamicRacRuleId}
            disabled={isEditorMode}
          />
          {isEditorMode && (
            <TrashIcon
              onClick={() => handleRemoveRule(sectionId, rule.dynamicRacRuleId )}
              className="h-4 w-4 mt-4 hover:text-red-500 hover:cursor-pointer"
            />
          )}
        </div>
      );

    default:
      return null;
  }
};

export default RuleComponent;
