import ContainerTile from "../Common/ContainerTile/ContainerTile";
import InputNumber from "../Common/InputNumber/InputNumber";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRulePolicyData,
  updateRules,
  addRiskBasedPricingEquationRule,
  deleteRiskBasedPricingEquationRule,
  updateRBPE,
  setRiskBasedPricingEquation,
} from "../../redux/Slices/rulePolicySlice";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import { TrashIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import SectionErrorBoundary from "../ErrorBoundary/SectionErrorBoundary";

const RiskBasedPricingEquation = () => {
  const dispatch = useDispatch();
  const { rulePolicyId } = useParams();
  const { riskBasedPricingEquation, rules } = useSelector(
    (state) => state.rulePolicy
  );

  const handleRuleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateRules({ [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;

    dispatch(
      setRiskBasedPricingEquation({
        ...riskBasedPricingEquation,
        rules: riskBasedPricingEquation.rules.map((rule) =>
          rule.ruleName === id ? { ...rule, [name]: value } : rule
        ),
      })
    );
  };

  const handleAddRBPE = async () => {
    try {
      await dispatch(addRiskBasedPricingEquationRule()).unwrap();
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Added Successfully"}
          message={"The item has been added successfully"}
        />
      ));
    } catch (error) {
      console.error("Failed to add RBPE:", error);
    }
  };

  const handleUpdateRBPE = async (index) => {
    try {
      await dispatch(
        updateRBPE({
          index,
          updatedRule: riskBasedPricingEquation.rules[index],
        })
      ).unwrap();
      dispatch(fetchRulePolicyData(rulePolicyId));
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Update Successful"}
          message={"The item was updated successfully"}
        />
      ));
    } catch (error) {
      console.error("Failed to update RBPE:", error);
    }
  };

  const handleDeleteRBPE = async (ruleName) => {
    try {
      await dispatch(
        deleteRiskBasedPricingEquationRule({ rulePolicyId, ruleName })
      ).unwrap();
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Delete Successful"}
          message={"The item was deleted successfully"}
        />
      ));
    } catch (error) {
      console.error("Error deleting RBPE:", error);
    }
  };

  const Content = () => (
    <>
      <table className="divide-y divide-gray-300 w-full">
        <thead className="bg-gray-50">
          <tr className="divide-x divide-gray-200">
            <th className="py-3.5 px-2 text-center text-gray-900">A</th>
            <th className="py-3.5 px-2 text-center text-gray-900">B</th>
            <th className="py-3.5 px-2 text-center text-gray-900">C</th>
            <th className="py-3.5 px-2 text-center text-gray-900">D</th>
            <th className="py-3.5 px-2 text-center text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr className="divide-x divide-gray-200 text-center">
            <td className="whitespace-nowrap py-4 px-5 text-gray-500">
              <InputNumber
                inputName={"a_Weight"}
                inputValue={rules.a_Weight}
                onChange={handleRuleChange}
                placeHolder={"0.54"}
              />
            </td>
            <td className="whitespace-nowrap py-4 px-5 text-gray-500">
              <InputNumber
                inputName={"b_Weight"}
                inputValue={rules.b_Weight}
                onChange={handleRuleChange}
                placeHolder={"0.54"}
              />
            </td>
            <td className="whitespace-nowrap py-4 px-5 text-gray-500">
              <InputNumber
                inputName={"c_Weight"}
                inputValue={rules.c_Weight}
                onChange={handleRuleChange}
                placeHolder={"0.54"}
              />
            </td>
            <td className="whitespace-nowrap py-4 px-5 text-gray-500">
              <InputNumber
                inputName={"d_Weight"}
                inputValue={rules.d_Weight}
                onChange={handleRuleChange}
                placeHolder={"0.54"}
              />
            </td>
            <td>
              <button
                type="button"
                onClick={handleAddRBPE}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Add
              </button>
            </td>
          </tr>
          {riskBasedPricingEquation?.rules?.map((item, index) => (
            <tr
              key={item.ruleName || index}
              className="divide-x divide-gray-200 text-center"
            >
              <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                <InputNumber
                  inputName={"a_Weight"}
                  inputId={item.ruleName}
                  inputValue={item.a_Weight}
                  onChange={handleChange}
                  placeHolder={"0.54"}
                />
              </td>
              <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                <InputNumber
                  inputName={"b_Weight"}
                  inputId={item.ruleName}
                  inputValue={item.b_Weight}
                  onChange={handleChange}
                  placeHolder={"0.54"}
                />
              </td>
              <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                <InputNumber
                  inputName={"c_Weight"}
                  inputId={item.ruleName}
                  inputValue={item.c_Weight}
                  onChange={handleChange}
                  placeHolder={"0.54"}
                />
              </td>
              <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                <InputNumber
                  inputName={"d_Weight"}
                  inputId={item.ruleName}
                  inputValue={item.d_Weight}
                  onChange={handleChange}
                  placeHolder={"0.54"}
                />
              </td>
              <td className="py-4 flex gap-2 px-4">
                <button
                  type="button"
                  onClick={() => handleUpdateRBPE(index)}
                  className="block w-9 h-9 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60"
                >
                  <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteRBPE(item.ruleName)}
                  className="block w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ContainerTile>
        <div className=" text-center my-4 text-lg">
          Risk Based Pricing = [(Credit Score*A%) + (Employment Sector*B%) +
          (*Length of Service*C%) + (*Cities*D%)]
        </div>
        <SectionErrorBoundary>
          <Content />
        </SectionErrorBoundary>
      </ContainerTile>
    </>
  );
};

export default RiskBasedPricingEquation;
