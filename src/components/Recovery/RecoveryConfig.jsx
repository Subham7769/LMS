import React, { useEffect, useState } from "react";
import { PencilIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import InputText from "../Common/InputText/InputText";
import { useNavigate, useParams } from "react-router-dom";
import { tenureTypeOptions } from "../../data/OptionsData";
import Button from "../Common/Button/Button";
import CloneModal from "../Common/CloneModal/CloneModal";
import {
  fetchName,
  fetchData,
  handleChange,
  updateOrPostData,
  deleteRecovery,
  createClone,
  updateRecoveryName,
} from "../../redux/Slices/recoverySlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecoveryData } from "../../redux/Slices/sidebarSlice";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import { toast } from "react-toastify";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import ToggleSwitch from "../Common/ToggleSwitch/ToggleSwitch";
import { CheckIcon } from "../../assets/icons";

const RecoveryConfig = () => {
  const { recoveryEquationTempId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [RTN, setRTN] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingEquation, setIsEditingEquation] = useState(false);
  const { itemName, data, loading, error } = useSelector(
    (state) => state.recovery
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  const handleChangeWrapper = (e) => {
    const { name, value } = e.target;
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(handleChange({ name, value }));
    }
  };

  const handleNameUpdate = async (newName) => {
    try {
      await dispatch(updateRecoveryName({ recoveryEquationTempId, newName }));
      dispatch(fetchName(recoveryEquationTempId));
      dispatch(fetchRecoveryData());
    } catch (error) {
      console.error("Failed to update name:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchName(recoveryEquationTempId));
    dispatch(fetchData(recoveryEquationTempId));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, recoveryEquationTempId]);

  const saveSettings = () => {
    toast.success("Equation modified!");
    toggleEditEquation();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(data));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(
        updateOrPostData({
          formData: data,
          isUpdate: data.id ? true : false,
        })
      );
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteRecovery(recoveryEquationTempId)).unwrap();
      await dispatch(fetchRecoveryData());
      navigate("/loan/recovery");
    } catch (err) {
      if (err === "Unauthorized") {
        navigate("/login");
      } else {
        console.error("Error deleting recovery:", err);
      }
    }
  };

  const createCloneRecovery = async (cloneName) => {
    try {
      const Details = await dispatch(
        createClone({ recoveryEquationTempId, cloneName })
      ).unwrap();
      dispatch(fetchRecoveryData());
      navigate("/loan/recovery/" + Details.recoveryEquationTempId);
    } catch (err) {
      if (err === "Unauthorized") {
        navigate("/login");
      }
    }
  };

  const handleClone = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleEditEquation = () => {
    setIsEditingEquation(!isEditingEquation);
  };

  const toolTip = () => (
    <>
      The Recovery Equation uses:
      <ul className="list-disc ml-4">
        <li>
          <strong>w</strong>: Wallet
        </li>
        <li>
          <strong>r</strong>: Repayment
        </li>
        <li>
          <strong>d</strong>: Days Past Due
        </li>
      </ul>
    </>
  );

  return (
    <>
      <DynamicHeader
        itemName={itemName}
        handleNameUpdate={handleNameUpdate}
        handleClone={handleClone}
        handleDelete={handleDelete}
        loading={loading}
      />
      <CloneModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateClone={createCloneRecovery}
        initialName={itemName}
      />
      <ContainerTile className="grid gap-y-4 p-5" loading={loading}>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="flex-1">
            <InputNumber
              labelName={"Tenure"}
              inputName={"tenure"}
              inputValue={data?.tenure}
              onChange={handleChangeWrapper}
              placeHolder={"24"}
              isValidation={true}
            />
          </div>
          <div className="flex-1">
            <InputSelect
              labelName="Tenure Type"
              inputName="tenureType"
              inputValue={data?.tenureType}
              inputOptions={tenureTypeOptions}
              onChange={handleChangeWrapper}
              placeHolder="Select Tenure Type"
              isValidation={true}
            />
          </div>
        </div>
        <div className="grid grid-cols-[80%_20%] md:grid-cols-[90%_10%] items-end">
          {isEditingEquation && isEditingEquation ? (
            <InputTextArea
              labelName={"Recovery Equation"}
              inputName={"recoveryEquation"}
              rowCount={"3"}
              inputValue={data?.recoveryEquation}
              onChange={handleChangeWrapper}
              placeHolder="( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )"
              isValidation={true}
              toolTipText={toolTip()}
            />
          ) : (
            <InputText
              labelName={"Recovery Equation"}
              inputName="recoveryEquation"
              inputValue={data?.recoveryEquation}
              onChange={handleChangeWrapper}
              placeHolder="( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )"
              readOnly={true}
              isValidation={true}
              toolTipText={toolTip()}
            />
          )}
          <div className="text-right">
            {!hasViewOnlyAccess(roleName) && isEditingEquation ? (
              <Button
                buttonIcon={CheckCircleIcon}
                onClick={saveSettings}
                buttonType="secondary"
              />
            ) : (
              <Button
                buttonIcon={PencilIcon}
                onClick={toggleEditEquation}
                buttonType="secondary"
              />
            )}
          </div>
          {isEditingEquation && (
            <p className="text-red-500">
              Clear the whole equation before you can assign a new equation
            </p>
          )}
        </div>
        <section>
          <ul>
            <ToggleSwitch
              label="RTN"
              description="Indicates whether the loan is RTN."
              inputName="RTN"
              inputChecked={RTN}
              onChange={() => setRTN(!RTN)}
            />
          </ul>
        </section>
        {!hasViewOnlyAccess(roleName) && (
          <div className="text-right">
            <Button
              buttonIcon={CheckIcon}
              buttonName={"Update"}
              onClick={handleUpdate}
            />
          </div>
        )}
      </ContainerTile>
    </>
  );
};

export default React.memo(RecoveryConfig);
