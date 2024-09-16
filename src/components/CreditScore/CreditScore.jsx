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
  setFormData,
} from "../../redux/Slices/creditScoreSlice";
import {
  CreditScoreHeaderList,
  MaritialScoreHeaderList,
  NationalityScoreHeaderList,
  ResidentialScoreHeaderList,
} from "../../data/CreditScoreEqData";
import InputNumber from "../Common/InputNumber/InputNumber";

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
  const { creditScoreData, formData, loading } = useSelector(
    (state) => state.creditScore
  );

  useEffect(() => {
    dispatch(fetchCreditScore(creditScoreId))
      .unwrap()
      .catch((error) => {
        if (error === "Unauthorized") {
          navigate("/login");
        }
      });
  }, [creditScoreId, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    dispatch(setFormData({ name, value, id }));
  };

  const handleAddFields = async () => {
    dispatch(updateCreditScore({ creditScoreId, formData }))
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
  };

  // console.log(formData);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="my-5">
        <ListTable
          ListName={formData?.equation}
          ListNameAlign={"center"}
          ListHeader={CreditScoreHeaderList}
          ListItem={[
            {
              aweightage: formData?.aweightage,
              bweightage: formData?.bweightage,
              cweightage: formData?.cweightage,
              dweightage: formData?.dweightage,
              eweightage: formData?.eweightage,
              fweightage: formData?.fweightage,
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
              residentsCreditScore: formData?.residentsCreditScore,
              expatriatesCreditScore: formData?.expatriatesCreditScore,
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
              rentStatusScore: formData?.rentStatusScore,
              ownStatusScore: formData?.ownStatusScore,
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
              marriedStatusScore: formData?.marriedStatusScore,
              singleStatusScore: formData?.singleStatusScore,
              divorcedStatusScore: formData?.divorcedStatusScore,
              widowedStatusScore: formData?.widowedStatusScore,
              separatedStatusScore: formData?.separatedStatusScore,
              unknownStatusScore: formData?.unknownStatusScore,
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
                  formData?.dependentsRules?.operators?.firstDependentsOperator
                }
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"firstDependent"}
                inputNumberId={formData?.dependentsRules?.rules?.[0]?.ruleName}
                inputNumberValue={
                  formData?.dependentsRules?.rules?.[0]?.firstDependent
                }
                onChangeNumber={handleChange}
                placeHolderNumber={"4"}
              />
            </div>
            <div className="mb-3">
              <SelectAndNumber
                inputSelectName={"firstDependentsOperator"}
                inputSelectOptions={options}
                inputSelectValue={
                  formData?.dependentsRules?.operators?.firstDependentsOperator
                }
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"firstDependent"}
                inputNumberValue={
                  formData?.dependentsRules?.rules?.[1]?.firstDependent
                }
                inputNumberId={formData?.dependentsRules?.rules?.[1]?.ruleName}
                onChangeNumber={handleChange}
                placeHolderNumber={"4"}
              />
            </div>
            <div className="mb-3">
              <SelectAndNumber
                inputSelectName={"firstDependentsOperator"}
                inputSelectOptions={options}
                inputSelectValue={
                  formData?.dependentsRules?.operators?.firstDependentsOperator
                }
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"firstDependent"}
                inputNumberValue={
                  formData?.dependentsRules?.rules?.[2]?.firstDependent
                }
                inputNumberId={formData?.dependentsRules?.rules?.[2]?.ruleName}
                onChangeNumber={handleChange}
                placeHolderNumber={"4"}
              />
            </div>
          </div>
          <div>
            <div className="mb-3">
              <SelectAndNumber
                inputSelectName={"secondDependentsOperator"}
                inputSelectOptions={options}
                inputSelectValue={
                  formData?.dependentsRules?.operators?.secondDependentsOperator
                }
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"secondDependent"}
                inputNumberValue={
                  formData?.dependentsRules?.rules[0]?.secondDependent
                }
                inputNumberId={formData?.dependentsRules?.rules?.[0]?.ruleName}
                onChangeNumber={handleChange}
                placeHolderNumber={"4"}
              />
            </div>
            <div className="mb-3">
              <SelectAndNumber
                inputSelectName={"secondDependentsOperator"}
                inputSelectOptions={options}
                inputSelectValue={
                  formData?.dependentsRules?.operators?.secondDependentsOperator
                }
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"secondDependent"}
                inputNumberValue={
                  formData?.dependentsRules?.rules?.[1]?.secondDependent
                }
                inputNumberId={formData?.dependentsRules?.rules?.[1]?.ruleName}
                onChangeNumber={handleChange}
                placeHolderNumber={"4"}
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
                  inputId={formData?.dependentsRules[0]?.rules?.[0]?.ruleName}
                  inputValue={formData?.dependentsRules?.rules?.[0]?.value}
                  onChange={handleChange}
                  placeHolder={"0.54"}
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
                  inputId={formData?.dependentsRules?.rules?.[1]?.ruleName}
                  inputValue={formData?.dependentsRules?.rules?.[1]?.value}
                  onChange={handleChange}
                  placeHolder={"0.54"}
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
                  inputId={formData?.dependentsRules?.rules?.[2]?.ruleName}
                  inputValue={formData?.dependentsRules?.rules?.[2]?.value}
                  onChange={handleChange}
                  placeHolder={"0.54"}
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
