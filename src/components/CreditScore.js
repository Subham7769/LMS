import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import { RowChanged } from "./Toasts";
import LoadingState from "./LoadingState";

const options = [
  { value: "==", label: "==" },
  { value: "<", label: "<" },
  { value: ">", label: ">" },
  { value: "<=", label: "<=" },
  { value: ">=", label: ">=" },
];

const CreditScore = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [creditScoreData, setCreditScoreData] = useState([]);
  const [aWeightage, setaWeightage] = useState("");
  const [bWeightage, setbWeightage] = useState("");
  const [cWeightage, setcWeightage] = useState("");
  const [dWeightage, setdWeightage] = useState("");
  const [eWeightage, seteWeightage] = useState("");
  const [fWeightage, setfWeightage] = useState("");
  const [saudisCreditScore, setsaudisCreditScore] = useState("");
  const [expatriatesCreditScore, setexpatriatesCreditScore] = useState("");
  const [rentStatusScore, setrentStatusScore] = useState("");
  const [ownStatusScore, setownStatusScore] = useState("");
  const [marriedStatusScore, setmarriedStatusScore] = useState("");
  const [singleStatusScore, setsingleStatusScore] = useState("");
  const [divorcedStatusScore, setdivorcedStatusScore] = useState("");
  const [widowedStatusScore, setwidowedStatusScore] = useState("");
  const [separatedStatusScore, setseparatedStatusScore] = useState("");
  const [unknownStatusScore, setunknownStatusScore] = useState("");
  const [firstDependent, setfirstDependent] = useState("");
  const [secondDependent, setsecondDependent] = useState("");
  const [thirdDependent, setthirdDependent] = useState("");
  const [fourthDependent, setfourthDependent] = useState("");
  const [fifthDependent, setfifthDependent] = useState("");
  const [value, setvalue] = useState("");
  const [value1, setvalue1] = useState("");
  const [value2, setvalue2] = useState("");
  const [firstDependentsOperator, setfirstDependentsOperator] = useState(
    options[3]
  );
  const [secondDependentsOperator, setsecondDependentsOperator] = useState(
    options[3]
  );
  const [ruleName, setruleName] = useState("");
  const [ruleName1, setruleName1] = useState("");
  const [ruleName2, setruleName2] = useState("");

  useEffect(() => {
    getProductInfo();
  }, [projectId]);
  async function getProductInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/xcbe/api/v1/configs/credit-score-equation/" +
          projectId,
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
      }
      const creditScoreDetails = await data.json();
      // console.log(racDetails);
      setCreditScoreData(creditScoreDetails);
      //   window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (creditScoreData.length === 0) {
      console.log("Fetching data");
    } else {
      console.log(creditScoreData);
      setaWeightage(creditScoreData.aWeightage);
      setbWeightage(creditScoreData.bWeightage);
      setcWeightage(creditScoreData.cWeightage);
      setdWeightage(creditScoreData.dWeightage);
      seteWeightage(creditScoreData.eWeightage);
      setfWeightage(creditScoreData.fWeightage);
      setsaudisCreditScore(creditScoreData.saudisCreditScore);
      setexpatriatesCreditScore(creditScoreData.expatriatesCreditScore);
      setrentStatusScore(creditScoreData.rentStatusScore);
      setownStatusScore(creditScoreData.ownStatusScore);
      setmarriedStatusScore(creditScoreData.marriedStatusScore);
      setsingleStatusScore(creditScoreData.singleStatusScore);
      setdivorcedStatusScore(creditScoreData.divorcedStatusScore);
      setwidowedStatusScore(creditScoreData.widowedStatusScore);
      setseparatedStatusScore(creditScoreData.separatedStatusScore);
      setunknownStatusScore(creditScoreData.unknownStatusScore);
      setfirstDependent(
        creditScoreData.dependentsRules.rules[0].firstDependent
      );
      setsecondDependent(
        creditScoreData.dependentsRules.rules[0].secondDependent
      );
      setthirdDependent(
        creditScoreData.dependentsRules.rules[1].firstDependent
      );
      setfourthDependent(
        creditScoreData.dependentsRules.rules[1].secondDependent
      );
      setfifthDependent(
        creditScoreData.dependentsRules.rules[2].firstDependent
      );
      setvalue(creditScoreData.dependentsRules.rules[0].value);
      setvalue1(creditScoreData.dependentsRules.rules[1].value);
      setvalue2(creditScoreData.dependentsRules.rules[2].value);
      setruleName(creditScoreData.dependentsRules.rules[0].ruleName);
      setruleName1(creditScoreData.dependentsRules.rules[1].ruleName);
      setruleName2(creditScoreData.dependentsRules.rules[2].ruleName);
      const formattedfirstDependentsOperator = {
        value:
          creditScoreData.dependentsRules.operators.firstDependentsOperator,
        label:
          creditScoreData.dependentsRules.operators.firstDependentsOperator,
      };
      const formattedsecondDependentsOperator = {
        value:
          creditScoreData.dependentsRules.operators.secondDependentsOperator,
        label:
          creditScoreData.dependentsRules.operators.secondDependentsOperator,
      };
      setfirstDependentsOperator(formattedfirstDependentsOperator);
      setsecondDependentsOperator(formattedsecondDependentsOperator);
    }
  }, [creditScoreData]);

  const handleAddFields = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      aWeightage: aWeightage,
      bWeightage: bWeightage,
      cWeightage: cWeightage,
      dWeightage: dWeightage,
      eWeightage: eWeightage,
      fWeightage: fWeightage,
      saudisCreditScore: saudisCreditScore,
      expatriatesCreditScore: expatriatesCreditScore,
      marriedStatusScore: marriedStatusScore,
      singleStatusScore: singleStatusScore,
      divorcedStatusScore: divorcedStatusScore,
      widowedStatusScore: widowedStatusScore,
      separatedStatusScore: separatedStatusScore,
      unknownStatusScore: unknownStatusScore,
      rentStatusScore: rentStatusScore,
      ownStatusScore: ownStatusScore,
      dependentsRules: {
        operators: {
          firstDependentsOperator: firstDependentsOperator.value,
          secondDependentsOperator: secondDependentsOperator.value,
        },
        rules: [
          {
            ruleName: ruleName,
            fieldType: "Employer",
            projectId: projectId,
            firstDependent: firstDependent,
            secondDependent: secondDependent,
            value: value,
          },
          {
            ruleName: ruleName1,
            fieldType: "Employer",
            projectId: projectId,
            firstDependent: thirdDependent,
            secondDependent: fourthDependent,
            value: value1,
          },
          {
            ruleName: ruleName2,
            fieldType: "Employer",
            projectId: projectId,
            firstDependent: fifthDependent,
            secondDependent: " ",
            value: value2,
          },
        ],
      },
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/xcbe/api/v1/configs/credit-score-equation/" +
          projectId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
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

  if (creditScoreData.length === 0) {
    return <LoadingState />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="border-b border-gray-300 pb-8 mb-8">
        {/* <h2 className="text-xl text-center">Nationality Score</h2> */}
        <div className=" text-center mt-8 mb-4">
          ((creditBureauScore-300)*A/550) + (nationality*B) + (netIncome*C) +
          (dependents*D) + (maritalStatus*E) + (residentialStatus*F)
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
                <td className="whitespace-nowrap py-4 px-2 text-gray-900">
                  <input
                    type="number"
                    name="aWeightage"
                    value={aWeightage}
                    onChange={(e) => setaWeightage(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="bWeightage"
                    value={bWeightage}
                    onChange={(e) => setbWeightage(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="cWeightage"
                    value={cWeightage}
                    onChange={(e) => setcWeightage(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="dWeightage"
                    value={dWeightage}
                    onChange={(e) => setdWeightage(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="eWeightage"
                    value={eWeightage}
                    onChange={(e) => seteWeightage(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="fWeightage"
                    value={fWeightage}
                    onChange={(e) => setfWeightage(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
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
                  <input
                    type="number"
                    name="saudisCreditScore"
                    value={saudisCreditScore}
                    onChange={(e) => setsaudisCreditScore(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    value={expatriatesCreditScore}
                    onChange={(e) => setexpatriatesCreditScore(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
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
                  <input
                    type="number"
                    value={rentStatusScore}
                    onChange={(e) => setrentStatusScore(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    value={ownStatusScore}
                    onChange={(e) => setownStatusScore(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
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
                  <input
                    type="number"
                    value={marriedStatusScore}
                    onChange={(e) => setmarriedStatusScore(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    value={singleStatusScore}
                    onChange={(e) => setsingleStatusScore(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    value={divorcedStatusScore}
                    onChange={(e) => setdivorcedStatusScore(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    value={widowedStatusScore}
                    onChange={(e) => setwidowedStatusScore(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    value={separatedStatusScore}
                    onChange={(e) => setseparatedStatusScore(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    value={unknownStatusScore}
                    onChange={(e) => setunknownStatusScore(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
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
            <div className="flex gap-4 mb-3">
              <Select
                className="min-w-20"
                defaultValue={options[3]}
                options={options}
                value={firstDependentsOperator}
                isSearchable={false}
                onChange={(firstDependentsOperator) => {
                  setfirstDependentsOperator(firstDependentsOperator);
                }}
              />
              <input
                type="number"
                name="firstDependent"
                value={firstDependent}
                onChange={(e) => {
                  setfirstDependent(e.target.value);
                }}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="4"
              />
            </div>
            <div className="flex gap-4 mb-3">
              <Select
                className="min-w-20"
                defaultValue={options[3]}
                options={options}
                value={firstDependentsOperator}
                isSearchable={false}
                onChange={(firstDependentsOperator) => {
                  setfirstDependentsOperator(firstDependentsOperator);
                }}
              />
              <input
                type="number"
                name="firstDependent"
                value={thirdDependent}
                onChange={(e) => {
                  setthirdDependent(e.target.value);
                }}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="4"
              />
            </div>
            <div className="flex gap-4 mb-3">
              <Select
                className="min-w-20"
                defaultValue={options[3]}
                options={options}
                value={firstDependentsOperator}
                isSearchable={false}
                onChange={(firstDependentsOperator) => {
                  setfirstDependentsOperator(firstDependentsOperator);
                }}
              />
              <input
                type="number"
                name="firstDependent"
                value={fifthDependent}
                onChange={(e) => {
                  setfifthDependent(e.target.value);
                }}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="4"
              />
            </div>
          </div>
          <div>
            <div className="flex gap-4 mb-3">
              <Select
                className="min-w-20"
                defaultValue={options[3]}
                options={options}
                value={secondDependentsOperator}
                isSearchable={false}
                onChange={(secondDependentsOperator) => {
                  setsecondDependentsOperator(secondDependentsOperator);
                }}
              />
              <input
                type="number"
                name="secondDependent"
                value={secondDependent}
                onChange={(e) => {
                  setsecondDependent(e.target.value);
                }}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="4"
              />
            </div>
            <div className="flex gap-4 mb-3">
              <Select
                className="min-w-20"
                defaultValue={options[3]}
                options={options}
                value={secondDependentsOperator}
                isSearchable={false}
                onChange={(secondDependentsOperator) => {
                  setsecondDependentsOperator(secondDependentsOperator);
                }}
              />
              <input
                type="number"
                name="secondDependent"
                value={fourthDependent}
                onChange={(e) => {
                  setfourthDependent(e.target.value);
                }}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="4"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div>Value: </div>
              <div>
                <input
                  type="number"
                  name="value"
                  value={value}
                  onChange={(e) => {
                    setvalue(e.target.value);
                  }}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="4000"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div>Value: </div>
              <div>
                <input
                  type="number"
                  name="value"
                  value={value1}
                  onChange={(e) => {
                    setvalue1(e.target.value);
                  }}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="4000"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div>Value: </div>
              <div>
                <input
                  type="number"
                  name="value"
                  value={value2}
                  onChange={(e) => {
                    setvalue2(e.target.value);
                  }}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="4000"
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
