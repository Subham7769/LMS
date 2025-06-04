import { useDispatch } from "react-redux";
import {
  deleteRuleById,
  removeRule,
  updateStatus,
  fetchDynamicRacDetails,
  fetchOptionList,
  setCurrentRule,
  restoreRule,
} from "../../redux/Slices/dynamicRacSlice";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import {
  PlusIcon,
  EyeIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationCircleIcon
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
import getConditionForOperators from "./getConditionForOperators";
import { convertDate } from "../../utils/convertDate";
import HoverButtonNew from "../Common/HoverButtonNew/HoverButtonNew";
import { ViewerRolesDynamicRac, EditorRolesDynamicRac } from '../../data/RoleBasedAccessAndView'
import { DeleteIcon, EditIcon } from "../../assets/icons";
import Toolbox from "./ToolBox";


const RuleComponent = ({
  rule,
  racId,
  dynamicRacRuleId,
  sectionId,
  sectionName,
  handleSaveDynamicRAC,
  showRuleModal,
  setShowRuleModal,
  isEditMode,
  setIsEditMode
}) => {
  const dispatch = useDispatch();
  const { roleName } = useSelector((state) => state.auth);
  const [reviewComment, setReviewComment] = useState("");

  const handleRemoveRule = async (sectionId, dynamicRacRuleId) => {
    try {
      // First dispatch: removeRule
      // dispatch(removeRule({ sectionId, dynamicRacRuleId }));
      // console.log("removeRule");

      // Second dispatch: deleteRuleById
      await dispatch(deleteRuleById(dynamicRacRuleId)).unwrap();
      // console.log("deleteRuleById");

      // Fourth dispatch: fetchOptionList
      await dispatch(fetchOptionList(racId)).unwrap();
      // console.log("fetchOptionList");

      // Third dispatch: fetchDynamicRacDetails
      await dispatch(fetchDynamicRacDetails(racId)).unwrap();
      // console.log("fetchDynamicRacDetails");
    } catch (error) {
      console.error("Error while performing operations: ", error);
    }
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
    // console.log("fetchOptionList");

    await dispatch(fetchDynamicRacDetails(racId)).unwrap();
    // console.log("fetchDynamicRacDetails");
    setReviewComment("");
  };

  const handleEdit = () => {
    dispatch(setCurrentRule({ sectionId, dynamicRacRuleId }));
    setShowRuleModal(true);
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    dispatch(restoreRule({ sectionId, dynamicRacRuleId }));
    setShowRuleModal(false);
    setIsEditMode(false);
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

  const ViewRuleAction = ({ rule, actions = false }) => {
    return (
      <div className="p-5 rounded-lg border dark:border-gray-700">
        <div className="flex flex-col gap-3">
          {/* Rule Status Pill */}
          <div className="flex justify-between items-center">
            <StatusPill rule={rule} />
            {/* Actions */}
            {actions &&
              !(
                rule?.needDeleteApprove &&
                ["CREATED", "REJECTED", "APPROVED"].includes(rule?.status)
              ) && (
                <div className="flex gap-5">
                  <Button
                    buttonIcon={EditIcon}
                    onClick={handleEdit}
                    buttonType="secondary"
                  />
                  <Button
                    buttonIcon={DeleteIcon}
                    onClick={handleEdit}
                    buttonType="destructive"
                  />
                </div>
              )}
          </div>

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
            <span className="font-bold text-3xl mx-2 relative -top-0.5">.</span>{" "}
            {convertDate(
              rule?.history?.lastUpdatedDate || rule?.history?.creationDate
            )}
          </p>
        </div>
      </div>
    );
  }

  const ViewRuleAccordion = ({ rule }) => {
    const [ReviewComment, setReviewComment] = useState("");

    const handleInputChange = (e) => {
      setReviewComment(e.target.value); // Only update local state
    };

    return (<Accordion
      isOpen={true}
      headerComponent={
        <div className="flex gap-2">
          <StatusPill rule={rule} />
          {/* <p>{convertToReadableString(rule?.name)}</p> */}
        </div>
      }
    >
      <div className="p-3 flex flex-col gap-3">
        {/* New Addition */}
        {rule?.history?.updateBy === null &&
          !rule?.needDeleteApprove && (
            <div className="p-3 flex flex-col gap-3 text-sm text-green-500 font-semibold bg-green-50 dark:bg-gray-700 rounded-lg">
              <span className="flex justify-start align-middle">
                <EyeIcon className="h-5 w-5 mr-2 " />
                Proposed Value
              </span>
              <p className="text-gray-700 dark:text-gray-200">
                {/* Rule Main Literature Text for Number */}
                {rule?.fieldType === "NUMBER" && (
                  <span>
                    {generateNumberSentence({
                      usageList:rule?.usageList,
                      name: rule?.name,
                      firstOperator: rule?.firstOperator,
                      secondOperator: rule?.secondOperator,
                      numberCriteriaRangeList:
                        rule?.history?.updateBy === null
                          ? rule?.numberCriteriaRangeList
                          : rule?.history
                            ?.numberCriteriaRangeListOldValue,
                    })}
                  </span>
                )}
                {/* Rule Main Literature Text for String */}
                {rule?.fieldType === "STRING" && (
                  <span>
                    {generateStringSentence({
                      usageList:rule?.usageList,
                      name: rule?.name,
                      blocked: rule?.blocked,
                      criteriaValues:
                        rule?.history?.updateBy === null
                          ? rule?.criteriaValues
                          : rule?.history?.criteriaValuesOldValue,
                    })}
                  </span>
                )}
              </p>
            </div>
          )}

        {/* Approved Deleted Value */}
        {rule?.needDeleteApprove && (
          <div className="p-3 flex flex-col gap-3 text-sm text-blue-500 font-semibold bg-blue-50 dark:bg-gray-700 rounded-lg">
            <span className="flex justify-start align-middle">
              <EyeIcon className="h-5 w-5 mr-2 " />
              Current Value
            </span>
            <p className="text-gray-700 dark:text-gray-200">
              {/* Rule Main Literature Text for Number */}
              {rule?.fieldType === "NUMBER" && (
                <span>
                  {generateNumberSentence({
                    usageList:rule?.usageList,
                    name: rule?.name,
                    firstOperator: rule?.firstOperator,
                    secondOperator: rule?.secondOperator,
                    numberCriteriaRangeList:
                      rule?.numberCriteriaRangeList,
                  })}
                </span>
              )}
              {/* Rule Main Literature Text for String */}
              {rule?.fieldType === "STRING" && (
                <span>
                  {generateStringSentence({
                    usageList:rule?.usageList,
                    name: rule?.name,
                    blocked: rule?.blocked,
                    criteriaValues: rule?.criteriaValues,
                  })}
                </span>
              )}
            </p>
          </div>
        )}

        {/* Version Section */}
        {rule?.history?.updateBy !== null &&
          !rule?.needDeleteApprove && (
            <div className="grid grid-cols-2 gap-5">
              <div className="p-3 flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700 rounded-lg">
                <span className="flex justify-start align-middle">
                  <EyeIcon className="h-5 w-5 mr-2 " />
                  Previous Version
                </span>
                <p className="text-gray-700 dark:text-gray-200">
                  {/* Rule Main Literature Text for Number */}
                  {rule?.fieldType === "NUMBER" && (
                    <span>
                      {generateNumberSentence({
                        usageList:rule?.usageList,
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
                    </span>
                  )}
                  {/* Rule Main Literature Text for String */}
                  {rule?.fieldType === "STRING" && (
                    <span>
                      {generateStringSentence({
                        usageList:rule?.usageList,
                        name: rule?.name,
                        blocked: rule?.blocked,
                        criteriaValues:
                          rule?.history.updateBy === null
                            ? rule?.criteriaValues
                            : rule?.history.criteriaValuesOldValue,
                      })}
                    </span>
                  )}
                </p>
              </div>
              <div className="p-3 flex flex-col gap-3 text-sm text-blue-500 font-semibold bg-blue-50 dark:bg-gray-700 rounded-lg">
                <span className="flex justify-start align-middle">
                  <ExclamationCircleIcon className="h-5 w-5 mr-2 " />
                  New Version
                </span>
                <p className="text-gray-700 dark:text-gray-200">
                  {/* Rule Main Literature Text for Number */}
                  {rule?.fieldType === "NUMBER" && (
                    <span>{generateNumberSentence(rule)}</span>
                  )}
                  {/* Rule Main Literature Text for String */}
                  {rule?.fieldType === "STRING" && (
                    <span>{generateStringSentence(rule)}</span>
                  )}
                </p>
              </div>
            </div>
          )}

        {/* Risk Assessment */}
        {/* <div className="p-3 flex flex-col gap-3 text-sm text-red-500 font-semibold bg-red-50 dark:bg-gray-700 rounded-lg">
          <span className="flex justify-start align-middle">
            <ExclamationCircleIcon className="h-5 w-5 mr-2 " />
            Risk Assessment
          </span>
          <p className="text-gray-700 dark:text-gray-200">
            These changes may cause product financial effects.
          </p>
        </div> */}

        {/* Review Comment */}
        {!rule?.needDeleteApprove && (
          <div>
            <InputTextArea
              labelName={"Review Comments"}
              inputName={"reviewComments"}
              inputValue={ReviewComment}
              onChange={handleInputChange}
              placeHolder={`Enter your review comments...`}
            />
          </div>
        )}

        {/* Approve/Reject  */}
        <div className="grid grid-cols-2 gap-5 px-5 w-[100%]">
          <HoverButtonNew
            buttonIcon={XMarkIcon}
            buttonName="Reject"
            onClick={() =>
              handleStatusChange({
                dynamicRacRuleId,
                status: "REJECTED",
                reviewComment:ReviewComment,
              })
            }
            color="red"
          />
          <HoverButtonNew
            buttonIcon={CheckIcon}
            buttonName="Approve"
            onClick={() =>
              handleStatusChange({
                dynamicRacRuleId,
                status: "APPROVED",
                reviewComment:ReviewComment,
              })
            }
            color="green"
          />
        </div>
      </div>
    </Accordion>)
  }
  

  return (
    <>
      <Toolbox
        isOpen={showRuleModal}
        isEditMode={isEditMode}
        onClose={cancelEdit}
        sectionId={sectionId}
        sectionName={sectionName}
      />
      {/* Maker UI View Rule with Actions*/}
      {(roleName == "ROLE_MAKER_ADMIN") && (
        <ViewRuleAction rule={rule} actions={true} />
      )}

      {/* Checker UI View Rule without Actions*/}
      {(roleName == "ROLE_CHECKER_ADMIN" &&
        (rule?.status !== "CREATED" && !rule?.needDeleteApprove)) && (
          <ViewRuleAction rule={rule} actions={false} />
        )}

      {/* Checker UI View Rule with Approval*/}
      {(roleName == "ROLE_CHECKER_ADMIN") &&
        (rule?.status === "CREATED" || rule?.needDeleteApprove) && (
          <ViewRuleAccordion rule={rule} />
        )}

      {/* EditorRoles's UI View Rule with Actions & Approval */}
      {(EditorRolesDynamicRac.includes(roleName)) && (
        (rule?.status === "CREATED" || rule?.needDeleteApprove) ? (
          <ViewRuleAccordion rule={rule} />
        ) : (
          <ViewRuleAction rule={rule} actions={true} />
        )
      )}

      {/* ViewerRoles's UI View Rule without Actions & Approval */}
      {(ViewerRolesDynamicRac.includes(roleName)) && (
        <ViewRuleAction rule={rule} actions={false} />
      )}

    </>
  );
};

export default RuleComponent;
