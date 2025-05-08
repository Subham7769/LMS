import { useEffect } from "react";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRulePolicyData,
  setInputList,
  updateFinanceAmountWithTenureRules,
  updateInputListItem,
  setMaxFinAmtRules,
  createMaxFinAmtEntry,
  deleteMaxFinAmtEntry,
} from "../../redux/Slices/rulePolicySlice";
import ListTable from "../Common/ListTable/ListTable";
import { validateForm } from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { AddIcon, DeleteIcon, EditIcon } from "../../assets/icons";

const MaxFinAmtTen = ({ FAWTData, loading, error }) => {
  const { rulePolicyId } = useParams();
  const dispatch = useDispatch();
  const inputList = useSelector((state) => state.rulePolicy.inputList);
  const maxFinAmtRules = useSelector(
    (state) => state.rulePolicy.maxFinAmtRules
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    const filteredData = FAWTData.filter(
      (item) => item.rulePolicyTempId === rulePolicyId
    );
    dispatch(setInputList(filteredData));
  }, [FAWTData]);

  const handleRuleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setMaxFinAmtRules({ [name]: value, rulePolicyTempId: rulePolicyId })
    );
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    dispatch(updateInputListItem({ index, name, value })); // Dispatch the update action
  };

  const handleDelete = async (index) => {
    const ruleToDelete = inputList[index];
    try {
      await dispatch(
        deleteMaxFinAmtEntry({
          rulePolicyId,
          ruleName: ruleToDelete.ruleName,
        })
      ).unwrap();
      dispatch(fetchRulePolicyData(rulePolicyId));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = async (index) => {
    const dataToValidate = tableDataWithoutId[index];
    await dispatch(validateForm(dataToValidate));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      try {
        await dispatch(updateFinanceAmountWithTenureRules(inputList)).unwrap();
        dispatch(fetchRulePolicyData(rulePolicyId));
      } catch (error) {
        console.error("Error during update:", error);
      }
    }
  };

  const CreateEntry = async () => {
    await dispatch(validateForm(maxFinAmtRules));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      try {
        await dispatch(createMaxFinAmtEntry()).unwrap();
        dispatch(fetchRulePolicyData(rulePolicyId));
      } catch (error) {
        console.error("Error during create:", error);
      }
    }
  };

  const ActionList = !hasViewOnlyAccess(roleName)
    ? [
        {
          icon: EditIcon,
          circle: true,
          action: handleUpdate,
          type: "secondary",
        },
        {
          icon: DeleteIcon,
          circle: true,
          action: handleDelete,
          type: "destructive",
        },
      ]
    : [];

  const tableDataWithoutId = inputList.map(
    ({ ruleName, rulePolicyTempId, fieldType, ...rest }) => rest
  );

  const MaxFinAmtHeaderList = !hasViewOnlyAccess(roleName)
    ? ["Finance Amount", "tenure", "Actions"] // Show "Actions" for non-viewers
    : ["Finance Amount", "tenure"];

  return (
    <>
      <ContainerTile loading={loading} className={"p-5"}>
        {/* <div className="text-lg mb-5">Max Finance Amount With Tenure</div> */}
        {!hasViewOnlyAccess(roleName) ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 items-end">
            <InputNumber
              labelName={"Amount"}
              inputName={"financeAmount"}
              inputValue={maxFinAmtRules.financeAmount}
              onChange={handleRuleChange}
              placeHolder={"999"}
              isValidation={true}
              isIndex={maxFinAmtRules.dataIndex}
            />
            <InputNumber
              labelName={"Tenure as per Product"}
              inputName={"tenure"}
              inputValue={maxFinAmtRules.tenure}
              onChange={handleRuleChange}
              placeHolder={"6"}
              isValidation={true}
              isIndex={maxFinAmtRules.dataIndex}
            />
            <div className="col-span-2 text-right md:col-span-1 md:text-left">
              <Button
                buttonIcon={AddIcon}
                buttonName="Add"
                onClick={CreateEntry}
                buttonType="secondary"
              />
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="mt-6">
          {tableDataWithoutId.length > 0 ? (
            <ListTable
              ListName="Max Finance Amount With Tenure"
              ListNameLength={tableDataWithoutId.length}
              ListHeader={MaxFinAmtHeaderList}
              ListItem={tableDataWithoutId}
              ListAction={ActionList}
              handleEditableFields={handleChange}
              Sortable={true}
              PageSize={5}
            />
          ) : (
            <div className="px-6 py-4 text-center text-gray-500">
              No data to show yet
            </div>
          )}
        </div>
      </ContainerTile>
    </>
  );
};

export default MaxFinAmtTen;
