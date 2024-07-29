import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import { RowChanged } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import InputNumber from "../Common/InputNumber/InputNumber";
import SelectAndNumber from "../Common/SelectAndNumber/SelectAndNumber";
import Button from "../Common/Button/Button";
import ListTable from "../Common/ListTable/ListTable";
import {
  CreditScoreHeaderList,
  MaritialScoreHeaderList,
  NationalityScoreHeaderList,
  ResidentialScoreHeaderList,
} from "../../data/CreditScoreEqData";

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
    creditScoreEqTempId: creditScoreId,
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
          creditScoreEqTempId: creditScoreId,
          firstDependent: "",
          secondDependent: "",
          value: "",
        },
        {
          ruleName: "2",
          fieldType: "Employer",
          creditScoreEqTempId: creditScoreId,
          firstDependent: "",
          secondDependent: "",
          value: "",
        },
        {
          ruleName: "3",
          fieldType: "Employer",
          creditScoreEqTempId: creditScoreId,
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
      <div className="my-5">
        {/* <h2 className="text-xl text-center">Credit Score</h2> */}
        <div className="flex justify-center">
          <ListTable
            ListName={creditScoreData.equation}
            ListNameAlign={"center"}
            ListHeader={CreditScoreHeaderList}
            ListItem={[
              {
                aweightage: formData.aweightage,
                bweightage: formData.bweightage,
                cweightage: formData.cweightage,
                dweightage: formData.dweightage,
                eweightage: formData.eweightage,
                fweightage: formData.fweightage,
              },
            ]}
            Searchable={false}
            Editable={true}
            handleEditableFields={handleChange}
            Divider={true}
          />
          {/* <table className="divide-y divide-gray-300 w-5/6">
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
          </table> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ListTable
          ListName={"Nationality Score"}
          ListNameAlign={"center"}
          ListHeader={NationalityScoreHeaderList}
          ListItem={[
            {
              residentsCreditScore: formData.residentsCreditScore,
              expatriatesCreditScore: formData.expatriatesCreditScore,
            },
          ]}
          Searchable={false}
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
              rentStatusScore: formData.rentStatusScore,
              ownStatusScore: formData.ownStatusScore,
            },
          ]}
          Searchable={false}
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
              marriedStatusScore: formData.marriedStatusScore,
              singleStatusScore: formData.singleStatusScore,
              divorcedStatusScore: formData.divorcedStatusScore,
              widowedStatusScore: formData.widowedStatusScore,
              separatedStatusScore: formData.separatedStatusScore,
              unknownStatusScore: formData.unknownStatusScore,
            },
          ]}
          Searchable={false}
          Editable={true}
          handleEditableFields={handleChange}
          Divider={true}
        />
      </div>
      <div className="bg-gray-100 rounded-xl p-6">
        <h2 className="text-xl mb-5 text-center">Dependents Rules</h2>
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
                inputNumberId={formData?.dependentsRules?.rules[0]?.ruleName}
                inputNumberValue={
                  formData?.dependentsRules?.rules[0]?.firstDependent
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
                  formData?.dependentsRules?.rules[1]?.firstDependent
                }
                inputNumberId={formData?.dependentsRules?.rules[1]?.ruleName}
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
                  formData?.dependentsRules?.rules[2]?.firstDependent
                }
                inputNumberId={formData?.dependentsRules?.rules[2]?.ruleName}
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
                  formData.dependentsRules?.rules[0]?.secondDependent
                }
                inputNumberId={formData?.dependentsRules?.rules[0]?.ruleName}
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
                  formData.dependentsRules?.rules[1]?.secondDependent
                }
                inputNumberId={formData?.dependentsRules?.rules[1]?.ruleName}
                onChangeNumber={handleChange}
                placeHolderNumber={"4"}
              />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="text-center bg-gray-200 rounded-md border-2 pt-1">
                Value:{" "}
              </div>
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
            <div className="grid grid-cols-2  gap-2 mb-3">
              <div className="text-center bg-gray-200 rounded-md border-2 pt-1">
                Value:{" "}
              </div>
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
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="text-center bg-gray-200 rounded-md border-2 pt-1">
                Value:{" "}
              </div>
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
