import { useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
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
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";

const MinimumExpense = () => {
  const dispatch = useDispatch();
  const { expenseForm, allExpenseData, loading, error } = useSelector(
    (state) => state.globalConfig
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    dispatch(fetchExpenseData());
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    dispatch(updateExpenseFormData({ name, value, checked, type }));
  };

  const handleAddFields = async () => {
    await dispatch(validateForm(expenseForm));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      await dispatch(addExpenseField(expenseForm)).unwrap();
      dispatch(resetExpenseFormData())
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

  const handleSave = async (id, index) => {
    await dispatch(validateForm(allExpenseData[index]));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(saveExpenseField(id))
    }
  };

  const handleDelete = async (id) => {
    dispatch(deleteExpenseField(id))
  };

  return (
    <>
      <h2 className="mb-6">
        <b
          title="Bare Minimum Expenses"
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          Bare Minimum Expenses
        </b>
      </h2>
      <div className="flex flex-col gap-5">
        {roleName !== "ROLE_VIEWER" ? (
          <ContainerTile
          loading={loading}
          error={error}
          >
            <div className="grid grid-cols-[repeat(4,_minmax(0,_1fr))_120px] gap-4 items-end ">
              <InputText
                labelName="Expenses"
                inputName="expensesName"
                inputValue={expenseForm?.expensesName}
                onChange={handleInputChange}
                placeHolder="Food and Living"
                isValidation={true}
              />
              <InputSelect
                labelName="Type"
                inputOptions={typeOptions}
                inputName="dependantType"
                inputValue={expenseForm?.dependantType}
                onChange={handleInputChange}
                isValidation={true}
              />
              <InputSelect
                labelName="Expenses Frequency"
                inputOptions={frequencyOptions}
                inputName="expensesFrequency"
                inputValue={expenseForm?.expensesFrequency}
                onChange={handleInputChange}
                isValidation={true}
              />
              <InputNumber
                labelName="Bare Min Expense Per Person"
                inputName="bareMinimum"
                inputValue={expenseForm?.bareMinimum}
                onChange={handleInputChange}
                placeHolder="200"
                isValidation={true}
              />
              <Button
                buttonIcon={PlusIcon}
                onClick={handleAddFields}
                circle={true}
              />
            </div>
          </ContainerTile>
        ) : (
          ""
        )}

        {allExpenseData?.map((expenseData, index) => (
          <ContainerTile
          loading={loading}
          error={error}
          >
            <div
              key={expenseData.id}
              className="grid grid-cols-[repeat(4,_minmax(0,_1fr))_120px] gap-4 items-end "
            >
              <InputText
                labelName="Expenses"
                inputName="expensesName"
                id={`expense_${expenseData?.id}`}
                inputValue={expenseData?.expensesName}
                onChange={(e) => handleChange(e, expenseData?.id)}
                placeHolder="Food and Living"
                isValidation={true}
                isIndex={expenseData.dataIndex}
              />
              <InputSelectNew
                labelName="Type"
                inputOptions={typeOptions}
                id={`type_${expenseData?.id}`}
                inputName="dependantType"
                inputValue={expenseData?.dependantType}
                onChange={(selectedOption) =>
                  handleChange(
                    null,
                    expenseData?.id,
                    "dependantType",
                    selectedOption
                  )
                }
              />
              <InputSelectNew
                labelName="Expenses Frequency"
                inputOptions={frequencyOptions}
                id={`frequency_${expenseData?.id}`}
                inputName="expensesFrequency"
                inputValue={expenseData?.expensesFrequency}
                onChange={(selectedOption) =>
                  handleChange(
                    null,
                    expenseData?.id,
                    "expensesFrequency",
                    selectedOption
                  )
                }
              />
              <InputNumber
                labelName="Bare Min Expense Per Person"
                inputName="bareMinimum"
                inputId={`minExpense_${expenseData?.id}`}
                inputValue={expenseData?.bareMinimum}
                onChange={(e) => handleChange(e, expenseData?.id)}
                placeHolder="200"
                isValidation={true}
                isIndex={expenseData.dataIndex}
              />
              {roleName !== "ROLE_VIEWER" ? (
                <div className="flex items-center gap-4">
                  <Button
                    buttonIcon={CheckCircleIcon}
                    onClick={() => handleSave(expenseData?.id, index)}
                    circle={true}
                  />
                  <Button
                    buttonIcon={TrashIcon}
                    onClick={() => handleDelete(expenseData?.id, index)}
                    circle={true}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </ContainerTile>
        ))}
      </div>
    </>
  );
};

export default MinimumExpense;
