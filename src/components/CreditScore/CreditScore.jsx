import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Common/Button/Button";
import SelectAndNumber from "../Common/SelectAndNumber/SelectAndNumber";
import ListTable from "../Common/ListTable/ListTable";
import {
  fetchCreditScore,
  updateCreditScore,
  setcreditScoreData,
} from "../../redux/Slices/creditScoreSlice";
import {
  CreditScoreHeaderList,
  MaritialScoreHeaderList,
  NationalityScoreHeaderList,
  ResidentialScoreHeaderList,
} from "../../data/CreditScoreEqData";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputText from "../Common/InputText/InputText";
import {
  clearValidationError,
  validateForm,
  validateFormFieldsRule,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { CheckIcon } from "../../assets/icons";
import { operatorOptions } from "../../data/OptionsData";

const CreditScore = () => {
  const { creditScoreId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { creditScoreData, loading, error } = useSelector(
    (state) => state.creditScore
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    dispatch(fetchCreditScore(creditScoreId))
      .unwrap()
      .catch((error) => {
        if (error === "Unauthorized") {
          navigate("/login");
        }
      });
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [creditScoreId, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(setcreditScoreData({ name, value, id }));
    }
  };

  const handleAddFields = async () => {
    await dispatch(validateForm(creditScoreData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    const isValid2 = validateFormFieldsRule(creditScoreData, dispatch);
    if (isValid && isValid2) {
      dispatch(updateCreditScore({ creditScoreId, creditScoreData }));
    }
  };

  return (
    <>
      <div className="mb-4">
        <ListTable
          ListName={creditScoreData?.equation}
          ListNameAlign={"center"}
          ListHeader={CreditScoreHeaderList}
          ListItem={[
            {
              aweightage: creditScoreData?.aweightage,
              bweightage: creditScoreData?.bweightage,
              cweightage: creditScoreData?.cweightage,
              dweightage: creditScoreData?.dweightage,
              eweightage: creditScoreData?.eweightage,
              fweightage: creditScoreData?.fweightage,
            },
          ]}
          Editable={true}
          handleEditableFields={handleChange}
          Divider={true}
          loading={loading}
          error={error}
          Paginated={false}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ListTable
          ListName={"Nationality Score"}
          ListNameAlign={"center"}
          ListHeader={NationalityScoreHeaderList}
          ListItem={[
            {
              residentsCreditScore: creditScoreData?.residentsCreditScore,
              expatriatesCreditScore: creditScoreData?.expatriatesCreditScore,
            },
          ]}
          Editable={true}
          handleEditableFields={handleChange}
          Divider={true}
          loading={loading}
          error={error}
          Paginated={false}
        />
        <ListTable
          ListName={"Residential Status Score"}
          ListNameAlign={"center"}
          ListHeader={ResidentialScoreHeaderList}
          ListItem={[
            {
              rentStatusScore: creditScoreData?.rentStatusScore,
              ownStatusScore: creditScoreData?.ownStatusScore,
            },
          ]}
          Editable={true}
          handleEditableFields={handleChange}
          Divider={true}
          loading={loading}
          error={error}
          Paginated={false}
        />
      </div>
      <div className="mb-6">
        <ListTable
          ListName={"Maritial Status Score"}
          ListNameAlign={"center"}
          ListHeader={MaritialScoreHeaderList}
          ListItem={[
            {
              marriedStatusScore: creditScoreData?.marriedStatusScore,
              singleStatusScore: creditScoreData?.singleStatusScore,
              divorcedStatusScore: creditScoreData?.divorcedStatusScore,
              widowedStatusScore: creditScoreData?.widowedStatusScore,
              separatedStatusScore: creditScoreData?.separatedStatusScore,
              unknownStatusScore: creditScoreData?.unknownStatusScore,
            },
          ]}
          Editable={true}
          handleEditableFields={handleChange}
          Divider={true}
          loading={loading}
          error={error}
          Paginated={false}
        />
      </div>
      <ContainerTile loading={loading} className={"p-5"}>
        <h2 className="font-semibold leading-6 text-gray-800 dark:text-gray-100 text-center mb-4">
          Dependents Rules
        </h2>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-3 gap-5 justify-between min-w-[600px] sm:min-w-auto">
            <div>
              <div className="mb-3">
                <SelectAndNumber
                  inputSelectName={"firstDependentsOperator"}
                  inputSelectOptions={operatorOptions}
                  inputSelectValue={
                    creditScoreData?.dependentsRules?.operators
                      ?.firstDependentsOperator
                  }
                  onChangeSelect={handleChange}
                  disabledSelect={false}
                  hiddenSelect={false}
                  inputNumberName={"firstDependent"}
                  inputNumberId={
                    creditScoreData?.dependentsRules?.rules?.[0]?.ruleName
                  }
                  inputNumberValue={
                    creditScoreData?.dependentsRules?.rules?.[0]?.firstDependent
                  }
                  onChangeNumber={handleChange}
                  placeHolderNumber={"4"}
                  isValidation={true}
                  isIndex={"0"}
                />
              </div>
              <div className="mb-3">
                <SelectAndNumber
                  inputSelectName={"firstDependentsOperator"}
                  inputSelectOptions={operatorOptions}
                  inputSelectValue={
                    creditScoreData?.dependentsRules?.operators
                      ?.firstDependentsOperator
                  }
                  onChangeSelect={handleChange}
                  disabledSelect={false}
                  hiddenSelect={false}
                  inputNumberName={"firstDependent"}
                  inputNumberValue={
                    creditScoreData?.dependentsRules?.rules?.[1]?.firstDependent
                  }
                  inputNumberId={
                    creditScoreData?.dependentsRules?.rules?.[1]?.ruleName
                  }
                  onChangeNumber={handleChange}
                  placeHolderNumber={"4"}
                  isValidation={true}
                  isIndex={"1"}
                />
              </div>
              <div className="mb-3">
                <SelectAndNumber
                  inputSelectName={"firstDependentsOperator"}
                  inputSelectOptions={operatorOptions}
                  inputSelectValue={
                    creditScoreData?.dependentsRules?.operators
                      ?.firstDependentsOperator
                  }
                  onChangeSelect={handleChange}
                  disabledSelect={false}
                  hiddenSelect={false}
                  inputNumberName={"firstDependent"}
                  inputNumberValue={
                    creditScoreData?.dependentsRules?.rules?.[2]?.firstDependent
                  }
                  inputNumberId={
                    creditScoreData?.dependentsRules?.rules?.[2]?.ruleName
                  }
                  onChangeNumber={handleChange}
                  placeHolderNumber={"4"}
                  isValidation={true}
                  isIndex={"2"}
                />
              </div>
            </div>
            <div>
              <div className="mb-3">
                <SelectAndNumber
                  inputSelectName={"secondDependentsOperator"}
                  inputSelectOptions={operatorOptions}
                  inputSelectValue={
                    creditScoreData?.dependentsRules?.operators
                      ?.secondDependentsOperator
                  }
                  onChangeSelect={handleChange}
                  disabledSelect={false}
                  hiddenSelect={false}
                  inputNumberName={"secondDependent"}
                  inputNumberValue={
                    creditScoreData?.dependentsRules?.rules[0]?.secondDependent
                  }
                  inputNumberId={
                    creditScoreData?.dependentsRules?.rules?.[0]?.ruleName
                  }
                  onChangeNumber={handleChange}
                  placeHolderNumber={"4"}
                  isValidation={true}
                  isIndex={"0"}
                />
              </div>
              <div className="mb-3">
                <SelectAndNumber
                  inputSelectName={"secondDependentsOperator"}
                  inputSelectOptions={operatorOptions}
                  inputSelectValue={
                    creditScoreData?.dependentsRules?.operators
                      ?.secondDependentsOperator
                  }
                  onChangeSelect={handleChange}
                  disabledSelect={false}
                  hiddenSelect={false}
                  inputNumberName={"secondDependent"}
                  inputNumberValue={
                    creditScoreData?.dependentsRules?.rules?.[1]
                      ?.secondDependent
                  }
                  inputNumberId={
                    creditScoreData?.dependentsRules?.rules?.[1]?.ruleName
                  }
                  onChangeNumber={handleChange}
                  placeHolderNumber={"4"}
                  isValidation={true}
                  isIndex={"1"}
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="text-center bg-gray-200 dark:bg-gray-700 rounded-md border dark:border-gray-700 pt-2 text-[14px]">
                  Value :{" "}
                </div>
                <div>
                  <InputNumber
                    inputName={"value"}
                    inputId={
                      creditScoreData?.dependentsRules?.rules?.[0]?.ruleName
                    }
                    inputValue={
                      creditScoreData?.dependentsRules?.rules?.[0]?.value
                    }
                    onChange={handleChange}
                    placeHolder={"0.54"}
                    isValidation={true}
                    isIndex={"0"}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2  gap-2 mb-3">
                <div className="text-center bg-gray-200 dark:bg-gray-700 rounded-md border dark:border-gray-700 pt-2 text-[14px]">
                  Value :{" "}
                </div>
                <div>
                  <InputNumber
                    inputName={"value"}
                    inputId={
                      creditScoreData?.dependentsRules?.rules?.[1]?.ruleName
                    }
                    inputValue={
                      creditScoreData?.dependentsRules?.rules?.[1]?.value
                    }
                    onChange={handleChange}
                    placeHolder={"0.54"}
                    isValidation={true}
                    isIndex={"1"}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="text-center bg-gray-200 dark:bg-gray-700 rounded-md border dark:border-gray-700 pt-2 text-[14px]">
                  Value :{" "}
                </div>
                <div>
                  <InputNumber
                    inputName={"value"}
                    inputId={
                      creditScoreData?.dependentsRules?.rules?.[2]?.ruleName
                    }
                    inputValue={
                      creditScoreData?.dependentsRules?.rules?.[2]?.value
                    }
                    onChange={handleChange}
                    placeHolder={"0.54"}
                    isValidation={true}
                    isIndex={"2"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerTile>
      {!hasViewOnlyAccess(roleName) && !loading ? (
        <div className="text-right mt-8">
          <Button
            buttonIcon={CheckIcon}
            buttonName={"Update"}
            onClick={handleAddFields}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default CreditScore;
