import { useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import LoadingState from "../LoadingState/LoadingState";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRiskGrades,
  addRiskGrade,
  updateRiskGrade,
  deleteRiskGrade,
  handleRiskGradeNewInputChange,
  handleRiskGradeExistingInputChange,
} from "../../redux/Slices/globalConfigSlice";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";

const RiskGradeMatrix = () => {
  const dispatch = useDispatch();
  const { allRiskGradeData, newRiskGradeForm, loading } = useSelector(
    (state) => state.globalConfig
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    dispatch(fetchRiskGrades());
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleAddFields = async () => {
    await dispatch(validateForm(newRiskGradeForm));
    const state = store.getState();
    const isValid = state.validation.isValid;
    console.log(isValid);
    if (isValid) {
      dispatch(addRiskGrade(newRiskGradeForm))
    }
  };

  const handleSave = async (id, index) => {
    await dispatch(validateForm(allRiskGradeData[index]));
    const state = store.getState();
    const isValid = state.validation.isValid;
    console.log(isValid);
    if (isValid) {
      const itemToUpdate = allRiskGradeData.find((item) => item.id === id);
      dispatch(updateRiskGrade(itemToUpdate))
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteRiskGrade(id))
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <h2 className="mb-6">
        <b
          title="Risk Grading Calculation"
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          Risk Grading Calculation
        </b>
      </h2>
      <div className="flex flex-col gap-5">
        {roleName !== "ROLE_VIEWER" ? (
          <ContainerTile>
            <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_120px] max-sm:grid-cols-1 gap-4">
              <InputNumber
                labelName="From"
                inputName="from"
                inputValue={newRiskGradeForm?.from}
                onChange={(e) =>
                  dispatch(
                    handleRiskGradeNewInputChange({
                      name: e.target.name,
                      value: e.target.value,
                      type: e.target.type,
                      checked: e.target.checked,
                    })
                  )
                }
                placeHolder="10"
                isValidation={true}
              />
              <InputNumber
                labelName="To"
                inputName="to"
                inputValue={newRiskGradeForm?.to}
                onChange={(e) =>
                  dispatch(
                    handleRiskGradeNewInputChange({
                      name: e.target.name,
                      value: e.target.value,
                      type: e.target.type,
                      checked: e.target.checked,
                    })
                  )
                }
                placeHolder="30"
                isValidation={true}
              />
              <InputText
                labelName="Risk Grade"
                inputName="grade"
                inputValue={newRiskGradeForm?.grade}
                onChange={(e) =>
                  dispatch(
                    handleRiskGradeNewInputChange({
                      name: e.target.name,
                      value: e.target.value,
                      type: e.target.type,
                      checked: e.target.checked,
                    })
                  )
                }
                placeHolder="R1"
                isValidation={true}
              />
              <div className="mt-4">
                <Button
                  onClick={handleAddFields}
                  buttonIcon={PlusIcon}
                  circle={true}
                />
              </div>
            </div>
          </ContainerTile>
        ) : (
          ""
        )}

        {allRiskGradeData.map((riskGradingData, index) => (
          <ContainerTile>
            <div
              key={riskGradingData.id}
              className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_120px] max-sm:grid-cols-1 gap-4"
            >
              <InputNumber
                labelName="From"
                inputName="from"
                inputValue={riskGradingData.from}
                onChange={(e) =>
                  dispatch(
                    handleRiskGradeExistingInputChange({
                      id: riskGradingData.id,
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                isValidation={true}
                isIndex={riskGradingData.dataIndex}
              />
              <InputNumber
                labelName="To"
                inputName="to"
                inputValue={riskGradingData.to}
                onChange={(e) =>
                  dispatch(
                    handleRiskGradeExistingInputChange({
                      id: riskGradingData.id,
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                isValidation={true}
                isIndex={riskGradingData.dataIndex}
              />
              <InputText
                labelName="Risk Grade"
                inputName="grade"
                inputValue={riskGradingData.grade}
                onChange={(e) =>
                  dispatch(
                    handleRiskGradeExistingInputChange({
                      id: riskGradingData.id,
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                isValidation={true}
                isIndex={riskGradingData.dataIndex}
              />
              {roleName !== "ROLE_VIEWER" ? (
                <div className="flex items-center gap-2 mt-4">
                  <Button
                    onClick={() => handleSave(riskGradingData.id, index)}
                    buttonIcon={CheckCircleIcon}
                    circle={true}
                  />
                  <Button
                    onClick={() => handleDelete(riskGradingData.id)}
                    buttonIcon={TrashIcon}
                    circle={true}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </ContainerTile>
        ))}
      </div>
    </>
  );
};

export default RiskGradeMatrix;
