import { useDispatch } from "react-redux";
import { addField } from '../../redux/Slices/DynamicRacSlice'
import { useState } from "react";
import { useSelector } from "react-redux";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import Button from "../Common/Button/Button";
import InputNumber from "../Common/InputNumber/InputNumber";
import { StringArray, NumberArray,operatorOptions } from "../../data/OptionsData"
import { XMarkIcon,PlusIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";


const Toolbox = () => {
  const { racId } = useParams();
  const dispatch = useDispatch()
  const [sectionId, setSectionId] = useState("");
  const { sections } = useSelector((state) => state.dynamicRac)

  const initialState = {
    fieldType: "",
    criteriaType: "",
    name: "",
    usageList: {
      REGISTRATION: true,
      ELIGIBILITY: true,
      BORROWER_OFFERS: true,
    },
    displayName: "",
    racId: racId,
    criteriaValues: [],
    firstOperator: "",
    secondOperator: "",
    numberCriteriaRangeList: [],
  }

  const [fieldConfig, setFieldConfig] = useState(initialState);



  const handleChange = (e) => {
    const { name, checked, type, value } = e.target;

    if (type === "checkbox") {
      setFieldConfig((prevConfig) => ({
        ...prevConfig,
        usageList: {
          ...prevConfig.usageList,
          [name]: checked,
        },
      }));
    } else {
      setFieldConfig((prevConfig) => ({
        ...prevConfig,
        [name]: value,
      }));
    }
  };

  const handleRangeChange = (e, index) => {
    const { name, checked, type, value } = e.target;

    setFieldConfig((prevConfig) => ({
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
    setFieldConfig((prevConfig) => ({
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
    setFieldConfig((prevConfig) => ({
      ...prevConfig,
      numberCriteriaRangeList: prevConfig.numberCriteriaRangeList.filter(
        (_, idx) => idx !== index
      ),
    }));
  };

  const handleAddField = (sectionId, fieldConfig) => {
    dispatch(addField({ sectionId, fieldConfig }))
    setFieldConfig(initialState)
  }


  return (
    <div className="border-2 rounded-lg py-5 basis-1/4 flex-grow max-h-[550px] overflow-y-scroll">
      <div className="grid grid-cols-1 gap-3 flex-1">
        <div className={`grid gap-2 px-2 grid-cols-1`}>
          <InputSelect
            labelName="Section"
            inputOptions={sections.map((section) => ({
              label: section.name,
              value: section.id
            })
            )}
            inputName="sectionId"
            inputValue={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
          />
          <InputSelect
            labelName="Field Type"
            inputOptions={[
              { label: "STRING", value: "STRING" },
              { label: "NUMBER", value: "NUMBER" },
            ]}
            inputName="fieldType"
            inputValue={fieldConfig.fieldType}
            onChange={handleChange}
          />
          <InputSelect
            labelName="Criteria Type"
            inputOptions={[
              { label: "BORROWER_PROFILE", value: "BORROWER_PROFILE" },
              { label: "CALCULATED", value: "CALCULATED" },
            ]}
            inputName="criteriaType"
            inputValue={fieldConfig.criteriaType}
            onChange={handleChange}
          />
          <InputSelect
            labelName="Name"
            inputOptions={
              fieldConfig.fieldType === "STRING" ? StringArray : NumberArray
            }
            inputName="name"
            inputValue={fieldConfig.name}
            onChange={handleChange}
          />
        </div>
        <div className={`grid gap-3 px-5 grid-cols-1 text-[12px]`}>
          <InputCheckbox
            labelName="REGISTRATION"
            inputChecked={fieldConfig.usageList.REGISTRATION}
            onChange={handleChange}
            inputName="REGISTRATION"
            className={"text-[10px]"}
          />
          <InputCheckbox
            labelName="ELIGIBILITY"
            inputChecked={fieldConfig.usageList.ELIGIBILITY}
            onChange={handleChange}
            inputName="ELIGIBILITY"
            className={"text-[10px]"}
          />
          <InputCheckbox
            labelName="BORROWER_OFFERS"
            inputChecked={fieldConfig.usageList.BORROWER_OFFERS}
            onChange={handleChange}
            inputName="BORROWER_OFFERS"
            className={"text-[10px]"}
          />
        </div>
        {fieldConfig.fieldType === "NUMBER" && (
          <div className="flex justify-start flex-wrap gap-2 py-2 mx-1">
            <div className="grid gap-1 p-2 grid-cols-2 border-2 rounded-xl w-full"
            >
              <InputSelect
                labelName="First Operator"
                inputOptions={operatorOptions}
                inputName="firstOperator"
                inputValue={fieldConfig.firstOperator}
                onChange={handleChange}
              />
              <InputSelect
                labelName="Second Operator"
                inputOptions={operatorOptions}
                inputName="secondOperator"
                inputValue={fieldConfig.secondOperator}
                onChange={handleChange}
              />
            </div>
            {fieldConfig.numberCriteriaRangeList.map((range, index) => (
              <div
                key={index}
                className="grid gap-1 p-2 grid-cols-[30%_30%_40%] border-2 rounded-xl min-w-[25%] w-fit max-w-[100%] relative"
              >
                <InputNumber
                  labelName="Minimum"
                  inputName="minimum"
                  inputValue={range.minimum}
                  onChange={(e) => handleRangeChange(e, index)}
                  placeHolder="0"
                />
                <InputNumber
                  labelName="Maximum"
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
                ><XMarkIcon className="h-4 w-4 hover:text-red-500 hover:cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={`grid grid-cols-2 px-2 gap-3`}>
          {fieldConfig.fieldType === "NUMBER" && (
            <Button
            buttonIcon={PlusIcon}
              buttonName="Add Range"
              onClick={addRangeEntry}
              rectangle={true}
              className="bg-yellow-500 hover:bg-yellow-400 text-[12px]"
            />
          )}
          <Button
          buttonIcon={PlusIcon}
            buttonName="Add Field"
            onClick={() => handleAddField(sectionId, fieldConfig)}
            rectangle={true}
            className="text-[12px]"
          />
        </div>
      </div>

    </div>
  );
};

export default Toolbox