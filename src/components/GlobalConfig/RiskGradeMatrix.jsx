import { useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
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
  setValidationError,
  validateFormFields,
} from "../../redux/Slices/validationSlice";

const RiskGradeMatrix = () => {
  const dispatch = useDispatch();
  const { allRiskGradeData, newRiskGradeForm, loading } = useSelector((state) => state.globalConfig);
  const { validationError } = useSelector((state) => state.validation);
  const fields = ["from", "to", "grade"];

  useEffect(() => {
    dispatch(fetchRiskGrades());
    if (allRiskGradeData?.length) {
      const initialValidationError = {};
      allRiskGradeData.forEach((_, index) => {
        fields.forEach((field) => {
          // Create validation keys dynamically based on the index
          initialValidationError[`${field}_${index}`] = false;
        });
      });
      dispatch(setValidationError(initialValidationError));
    }
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleAddFields = () => {
    const { from, to, grade } = newRiskGradeForm;
    const isValid = validateFormFields(fields, { from, to, grade }, dispatch);
    console.log(isValid)
    if (isValid) {
      dispatch(addRiskGrade(newRiskGradeForm)).then(() =>
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Added Successfully"}
            message={"Item has been added successfully"}
          />
        ))
      );
    }
  };

  const handleSave = (id, index) => {
    const isValid = validateFormFields(fields, allRiskGradeData[index], dispatch,  index);
    console.log(isValid)
    if (isValid) {
      const itemToUpdate = allRiskGradeData.find((item) => item.id === id);
      dispatch(updateRiskGrade(itemToUpdate)).then(() =>
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Updated Successfully"}
            message={"Data has been updated successfully"}
          />
        ))
      );
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteRiskGrade(id)).then(() =>
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Deleted Successfully"}
          message={"The item has been deleted successfully"}
        />
      ))
    );
  };

  if (loading) {
    return <LoadingState />;
  }

  // const sortedRiskGradeData = [...allRiskGradeData].sort(
  //   (a, b) => a.from - b.from
  // );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="mb-6">
        <b
          title="Risk Grading Calculation"
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          Risk Grading Calculation
        </b>
      </h2>
      <div className="flex flex-col gap-5">
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
              showError={validationError.from}
              onFocus={() =>
                dispatch(
                  setValidationError({ ...validationError, from: false })
                )
              }
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
              showError={validationError.to}
              onFocus={() =>
                dispatch(
                  setValidationError({ ...validationError, to: false })
                )
              }
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
              showError={validationError.grade}
              onFocus={() =>
                dispatch(
                  setValidationError({ ...validationError, grade: false })
                )
              }
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
                showError={validationError[`from_${index}`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({ ...validationError, [`from_${index}`]: false })
                  )
                }
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
                showError={validationError[`to_${index}`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({ ...validationError, [`to_${index}`]: false })
                  )
                }
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
                showError={validationError[`grade_${index}`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({ ...validationError, [`grade_${index}`]: false })
                  )
                }
              />
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
            </div>
          </ContainerTile>
        ))}
      </div>
    </>
  );
};

export default RiskGradeMatrix;
