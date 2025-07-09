import React, { useState } from "react";
import Modal from "../Common/Modal/Modal";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import Button from "../Common/Button/Button";
import InputSelect from "../Common/InputSelect/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { AddIcon } from "../../assets/icons";
import { handleChangeRuleManagerData } from "../../redux/Slices/drlRulesetSlice";

const EquationModal = ({ isOpen, onClose, ruleManagerData }) => {
  const dispatch = useDispatch();
  const { optionsList } = useSelector((state) => state.drlRuleset);
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

  const handleChangeEquation = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeRuleManagerData({ name, value }));
  };

  const addParamter = () => {
    if (ruleConfig.name) {
      const existingEquation =
        ruleManagerData.ruleManagerEquation.expression || "";
      const appendedEquation =
        existingEquation.trim() === ""
          ? ruleConfig.name
          : `${existingEquation} ${ruleConfig.name}`;

      dispatch(
        handleChangeRuleManagerData({
          name: "expression",
          value: appendedEquation,
        })
      );

      // Optional: Reset selected name after adding
      setRuleConfig((prev) => ({ ...prev, name: "" }));
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <Modal
        primaryButtonName={"Save"}
        primaryOnClick={onClose}
        secondaryOnClick={onClose}
        title={"Update Rules Equation"}
      >
        <div className="mb-5">
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
        </div>
        <InputTextArea
          labelName="Expression"
          inputName="expression"
          inputValue={ruleManagerData?.ruleManagerEquation?.expression}
          onChange={handleChangeEquation}
          rowCount={3}
        />
      </Modal>
    </>
  );
};

export default EquationModal;
