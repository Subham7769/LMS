import { useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import Button from "../Common/Button/Button";
import { typeOptions, frequencyOptions } from "../../data/OptionsData";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelectNew from "../Common/DynamicSelect/InputSelect";
import InputSelect from "../Common/InputSelect/InputSelect";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import {
  updateExpenseFormData,
  fetchExpenseData,
  handleExpenseInputChange as handleReduxInputChange,
  saveExpenseField,
  deleteExpenseField,
  addExpenseField,
  resetExpenseFormData,
} from "../../redux/Slices/globalConfigSlice";

const MinimumExpense = () => {
  const dispatch = useDispatch();

  const { expenseForm, allExpenseData, loading, error } = useSelector(
    (state) => state.globalConfig
  );

  useEffect(() => {
    dispatch(fetchExpenseData());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    dispatch(updateExpenseFormData({ name, value, checked, type }));
  };

  const handleAddFields = async () => {
    try {
      await dispatch(addExpenseField(expenseForm)).unwrap();
      dispatch(resetExpenseFormData());
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Added Successfully"}
          message={"Item has been added successfully"}
        />
      ));
    } catch (error) {
      // Handle the error here if needed
      toast.custom((t) => (
        <Failed
          t={t}
          toast={toast}
          title={"Edit Failed"}
          message={`${error.message}`}
        />
      ));
    }
  };

  const handleChange = (e, id, propName = null, selectedOption = null) => {
    let name, value;

    if (e) {
      // Handling input change
      ({ name, value } = e.target);
    } else if (propName && selectedOption) {
      // Handling dropdown change
      name = propName;
      value = selectedOption.value;
    }

    dispatch(handleReduxInputChange({ id, name, value }));
  };

  const handleSave = async (id) => {
    // Find the item to be update
    dispatch(saveExpenseField(id)).then(() =>
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Updated Successfully"}
          message={"Data has been updated successfully"}
        />
      ))
    );
  };

  const handleDelete = async (id) => {
    dispatch(deleteExpenseField(id)).then(() =>
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Deleted Successfully"}
          message={"The item has been deleted successfully"}
        />
      ))
    );
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="mb-6">
        <b
          title="Bare Minimum Expenses"
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          Bare Minimum Expenses
        </b>
      </h2>
      <div className="flex flex-col gap-5">
        <ContainerTile>
          <div className="grid grid-cols-[repeat(4,_minmax(0,_1fr))_120px] gap-4 items-end ">
            <InputText
              labelName="Expenses"
              inputName="expensesName"
              inputValue={expenseForm?.expensesName}
              onChange={handleInputChange}
              placeHolder="Food and Living"
            />
            <InputSelect
              labelName="Type"
              inputOptions={typeOptions}
              inputName="dependantType"
              inputValue={expenseForm?.dependantType}
              onChange={handleInputChange}
            />
            <InputSelect
              labelName="Expenses Frequency"
              inputOptions={frequencyOptions}
              inputName="expensesFrequency"
              inputValue={expenseForm?.expensesFrequency}
              onChange={handleInputChange}
            />
            <InputNumber
              labelName="Bare Min Expense Per Person"
              inputName="bareMinimum"
              inputValue={expenseForm?.bareMinimum}
              onChange={handleInputChange}
              placeHolder="200"
            />
            <Button
              buttonIcon={PlusIcon}
              onClick={handleAddFields}
              circle={true}
            />
          </div>
        </ContainerTile>
        <ContainerTile>
          {allExpenseData?.map((expdata) => (
            <div
              key={expdata.id}
              className="grid grid-cols-[repeat(4,_minmax(0,_1fr))_120px] gap-4 items-end border-b border-b-gray-400 py-10"
            >
              <InputText
                labelName="Expenses"
                inputName="expensesName"
                id={`expense_${expdata?.id}`}
                inputValue={expdata?.expensesName}
                onChange={(e) => handleChange(e, expdata?.id)}
                placeHolder="Food and Living"
              />
              <InputSelectNew
                labelName="Type"
                inputOptions={typeOptions}
                id={`type_${expdata?.id}`}
                inputName="dependantType"
                inputValue={expdata?.dependantType}
                onChange={(selectedOption) =>
                  handleChange(
                    null,
                    expdata?.id,
                    "dependantType",
                    selectedOption
                  )
                }
              />
              <InputSelectNew
                labelName="Expenses Frequency"
                inputOptions={frequencyOptions}
                id={`frequency_${expdata?.id}`}
                inputName="expensesFrequency"
                inputValue={expdata?.expensesFrequency}
                onChange={(selectedOption) =>
                  handleChange(
                    null,
                    expdata?.id,
                    "expensesFrequency",
                    selectedOption
                  )
                }
              />
              <InputNumber
                labelName="Bare Min Expense Per Person"
                inputName="bareMinimum"
                inputId={`minExpense_${expdata?.id}`}
                inputValue={expdata?.bareMinimum}
                onChange={(e) => handleChange(e, expdata?.id)}
                placeHolder="200"
              />
              <div className="flex items-center gap-4">
                <Button
                  buttonIcon={CheckCircleIcon}
                  onClick={() => handleSave(expdata?.id)}
                  circle={true}
                />
                <Button
                  buttonIcon={TrashIcon}
                  onClick={() => handleDelete(expdata?.id)}
                  circle={true}
                />
              </div>
            </div>
          ))}
        </ContainerTile>
      </div>
    </>
  );
};

export default MinimumExpense;
