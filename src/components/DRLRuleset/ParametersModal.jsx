import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import InputSelect from "../Common/InputSelect/InputSelect";
import Button from "../Common/Button/Button";
import { useParams } from "react-router-dom";
import Modal from "../Common/Modal/Modal";
import { AddIcon } from "../../assets/icons";
import { addParameterTag } from "../../redux/Slices/drlRulesetSlice";

const ParametersModal = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { optionsList } = useSelector((state) => state.dynamicRac);

  const initialState = {
    fieldType: "",
    criteriaType: "",
    name: "",
  };
  const [ruleConfig, setRuleConfig] = useState(initialState);

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

  const addParamter = () => {
    if (ruleConfig.name) {
      dispatch(addParameterTag(ruleConfig.name));
      setRuleConfig((prev) => ({ ...prev, name: "" })); // optional reset
      onClose();
    }
  };

  

  if (!isOpen) return null;

  return (
    <Modal
      title={"Add Parameters for equation"}
      secondaryOnClick={onClose}
      isFooter={false}
    >
      <div className={`flex flex-col gap-2`}>
        <div className="grid gap-2 md:grid-cols-2">
          <InputSelect
            labelName="Criteria Type"
            inputOptions={[
              { label: "BORROWER_PROFILE", value: "BORROWER_PROFILE" },
              { label: "CALCULATED", value: "CALCULATED" },
              { label: "DOCUMENT", value: "DOCUMENT" },
            ]}
            inputName="criteriaType"
            inputValue={ruleConfig.criteriaType}
            onChange={handleChange}
            dropdownTextSize={"small"}
            isValidation={true}
          />

          <InputSelect
            labelName="Field Type"
            inputOptions={
              ruleConfig.criteriaType === "DOCUMENT"
                ? [{ label: "STRING", value: "STRING" }]
                : [
                    { label: "STRING", value: "STRING" },
                    { label: "NUMBER", value: "NUMBER" },
                  ]
            }
            inputName="fieldType"
            inputValue={ruleConfig.fieldType}
            onChange={handleChange}
            dropdownTextSize={"small"}
            isValidation={true}
          />
        </div>
        <div className="flex gap-5 items-end">
          <div className="w-full">
            <InputSelect
              labelName="Parameter"
              inputOptions={
                ruleConfig.criteriaType === "BORROWER_PROFILE"
                  ? optionsList.borrowerProfileAvailableNames
                  : ruleConfig.criteriaType === "CALCULATED"
                  ? optionsList.calculatedAvailableNames
                  : ruleConfig.criteriaType === "DOCUMENT"
                  ? optionsList.documentsAvailableNames
                  : []
              }
              inputName="name"
              inputValue={ruleConfig.name}
              onChange={handleChange}
              dropdownTextSize={"small"}
              searchable={true}
            />
          </div>
          <div>
            <Button
              buttonIcon={AddIcon}
              buttonType="secondary"
              onClick={addParamter}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ParametersModal;
