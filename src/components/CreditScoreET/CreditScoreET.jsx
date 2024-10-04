import InputSelect from "../Common/InputSelect/InputSelect";
import { operatorOptions } from "../../data/OptionsData";
import InputNumber from "../Common/InputNumber/InputNumber";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import { TrashIcon } from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed, RowChanged, Warning } from "../Toasts";
import Button from "../Common/Button/Button";
import DynamicName from "../Common/DynamicName/DynamicName";
import CloneModal from "../Common/CloneModal/CloneModal";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCreditScoreETInfo,
  fetchCreditScoreETName,
  setTenure,
  addTenure,
  deleteTenure,
  updateCreditScoreET,
  saveCreditScoreET,
  updateCreditScoreETId,
  updateCreditScoreETName,
  AddNewRange,
  updateNewRange,
  setNewRangeTenure,
  addNewRangeTenure,
  deleteNewRangeTenure,
  createCloneCSET,
  handleDeleteCSET,
  handleDeleteRange,
} from "../../redux/Slices/creditScoreETSlice";
import TagInput from "../TagInput/TagInput";
import {
  clearValidationError,
  setValidationError,
  validateFormFields,
  validateUserRole,
} from "../../redux/Slices/validationSlice";

const CreditScoreET = () => {
  const { creditScoreETId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { creditScoreET, newRangeData, creditScoreETName, loading, error } =
    useSelector((state) => state.creditScoreET);
  const { validationError } = useSelector((state) => state.validation);
  const fields = ["firstCreditScore", "secondCreditScore"];
  const fields2 = ["tenureValue"];

  useEffect(() => {
    dispatch(fetchCreditScoreETInfo(creditScoreETId))
      .then(() => dispatch(fetchCreditScoreETName(creditScoreETId)))
      .then(() => dispatch(updateCreditScoreETId(creditScoreETId)));

    const initialValidationError = {};
    fields.forEach((field) => {
      initialValidationError[field] = false; // Set all fields to false initially
    });
    dispatch(setValidationError(initialValidationError));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [creditScoreETId, dispatch]);

  const handleSaveET = async (creditScoreETId, index) => {
    const data = creditScoreET?.rules[index];
    const isValid = validateFormFields(fields, data, dispatch, index);
    if (isValid) {
      await dispatch(saveCreditScoreET(creditScoreETId)).unwrap();
      toast.custom((t) => <RowChanged t={t} toast={toast} />);
    }
  };

  const handleUpdateCSET = async (updatecsetName) => {
    await dispatch(
      updateCreditScoreETName({ creditScoreETId, updatecsetName })
    ).unwrap();
    dispatch(fetchCreditScoreETName(creditScoreETId));
  };

  const handleClone = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onCreateClone = async (creditScoreETId, cloneCSETName) => {
    setIsModalOpen(false);
    const details = await dispatch(
      createCloneCSET({ creditScoreETId, cloneCSETName })
    ).unwrap();

    toast.custom((t) => (
      <Passed
        t={t}
        toast={toast}
        title="Clone Successful"
        message="The clone was created successfully"
      />
    ));
    navigate("/credit-score-eligible-tenure/" + details.creditScoreEtTempId);
  };

  const onDeleteCSET = async (creditScoreETId) => {
    await dispatch(handleDeleteCSET(creditScoreETId)).unwrap();
    navigate("/credit-score-eligible-tenure");
  };

  const DeleteRange = async ({ creditScoreETId, ruleName }) => {
    await dispatch(handleDeleteRange({ creditScoreETId, ruleName }));
  };

  const handleChange = (e, ruleIndex) => {
    const { name, value } = e.target;
    dispatch(updateCreditScoreET({ name, value, ruleIndex }));
  };

  const handleChangeTenure = (e, ruleIndex) => {
    const { name, value } = e.target;
    dispatch(setTenure({ name, value, ruleIndex }));
  };

  const handleDelete = (tag, ruleIndex) => {
    dispatch(deleteTenure({ tag, ruleIndex })); // Dispatch with ruleIndex and tag
    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"Not Yet Deleted!"}
        message={"Please click the save button to confirm removal of entry"}
      />
    ));
  };

  const handleNewRangeDelete = (tag) => {
    dispatch(deleteNewRangeTenure({ tag })); // Dispatch with ruleIndex and tag
  };

  const addTag = async () => {
    const data = newRangeData.rules[0];
    const isValid = validateFormFields(fields2, data, dispatch);
    if (isValid) {
      dispatch(addNewRangeTenure());
    }
  };

  const handleAddTenure = (index) => {
    const tenureValue = creditScoreET?.rules[index];
    const isValid = validateFormFields(fields2, tenureValue, dispatch, index);
    if (isValid) {
      dispatch(addTenure({ ruleIndex: index }));
    }
  };

  const handleAddNewRange = async (creditScoreETId) => {
    const data = newRangeData.rules[0];
    const tenure = newRangeData?.rules[0].tenure;
    const isValid = validateFormFields(fields, data, dispatch);
    const isValid2 = validateUserRole(tenure, dispatch);
    if (!isValid2) {
      toast.custom((t) => (
        <Failed
          t={t}
          toast={toast}
          title={"Alert"}
          message={"Add atleast 1 eligible tenure"}
        />
      ));
    }
    if (isValid && isValid2) {
      await dispatch(AddNewRange(creditScoreETId)).unwrap();
      toast.custom((t) => <RowChanged t={t} toast={toast} />);
    }
  };

  const handleChangeRange = (e) => {
    const { name, value } = e.target;
    dispatch(updateNewRange({ name, value }));
  };

  const handleChangeNewRangeTenure = (e) => {
    const { name, value } = e.target;
    dispatch(setNewRangeTenure({ name, value }));
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    <p>Error: {error}</p>;
  }
  // console.log(newRangeData);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-4 flex items-center justify-between">
        <DynamicName
          initialName={creditScoreETName}
          onSave={handleUpdateCSET}
        />
        <div className="flex gap-4">
          <Button buttonName={"Clone"} onClick={handleClone} rectangle={true} />
          <Button
            buttonIcon={TrashIcon}
            onClick={() => onDeleteCSET(creditScoreETId)}
            circle={true}
          />
        </div>
      </div>
      <CloneModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateClone={(cloneCSETName) =>
          onCreateClone(creditScoreETId, cloneCSETName)
        }
        initialName={creditScoreETName}
      />
      <ContainerTile>
        <div className="grid grid-cols-4 gap-2 mb-5 items-end">
          <InputSelect
            labelName={"Minimum Credit Score"}
            inputName={"firstCreditScoreOperator"}
            inputValue={newRangeData?.operators?.firstCreditScoreOperator}
            inputOptions={operatorOptions}
            onChange={handleChangeRange}
          />
          <InputNumber
            inputName={"firstCreditScore"}
            inputValue={newRangeData.rules?.[0]?.firstCreditScore}
            onChange={handleChangeRange}
            placeHolder="0"
            showError={validationError?.firstCreditScore}
            onFocus={() =>
              dispatch(
                setValidationError({
                  ...validationError,
                  firstCreditScore: false,
                })
              )
            }
          />
          <InputSelect
            labelName={"Maximum Credit Score"}
            inputName={"secondCreditScoreOperator"}
            inputValue={newRangeData?.operators?.secondCreditScoreOperator}
            inputOptions={operatorOptions}
            onChange={handleChangeRange}
          />
          <InputNumber
            inputName={"secondCreditScore"}
            inputValue={newRangeData.rules?.[0]?.secondCreditScore}
            onChange={handleChangeRange}
            placeHolder="2"
            showError={validationError?.secondCreditScore}
            onFocus={() =>
              dispatch(
                setValidationError({
                  ...validationError,
                  secondCreditScore: false,
                })
              )
            }
          />
        </div>
        <TagInput
          formData={newRangeData.rules[0]}
          handleChange={handleChangeNewRangeTenure}
          inputTextName={"tenureValue"}
          inputTextLabel={"Eligible Tenure"}
          addTag={addTag}
          deleteTag={(tag) => handleNewRangeDelete(tag)}
          showError={validationError?.tenureValue}
          onFocus={() =>
            dispatch(
              setValidationError({
                ...validationError,
                tenureValue: false,
              })
            )
          }
        />

        <div className="flex gap-4 justify-end items-center">
          <Button
            buttonName={"Add Range"}
            onClick={() => handleAddNewRange(creditScoreETId)}
            rectangle={true}
          />
        </div>
      </ContainerTile>
      {creditScoreET && (
        <div className="flex flex-col gap-5 mt-5">
          {creditScoreET?.rules?.map((rule, index) => {
            return (
              <ContainerTile>
                <div className="grid grid-cols-4 gap-2 mb-5 items-end">
                  <InputSelect
                    labelName={"Minimum Credit Score"}
                    inputName={"firstCreditScoreOperator"}
                    inputValue={
                      creditScoreET?.operators?.firstCreditScoreOperator
                    }
                    inputOptions={operatorOptions}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <InputNumber
                    inputName={"firstCreditScore"}
                    inputValue={rule?.firstCreditScore}
                    onChange={(e) => handleChange(e, index)}
                    placeHolder="0"
                    showError={validationError[`firstCreditScore_${index}`]}
                    onFocus={() =>
                      dispatch(
                        setValidationError({
                          ...validationError,
                          [`firstCreditScore_${index}`]: false,
                        })
                      )
                    }
                  />
                  <InputSelect
                    labelName={"Maximum Credit Score"}
                    inputName={"secondCreditScoreOperator"}
                    inputValue={
                      creditScoreET?.operators?.secondCreditScoreOperator
                    }
                    inputOptions={operatorOptions}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <InputNumber
                    inputName={"secondCreditScore"}
                    inputValue={rule?.secondCreditScore}
                    onChange={(e) => handleChange(e, index)}
                    placeHolder="2"
                    showError={validationError[`secondCreditScore_${index}`]}
                    onFocus={() =>
                      dispatch(
                        setValidationError({
                          ...validationError,
                          [`secondCreditScore_${index}`]: false,
                        })
                      )
                    }
                  />
                </div>
                <TagInput
                  formData={rule}
                  handleChange={(e) => handleChangeTenure(e, index)}
                  inputTextName={"tenureValue"}
                  inputTextLabel={"Eligible Tenure"}
                  addTag={() => handleAddTenure(index)}
                  deleteTag={(tag) => handleDelete(tag, index)}
                  showError={validationError[`tenureValue_${index}`]}
                  onFocus={() =>
                    dispatch(
                      setValidationError({
                        ...validationError,
                        [`tenureValue_${index}`]: false,
                      })
                    )
                  }
                />
                <div className="flex gap-4 justify-end items-center mt-1">
                  <Button
                    buttonName={"Save"}
                    onClick={() => handleSaveET(creditScoreETId, index)}
                    rectangle={true}
                  />
                  <Button
                    buttonIcon={TrashIcon}
                    onClick={() =>
                      DeleteRange({ creditScoreETId, ruleName: rule.ruleName })
                    }
                    circle={true}
                  />
                </div>
              </ContainerTile>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CreditScoreET;
