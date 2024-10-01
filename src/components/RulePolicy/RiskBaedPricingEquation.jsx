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
import Button from "../Common/Button/Button";
import {
  setValidationError,
  validateFormFields,
} from "../../redux/Slices/validationSlice";

const RiskBasedPricingEquation = () => {
  const dispatch = useDispatch();
  const { rulePolicyId } = useParams();
  const { riskBasedPricingEquation, rules } = useSelector(
    (state) => state.rulePolicy
  );
  const { validationError } = useSelector((state) => state.validation);
  const fields = ["a_Weight", "b_Weight", "c_Weight", "d_Weight"];

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
    const isValid = validateFormFields(fields, rules, dispatch);
    if (isValid) {
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
    }
  };

  const handleUpdateRBPE = async (index) => {
    const rulesData = riskBasedPricingEquation?.rules[index];

    const isValid = validateFormFields(fields, rulesData, dispatch, index);

    if (isValid) {
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

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ContainerTile>
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
                  showError={validationError.a_Weight}
                  onFocus={() =>
                    dispatch(
                      setValidationError({
                        ...validationError,
                        a_Weight: false,
                      })
                    )
                  }
                />
              </td>
              <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                <InputNumber
                  inputName={"b_Weight"}
                  inputValue={rules.b_Weight}
                  onChange={handleRuleChange}
                  placeHolder={"0.54"}
                  showError={validationError.b_Weight}
                  onFocus={() =>
                    dispatch(
                      setValidationError({
                        ...validationError,
                        b_Weight: false,
                      })
                    )
                  }
                />
              </td>
              <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                <InputNumber
                  inputName={"c_Weight"}
                  inputValue={rules.c_Weight}
                  onChange={handleRuleChange}
                  placeHolder={"0.54"}
                  showError={validationError.c_Weight}
                  onFocus={() =>
                    dispatch(
                      setValidationError({
                        ...validationError,
                        c_Weight: false,
                      })
                    )
                  }
                />
              </td>
              <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                <InputNumber
                  inputName={"d_Weight"}
                  inputValue={rules.d_Weight}
                  onChange={handleRuleChange}
                  placeHolder={"0.54"}
                  showError={validationError.d_Weight}
                  onFocus={() =>
                    dispatch(
                      setValidationError({
                        ...validationError,
                        d_Weight: false,
                      })
                    )
                  }
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
                    showError={validationError[`a_Weight_${index}`]}
                    onFocus={() =>
                      dispatch(
                        setValidationError({
                          ...validationError,
                          [`a_Weight_${index}`]: false,
                        })
                      )
                    }
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"b_Weight"}
                    inputId={item.ruleName}
                    inputValue={item.b_Weight}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                    showError={validationError[`b_Weight_${index}`]}
                    onFocus={() =>
                      dispatch(
                        setValidationError({
                          ...validationError,
                          [`b_Weight_${index}`]: false,
                        })
                      )
                    }
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"c_Weight"}
                    inputId={item.ruleName}
                    inputValue={item.c_Weight}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                    showError={validationError[`c_Weight_${index}`]}
                    onFocus={() =>
                      dispatch(
                        setValidationError({
                          ...validationError,
                          [`c_Weight_${index}`]: false,
                        })
                      )
                    }
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                  <InputNumber
                    inputName={"d_Weight"}
                    inputId={item.ruleName}
                    inputValue={item.d_Weight}
                    onChange={handleChange}
                    placeHolder={"0.54"}
                    showError={validationError[`d_Weight_${index}`]}
                    onFocus={() =>
                      dispatch(
                        setValidationError({
                          ...validationError,
                          [`d_Weight_${index}`]: false,
                        })
                      )
                    }
                  />
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </ContainerTile>
    </>
  );
};

export default RiskBasedPricingEquation;
