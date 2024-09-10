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

const RiskGradeMatrix = () => {
  const dispatch = useDispatch();
  const { allRiskGradeData, newRiskGradeForm, loading } = useSelector(
    (state) => state.globalConfig
  );

  useEffect(() => {
    dispatch(fetchRiskGrades());
  }, [dispatch]);

  const handleAddFields = () => {
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
  };

  const handleSave = (id) => {
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

  const sortedRiskGradeData = [...allRiskGradeData].sort(
    (a, b) => a.from - b.from
  );

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
              inputValue={newRiskGradeForm.from}
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
            />
            <InputNumber
              labelName="To"
              inputName="to"
              inputValue={newRiskGradeForm.to}
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
            />
            <InputText
              labelName="Risk Grade"
              inputName="grade"
              inputValue={newRiskGradeForm.grade}
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
        <ContainerTile>
          {sortedRiskGradeData.map((rgdata) => (
            <div
              key={rgdata.id}
              className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_120px] max-sm:grid-cols-1 gap-4 py-5"
            >
              <InputNumber
                labelName="From"
                inputName="from"
                inputValue={rgdata.from}
                onChange={(e) =>
                  dispatch(
                    handleRiskGradeExistingInputChange({
                      id: rgdata.id,
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
              <InputNumber
                labelName="To"
                inputName="to"
                inputValue={rgdata.to}
                onChange={(e) =>
                  dispatch(
                    handleRiskGradeExistingInputChange({
                      id: rgdata.id,
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
              <InputText
                labelName="Risk Grade"
                inputName="grade"
                inputValue={rgdata.grade}
                onChange={(e) =>
                  dispatch(
                    handleRiskGradeExistingInputChange({
                      id: rgdata.id,
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
              <div className="flex items-center gap-4 mt-4">
                <Button
                  onClick={() => handleSave(rgdata.id)}
                  buttonIcon={CheckCircleIcon}
                  circle={true}
                />
                <Button
                  onClick={() => handleDelete(rgdata.id)}
                  buttonIcon={TrashIcon}
                  circle={true}
                />
              </div>
            </div>
          ))}
        </ContainerTile>
      </div>
    </>
  );
};

export default RiskGradeMatrix;
