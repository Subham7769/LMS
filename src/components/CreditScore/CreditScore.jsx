import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import { RowChanged } from "../Toasts";
import LoadingState from "../LoadingState";
import InputNumber from "../Common/InputNumber/InputNumber";
import SelectAndNumber from "../Common/SelectAndNumber/SelectAndNumber";

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
  const [creditScoreData, setCreditScoreData] = useState([]);
  const [formData, setFormData] = useState({
    aweightage: "",
    bweightage: "",
    cweightage: "",
    dweightage: "",
    eweightage: "",
    fweightage: "",
    residentsCreditScore: "",
    expatriatesCreditScore: "",
    rentStatusScore: "",
    ownStatusScore: "",
    marriedStatusScore: "",
    singleStatusScore: "",
    divorcedStatusScore: "",
    widowedStatusScore: "",
    separatedStatusScore: "",
    unknownStatusScore: "",
    dependentsRules: {
      operators: {
        firstDependentsOperator: "",
        secondDependentsOperator: "",
      },
      rules: [
        {
          ruleName: "1",
          fieldType: "Employer",
          creditScoreEqTempId: "",
          firstDependent: "",
          secondDependent: "",
          value: "",
        },
        {
          ruleName: "2",
          fieldType: "Employer",
          creditScoreEqTempId: "",
          firstDependent: "",
          secondDependent: "",
          value: "",
        },
        {
          ruleName: "3",
          fieldType: "Employer",
          creditScoreEqTempId: "",
          firstDependent: "",
          secondDependent: "",
          value: "",
        },
      ],
    },
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, id } = e.target;

    setFormData((prevState) => {
      const isOperator =
        prevState.dependentsRules.operators.hasOwnProperty(name);
      const isRuleField = prevState.dependentsRules.rules.some(
        (rule) => rule.ruleName === id && rule.hasOwnProperty(name)
      );

      if (isOperator) {
        // Update an operator
        return {
          ...prevState,
          dependentsRules: {
            ...prevState.dependentsRules,
            operators: {
              ...prevState.dependentsRules.operators,
              [name]: value,
            },
          },
        };
      } else if (isRuleField) {
        // Update a rule
        return {
          ...prevState,
          dependentsRules: {
            ...prevState.dependentsRules,
            rules: prevState.dependentsRules.rules.map((rule) =>
              rule.ruleName === id ? { ...rule, [name]: value } : rule
            ),
          },
        };
      } else {
        // Update a field directly in formData
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  console.log(formData);

  useEffect(() => {
    async function getProductInfo() {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const data = await fetch(
          "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/credit-score-equation/" +
            creditScoreId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Check for token expiration or invalid token
        if (data.status === 401 || data.status === 403) {
          localStorage.removeItem("authToken"); // Clear the token
          navigate("/login"); // Redirect to login page
          return; // Stop further execution
        } else if (data.ok) {
          setLoading(false);
        }
        const creditScoreDetails = await data.json();
        setCreditScoreData(creditScoreDetails);
        setFormData((prevState) => ({ ...prevState, ...creditScoreDetails }));
        // console.log(formData);
        //   window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }

    getProductInfo();
  }, [creditScoreId]);

  const handleAddFields = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token
    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/credit-score-equation/" +
          creditScoreId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  if (loading) {
    return <LoadingState />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="border-b border-gray-300 pb-8 mt-10 mb-8">
        <h2 className="text-xl text-center">Credit Score</h2>
        <div className=" text-center mt-5 mb-4">
          {creditScoreData.equation ? (
            creditScoreData.equation
          ) : (
            <div>
              ((simahScore-300)*A/550) + (nationality*B) + (netIncome*C) +
              (dependents*D) + (maritalStatus*E) + (residentialStatus*F)
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <table className="divide-y divide-gray-300 w-5/6">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th className="py-3.5 px-2 text-center text-gray-900">A</th>
                <th className="py-3.5 px-2 text-center text-gray-900">B</th>
                <th className="py-3.5 px-2 text-center text-gray-900">C</th>
                <th className="py-3.5 px-2 text-center text-gray-900">D</th>
                <th className="py-3.5 px-2 text-center text-gray-900">E</th>
                <th className="py-3.5 px-2 text-center text-gray-900">F</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="divide-x divide-gray-200 text-center">
                <td className="whitespace-nowrap py-4 px-5 text-gray-900">
                  <InputNumber
                    inputName={"aweightage"}
                    inputValue={formData.aweightage}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"bweightage"}
                    inputValue={formData.bweightage}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"cweightage"}
                    inputValue={formData.cweightage}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"dweightage"}
                    inputValue={formData.dweightage}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"eweightage"}
                    inputValue={formData.eweightage}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"fweightage"}
                    inputValue={formData.fweightage}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center gap-24 border-b border-gray-300 pb-8 mb-8">
        <div>
          <h2 className="text-xl mb-5 text-center">Nationality Score</h2>
          <table className="divide-y divide-gray-300">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Resident Credit Score
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Expatriates Credit Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="divide-x divide-gray-200 text-center">
                <td className="whitespace-nowrap py-4 px-2 text-gray-900">
                  <InputNumber
                    inputName={"residentsCreditScore"}
                    inputValue={formData.residentsCreditScore}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <InputNumber
                    inputName={"expatriatesCreditScore"}
                    inputValue={formData.expatriatesCreditScore}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border border-gray-200"></div>
        <div>
          <h2 className="text-xl mb-5 text-center">Residential Status Score</h2>
          <table className="divide-y divide-gray-300">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Rent Status Score
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Own Status Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="divide-x divide-gray-200 text-center">
                <td className="whitespace-nowrap py-4 px-2 text-gray-900">
                  <InputNumber
                    inputName={"rentStatusScore"}
                    inputValue={formData.rentStatusScore}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <InputNumber
                    inputName={"ownStatusScore"}
                    inputValue={formData.ownStatusScore}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="border-b border-gray-300 pb-8 mb-8">
        <h2 className="text-xl mb-5 text-center">Maritial Status Score</h2>
        <div className="flex justify-center">
          <table className="divide-y divide-gray-300">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th className="py-3.5 px-2 text-center ">
                  Married Status Score
                </th>
                <th className="py-3.5 px-2 text-center ">
                  Single Status Score
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Divorced Status Score
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Widowed Status Score
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Separated Status Score
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Unknown Status Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="divide-x divide-gray-200 text-center">
                <td className="whitespace-nowrap py-4 px-2 text-gray-900">
                  <InputNumber
                    inputName={"marriedStatusScore"}
                    inputValue={formData.marriedStatusScore}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <InputNumber
                    inputName={"singleStatusScore"}
                    inputValue={formData.singleStatusScore}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <InputNumber
                    inputName={"divorcedStatusScore"}
                    inputValue={formData.divorcedStatusScore}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <InputNumber
                    inputName={"widowedStatusScore"}
                    inputValue={formData.widowedStatusScore}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <InputNumber
                    inputName={"separatedStatusScore"}
                    inputValue={formData.separatedStatusScore}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <InputNumber
                    inputName={"unknownStatusScore"}
                    inputValue={formData.unknownStatusScore}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-xl mb-5 text-center">Dependents Rules</h2>
        <div className="flex justify-center gap-12">
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
                inputNumberid={formData?.dependentsRules?.rules[0]?.ruleName}
                inputNumberValue={
                  formData.dependentsRules?.rules[0]?.firstDependent
                }
                onChangeNumber={handleChange}
                placeHolderNumber={"4"}
              />
            </div>
            <div className="flex gap-4 mb-3">
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
                  formData.dependentsRules?.rules[1]?.firstDependent
                }
                inputNumberid={formData?.dependentsRules?.rules[1]?.ruleName}
                onChangeNumber={handleChange}
                placeHolderNumber={"4"}
              />
            </div>
            <div className="flex gap-4 mb-3">
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
                  formData.dependentsRules?.rules[2]?.firstDependent
                }
                inputNumberid={formData?.dependentsRules?.rules[2]?.ruleName}
                onChangeNumber={handleChange}
                placeHolderNumber={"4"}
              />
            </div>
          </div>
          <div>
            <div className="flex gap-4 mb-3">
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
                  formData.dependentsRules?.rules[0]?.secondDependent
                }
                inputNumberid={formData?.dependentsRules?.rules[0]?.ruleName}
                onChangeNumber={handleChange}
                placeHolderNumber={"4"}
              />
            </div>
            <div className="flex gap-4 mb-3">
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
                  formData.dependentsRules?.rules[1]?.secondDependent
                }
                inputNumberid={formData?.dependentsRules?.rules[1]?.ruleName}
                onChangeNumber={handleChange}
                placeHolderNumber={"4"}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div>Value: </div>
              <div>
                <InputNumber
                  inputName={"value"}
                  inputId={formData?.dependentsRules?.rules[0]?.ruleName}
                  inputValue={formData?.dependentsRules?.rules[0]?.value}
                  onChange={handleChange}
                  placeHolder={"0.54"}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div>Value: </div>
              <div>
                <InputNumber
                  inputName={"value"}
                  inputId={formData?.dependentsRules?.rules[1]?.ruleName}
                  inputValue={formData?.dependentsRules?.rules[1]?.value}
                  onChange={handleChange}
                  placeHolder={"0.54"}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div>Value: </div>
              <div>
                <InputNumber
                  inputName={"value"}
                  inputId={formData?.dependentsRules?.rules[2]?.ruleName}
                  inputValue={formData?.dependentsRules?.rules[2]?.value}
                  onChange={handleChange}
                  placeHolder={"0.54"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-right mt-8 mr-12">
        <button
          type="button"
          onClick={handleAddFields}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Update
        </button>
      </div>
    </>
  );
};
export default CreditScore;
