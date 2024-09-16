import { useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,PencilIcon 
} from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
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
import { MaxFinAmtHeaderList } from "../../data/RulePolicyData";

const MaxFinAmtTen = ({ FAWTData }) => {
  const { rulePolicyId } = useParams();
  const dispatch = useDispatch();
  const inputList = useSelector((state) => state.rulePolicy.inputList);
  const maxFinAmtRules = useSelector(
    (state) => state.rulePolicy.maxFinAmtRules
  );

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
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Delete Successful"}
          message={"The item was deleted successfully"}
        />
      ));
      dispatch(fetchRulePolicyData(rulePolicyId));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updateFinanceAmountWithTenureRules(inputList)).unwrap();
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Update Successful"}
          message={"The item was updated successfully"}
        />
      ));
      dispatch(fetchRulePolicyData(rulePolicyId));
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  const CreateEntry = async () => {
    try {
      await dispatch(createMaxFinAmtEntry()).unwrap();
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Create Successful"}
          message={"The item was created successfully"}
        />
      ));
      dispatch(fetchRulePolicyData(rulePolicyId));
    } catch (error) {
      console.error("Error during create:", error);
    }
  };


  const ActionList = [
    {
      icon: PencilIcon,
      circle: true,
      action: handleUpdate,
    },
    {
      icon: TrashIcon,
      circle: true,
      action: handleDelete,
    },
  ];

  const tableDataWithoutId = inputList.map(
    ({ ruleName, rulePolicyTempId, fieldType, ...rest }) => rest
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ContainerTile>
        <div className="text-lg mb-5">Max Finance Amount With Tenure</div>
        <div className="grid grid-cols-3 gap-5 items-end">
          <InputNumber
            labelName={"Amount"}
            inputName={"financeAmount"}
            inputValue={maxFinAmtRules.financeAmount}
            onChange={handleRuleChange}
            placeHolder={"999"}
          />
          <InputNumber
            labelName={"Tenure"}
            inputName={"tenure"}
            inputValue={maxFinAmtRules.tenure}
            onChange={handleRuleChange}
            placeHolder={"6"}
          />
          <Button buttonIcon={PlusIcon} onClick={CreateEntry} circle={true} />
        </div>
        <div className="mt-6">
          <ListTable
            ListHeader={MaxFinAmtHeaderList}
            ListItem={tableDataWithoutId}
            ListAction={ActionList}
            handleEditableFields={handleChange}
            Sortable={true}
            PageSize = {5}
          />
        </div>
      </ContainerTile>
    </>
  );
};

export default MaxFinAmtTen;
