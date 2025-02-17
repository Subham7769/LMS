import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import generateNumberSentence from "./generateNumberSentence";
import generateStringSentence from "./generateStringSentence";
import Button from "../Common/Button/Button";

import {
  addNewRule,
  fetchOptionList,
  fetchDynamicRacDetails,
} from "../../redux/Slices/dynamicRacSlice";
import { useDispatch } from "react-redux";
import convertToReadableString from "../../utils/convertToReadableString";

const ViewTemplateModal = ({
  isOpen = true,
  onClose,
  sectionId,
  sectionName,
  racId,
}) => {
  if (!isOpen) return null;

  const userName = localStorage.getItem("username");
  const dispatch = useDispatch();

  const templateTypes = [
    { id: 1, name: "All templates" },
    { id: 2, name: "Personal Details" },
    { id: 3, name: "Financial" },
    { id: 4, name: "Employment" },
  ];

  const templates = {
    1: [
      {
        dynamicRacRuleId: 1,
        name: "age",
        sectionName: sectionName,
        sectionId: sectionId,
        displayName: "age",
        fieldType: "NUMBER",
        racId: racId,
        firstOperator: ">=",
        secondOperator: "<=",
        numberCriteriaRangeList: [
          {
            minimum: "18",
            maximum: "65",
            resident: true,
          },
        ],
        criteriaValues: [],
        criteriaType: "BORROWER_PROFILE",
        blocked: false,
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
        status: "APPROVED",
        isModified: true,
        history: {
          createdBy: userName,
          updateBy: null,
          creationDate: null,
          lastUpdatedDate: "",
          firstOperatorOldValue: "",
          secondOperatorOldValue: "",
          numberCriteriaRangeListOldValue: [],
          criteriaValuesOldValue: [],
        },
      },
      {
        dynamicRacRuleId: 2,
        name: "incomeOnPaySlip",
        sectionName: sectionName,
        sectionId: sectionId,
        displayName: "incomeOnPaySlip",
        fieldType: "NUMBER",
        racId: racId,
        firstOperator: ">=",
        secondOperator: "<",
        numberCriteriaRangeList: [
          {
            minimum: "10000",
            maximum: "1e+308",
            resident: false,
          },
        ],
        criteriaValues: [],
        criteriaType: "BORROWER_PROFILE",
        blocked: false,
        usageList: [
          {
            ruleUsage: "BORROWER_OFFERS",
            used: true,
          },
          {
            ruleUsage: "REGISTRATION",
            used: false,
          },
          {
            ruleUsage: "ELIGIBILITY",
            used: true,
          },
        ],
        status: "APPROVED",
        isModified: true,
        history: {
          createdBy: userName,
          updateBy: null,
          creationDate: null,
          lastUpdatedDate: "",
          firstOperatorOldValue: "",
          secondOperatorOldValue: "",
          numberCriteriaRangeListOldValue: [],
          criteriaValuesOldValue: [],
        },
      },
      {
        dynamicRacRuleId: 3,
        name: "employerFormVerified",
        sectionName: sectionName,
        sectionId: sectionId,
        displayName: "employerFormVerified",
        fieldType: "STRING",
        racId: racId,
        firstOperator: "",
        secondOperator: "",
        numberCriteriaRangeList: [],
        criteriaValues: ["true"],
        criteriaType: "BORROWER_PROFILE",
        blocked: false,
        valuePresent: false,
        error: null,
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
        status: "APPROVED",
        isModified: true,
        history: {
          createdBy: userName,
          updateBy: null,
          creationDate: null,
          lastUpdatedDate: "",
          firstOperatorOldValue: "",
          secondOperatorOldValue: "",
          numberCriteriaRangeListOldValue: [],
          criteriaValuesOldValue: [],
        },
      },
      {
        dynamicRacRuleId: 4,
        name: "sixMonthsBankStatementUploaded",
        sectionName: sectionName,
        sectionId: sectionId,
        displayName: "sixMonthsBankStatementUploaded",
        fieldType: "STRING",
        racId: racId,
        firstOperator: "",
        secondOperator: "",
        numberCriteriaRangeList: [],
        criteriaValues: ["true"],
        criteriaType: "BORROWER_PROFILE",
        blocked: false,
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
        status: "APPROVED",
        isModified: true,
        history: {
          createdBy: userName,
          updateBy: null,
          creationDate: null,
          lastUpdatedDate: "",
          firstOperatorOldValue: "",
          secondOperatorOldValue: "",
          numberCriteriaRangeListOldValue: [],
          criteriaValuesOldValue: [],
        },
      },
      {
        dynamicRacRuleId: 5,
        name: "creditScore",
        sectionName: sectionName,
        sectionId: sectionId,
        displayName: "creditScore",
        fieldType: "NUMBER",
        racId: racId,
        firstOperator: ">=",
        secondOperator: "<",
        numberCriteriaRangeList: [
          {
            minimum: "0.7",
            maximum: "1e+308",
            resident: false,
          },
        ],
        criteriaValues: [],
        criteriaType: "BORROWER_PROFILE",
        blocked: false,
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
        status: "APPROVED",
        isModified: true,
        history: {
          createdBy: userName,
          updateBy: null,
          creationDate: null,
          lastUpdatedDate: "",
          firstOperatorOldValue: "",
          secondOperatorOldValue: "",
          numberCriteriaRangeListOldValue: [],
          criteriaValuesOldValue: [],
        },
      },
      {
        dynamicRacRuleId: 6,
        name: "natureOfCompany",
        sectionName: sectionName,
        sectionId: sectionId,
        displayName: "natureOfCompany",
        fieldType: "STRING",
        racId: racId,
        firstOperator: "",
        secondOperator: "",
        numberCriteriaRangeList: [],
        criteriaValues: ["government"],
        criteriaType: "BORROWER_PROFILE",
        blocked: false,
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
        status: "APPROVED",
        isModified: true,
        history: {
          createdBy: userName,
          updateBy: null,
          creationDate: null,
          lastUpdatedDate: "",
          firstOperatorOldValue: "",
          secondOperatorOldValue: "",
          numberCriteriaRangeListOldValue: [],
          criteriaValuesOldValue: [],
        },
      },
    ],
    2: [
      {
        dynamicRacRuleId: 1,
        name: "age",
        sectionName: sectionName,
        sectionId: sectionId,
        displayName: "age",
        fieldType: "NUMBER",
        racId: racId,
        firstOperator: ">=",
        secondOperator: "<=",
        numberCriteriaRangeList: [
          {
            minimum: "18",
            maximum: "65",
            resident: true,
          },
        ],
        criteriaValues: [],
        criteriaType: "BORROWER_PROFILE",
        blocked: false,
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
        status: "APPROVED",
        isModified: true,
        history: {
          createdBy: userName,
          updateBy: null,
          creationDate: null,
          lastUpdatedDate: "",
          firstOperatorOldValue: "",
          secondOperatorOldValue: "",
          numberCriteriaRangeListOldValue: [],
          criteriaValuesOldValue: [],
        },
      },
      {
        dynamicRacRuleId: 2,
        name: "incomeOnPaySlip",
        sectionName: sectionName,
        sectionId: sectionId,
        displayName: "incomeOnPaySlip",
        fieldType: "NUMBER",
        racId: racId,
        firstOperator: ">=",
        secondOperator: "<",
        numberCriteriaRangeList: [
          {
            minimum: "10000",
            maximum: "1e+308",
            resident: false,
          },
        ],
        criteriaValues: [],
        criteriaType: "BORROWER_PROFILE",
        blocked: false,
        usageList: [
          {
            ruleUsage: "BORROWER_OFFERS",
            used: true,
          },
          {
            ruleUsage: "REGISTRATION",
            used: false,
          },
          {
            ruleUsage: "ELIGIBILITY",
            used: true,
          },
        ],
        status: "APPROVED",
        isModified: true,
        history: {
          createdBy: userName,
          updateBy: null,
          creationDate: null,
          lastUpdatedDate: "",
          firstOperatorOldValue: "",
          secondOperatorOldValue: "",
          numberCriteriaRangeListOldValue: [],
          criteriaValuesOldValue: [],
        },
      },
      {
        dynamicRacRuleId: 3,
        name: "employerFormVerified",
        sectionName: sectionName,
        sectionId: sectionId,
        displayName: "employerFormVerified",
        fieldType: "STRING",
        racId: racId,
        firstOperator: "",
        secondOperator: "",
        numberCriteriaRangeList: [],
        criteriaValues: ["true"],
        criteriaType: "BORROWER_PROFILE",
        blocked: false,
        valuePresent: false,
        error: null,
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
        status: "APPROVED",
        isModified: true,
        history: {
          createdBy: userName,
          updateBy: null,
          creationDate: null,
          lastUpdatedDate: "",
          firstOperatorOldValue: "",
          secondOperatorOldValue: "",
          numberCriteriaRangeListOldValue: [],
          criteriaValuesOldValue: [],
        },
      },
    ],
    3: [
      {
        dynamicRacRuleId: 4,
        name: "sixMonthsBankStatementUploaded",
        sectionName: sectionName,
        sectionId: sectionId,
        displayName: "sixMonthsBankStatementUploaded",
        fieldType: "STRING",
        racId: racId,
        firstOperator: "",
        secondOperator: "",
        numberCriteriaRangeList: [],
        criteriaValues: ["true"],
        criteriaType: "BORROWER_PROFILE",
        blocked: false,
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
        status: "APPROVED",
        isModified: true,
        history: {
          createdBy: userName,
          updateBy: null,
          creationDate: null,
          lastUpdatedDate: "",
          firstOperatorOldValue: "",
          secondOperatorOldValue: "",
          numberCriteriaRangeListOldValue: [],
          criteriaValuesOldValue: [],
        },
      },
      {
        dynamicRacRuleId: 5,
        name: "creditScore",
        sectionName: sectionName,
        sectionId: sectionId,
        displayName: "creditScore",
        fieldType: "NUMBER",
        racId: racId,
        firstOperator: ">=",
        secondOperator: "<",
        numberCriteriaRangeList: [
          {
            minimum: "0.7",
            maximum: "1e+308",
            resident: false,
          },
        ],
        criteriaValues: [],
        criteriaType: "BORROWER_PROFILE",
        blocked: false,
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
        status: "APPROVED",
        isModified: true,
        history: {
          createdBy: userName,
          updateBy: null,
          creationDate: null,
          lastUpdatedDate: "",
          firstOperatorOldValue: "",
          secondOperatorOldValue: "",
          numberCriteriaRangeListOldValue: [],
          criteriaValuesOldValue: [],
        },
      },
    ],
    4: [
      {
        dynamicRacRuleId: 6,
        name: "natureOfCompany",
        sectionName: sectionName,
        sectionId: sectionId,
        displayName: "natureOfCompany",
        fieldType: "STRING",
        racId: racId,
        firstOperator: "",
        secondOperator: "",
        numberCriteriaRangeList: [],
        criteriaValues: ["government"],
        criteriaType: "BORROWER_PROFILE",
        blocked: false,
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
        status: "APPROVED",
        isModified: true,
        history: {
          createdBy: userName,
          updateBy: null,
          creationDate: null,
          lastUpdatedDate: "",
          firstOperatorOldValue: "",
          secondOperatorOldValue: "",
          numberCriteriaRangeListOldValue: [],
          criteriaValuesOldValue: [],
        },
      },
    ],
  };

  const [selectedTemplateType, setSelectedTemplateType] = useState(
    templateTypes[0]
  );
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleClose = () => {
    setSelectedTemplate(null);
    setSelectedTemplateType(templateTypes[0]);
    onClose();
  };

  const handleAddRule = async (sectionId, sectionName, ruleConfig) => {
    // Add Rule
    await dispatch(
      addNewRule({
        ruleConfig: {
          ...ruleConfig,
          dynamicRacRuleId: `Rule-${Date.now()}`,
          history: { ...history, creationDate: new Date().toISOString() },
        },
      })
    ).unwrap();

    // First, fetch the option list
    await dispatch(fetchOptionList(racId)).unwrap();

    // After fetching the option list, fetch the dynamic RAC details
    await dispatch(fetchDynamicRacDetails(racId));

    handleClose();
  };

  console.log(selectedTemplate);

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
                  className={`flex flex-col gap-2 p-4 border-2 bg-white rounded-lg ${
                    selectedTemplate?.dynamicRacRuleId ===
                      template.dynamicRacRuleId && "border-blue-500"
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <p className="flex justify-between items-center">
                    <span className="font-semibold">{convertToReadableString(template.name)}</span>
                    {selectedTemplateType.name !== "All templates" && (
                      <span className="bg-gray-100 text-gray-500 text-[10px] font-semibold px-2 py-1 rounded ">
                        {selectedTemplateType.name}
                      </span>
                    )}
                  </p>
                  {template.fieldType === "STRING" ? (
                    <p className="text-xs text-gray-600">
                      {generateStringSentence(template)}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-600">
                      {generateNumberSentence(template)}
                    </p>
                  )}

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
            buttonType={"tertiary"}
            onClick={handleClose}
          />

          <Button
            buttonName="Use This Template"
            rectangle={true}
            disabled={!selectedTemplate}
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
