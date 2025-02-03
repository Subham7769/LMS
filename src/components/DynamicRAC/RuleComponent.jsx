import { useDispatch } from "react-redux";
import {
  deleteRuleById,
  removeRule,
  updateStatus,
  fetchDynamicRacDetails,
  fetchOptionList,
  updateRuleNumberCriteria,
  handleChangeStringRule,
  handleChangeBlocked,
} from "../../redux/Slices/dynamicRacSlice";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputTextMulti from "../Common/InputTextMulti/InputTextMulti";
import { operatorOptions } from "../../data/OptionsData";
import {
  TrashIcon,
  XCircleIcon,
  PlusCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import convertToReadableString from "../../utils/convertToReadableString";
import generateNumberSentence from "./generateNumberSentence";
import generateStringSentence from "./generateStringSentence";

const RuleComponent = ({
  rule,
  racId,
  dynamicRacRuleId,
  isEditorMode,
  sectionId,
}) => {
  console.log(rule);
  const dispatch = useDispatch();
  const roleName = localStorage.getItem("roleName");

  const handleInputChange = (inputName, value, index) => {
    const updates = {};

    if (inputName === "firstOperator" || inputName === "secondOperator") {
      updates[inputName] = value;
    } else if (inputName === "minimum" || inputName === "maximum") {
      updates.numberCriteriaRangeList = [
        {
          [inputName]: value,
        },
      ];
    }

    dispatch(
      updateRuleNumberCriteria({
        sectionId,
        dynamicRacRuleId: rule.dynamicRacRuleId,
        updates,
        numberCriteriaIndex: index,
      })
    );
  };

  const handleRemoveRule = async (sectionId, dynamicRacRuleId) => {
    try {
      // First dispatch: removeRule
      dispatch(removeRule({ sectionId, dynamicRacRuleId }));
      console.log("removeRule");

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

  const handleStatusChange = async ({ dynamicRacRuleId, status }) => {
    await dispatch(updateStatus({ dynamicRacRuleId, status })).unwrap();

    await dispatch(fetchOptionList(racId)).unwrap();
    console.log("fetchOptionList");

    await dispatch(fetchDynamicRacDetails(racId)).unwrap();
    console.log("fetchDynamicRacDetails");
  };

  switch (rule?.fieldType) {
    case "NUMBER":
      return (
        <div className="flex justify-between items-center gap-2 p-3 rounded-lg border ">
          {isEditorMode && (
            <ChevronUpDownIcon className="h-5 w-5 mt-4 hover:text-indigo-500 hover:cursor-pointer hover:bg-slate-200" />
          )}
          <div className="flex-1 p-5 flex flex-col gap-4">
            {/* Rule Status Pill */}
            <div
              className={`px-2 w-fit py-1 rounded-full text-sm font-semibold ${
                rule.status === "CREATED"
                  ? "bg-yellow-100 text-yellow-700"
                  : rule.status === "REJECTED"
                  ? "bg-red-100 text-red-700"
                  : rule.status === "APPROVED"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700" // Default case
              }`}
            >
              {rule.status === "CREATED" ? (
                <div className={"flex justify-start align-middle gap-1"}>
                  <ClockIcon className={`h-5 w-5`} />
                  Pending Approval
                </div>
              ) : rule.status === "REJECTED" ? (
                <div className={"flex justify-start align-middle gap-1"}>
                  <XCircleIcon className={`h-5 w-5`} />
                  Rejected
                </div>
              ) : rule.status === "APPROVED" ? (
                <div className={"flex justify-start align-middle gap-1"}>
                  <CheckCircleIcon className={`h-5 w-5`} />
                  Approved
                </div>
              ) : (
                rule.status
              )}{" "}
            </div>

            {/* Rule Main Literature Text */}
            <h2>{generateNumberSentence(rule)}</h2>

            {/* Rule sub-main Literature Text with status */}
            <p className={"text-sm text-gray-500"}>
              {rule.status === "CREATED"
                ? "Modified"
                : rule.status === "REJECTED"
                ? "Rejected"
                : rule.status === "APPROVED"
                ? "Approved"
                : rule.status}{" "}
              By subham . 23 Dec 2025{" "}
            </p>
          </div>

          {isEditorMode && roleName !== "ROLE_VIEWER" && (
            <TrashIcon
              onClick={() => handleRemoveRule(sectionId, rule.dynamicRacRuleId)}
              className="h-5 w-5 mt-4 hover:text-red-500 hover:cursor-pointer"
            />
          )}

          {/* <div className="py-2 w-full">
            <div
              className={`border-2 rounded-lg py-2 ${
                isEditorMode && "bg-gray-100"
              }`}
            >
              {rule.numberCriteriaRangeList.map((range, index) => (
                <div key={index} className="flex-1 grid grid-cols-4 gap-2">
                  <InputSelect
                    labelName="First Operator"
                    inputOptions={operatorOptions}
                    inputName="firstOperator"
                    inputValue={rule.firstOperator} // Use range.firstOperator instead of rule.firstOperator
                    onChange={(e) =>
                      handleInputChange("firstOperator", e.target.value, index)
                    }
                    disabled={isEditorMode || rule?.status === "REJECTED"}
                    isValidation={true}
                    isSectionId={sectionId}
                    isRuleId={dynamicRacRuleId}
                  />
                  <InputNumber
                    labelName="Min"
                    inputName="minimum"
                    inputValue={
                      range.minimum !== null && range.minimum !== undefined
                        ? parseInt(range.minimum)
                        : ""
                    } // Use range.minimum instead of rule.numberCriteriaRangeList[index].minimum
                    onChange={(e) =>
                      handleInputChange("minimum", e.target.value, index)
                    }
                    placeholder="0"
                    disabled={isEditorMode || rule?.status === "REJECTED"}
                    isValidation={true}
                    isSectionId={sectionId}
                    isRuleId={dynamicRacRuleId}
                    isRangeIndex={index}
                  />
                  <InputSelect
                    labelName="Second Operator"
                    inputOptions={operatorOptions}
                    inputName="secondOperator"
                    inputValue={rule.secondOperator} // Use range.secondOperator instead of rule.secondOperator
                    onChange={(e) =>
                      handleInputChange("secondOperator", e.target.value, index)
                    }
                    disabled={isEditorMode || rule?.status === "REJECTED"}
                    isValidation={true}
                    isSectionId={sectionId}
                    isRuleId={dynamicRacRuleId}
                  />
                  <InputNumber
                    labelName="Max"
                    inputName="maximum"
                    inputValue={
                      range.maximum !== null && range.maximum !== undefined
                        ? parseInt(range.maximum)
                        : ""
                    } // Use range.maximum instead of rule.numberCriteriaRangeList[index].maximum
                    onChange={(e) =>
                      handleInputChange("maximum", e.target.value, index)
                    }
                    placeholder="0"
                    disabled={isEditorMode || rule?.status === "REJECTED"}
                    isValidation={true}
                    isSectionId={sectionId}
                    isRuleId={dynamicRacRuleId}
                    isRangeIndex={index}
                  />
                </div>
              ))}
            </div>
          </div> */}

          {/* {roleName !== "ROLE_MAKER_ADMIN" &&
            roleName !== "ROLE_VIEWER" &&
            isEditorMode &&
            rule?.status === "REJECTED" &&
            roleName !== "ROLE_CHECKER_ADMIN" && (
              <div className="relative group">
                <PlusCircleIcon
                  onClick={() =>
                    handleStatusChange({ dynamicRacRuleId, status: "CREATED" })
                  }
                  className="h-5 w-5 mt-4 text-green-600 hover:text-green-800 hover:cursor-pointer"
                />

                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full hidden group-hover:block bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                  CREATE
                </div>
              </div>
            )} */}

          {/* Blocked Checkbox */}
          {/* <div className="relative group">
            <InputCheckbox
              labelName="Block"
              inputChecked={rule.blocked}
              onChange={handleBlockedInputChange}
              inputName="blocked"
              className={"text-[10px]"}
              upperLabel={true}
            />
          </div> */}
          
          {/* {roleName !== "ROLE_MAKER_ADMIN" &&
            roleName !== "ROLE_VIEWER" &&
            isEditorMode &&
            rule?.status === "CREATED" && (
              <>
                <div className="relative group">
                  <CheckCircleIcon
                    onClick={() =>
                      handleStatusChange({
                        dynamicRacRuleId,
                        status: "APPROVED",
                      })
                    }
                    className="h-5 w-5 mt-4 text-green-600 hover:text-green-800 hover:cursor-pointer"
                  />

                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full hidden group-hover:block bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                    Approve
                  </div>
                </div>

                <div className="relative group">
                  <XCircleIcon
                    onClick={() =>
                      handleStatusChange({
                        dynamicRacRuleId,
                        status: "REJECTED",
                      })
                    }
                    className="h-5 w-5 mt-4 text-red-600 hover:text-red-800 hover:cursor-pointer"
                  />

                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full hidden group-hover:block bg-red-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                    Reject
                  </div>
                </div>
              </>
            )} */}
        </div>
      );

    case "STRING":
      return (
        <div className="flex justify-between items-center gap-2 p-3 rounded-lg border ">
          <ChevronUpDownIcon className="h-5 w-5 hover:text-indigo-500 hover:cursor-pointer hover:bg-slate-200" />
          <div className="flex-1 p-5 flex flex-col gap-4">
            {/* Rule Status Pill */}
            <div
              className={`px-2 w-fit py-1 rounded-full text-sm font-semibold ${
                rule.status === "CREATED"
                  ? "bg-yellow-100 text-yellow-700"
                  : rule.status === "REJECTED"
                  ? "bg-red-100 text-red-700"
                  : rule.status === "APPROVED"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700" // Default case
              }`}
            >
              {rule.status === "CREATED" ? (
                <div className={"flex justify-start align-middle gap-1"}>
                  <ClockIcon className={`h-5 w-5`} />
                  Pending Approval
                </div>
              ) : rule.status === "REJECTED" ? (
                <div className={"flex justify-start align-middle gap-1"}>
                  <XCircleIcon className={`h-5 w-5`} />
                  Rejected
                </div>
              ) : rule.status === "APPROVED" ? (
                <div className={"flex justify-start align-middle gap-1"}>
                  <CheckCircleIcon className={`h-5 w-5`} />
                  Approved
                </div>
              ) : (
                rule.status
              )}{" "}
            </div>

            {/* Rule Main Literature Text */}
            <h2>{generateStringSentence(rule)}</h2>

            {/* Rule sub-main Literature Text with status */}
            <p className={"text-sm text-gray-500"}>
              {rule.status === "CREATED"
                ? "Modified"
                : rule.status === "REJECTED"
                ? "Rejected"
                : rule.status === "APPROVED"
                ? "Approved"
                : rule.status}{" "}
              By subham . 23 Dec 2025{" "}
            </p>
          </div>

          {/* Rule Delete */}
          {isEditorMode && roleName !== "ROLE_VIEWER" && (
            <TrashIcon
              onClick={() => handleRemoveRule(sectionId, rule.dynamicRacRuleId)}
              className="h-5 w-5 hover:text-red-500 hover:cursor-pointer"
            />
          )}

          {/* <InputTextMulti
            label={rule.name}
            inputName={rule.name}
            tag={rule?.criteriaValues}
            setTag={(newValues) => handleStringInputChange(newValues)}
            sectionId={sectionId}
            dynamicRacRuleId={dynamicRacRuleId}
            disabled={isEditorMode || rule?.status === "REJECTED"}
            isValidation={true}
          /> */}

          {/* {roleName !== "ROLE_MAKER_ADMIN" &&
            roleName !== "ROLE_VIEWER" &&
            isEditorMode &&
            rule?.status === "REJECTED" &&
            roleName !== "ROLE_CHECKER_ADMIN" && (
              <div className="relative group">
                <PlusCircleIcon
                  onClick={() =>
                    handleStatusChange({ dynamicRacRuleId, status: "CREATED" })
                  }
                  className="h-5 w-5 mt-4 text-green-600 hover:text-green-800 hover:cursor-pointer"
                />

                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full hidden group-hover:block bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                  CREATE
                </div>
              </div>
            )} */}

          {/* {roleName !== "ROLE_MAKER_ADMIN" &&
            roleName !== "ROLE_VIEWER" &&
            isEditorMode &&
            rule?.status === "CREATED" && (
              <>
                <div className="relative group">
                  <CheckCircleIcon
                    onClick={() =>
                      handleStatusChange({
                        dynamicRacRuleId,
                        status: "APPROVED",
                      })
                    }
                    className="h-5 w-5 mt-4 text-green-600 hover:text-green-800 hover:cursor-pointer"
                  />

                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full hidden group-hover:block bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                    Approve
                  </div>
                </div>

                <div className="relative group">
                  <XCircleIcon
                    onClick={() =>
                      handleStatusChange({
                        dynamicRacRuleId,
                        status: "REJECTED",
                      })
                    }
                    className="h-5 w-5 mt-4 text-red-600 hover:text-red-800 hover:cursor-pointer"
                  />

                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full hidden group-hover:block bg-red-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                    Reject
                  </div>
                </div>
              </>
            )} */}
        </div>
      );

    default:
      return null;
  }
};

export default RuleComponent;
