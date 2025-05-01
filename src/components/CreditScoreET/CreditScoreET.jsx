import InputSelect from "../Common/InputSelect/InputSelect";
import { operatorOptions } from "../../data/OptionsData";
import InputNumber from "../Common/InputNumber/InputNumber";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../Common/Button/Button";
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
} from "../../redux/Slices/eligiblityTenureSlice";
import TagInput from "../TagInput/TagInput";
import {
  clearValidationError,
  validateForm,
  validateUserRole,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { CheckIcon, DeleteIcon } from "../../assets/icons";
import Banner2 from "../Common/Banner/Banner2";

const CreditScoreET = () => {
  const { creditScoreETId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banner2InfoOpen, setBanner2InfoOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { creditScoreET, newRangeData, creditScoreETName, loading, error } =
    useSelector((state) => state.creditScoreET);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    dispatch(fetchCreditScoreETInfo(creditScoreETId))
      .then(() => dispatch(fetchCreditScoreETName(creditScoreETId)))
      .then(() => dispatch(updateCreditScoreETId(creditScoreETId)));
    return () => {
      dispatch(clearValidationError());
    };
  }, [creditScoreETId, dispatch]);

  const handleSaveET = async (creditScoreETId, index) => {
    const { firstCreditScore, secondCreditScore } = creditScoreET?.rules[index];
    const dataToValidate = {
      firstCreditScore,
      secondCreditScore,
    };
    await dispatch(validateForm(dataToValidate));

    const state = store.getState();
    const isValid = state.validation.isValid;

    if (isValid) {
      await dispatch(saveCreditScoreET(creditScoreETId)).unwrap();
    } else {
      console.log("Form validation failed. No API call made.");
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
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(updateCreditScoreET({ name, value, ruleIndex }));
    }
  };

  const handleChangeTenure = (e, ruleIndex) => {
    const { name, value } = e.target;
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(setTenure({ name, value, ruleIndex }));
    }
  };

  const handleDelete = (tag, ruleIndex) => {
    dispatch(deleteTenure({ tag, ruleIndex })); // Dispatch with ruleIndex and tag
    toast.warn("Please click the save button to confirm removal of entry");
  };

  const handleNewRangeDelete = (tag) => {
    dispatch(deleteNewRangeTenure({ tag })); // Dispatch with ruleIndex and tag
  };

  const addTag = async () => {
    const data = newRangeData.rules[0];
    await dispatch(validateForm(data));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(addNewRangeTenure());
    }
  };

  const handleAddTenure = async (index) => {
    const tenureValue = creditScoreET?.rules[index];
    await dispatch(validateForm(tenureValue));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(addTenure({ ruleIndex: index }));
    }
  };

  const handleAddNewRange = async (creditScoreETId) => {
    const { firstCreditScore, secondCreditScore } = newRangeData.rules[0];
    const dataToValidate = {
      firstCreditScore,
      secondCreditScore,
    };
    const tenure = newRangeData?.rules[0].tenure;
    await dispatch(validateForm(dataToValidate));
    const state = store.getState();
    const isValid = state.validation.isValid;
    const isValid2 = validateUserRole(tenure, dispatch);
    if (!isValid2) {
      toast.warn("Add atleast 1 eligible tenure");
    }
    if (isValid && isValid2) {
      await dispatch(AddNewRange(creditScoreETId)).unwrap();
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

  return (
    <>
      <DynamicHeader
        itemName={creditScoreETName}
        handleNameUpdate={handleUpdateCSET}
        handleClone={handleClone}
        handleDelete={() => onDeleteCSET(creditScoreETId)}
        loading={loading}
      />
      <CloneModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateClone={(cloneCSETName) =>
          onCreateClone(creditScoreETId, cloneCSETName)
        }
        initialName={creditScoreETName}
      />
      {!hasViewOnlyAccess(roleName) && (
        <ContainerTile className={"p-5"}>
          <div className="grid md:grid-cols-2 gap-2 mb-5 items-end">
            <div>
              <div className={`block text-sm font-medium mb- px-1`}>
                Minimum Credit Score
              </div>
              <div className="grid grid-cols-6 items-end">
                <div className="col-span-2 xl:col-span-1">
                  <InputSelect
                    inputName={"firstCreditScoreOperator"}
                    inputValue={
                      newRangeData?.operators?.firstCreditScoreOperator
                    }
                    inputOptions={operatorOptions}
                    onChange={handleChangeRange}
                  />
                </div>
                <div className="col-span-4 xl:col-span-5">
                  <InputNumber
                    inputName={"firstCreditScore"}
                    inputValue={newRangeData.rules?.[0]?.firstCreditScore}
                    onChange={handleChangeRange}
                    placeHolder="0"
                    isValidation={true}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className={`block text-sm font-medium mb- px-1`}>
                Maximum Credit Score
              </div>
              <div className="grid grid-cols-6 items-end">
                <div className="col-span-2 xl:col-span-1">
                  <InputSelect
                    inputName={"secondCreditScoreOperator"}
                    inputValue={
                      newRangeData?.operators?.secondCreditScoreOperator
                    }
                    inputOptions={operatorOptions}
                    onChange={handleChangeRange}
                  />
                </div>
                <div className="col-span-4 xl:col-span-5">
                  <InputNumber
                    inputName={"secondCreditScore"}
                    inputValue={newRangeData.rules?.[0]?.secondCreditScore}
                    onChange={handleChangeRange}
                    placeHolder="2"
                    isValidation={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <TagInput
            inputSelectName={"tenureType"}
            inputSelectLabel={"Tenure Type"}
            formData={newRangeData.rules[0]}
            handleChange={handleChangeNewRangeTenure}
            inputTextName={"tenureValue"}
            inputTextLabel={"Eligible Tenure"}
            inputTextPlaceholder={"MONTHS"}
            addTag={addTag}
            deleteTag={(tag) => handleNewRangeDelete(tag)}
            isValidation={true}
            orderReverse={true}
            tagsPerRow={5}
          />
          <div className="flex gap-4 justify-end items-center">
            <Button
              buttonName={"Add Range"}
              onClick={() => handleAddNewRange(creditScoreETId)}
              buttonType="primary"
              loading={loading}
            />
          </div>
        </ContainerTile>
      )}

      {creditScoreET &&
        creditScoreET?.rules?.map((rule, index) => {
          return (
            <ContainerTile
              key={index}
              loading={loading}
              className={"p-5 relative"}
            >
              <Banner2 open={true} className={"mb-4"}>
                The following eligible tenures are applicable to borrowers whose
                credit score lies in the range from {rule?.firstCreditScore} to{" "}
                {rule?.secondCreditScore}
              </Banner2>
              <div className="grid md:grid-cols-2 gap-3 mb-5 items-end">
                <div>
                  <div className={`block text-sm font-medium mb- px-1`}>
                    Minimum Credit Score
                  </div>
                  <div className="grid grid-cols-6 items-end">
                    <div className="col-span-2 xl:col-span-1">
                      <InputSelect
                        inputName={"firstCreditScoreOperator"}
                        inputValue={
                          creditScoreET?.operators?.firstCreditScoreOperator
                        }
                        inputOptions={operatorOptions}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                    <div className="col-span-4 xl:col-span-5">
                      <InputNumber
                        inputName={"firstCreditScore"}
                        inputValue={rule?.firstCreditScore}
                        onChange={(e) => handleChange(e, index)}
                        placeHolder="0"
                        isValidation={true}
                        isIndex={rule?.dataIndex}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className={`block text-sm font-medium mb- px-1`}>
                    Maximum Credit Score
                  </div>
                  <div className="grid grid-cols-6 items-end">
                    <div className="col-span-2 xl:col-span-1">
                      <InputSelect
                        inputName={"secondCreditScoreOperator"}
                        inputValue={
                          creditScoreET?.operators?.secondCreditScoreOperator
                        }
                        inputOptions={operatorOptions}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                    <div className="col-span-4 xl:col-span-5">
                      <InputNumber
                        inputName={"secondCreditScore"}
                        inputValue={rule?.secondCreditScore}
                        onChange={(e) => handleChange(e, index)}
                        placeHolder="2"
                        isValidation={true}
                        isIndex={rule?.dataIndex}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <TagInput
                inputSelectName={"tenureType"}
                inputSelectLabel={"Tenure Type"}
                formData={rule}
                handleChange={(e) => handleChangeTenure(e, index)}
                inputTextName={"tenureValue"}
                inputTextLabel={"Eligible Tenure"}
                inputTextPlaceholder={"MONTHS"}
                addTag={() => handleAddTenure(index)}
                deleteTag={(tag) => handleDelete(tag, index)}
                isValidation={true}
                isIndex={rule?.dataIndex}
                orderReverse={true}
                tagsPerRow={5}
              />
              <div className="text-gray-300 text-xs mt-3">
                Rule Id: {rule.creditScoreEtTempId}
              </div>
              {!hasViewOnlyAccess(roleName) && (
                <div className="flex gap-4 justify-end items-center mt-3">
                  <Button
                    buttonIcon={DeleteIcon}
                    onClick={() =>
                      DeleteRange({
                        creditScoreETId,
                        ruleName: rule.ruleName,
                      })
                    }
                    buttonType="destructive"
                  />
                  <Button
                    buttonIcon={CheckIcon}
                    onClick={() => handleSaveET(creditScoreETId, index)}
                    buttonType="success"
                  />
                </div>
              )}
            </ContainerTile>
          );
        })}
    </>
  );
};

export default CreditScoreET;
