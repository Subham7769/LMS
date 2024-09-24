import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { RowChanged } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
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
import {
  clearValidationError,
  setValidationError,
  validateFormFields,
  validateFormFieldsRule,
} from "../../redux/Slices/validationSlice";

const options = [
  { value: "==", label: "==" },
  { value: "<", label: "<" },
  { value: ">", label: ">" },
  { value: "<=", label: "<=" },
  { value: ">=", label: ">=" },
];

const CreditScore = () => {
  const { creditScoreId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { creditScoreData, loading } = useSelector(
    (state) => state.creditScore
  );
  const { validationError } = useSelector((state) => state.validation);
  const fields = [
    "aweightage",
    "bweightage",
    "cweightage",
    "dweightage",
    "eweightage",
    "fweightage",
    "residentsCreditScore",
    "expatriatesCreditScore",
    "rentStatusScore",
    "ownStatusScore",
    "marriedStatusScore",
    "singleStatusScore",
    "divorcedStatusScore",
    "widowedStatusScore",
    "separatedStatusScore",
    "unknownStatusScore",
  ];

  useEffect(() => {
    dispatch(fetchCreditScore(creditScoreId))
      .unwrap()
      .catch((error) => {
        if (error === "Unauthorized") {
          navigate("/login");
        }
      });

    const initialValidationError = {};
    fields.forEach((field) => {
      initialValidationError[field] = false; // Set all fields to false initially
    });
    dispatch(setValidationError(initialValidationError));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [creditScoreId, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    dispatch(setcreditScoreData({ name, value, id }));
  };

  const handleAddFields = async () => {
    const isValid = validateFormFields(fields, creditScoreData, dispatch);
    const isValid2 = validateFormFieldsRule(creditScoreData, dispatch);
    if (isValid && isValid2) {
      dispatch(updateCreditScore({ creditScoreId, creditScoreData }))
        .unwrap()
        .then(() => {
          toast.custom((t) => <RowChanged t={t} toast={toast} />);
        })
        .catch((error) => {
          if (error === "Unexpected end of JSON input") {
            toast.custom((t) => <RowChanged t={t} toast={toast} />);
          } else {
            toast.error(error);
          }
        });
    }
  };

  // console.log(creditScoreData);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="my-5">
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
        />
      </div>
      <div className="bg-gray-100 rounded-xl p-6">
        <h2 className="font-semibold leading-6 text-gray-900 text-center mb-4">
          Dependents Rules
        </h2>
        <div className="grid grid-cols-3 gap-5 justify-between">
          <div>
            <div className="mb-3">
              <SelectAndNumber
                inputSelectName={"firstDependentsOperator"}
                inputSelectOptions={options}
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
                showError={validationError[`firstDependent_0`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({
                      ...validationError,
                      [`firstDependent_0`]: false,
                    })
                  )
                }
              />
            </div>
            <div className="mb-3">
              <SelectAndNumber
                inputSelectName={"firstDependentsOperator"}
                inputSelectOptions={options}
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
                showError={validationError[`firstDependent_1`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({
                      ...validationError,
                      [`firstDependent_1`]: false,
                    })
                  )
                }
              />
            </div>
            <div className="mb-3">
              <SelectAndNumber
                inputSelectName={"firstDependentsOperator"}
                inputSelectOptions={options}
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
                showError={validationError[`firstDependent_2`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({
                      ...validationError,
                      [`firstDependent_2`]: false,
                    })
                  )
                }
              />
            </div>
          </div>
          <div>
            <div className="mb-3">
              <SelectAndNumber
                inputSelectName={"secondDependentsOperator"}
                inputSelectOptions={options}
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
                showError={validationError[`secondDependent_0`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({
                      ...validationError,
                      [`secondDependent_0`]: false,
                    })
                  )
                }
              />
            </div>
            <div className="mb-3">
              <SelectAndNumber
                inputSelectName={"secondDependentsOperator"}
                inputSelectOptions={options}
                inputSelectValue={
                  creditScoreData?.dependentsRules?.operators
                    ?.secondDependentsOperator
                }
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"secondDependent"}
                inputNumberValue={
                  creditScoreData?.dependentsRules?.rules?.[1]?.secondDependent
                }
                inputNumberId={
                  creditScoreData?.dependentsRules?.rules?.[1]?.ruleName
                }
                onChangeNumber={handleChange}
                placeHolderNumber={"4"}
                showError={validationError[`secondDependent_1`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({
                      ...validationError,
                      [`secondDependent_1`]: false,
                    })
                  )
                }
              />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="text-center bg-gray-200 rounded-md border-2 pt-1 text-[14px]">
                Value:{" "}
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
                  showError={validationError[`value_0`]}
                  onFocus={() =>
                    dispatch(
                      setValidationError({
                        ...validationError,
                        [`value_0`]: false,
                      })
                    )
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2  gap-2 mb-3">
              <div className="text-center bg-gray-200 rounded-md border-2 pt-1 text-[14px]">
                Value:{" "}
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
                  showError={validationError[`value_1`]}
                  onFocus={() =>
                    dispatch(
                      setValidationError({
                        ...validationError,
                        [`value_1`]: false,
                      })
                    )
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="text-center bg-gray-200 rounded-md border-2 pt-1 text-[14px]">
                Value:{" "}
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
                  showError={validationError[`value_2`]}
                  onFocus={() =>
                    dispatch(
                      setValidationError({
                        ...validationError,
                        [`value_2`]: false,
                      })
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-right mt-8">
        <Button
          buttonIcon={CheckCircleIcon}
          buttonName={"Update"}
          onClick={handleAddFields}
          rectangle={true}
        />
      </div>
    </>
  );
};
export default CreditScore;
