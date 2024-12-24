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
import { useNavigate, useParams } from "react-router-dom";
import { TrashIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import Button from "../Common/Button/Button";
import { validateForm } from "../../redux/Slices/validationSlice";
import store from "../../redux/store";

const RiskBasedPricingEquation = ({ loading, error }) => {
  const dispatch = useDispatch();
  const { rulePolicyId } = useParams();
  const { riskBasedPricingEquation, rules } = useSelector(
    (state) => state.rulePolicy
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const navigate = useNavigate();

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
    await dispatch(validateForm(rules));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      try {
        await dispatch(addRiskBasedPricingEquationRule(navigate)).unwrap();
      } catch (error) {
        console.error("Failed to add RBPE:", error);
      }
    }
  };

  const handleUpdateRBPE = async (index) => {
    const rulesData = riskBasedPricingEquation?.rules[index];

    await dispatch(validateForm(rulesData));
    const state = store.getState();
    const isValid = state.validation.isValid;

    if (isValid) {
      try {
        await dispatch(
          updateRBPE({
            index,
            updatedRule: riskBasedPricingEquation.rules[index],
          })
        ).unwrap();
        dispatch(fetchRulePolicyData(rulePolicyId));
      } catch (error) {
        console.error("Failed to update RBPE:", error);
      }
    }
  };

  const handleDeleteRBPE = async (ruleName) => {
    try {
      await dispatch(
        deleteRiskBasedPricingEquationRule({ rulePolicyId, ruleName })
      ).unwrap();
    } catch (error) {
      console.error("Error deleting RBPE:", error);
    }
  };

  return (
    <>
      <ContainerTile
              loading={loading}
              error={error}
      >
        <div className=" text-center my-4 text-lg">
          Risk Based Pricing = [(Credit Score*A%) + (Employment Sector*B%) +
          (*Length of Service*C%) + (*Cities*D%)]
        </div>
        <table className="divide-y divide-gray-300 w-full">
          <thead className="bg-gray-50">
            <tr className="divide-x divide-gray-200">
              <th className="py-3.5 px-2 text-center text-gray-900">A</th>
              <th className="py-3.5 px-2 text-center text-gray-900">B</th>
              <th className="py-3.5 px-2 text-center text-gray-900">C</th>
              <th className="py-3.5 px-2 text-center text-gray-900">D</th>
              {roleName !== "ROLE_VIEWER" ? (
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Action
                </th>
              ) : (
                ""
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {roleName !== "ROLE_VIEWER" ? (
              <tr className="divide-x divide-gray-200 text-center">
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"a_Weight"}
                    inputValue={rules.a_Weight}
                    onChange={handleRuleChange}
                    placeHolder={"0.54"}
                    isValidation={true}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"b_Weight"}
                    inputValue={rules.b_Weight}
                    onChange={handleRuleChange}
                    placeHolder={"0.54"}
                    isValidation={true}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"c_Weight"}
                    inputValue={rules.c_Weight}
                    onChange={handleRuleChange}
                    placeHolder={"0.54"}
                    isValidation={true}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"d_Weight"}
                    inputValue={rules.d_Weight}
                    onChange={handleRuleChange}
                    placeHolder={"0.54"}
                    isValidation={true}
                  />
                </td>
                <td>
                  <Button
                    buttonIcon={CheckCircleIcon}
                    buttonName={"Add"}
                    onClick={handleAddRBPE}
                    rectangle={true}
                  />
                </td>
              </tr>
            ) : (
              ""
            )}

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
                    isValidation={true}
                    isIndex={item.dataIndex}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"b_Weight"}
                    inputId={item.ruleName}
                    inputValue={item.b_Weight}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                    isValidation={true}
                    isIndex={item.dataIndex}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"c_Weight"}
                    inputId={item.ruleName}
                    inputValue={item.c_Weight}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                    isValidation={true}
                    isIndex={item.dataIndex}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"d_Weight"}
                    inputId={item.ruleName}
                    inputValue={item.d_Weight}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                    isValidation={true}
                    isIndex={item.dataIndex}
                  />
                </td>
                {roleName !== "ROLE_VIEWER" ? (
                  <td className="py-4 flex gap-2 px-4">
                    <Button
                      buttonIcon={CheckCircleIcon}
                      onClick={() => handleUpdateRBPE(index)}
                      circle={true}
                    />
                    <Button
                      buttonIcon={TrashIcon}
                      onClick={() => handleDeleteRBPE(item.ruleName)}
                      circle={true}
                    />
                  </td>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </ContainerTile>
    </>
  );
};

export default RiskBasedPricingEquation;
