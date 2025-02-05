import { useDispatch } from "react-redux";
import { addRule } from "../../redux/Slices/dynamicRacSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputTextMulti from "../Common/InputTextMulti/InputTextMulti";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import Button from "../Common/Button/Button";
import HoverButton from "../Common/HoverButton/HoverButton";
import InputNumber from "../Common/InputNumber/InputNumber";
import { operatorOptions, conditionsOptions } from "../../data/OptionsData";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import store from "../../redux/store";
import {
  validateForm,
  validateUserRole,
} from "../../redux/Slices/validationSlice";
import { toast } from "react-toastify";
import getOperatorsForCondition from "./getOperatorsForCondition";

const Toolbox = ({ sectionId, onClose }) => {
  const { racId } = useParams();
  const dispatch = useDispatch();
  const { racConfig, optionsList } = useSelector((state) => state.dynamicRac);
  const { sections } = racConfig;

  const initialState = {
    fieldType: "",
    criteriaType: "",
    blocked: false,
    name: "",
    sectionId: "",
    sectionName: "",
    status: "CREATED",
    isModified: true,
    displayName: "",
    usageList: [
      {
        ruleUsage: "BORROWER_OFFERS",
        used: true,
      },
      {
        ruleUsage: "REGISTRATION",
        used: true,
      },
      {
        ruleUsage: "ELIGIBILITY",
        used: true,
      },
    ],
    racId: racId,
    criteriaValues: [],
    firstOperator: "",
    secondOperator: "",
    numberCriteriaRangeList: [
      {
        minimum: "",
        maximum: "",
        isResidence: false,
      },
    ],
  };
  const initialMinValue = -Number(import.meta.env.VITE_MIN_MAX_LIMIT);
  const initialMaxValue = Number(import.meta.env.VITE_MIN_MAX_LIMIT);

  const [equalValue, setEqualValue] = useState(0);
  const [minValue, setMinValue] = useState(initialMinValue);
  const [maxValue, setMaxValue] = useState(initialMaxValue);
  const [condition, setCondition] = useState("");
  const [ruleConfig, setRuleConfig] = useState(initialState);

  // console.log(minValue)
  // console.log(maxValue)

  useEffect(() => {
    if (condition === "Less than" || condition === "Less than or equal to") {
      setMaxValue(0); // Reset maxValue when condition is set
      setMinValue(initialMinValue);
    } else if (
      condition === "Greater than" ||
      condition === "Greater than or equal to"
    ) {
      setMinValue(0); // Reset minValue when condition is set
      setMaxValue(initialMaxValue);
    }
  }, [condition]);

  const handleChange = (e) => {
    const { name, checked, type, value } = e.target;
    // console.log(name, checked);
    if (type === "checkbox") {
      if (name === "blocked") {
        setRuleConfig((prevConfig) => ({
          ...prevConfig,
          blocked: checked,
        }));
      } else {
        setRuleConfig((prevConfig) => ({
          ...prevConfig,
          usageList: prevConfig.usageList.map((item) =>
            item.ruleUsage === name ? { ...item, used: checked } : item
          ),
        }));
      }
    } else {
      setRuleConfig((prevConfig) => ({
        ...prevConfig,
        [name]: value,
      }));
    }
  };

  const handleRangeChange = (e, index) => {
    const { name, checked, type, value } = e.target;

    setRuleConfig((prevConfig) => ({
      ...prevConfig,
      numberCriteriaRangeList: prevConfig.numberCriteriaRangeList.map(
        (item, idx) => {
          if (index === idx) {
            return {
              ...item,
              [name]: type === "checkbox" ? checked : value,
            };
          }
          return item;
        }
      ),
    }));
  };

  const addRangeEntry = () => {
    setRuleConfig((prevConfig) => ({
      ...prevConfig,
      numberCriteriaRangeList: [
        ...prevConfig.numberCriteriaRangeList,
        {
          minimum: 0,
          maximum: 0,
          resident: false,
        },
      ],
    }));
  };

  const deleteRangeEntry = (index) => {
    setRuleConfig((prevConfig) => ({
      ...prevConfig,
      numberCriteriaRangeList: prevConfig.numberCriteriaRangeList.filter(
        (_, idx) => idx !== index
      ),
    }));
  };

  const handleAddRule = async (sectionId, ruleConfig) => {
    const dataToValidate = {
      sectionId: sectionId,
      fieldType: ruleConfig.fieldType,
      criteriaType: ruleConfig.criteriaType,
      name: ruleConfig.name,
    };
    let isValid2 = true;
    if (ruleConfig.fieldType == "NUMBER" && condition === "Between") {
      isValid2 = validateUserRole(ruleConfig.numberCriteriaRangeList, dispatch);
    }
    await dispatch(validateForm(dataToValidate));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (!isValid2) {
      toast.error("Add At least 1 range");
    }
    if (isValid && isValid2 && condition === "Between") {
      dispatch(
        addRule({
          sectionId,
          ruleConfig: {
            ...ruleConfig,
            sectionId: sectionId,
            sectionName:
              sections.find((item) => item.sectionId === sectionId)
                ?.sectionName || "",
            displayName: ruleConfig.name,
          },
        })
      );
      setRuleConfig(initialState);
      onClose();
    } else {
      if (condition === "Equal to") {
        dispatch(
          addRule({
            sectionId,
            ruleConfig: {
              ...ruleConfig,
              sectionId: sectionId,
              sectionName:
                sections.find((item) => item.sectionId === sectionId)
                  ?.sectionName || "",
              displayName: ruleConfig.name,
              numberCriteriaRangeList: [
                {
                  minimum: equalValue,
                  maximum: equalValue,
                  resident: false,
                },
              ],
            },
          })
        );
      } else {
        dispatch(
          addRule({
            sectionId,
            ruleConfig: {
              ...ruleConfig,
              sectionId: sectionId,
              sectionName:
                sections.find((item) => item.sectionId === sectionId)
                  ?.sectionName || "",
              displayName: ruleConfig.name,
              numberCriteriaRangeList: [
                {
                  minimum: minValue,
                  maximum: maxValue,
                  resident: false,
                },
              ],
            },
          })
        );
      }
      setRuleConfig(initialState);
      onClose();
    }
  };

  const handleStringInputChange = (newValues) => {
    setRuleConfig((prevConfig) => ({
      ...prevConfig,
      criteriaValues: [...newValues],
    }));
  };

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
    const { firstOperator, secondOperator } = getOperatorsForCondition(
      e.target.value
    );
    setRuleConfig((prevConfig) => ({
      ...prevConfig,
      firstOperator: firstOperator,
      secondOperator: secondOperator,
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-1 flex-1 p-5">
      <div className={`flex flex-col gap-2`}>
        <div className="grid gap-2 grid-cols-2">
          <InputSelect
            labelName="Criteria Type"
            inputOptions={[
              { label: "BORROWER_PROFILE", value: "BORROWER_PROFILE" },
              { label: "CALCULATED", value: "CALCULATED" },
            ]}
            inputName="criteriaType"
            inputValue={ruleConfig.criteriaType}
            onChange={handleChange}
            dropdownTextSize={"small"}
            isValidation={true}
          />

          <InputSelect
            labelName="Field Type"
            inputOptions={[
              { label: "STRING", value: "STRING" },
              { label: "NUMBER", value: "NUMBER" },
            ]}
            inputName="fieldType"
            inputValue={ruleConfig.fieldType}
            onChange={handleChange}
            dropdownTextSize={"small"}
            isValidation={true}
          />
        </div>
        <InputSelect
          labelName="Parameter"
          inputOptions={
            ruleConfig.criteriaType === "BORROWER_PROFILE"
              ? optionsList.borrowerProfileAvailableNames
              : ruleConfig.criteriaType === "CALCULATED"
              ? optionsList.calculatedAvailableNames
              : []
          }
          inputName="name"
          inputValue={ruleConfig.name}
          onChange={handleChange}
          dropdownTextSize={"small"}
          isValidation={true}
          searchable={true}
        />
        {/* STRING Rule Criteria Values*/}
        {ruleConfig.fieldType === "STRING" && (
          <div className={"flex justify-between align-middle gap-2"}>
            <InputTextMulti
              label={"Value"}
              inputName={ruleConfig.name}
              tag={ruleConfig?.criteriaValues}
              setTag={(newValues) => handleStringInputChange(newValues)}
              sectionId={sectionId}
              dynamicRacRuleId={"123"}
              isValidation={true}
            />
            {/* Blocked Checkbox */}
            <div className="mt-5">
              <InputCheckbox
                labelName="Block"
                inputChecked={ruleConfig?.blocked}
                onChange={handleChange}
                inputName="blocked"
              />
            </div>
          </div>
        )}

        {/* NUMBER Rule Condition, Operators, Ranges, Add Ranges  */}
        {ruleConfig.fieldType === "NUMBER" && (
          <>
            {/* Condition */}
            <InputSelect
              labelName="Condition"
              inputOptions={conditionsOptions}
              inputName="condition"
              inputValue={condition}
              onChange={handleConditionChange}
              isValidation={true}
              searchable={true}
            />

            {(condition === "Less than" ||
              condition === "Less than or equal to") && (
              <InputNumber
                labelName="Value"
                inputName="maxValue"
                inputValue={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                placeHolder="0"
              />
            )}

            {(condition === "Greater than" ||
              condition === "Greater than or equal to") && (
              <>
                <InputNumber
                  labelName="Value"
                  inputName="minValue"
                  inputValue={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
                  placeHolder="0"
                />
              </>
            )}

            {condition === "Equal to" && (
              <>
                <InputNumber
                  labelName="equalValue"
                  inputName="equalValue"
                  inputValue={equalValue}
                  onChange={(e) => setEqualValue(e.target.value)}
                  placeHolder="0"
                />
              </>
            )}

            {condition === "Between" && (
              <>
                {/* Ranges */}
                {ruleConfig.numberCriteriaRangeList.map((range, index) => (
                  <div className={"flex justify-between items-center rounded"}>
                    <div key={index} className="grid gap-2 grid-cols-3">
                      <InputNumber
                        labelName="Min"
                        inputName="minimum"
                        inputValue={range.minimum}
                        onChange={(e) => handleRangeChange(e, index)}
                        placeHolder="0"
                      />
                      <InputNumber
                        labelName="Max"
                        inputName="maximum"
                        inputValue={range.maximum}
                        onChange={(e) => handleRangeChange(e, index)}
                        placeHolder="0"
                      />
                      <InputCheckbox
                        labelName="Resident"
                        inputChecked={range.resident}
                        onChange={(e) => handleRangeChange(e, index)}
                        inputName="resident"
                      />
                    </div>

                    <XMarkIcon
                      onClick={() => deleteRangeEntry(index)}
                      className="h-6 w-6 hover:text-red-500 hover:cursor-pointer"
                    />
                  </div>
                ))}

                <div
                  className={"flex text-blue-500 mt-2"}
                  onClick={addRangeEntry}
                >
                  <PlusIcon className="h-5 w-5" />
                  <p>
                    Add{" "}
                    {ruleConfig.numberCriteriaRangeList.length < 1
                      ? "Range"
                      : "Another Range"}
                  </p>
                </div>
              </>
            )}
          </>
        )}

        {/* Checkboxes */}
        <div className={`flex flex-col gap-2 px-5 text-[12px]`}>
          <p className="font-bold">
            Apply To Features{" "}
            <span className="text-red-700 text-xl ml-1">*</span>
          </p>
          <InputCheckbox
            labelName="REGISTRATION"
            inputChecked={
              ruleConfig.usageList.find(
                (item) => item.ruleUsage === "REGISTRATION"
              )?.used || false
            }
            onChange={handleChange}
            inputName="REGISTRATION"
            className={"text-[10px]"}
          />

          <InputCheckbox
            labelName="ELIGIBILITY"
            inputChecked={
              ruleConfig.usageList.find(
                (item) => item.ruleUsage === "ELIGIBILITY"
              )?.used || false
            }
            onChange={handleChange}
            inputName="ELIGIBILITY"
            className={"text-[10px]"}
          />

          <InputCheckbox
            labelName="BORROWER_OFFERS"
            inputChecked={
              ruleConfig.usageList.find(
                (item) => item.ruleUsage === "BORROWER_OFFERS"
              )?.used || false
            }
            onChange={handleChange}
            inputName="BORROWER_OFFERS"
            className={"text-[10px]"}
          />
        </div>

        {/* Buttons */}
        <div className={`flex justify-end gap-3`}>
          <HoverButton text="Cancel" onClick={onClose} />
          <Button
            buttonIcon={PlusIcon}
            buttonName="Create Rule"
            onClick={() => handleAddRule(sectionId, ruleConfig)}
            rectangle={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
