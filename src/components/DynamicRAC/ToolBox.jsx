import { useDispatch } from "react-redux";
import { addRule } from "../../redux/Slices/dynamicRacSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import Button from "../Common/Button/Button";
import InputNumber from "../Common/InputNumber/InputNumber";
import { operatorOptions } from "../../data/OptionsData"
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import store from "../../redux/store";
import {
  validateForm,
  validateUserRole,
} from "../../redux/Slices/validationSlice";
import { toast } from "react-toastify";

const Toolbox = () => {
  const { racId } = useParams();
  const dispatch = useDispatch();
  const [sectionId, setSectionId] = useState("");
  const { racConfig, optionsList } = useSelector((state) => state.dynamicRac);
  const { sections } = racConfig;

  const initialState = {
    fieldType: "",
    criteriaType: "",
    name: "",
    sectionId: "",
    sectionName: "",
    status: "CREATED",
    displayName:"",
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
    numberCriteriaRangeList: [],
  };

  const [ruleConfig, setRuleConfig] = useState(initialState);

  const handleChange = (e) => {
    const { name, checked, type, value } = e.target;

    if (type === "checkbox") {
      setRuleConfig((prevConfig) => ({
        ...prevConfig,
        usageList: prevConfig.usageList.map((item) =>
          item.ruleUsage === name ? { ...item, used: checked } : item
        ),
      }));
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

  const handleaddRule = async (sectionId, ruleConfig) => {
    console.log(ruleConfig);
    // console.log(sectionId);
    const dataToValidate = {
      sectionId: sectionId,
      fieldType: ruleConfig.fieldType,
      criteriaType: ruleConfig.criteriaType,
      name: ruleConfig.name,
    };
    let isValid2 = true;
    if (ruleConfig.fieldType == "NUMBER") {
      isValid2 = validateUserRole(ruleConfig.numberCriteriaRangeList, dispatch);
    }
    await dispatch(validateForm(dataToValidate));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (!isValid2) {
      toast.error("Add atleast 1 range");
    }
    if (isValid && isValid2) {
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
    }
  };

  return (
    <>
      <div className="border-2 rounded-lg py-5 basis-1/5 flex-grow max-h-[550px] overflow-y-scroll">
        <div className="grid grid-cols-1 gap-3 flex-1">
          <div className={`grid gap-2 px-2 grid-cols-1`}>
            <InputSelect
              labelName="Section"
              inputOptions={sections.map((section) => ({
                label: section.sectionName,
                value: section.sectionId,
              }))}
              inputName="sectionId"
              inputValue={sectionId}
              onChange={(e) => setSectionId(e.target.value)}
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
              labelName="Name"
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
          </div>
          <div className={`grid gap-3 px-5 grid-cols-1 text-[12px]`}>
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
          {ruleConfig.fieldType === "NUMBER" && (
            <div className="flex justify-start flex-wrap gap-2 py-2 mx-1">
              <div className="grid gap-1 p-2 grid-cols-2 border-2 rounded-xl w-full">
                <InputSelect
                  labelName="First"
                  inputOptions={operatorOptions}
                  inputName="firstOperator"
                  inputValue={ruleConfig.firstOperator}
                  onChange={handleChange}
                />
                <InputSelect
                  labelName="Second"
                  inputOptions={operatorOptions}
                  inputName="secondOperator"
                  inputValue={ruleConfig.secondOperator}
                  onChange={handleChange}
                />
              </div>
              {ruleConfig.numberCriteriaRangeList.map((range, index) => (
                <div
                  key={index}
                  className="grid gap-1 p-2 grid-cols-[27%_27%_46%] border-2 rounded-xl min-w-[25%] w-fit max-w-[100%] relative"
                >
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
                  <div
                    className="flex justify-center items-center absolute top-1 right-1 hover:bg-red-50  hover:cursor-pointer"
                    onClick={() => deleteRangeEntry(index)}
                  >
                    <XMarkIcon className="h-4 w-4 hover:text-red-500 hover:cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className={`flex flex-col items-center gap-3`}>
            {ruleConfig.fieldType === "NUMBER" && (
              <Button
                buttonIcon={PlusIcon}
                buttonName="Add Range"
                onClick={addRangeEntry}
                rectangle={true}
                className="bg-yellow-500 hover:bg-yellow-400 text-[12px] w-[80%]"
              />
            )}
            <Button
              buttonIcon={PlusIcon}
              buttonName="Add Field"
              onClick={() => handleaddRule(sectionId, ruleConfig)}
              rectangle={true}
              className="text-[12px] w-[80%]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Toolbox;
