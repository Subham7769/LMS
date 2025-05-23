import { useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Button from "../Common/Button/Button";
import { typeOptions, options } from "../../data/OptionsData";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelectNew from "../Common/InputSelectMulti/InputSelect";
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
import { hasViewOnlyAccessGroup2 } from "../../utils/roleUtils";
import ListTableClassic from "../Common/ListTable/ListTableClassic";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { AddIcon, CheckIcon, DeleteIcon } from "../../assets/icons";

const MinimumExpense = () => {
  const dispatch = useDispatch();
  const { expenseForm, allExpenseData, loading, error } = useSelector(
    (state) => state.globalConfig
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  let ListHeader = [
    { name: "Expenses", sortKey: null },
    { name: "Type", sortKey: null },
    { name: "Expenses Frequency", sortKey: null },
    { name: "Bare Min Expense Per Person", sortKey: null },
  ];

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
      dispatch(resetExpenseFormData());
    }
  };

  const handleChange = (e, id, propName = null, selectedOption = null) => {
    let name, value;
    console.log(e);
    if (e) {
      // Handling input change
      console.log(e);
      ({ name, value } = e.target);
    } else if (propName && selectedOption) {
      // Handling dropdown change
      console.log("here")
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
      dispatch(saveExpenseField(id));
    }
  };

  const handleDelete = async (id) => {
    dispatch(deleteExpenseField(id));
  };

  // Conditionally add the "Actions" column if roleName has view only access
  if (!hasViewOnlyAccess(roleName)) {
    ListHeader.push({ name: "Actions", sortKey: null });
  }

  return (
    <>
      <h2 className="mb-6">
        <b
          title="Bare Minimum Expenses"
          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-500 hover:p-2 p-2 hover:rounded-md"
        >
          Bare Minimum Expenses
        </b>
      </h2>
      <div className="flex flex-col gap-5">
        {!hasViewOnlyAccessGroup2(roleName) ? (
          <ContainerTile
            loading={loading}
            // error={error}
            className={"p-5 mb-5"}
          >
            <div className="grid grid-cols-[repeat(4,_minmax(0,_1fr))_120px] max-sm:grid-cols-1 gap-4">
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
                inputOptions={options}
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
              <div className="flex items-end justify-end md:justify-start">
                <Button
                  buttonIcon={AddIcon}
                  onClick={handleAddFields}
                  circle={true}
                />
              </div>
            </div>
          </ContainerTile>
        ) : (
          ""
        )}

        <ListTableClassic
          ListName="List of Expenses"
          ListNameLength={allExpenseData?.length}
          ListHeader={ListHeader}
        >
          {allExpenseData?.map((expenseData, index) => (
            <tr key={"Expense" + index} className="align-top">
              {/* Expenses Name */}
              <td className="px-4 py-4 whitespace-nowrap min-w-60">
                <InputText
                  labelName=""
                  inputName="expensesName"
                  id={`expense_${expenseData?.id}`}
                  inputValue={expenseData?.expensesName}
                  onChange={(e) => handleChange(e, expenseData?.id)}
                  placeHolder="Food and Living"
                  isValidation={true}
                  isIndex={expenseData.dataIndex}
                />
              </td>

              {/* Type */}
              <td className="px-4 py-4 whitespace-nowrap min-w-48">
                <InputSelect
                  labelName=""
                  inputOptions={typeOptions}
                  id={`type_${expenseData?.id}`}
                  inputName="dependantType"
                  inputValue={expenseData?.dependantType}
                  onChange={(e) => handleChange(e, expenseData?.id)}
                  searchable={true}
                />
              </td>

              {/* Expenses Frequency */}
              <td className="px-4 py-4 whitespace-nowrap min-w-60">
                <InputSelect
                  labelName=""
                  inputName="expensesFrequency"
                  inputOptions={options}
                  inputValue={expenseData?.expensesFrequency}
                  id={`frequency_${expenseData?.id}`}
                  onChange={(e) => handleChange(e, expenseData?.id)}
                />
              </td>

              {/* Bare Min Expense Per Person */}
              <td className="px-4 py-4 whitespace-nowrap min-w-56">
                <InputNumber
                  labelName=""
                  inputName="bareMinimum"
                  inputId={`minExpense_${expenseData?.id}`}
                  inputValue={expenseData?.bareMinimum}
                  onChange={(e) => handleChange(e, expenseData?.id)}
                  placeHolder="200"
                  isValidation={true}
                  isIndex={expenseData.dataIndex}
                />
              </td>

              {/* Actions */}
              {!hasViewOnlyAccessGroup2(roleName) ? (
                <td className="px-4 py-4 whitespace-nowrap min-w-32">
                  <div className="flex items-center gap-2">
                    <Button
                      buttonIcon={CheckIcon}
                      onClick={() => handleSave(expenseData?.id, index)}
                      buttonType="success"
                    />
                    <Button
                      buttonIcon={DeleteIcon}
                      onClick={() => handleDelete(expenseData?.id, index)}
                      buttonType="destructive"
                    />
                  </div>
                </td>
              ) : (
                <td className="px-4 py-4 text-gray-400">View Only</td>
              )}
            </tr>
          ))}
        </ListTableClassic>
      </div>
    </>
  );
};

export default MinimumExpense;
