import React, { useEffect, useRef, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { PencilIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import InputText from "../Common/InputText/InputText";
import { useNavigate, useParams } from "react-router-dom";
import { options } from "../../data/OptionsData";
import LoadingState from "../LoadingState/LoadingState";
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

const RecoveryConfig = () => {
  const { recoveryEquationTempId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { itemName, data, loading, error } = useSelector(
    (state) => state.recovery
  );
  const [isEditingEquation, setIsEditingEquation] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  const handleChangeWrapper = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
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
      navigate("/recovery");
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
      navigate("/recovery/" + Details.recoveryEquationTempId);
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

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    throw new Error(error);
  }

  return (
    <>
      <DynamicHeader
        itemName={itemName}
        handleNameUpdate={handleNameUpdate}
        handleClone={handleClone}
        handleDelete={handleDelete}
      />
      <CloneModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateClone={createCloneRecovery}
        initialName={itemName}
      />
      <ContainerTile className=" flex flex-col gap-4 ">
        <div className="flex gap-4 space-x-2 2xl:w-[50%] w-[75%]">
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
              inputOptions={options}
              onChange={handleChangeWrapper}
              placeHolder="Select Tenure Type"
              isValidation={true}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="flex flex-col space-x-2 2xl:w-[50%] w-[75%]">
                {isEditingEquation && isEditingEquation ? (
                  <InputTextArea
                    labelName={"Recovery Equation"}
                    inputName={"recoveryEquation"}
                    rowCount={"3"}
                    inputValue={data?.recoveryEquation}
                    onChange={handleChangeWrapper}
                    placeHolder="( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )"
                    isValidation={true}
                  />
                ) : (
                  <div className="flex items-center space-x-2 w-full">
                    <InputText
                      labelName={"Recovery Equation"}
                      inputName="recoveryEquation"
                      inputValue={data?.recoveryEquation}
                      onChange={handleChangeWrapper}
                      placeHolder="( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )"
                      readOnly={true}
                      isValidation={true}
                    />
                  </div>
                )}
              </div>
              <div className="relative flex items-center justify-center gap-4 mt-4 group">
                <FaInfoCircle className="text-yellow-500 mt-2" size={24} />
                <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-2 whitespace-nowrap">
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
                </div>

                {roleName !== "ROLE_VIEWER" ? (
                  isEditingEquation ? (
                    <Button
                      buttonIcon={CheckCircleIcon}
                      onClick={saveSettings}
                      circle={true}
                    />
                  ) : (
                    <Button
                      buttonIcon={PencilIcon}
                      onClick={toggleEditEquation}
                      circle={true}
                    />
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
            {isEditingEquation && (
              <p className="text-red-500">
                Clear the whole equation before you can assign a new equation
              </p>
            )}
          </div>
          {roleName !== "ROLE_VIEWER" ? (
            <div className="text-right mt-5">
              <Button
                buttonIcon={CheckCircleIcon}
                buttonName={"Update"}
                onClick={handleUpdate}
                rectangle={true}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </ContainerTile>
    </>
  );
};

export default RecoveryConfig;
