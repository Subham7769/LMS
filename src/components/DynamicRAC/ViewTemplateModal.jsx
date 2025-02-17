import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import generateNumberSentence from "./generateNumberSentence";
import Button from "../Common/Button/Button";

import {
  addNewRule,
  fetchOptionList,
  fetchDynamicRacDetails,
} from "../../redux/Slices/dynamicRacSlice";

const ViewTemplateModal = ({
  isOpen = true,
  onClose,
  sectionId,
  sectionName,
  racId,
}) => {

  if (!isOpen) return null;

  const userName = localStorage.getItem("username");

  const templateTypes = [
    { id: 1, name: "All templates" },
    { id: 2, name: "Personal Details" },
    { id: 3, name: "Financial" },
    { id: 4, name: "Employment" },
  ];

  const templates = {
    1: [
      {
        fieldType: "NUMBER",
        criteriaType: "CALCULATED",
        blocked: false,
        name: "creditScore",
        sectionId: sectionId,
        sectionName: sectionName,
        status: "CREATED",
        isModified: true,
        displayName: "creditScore",
        usageList: [
          {
            ruleUsage: "ELIGIBILITY",
            used: false,
          },
          {
            ruleUsage: "BORROWER_OFFERS",
            used: true,
          },
          {
            ruleUsage: "REGISTRATION",
            used: true,
          },
        ],
        racId: racId,
        dynamicRacRuleId: `Rule-${Date.now()}`,
        criteriaValues: [],
        firstOperator: ">",
        secondOperator: "<",
        numberCriteriaRangeList: [
          {
            minimum: "-1e+308",
            maximum: "100",
            resident: false,
          },
        ],
        history: {
          createdBy: userName,
          updateBy: null,
          creationDate: new Date().toISOString(),
          lastUpdatedDate: "",
          firstOperatorOldValue: "",
          secondOperatorOldValue: "",
          numberCriteriaRangeListOldValue: [],
          criteriaValuesOldValue: [],
        },
      },
    ],
    // 2: ["Resume", "Letter", "Invitation"],
    // 3: ["Product Catalog", "Order Form", "Marketing Flyer"],
    // 4: ["Product Catalog", "Order Form", "Marketing Flyer"],
  };

  const [selectedTemplateType, setSelectedTemplateType] = useState(
    templateTypes[0]
  );
  const [selectedTemplate, setSelectedTemplate] = useState({});

  const handleClose = () => {
    setSelectedTemplate({});
    setSelectedTemplateType(templateTypes[0]);
    onClose();
  };

  const handleAddRule = async (sectionId, sectionName, ruleConfig) => {
    // Add Rule
    await dispatch(
      addNewRule({
        ruleConfig: {
          ...ruleConfig,
          sectionId,
          sectionName,
        },
      })
    ).unwrap();

    // First, fetch the option list
    await dispatch(fetchOptionList(racId)).unwrap();

    // After fetching the option list, fetch the dynamic RAC details
    await dispatch(fetchDynamicRacDetails(racId));

    handleClose();
  };

  console.log(selectedTemplate)

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-500/10 backdrop-blur-sm">
      <div className="relative w-[75%] max-h-[80vh] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white flex justify-between items-center p-5 border-b">
          <p className="font-semibold text-2xl">Use Template</p>
          <XMarkIcon
            onClick={handleClose}
            className="h-8 w-8 text-gray-500 cursor-pointer"
          />
        </div>

        {/* Content Section */}
        <div className="flex h-[70vh]">
          {/* Left Section - Template Types */}
          <div className="w-[20%] border-r p-4 flex flex-col gap-3">
            {templateTypes.map((type) => (
              <div
                key={type.id}
                className={`py-3 px-2 border rounded-lg cursor-pointer text-center ${
                  selectedTemplateType.id === type.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setSelectedTemplateType(type)}
              >
                {type.name}
              </div>
            ))}
          </div>

          {/* Right Section - Templates List */}
          <div className="w-[80%] p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-3">Available Templates</h2>
            <div className="grid grid-cols-2 gap-3">
              {templates[selectedTemplateType.id].map((template, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-2 p-4 border-2 rounded-lg ${
                    selectedTemplate.dynamicRacRuleId === template.dynamicRacRuleId
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <p className="flex justify-between items-center">
                    <span className="font-semibold">{template.name}</span>
                    {selectedTemplateType.name !== "All templates" && (
                      <span className="bg-gray-100 text-gray-500 text-[10px] font-semibold px-2 py-1 rounded ">
                        {selectedTemplateType.name}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-600">
                    {generateNumberSentence(template)}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {template.usageList.map((templateUsage) => {
                      if (templateUsage.used) {
                        return (
                          <p className="bg-blue-100 w-fit rounded-xl px-2 text-blue-500 text-[10px] py-1">
                            {templateUsage.ruleUsage}
                          </p>
                        );
                      }
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="sticky bottom-0 z-50 bg-white flex justify-end items-center gap-5  p-3 border-t">
          <Button
            buttonName="Cancel"
            rectangle={true}
            buttonType={"secondary"}
            onClick={handleClose}
          />

          <Button
            buttonName="Use This Template"
            rectangle={true}
            onClick={() =>
              handleAddRule(sectionId, sectionName, selectedTemplate)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ViewTemplateModal;
