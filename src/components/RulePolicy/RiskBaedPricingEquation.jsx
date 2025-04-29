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
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { AddIcon, CheckIcon, DeleteIcon } from "../../assets/icons";

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
      <ContainerTile loading={loading} defaultClass={false}>
        <div className="bg-white dark:bg-gray-800 shadow-md border rounded-xl relative mb-8">
          <header className="px-5 py-4">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Risk Based Pricing = [(Credit Score*A%) + (Employment Sector*B%) +
              (*Length of Service*C%) + (*Cities*D%)]
            </h2>
          </header>
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-gray-300">
              <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
                <tr className="">
                  <th className="px-4 py-4 whitespace-nowrap text-left min-w-32">
                    A
                  </th>
                  <th className="px-4 py-4 whitespace-nowrap text-left min-w-32">
                    B
                  </th>
                  <th className="px-4 py-4 whitespace-nowrap text-left min-w-32">
                    C
                  </th>
                  <th className="px-4 py-4 whitespace-nowrap text-left min-w-32">
                    D
                  </th>
                  {!hasViewOnlyAccess(roleName) ? (
                    <th className="px-4 py-4 whitespace-nowrap text-left">
                      Action
                    </th>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {!hasViewOnlyAccess(roleName) ? (
                  <tr className="">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <InputNumber
                        inputName={"a_Weight"}
                        inputValue={rules.a_Weight}
                        onChange={handleRuleChange}
                        placeHolder={"0.54"}
                        isValidation={true}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <InputNumber
                        inputName={"b_Weight"}
                        inputValue={rules.b_Weight}
                        onChange={handleRuleChange}
                        placeHolder={"0.54"}
                        isValidation={true}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <InputNumber
                        inputName={"c_Weight"}
                        inputValue={rules.c_Weight}
                        onChange={handleRuleChange}
                        placeHolder={"0.54"}
                        isValidation={true}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <InputNumber
                        inputName={"d_Weight"}
                        inputValue={rules.d_Weight}
                        onChange={handleRuleChange}
                        placeHolder={"0.54"}
                        isValidation={true}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Button
                        buttonIcon={AddIcon}
                        buttonName={"Add"}
                        onClick={handleAddRBPE}
                        buttonType="secondary"
                      />
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                {riskBasedPricingEquation?.rules?.map((item, index) => (
                  <tr key={item.ruleName || index} className="">
                    <td className="px-4 py-4 whitespace-nowrap">
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
                    <td className="px-4 py-4 whitespace-nowrap">
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
                    <td className="px-4 py-4 whitespace-nowrap">
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
                    <td className="px-4 py-4 whitespace-nowrap">
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
                    {!hasViewOnlyAccess(roleName) ? (
                      <td className="py-4 flex gap-2 px-4">
                        <Button
                          buttonIcon={CheckIcon}
                          onClick={() => handleUpdateRBPE(index)}
                          buttonType="secondary"
                        />
                        <Button
                          buttonIcon={DeleteIcon}
                          onClick={() => handleDeleteRBPE(item.ruleName)}
                          buttonType="destructive"
                        />
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ContainerTile>
    </>
  );
};

export default RiskBasedPricingEquation;
