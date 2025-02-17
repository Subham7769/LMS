import { useDispatch } from "react-redux";
import {
  deleteRuleById,
  addRule,
  removeRule,
  updateStatus,
  fetchDynamicRacDetails,
  fetchOptionList,
  updateRuleNumberCriteria,
  handleChangeStringRule,
  handleChangeBlocked,
  setCurrentRule,
  restoreRule,
} from "../../redux/Slices/dynamicRacSlice";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputTextMulti from "../Common/InputTextMulti/InputTextMulti";
import { operatorOptions, conditionsOptions } from "../../data/OptionsData";
import {
  PlusIcon,
  EyeIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  PlusCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import convertToReadableString from "../../utils/convertToReadableString";
import generateNumberSentence from "./generateNumberSentence";
import generateStringSentence from "./generateStringSentence";
import Accordion from "../Common/Accordion/Accordion";
import Button from "../Common/Button/Button";
import StatusPill from "../Common/StatusPill/StatusPill";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import getOperatorsForCondition from "./getOperatorsForCondition";
import getConditionForOperators from "./getConditionForOperators";
import {
  validateForm,
  validateUserRole,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { convertDate } from "../../utils/convertDate";
import ViewRuleModal from "./ViewRuleModal";

const RuleComponent = ({
  rule,
  racId,
  dynamicRacRuleId,
  sectionId,
  sectionName,
  handleSaveDynamicRAC,
}) => {
  const dispatch = useDispatch();
  const { roleName } = useSelector((state) => state.auth);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [reviewComment, setReviewComment] = useState("");

  const handleRemoveRule = async (sectionId, dynamicRacRuleId) => {
    try {
      // First dispatch: removeRule
      // dispatch(removeRule({ sectionId, dynamicRacRuleId }));
      // console.log("removeRule");

      // Second dispatch: deleteRuleById
      await dispatch(deleteRuleById(dynamicRacRuleId)).unwrap();
      console.log("deleteRuleById");

      // Fourth dispatch: fetchOptionList
      await dispatch(fetchOptionList(racId)).unwrap();
      console.log("fetchOptionList");

      // Third dispatch: fetchDynamicRacDetails
      await dispatch(fetchDynamicRacDetails(racId)).unwrap();
      console.log("fetchDynamicRacDetails");
    } catch (error) {
      console.error("Error while performing operations: ", error);
    }
  };

  const handleStringInputChange = (newValues) => {
    console.log(newValues);
    dispatch(
      handleChangeStringRule({ sectionId, dynamicRacRuleId, values: newValues })
    ); // Dispatch to Redux
  };

  const handleBlockedInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(handleChangeBlocked({ sectionId, dynamicRacRuleId, checked })); // Dispatch to Redux
  };

  const handleStatusChange = async ({
    dynamicRacRuleId,
    status,
    reviewComment,
  }) => {
    await dispatch(
      updateStatus({ dynamicRacRuleId, status, reviewComment })
    ).unwrap();

    await dispatch(fetchOptionList(racId)).unwrap();
    console.log("fetchOptionList");

    await dispatch(fetchDynamicRacDetails(racId)).unwrap();
    console.log("fetchDynamicRacDetails");
    setReviewComment("");
  };

  const handleEdit = () => {
    dispatch(setCurrentRule({ sectionId, dynamicRacRuleId }));
    setShowRuleModal(!showRuleModal);
    setIsEditMode(!isEditMode);
  };

  const cancelEdit = () => {
    dispatch(restoreRule({ sectionId, dynamicRacRuleId }));
    setShowRuleModal(!showRuleModal);
    setIsEditMode(!isEditMode);
  };

  const saveEdit = () => {
    setShowRuleModal(!showRuleModal);
    setIsEditMode(!isEditMode);
    handleSaveDynamicRAC();
  };

  const StatusButton = ({
    buttonIcon: ButtonIcon,
    buttonName,
    onClick,
    color,
  }) => {
    return (
      <div
        onClick={onClick}
        className={`p-3 flex flex-col justify-center items-center text-sm font-semibold rounded-lg hover:cursor-pointer 
        text-${color}-500 bg-${color}-50 hover:text-white hover:bg-${color}-500 transition-all duration-300 ease-in-out hover:scale-105`}
      >
        <div className="flex">
          <ButtonIcon className="h-5 w-5 mr-2" />
          {buttonName}
        </div>
      </div>
    );
  };

  // Edit Number Config
  const { racConfig, optionsList } = useSelector((state) => state.dynamicRac);
  const { sections } = racConfig;
  const [ruleConfig, setRuleConfig] = useState(rule);
  const { firstOperator, secondOperator, numberCriteriaRangeList } = rule;

  const minimum = numberCriteriaRangeList
    ? numberCriteriaRangeList[0]?.minimum
    : null;

  const maximum = numberCriteriaRangeList
    ? numberCriteriaRangeList[0]?.maximum
    : null;

  const initialMinValue = -Number(import.meta.env.VITE_MIN_MAX_LIMIT);
  const initialMaxValue = Number(import.meta.env.VITE_MIN_MAX_LIMIT);

  const [equalValue, setEqualValue] = useState(0);
  const [minValue, setMinValue] = useState(minimum);
  const [maxValue, setMaxValue] = useState(maximum);
  const [condition, setCondition] = useState(
    getConditionForOperators(firstOperator, secondOperator, minimum, maximum)
  );

  useEffect(() => {
    // Update condition whenever any of the values change
    const newCondition = getConditionForOperators(
      firstOperator,
      secondOperator,
      minimum,
      maximum
    );
    setCondition(newCondition);
  }, [firstOperator, secondOperator, minimum, maximum]); // Re-run effect when any of these dependencies change

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

  return (
    <>
      <ViewRuleModal
        isOpen={showRuleModal}
        isEditMode={isEditMode}
        onClose={cancelEdit}
        sectionId={sectionId}
        sectionName={sectionName}
        rule={rule}
      />
      {/* Maker/Checker UI */}
      {(roleName == "ROLE_MAKER_ADMIN" ||
        (roleName == "ROLE_CHECKER_ADMIN" &&
          rule?.status !== "CREATED" &&
          !rule?.needDeleteApprove) ||
        roleName == "ROLE_ADMIN" ||
        roleName === "ROLE_SUPERADMIN") && (
        <div className="flex flex-col justify-between items-center p-2 rounded-lg border ">
          {!showRuleModal && (
            <div className="flex justify-between items-center p-2 w-[100%]">
              {/* <ChevronUpDownIcon className="h-5 w-5 hover:text-indigo-500 hover:cursor-pointer hover:bg-slate-200" /> */}
              <div className="flex-1 p-3 flex flex-col gap-3">
                {/* Rule Status Pill */}
                <StatusPill rule={rule} />

                {/* Rule Main Literature Text for Number */}
                {rule?.fieldType === "NUMBER" && (
                  <h2>{generateNumberSentence(rule)}</h2>
                )}

                {/* Rule Main Literature Text for String */}
                {rule?.fieldType === "STRING" && (
                  <h2>{generateStringSentence(rule)}</h2>
                )}

                {/* Rule sub-main Literature Text with status */}
                <p className={"text-sm text-gray-500"}>
                  {rule?.status === "CREATED"
                    ? rule?.history?.updateBy
                      ? "Modified"
                      : "Newly Added"
                    : rule?.status === "REJECTED"
                    ? "Rejected"
                    : rule?.status === "APPROVED"
                    ? "Approved"
                    : rule?.status}{" "}
                  By {rule?.history?.updateBy || rule?.history?.createdBy}{" "}
                  <span className="font-bold text-3xl mx-2">.</span>{" "}
                  {convertDate(
                    rule?.history?.lastUpdatedDate ||
                      rule?.history?.creationDate
                  )}
                </p>
              </div>

              {/* Actions */}
              {(roleName == "ROLE_MAKER_ADMIN" ||
                roleName == "ROLE_ADMIN" ||
                roleName === "ROLE_SUPERADMIN") && (
                <div className="flex gap-5 flex-col">
                  {!(
                    rule?.needDeleteApprove &&
                    (rule?.status === "REJECTED" ||
                      rule?.status === "APPROVED" ||
                      rule?.status === "CREATED")
                  ) && (
                    <>
                      <PencilIcon
                        onClick={handleEdit}
                        className="h-5 w-5  hover:text-indigo-500 hover:cursor-pointer"
                      />
                      <TrashIcon
                        onClick={() =>
                          handleRemoveRule(sectionId, rule?.dynamicRacRuleId)
                        }
                        className="h-5 w-5  hover:text-red-500 hover:cursor-pointer"
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Checker UI with new API*/}
      {(roleName == "ROLE_CHECKER_ADMIN" ||
        roleName == "ROLE_ADMIN" ||
        roleName === "ROLE_SUPERADMIN") &&
        (rule?.status === "CREATED" || rule?.needDeleteApprove) && (
          <>
            <Accordion
              isOpen={true}
              headerComponent={
                <div className="flex gap-2">
                  <StatusPill rule={rule}/>
                  <p>{convertToReadableString(rule?.name)}</p>
                </div>
              }
            >
              <div className="p-3 flex flex-col gap-3">
                {/* New Addition */}
                {rule?.history?.updateBy === null &&
                  !rule?.needDeleteApprove && (
                    <div className="p-3 flex flex-col gap-3 text-sm text-green-500 font-semibold bg-green-50 rounded-lg">
                      <span className="flex justify-start align-middle">
                        <EyeIcon className="h-5 w-5 mr-2 " />
                        Proposed Value
                      </span>
                      <p className="text-gray-700">
                        {/* Rule Main Literature Text for Number */}
                        {rule?.fieldType === "NUMBER" && (
                          <h2>
                            {generateNumberSentence({
                              name: rule?.name,
                              firstOperator: rule?.firstOperator,
                              secondOperator: rule?.secondOperator,
                              numberCriteriaRangeList:
                                rule?.history?.updateBy === null
                                  ? rule?.numberCriteriaRangeList
                                  : rule?.history
                                      ?.numberCriteriaRangeListOldValue,
                            })}
                          </h2>
                        )}
                        {/* Rule Main Literature Text for String */}
                        {rule?.fieldType === "STRING" && (
                          <h2>
                            {generateStringSentence({
                              name: rule?.name,
                              blocked: rule?.blocked,
                              criteriaValues:
                                rule?.history?.updateBy === null
                                  ? rule?.criteriaValues
                                  : rule?.history?.criteriaValuesOldValue,
                            })}
                          </h2>
                        )}
                      </p>
                    </div>
                  )}

                {/* Approved Deleted Value */}
                {rule?.needDeleteApprove && (
                  <div className="p-3 flex flex-col gap-3 text-sm text-blue-500 font-semibold bg-blue-50 rounded-lg">
                    <span className="flex justify-start align-middle">
                      <EyeIcon className="h-5 w-5 mr-2 " />
                      Current Value
                    </span>
                    <p className="text-gray-700">
                      {/* Rule Main Literature Text for Number */}
                      {rule?.fieldType === "NUMBER" && (
                        <h2>
                          {generateNumberSentence({
                            name: rule?.name,
                            firstOperator: rule?.firstOperator,
                            secondOperator: rule?.secondOperator,
                            numberCriteriaRangeList:
                              rule?.history.updateBy !== null
                                ? rule?.numberCriteriaRangeList
                                : rule?.history.numberCriteriaRangeListOldValue,
                          })}
                        </h2>
                      )}
                      {/* Rule Main Literature Text for String */}
                      {rule?.fieldType === "STRING" && (
                        <h2>
                          {generateStringSentence({
                            name: rule?.name,
                            blocked: rule?.blocked,
                            criteriaValues:
                              rule?.history.updateBy !== null
                                ? rule?.criteriaValues
                                : rule?.history.criteriaValuesOldValue,
                          })}
                        </h2>
                      )}
                    </p>
                  </div>
                )}

                {/* Version Section */}
                {rule?.history?.updateBy !== null &&
                  !rule?.needDeleteApprove && (
                    <div className="grid grid-cols-2 gap-5">
                      <div className="p-3 flex flex-col gap-3 text-sm text-gray-500 font-semibold bg-gray-50 rounded-lg">
                        <span className="flex justify-start align-middle">
                          <EyeIcon className="h-5 w-5 mr-2 " />
                          Previous Version
                        </span>
                        <p className="text-gray-700">
                          {/* Rule Main Literature Text for Number */}
                          {rule?.fieldType === "NUMBER" && (
                            <h2>
                              {generateNumberSentence({
                                name: rule?.name,
                                firstOperator:
                                  rule?.history.firstOperatorOldValue,
                                secondOperator:
                                  rule?.history.secondOperatorOldValue,
                                numberCriteriaRangeList:
                                  rule?.history.updateBy === null
                                    ? rule?.numberCriteriaRangeList
                                    : rule?.history
                                        .numberCriteriaRangeListOldValue,
                              })}
                            </h2>
                          )}
                          {/* Rule Main Literature Text for String */}
                          {rule?.fieldType === "STRING" && (
                            <h2>
                              {generateStringSentence({
                                name: rule?.name,
                                blocked: rule?.blocked,
                                criteriaValues:
                                  rule?.history.updateBy === null
                                    ? rule?.criteriaValues
                                    : rule?.history.criteriaValuesOldValue,
                              })}
                            </h2>
                          )}
                        </p>
                      </div>
                      <div className="p-3 flex flex-col gap-3 text-sm text-blue-500 font-semibold bg-blue-50 rounded-lg">
                        <span className="flex justify-start align-middle">
                          <ExclamationCircleIcon className="h-5 w-5 mr-2 " />
                          New Version
                        </span>
                        <p className="text-gray-700">
                          {/* Rule Main Literature Text for Number */}
                          {rule?.fieldType === "NUMBER" && (
                            <h2>{generateNumberSentence(rule)}</h2>
                          )}
                          {/* Rule Main Literature Text for String */}
                          {rule?.fieldType === "STRING" && (
                            <h2>{generateStringSentence(rule)}</h2>
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                {/* Risk Assessment */}
                {/* <div className="p-3 flex flex-col gap-3 text-sm text-red-500 font-semibold bg-red-50 rounded-lg">
                  <span className="flex justify-start align-middle">
                    <ExclamationCircleIcon className="h-5 w-5 mr-2 " />
                    Risk Assessment
                  </span>
                  <p className="text-gray-700">
                    These changes may cause product financial effects.
                  </p>
                </div> */}

                {/* Review Comment */}
                {!rule?.needDeleteApprove && (
                  <div>
                    <InputTextArea
                      labelName={"Review Comments"}
                      inputName={"reviewComments"}
                      inputValue={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeHolder={`Enter your review comments...`}
                    />
                  </div>
                )}

                {/* Approve/Reject  */}
                <div className="grid grid-cols-2 gap-5 px-5 w-[100%]">
                  <StatusButton
                    buttonIcon={XMarkIcon}
                    buttonName="Reject"
                    onClick={() =>
                      handleStatusChange({
                        dynamicRacRuleId,
                        status: "REJECTED",
                        reviewComment,
                      })
                    }
                    color="red"
                  />
                  <StatusButton
                    buttonIcon={CheckIcon}
                    buttonName="Approve"
                    onClick={() =>
                      handleStatusChange({
                        dynamicRacRuleId,
                        status: "APPROVED",
                        reviewComment,
                      })
                    }
                    color="green"
                  />
                </div>
              </div>
            </Accordion>
          </>
        )}
    </>
  );
};

export default RuleComponent;
