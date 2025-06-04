import React, { useState } from "react";
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
import Modal from "../Common/Modal/Modal";

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

    // After fetching the option list, fetch the Decision Engine details
    await dispatch(fetchDynamicRacDetails(racId));

    handleClose();
  };

  console.log(selectedTemplate);

  return (
    <>
      <Modal
        title={"Use Template"}
        primaryButtonName="Use This Template"
        primaryOnClick={() =>
          handleAddRule(sectionId, sectionName, selectedTemplate)
        }
        primaryDisabled={!selectedTemplate}
        secondaryOnClick={handleClose}
        modalWidth={"lg:w-3/4"}
      >
        <div className="lg:flex h-[60vh] gap-4">
          {/* Left Section - Template Types */}
          <div className="flex overflow-auto lg:w-[20%] border-r dark:border-gray-600 lg:flex-col gap-3 mb-4 lg:mb-0 pb-3 lg:pr-4">
            {templateTypes.map((type) => (
              <div
                key={type.id}
                className={`min-w-36 p-2 border dark:border-gray-600 rounded-lg cursor-pointer text-center ${
                  selectedTemplateType.id === type.id
                    ? "bg-sky-500/20 text-sky-700"
                    : "bg-white dark:bg-gray-800"
                }`}
                onClick={() => setSelectedTemplateType(type)}
              >
                {type.name}
              </div>
            ))}
          </div>

          {/* Right Section - Templates List */}
          <div className="lg:w-[80%] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-3 dark:text-gray-200">
              Available Templates
            </h2>
            <div className="grid lg:grid-cols-2 gap-3">
              {templates[selectedTemplateType.id].map((template, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-2 p-4 border-2 bg-white dark:bg-gray-800 rounded-lg dark:border-gray-600 ${
                    selectedTemplate?.dynamicRacRuleId ===
                      template.dynamicRacRuleId && "border-blue-500"
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <p className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800 dark:text-gray-200 ">
                      {convertToReadableString(template.name)}
                    </span>
                    {selectedTemplateType.name !== "All templates" && (
                      <span className="text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-500 text-[10px] font-semibold px-2 py-1 rounded ">
                        {selectedTemplateType.name}
                      </span>
                    )}
                  </p>
                  {template.fieldType === "STRING" ? (
                    <p className="text-xs text-gray-600 dark:text-gray-200">
                      {generateStringSentence(template)}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-600 dark:text-gray-200">
                      {generateNumberSentence(template)}
                    </p>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    {template.usageList.map((templateUsage) => {
                      if (templateUsage.used) {
                        return (
                          <p className="bg-sky-500/20 w-fit rounded-xl px-2 text-sky-700 text-[10px] py-1">
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
      </Modal>
    </>
  );
};

export default ViewTemplateModal;
