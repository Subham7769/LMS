import React, { useState, useEffect } from "react";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import CloneModal from "../Common/CloneModal/CloneModal";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchName,
  updateAffordabilityName,
  deleteAffordability,
  createClone,
  handleChangeAffordabilityData,
  updateOrPostData,
  fetchData,
} from "../../redux/Slices/affordabilitySlice";
import { fetchAffordibilityData } from "../../redux/Slices/sidebarSlice";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import convertToReadableString from "../../utils/convertToReadableString";
import { hasViewOnlyAccessGroup2 } from "../../utils/roleUtils";

const Affordability = () => {
  const { affordabilityCriteriaTempId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { itemName, affordabilityData, loading, error } = useSelector(
    (state) => state.affordability
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  const incomeOnPaySlipFields = {
    actingAllowance: "",
    basicPay: "",
    doubleClassAllowance: "",
    healthShiftAllowance: "",
    housingAllowance: "",
    infectiousHealthRisk: "",
    interfaceAllowance: "",
    otherAllowances: "",
    responsibilityAllowance: "",
    ruralRemoteHardshipAllowance: "",
    transportAllowance: "",
  };

  const deductionsOnPaySlipFields = {
    napsa: "",
    payee: "",
    totalOtherDeductions: "",
    unionContribution: "",
  };

  useEffect(() => {
    dispatch(fetchName(affordabilityCriteriaTempId));
    dispatch(fetchData(affordabilityCriteriaTempId));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, affordabilityCriteriaTempId]);

  const handleNameUpdate = async (newName) => {
    await dispatch(
      updateAffordabilityName({ affordabilityCriteriaTempId, newName })
    );
    dispatch(fetchName(affordabilityCriteriaTempId));
    dispatch(fetchAffordibilityData());
  };

  const handleDelete = async () => {
    await dispatch(deleteAffordability(affordabilityCriteriaTempId)).unwrap();
    await dispatch(fetchAffordibilityData());
    navigate("/loan/affordability");
  };

  const createCloneAffordability = async (cloneName) => {
    const Details = await dispatch(
      createClone({ affordabilityCriteriaTempId, cloneName })
    ).unwrap();
    dispatch(fetchAffordibilityData());
    navigate("/loan/affordability/" + Details.affordabilityCriteriaTempId);
  };

  const handleClone = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeAffordabilityData({ name, value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(affordabilityData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      console.log(
        affordabilityData?.affordabilityCriteriaRuleId ? true : false
      );
      console.log(affordabilityData)
      dispatch(
        updateOrPostData({
          formData: affordabilityData,
          isUpdate: affordabilityData.affordabilityCriteriaRuleId
            ? true
            : false,
        })
      );
    }
  };

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
        onCreateClone={createCloneAffordability}
        initialName={itemName}
      />
      <ContainerTile className={"mb-5"} loading={loading}>
        <div className="text-lg font-semibold mb-5">Income on Pay Slip</div>
        <div className="grid grid-cols-4 gap-4">
          {Object.keys(incomeOnPaySlipFields).map((key) => (
            <div key={key}>
              <InputText
                labelName={convertToReadableString(key)}
                inputName={key}
                inputValue={affordabilityData[key]}
                onChange={handleChange}
                placeHolder="10%"
                // isValidation={true}
              />
            </div>
          ))}
        </div>
      </ContainerTile>
      <ContainerTile loading={loading}>
        <div className="text-lg font-semibold mb-5">Deductions on Pay Slip</div>
        <div className="grid grid-cols-4 gap-4">
          {Object.keys(deductionsOnPaySlipFields).map((key) => (
            <div key={key}>
              <InputText
                labelName={convertToReadableString(key)}
                inputName={key}
                inputValue={affordabilityData[key]}
                onChange={handleChange}
                placeHolder="10%"
                // isValidation={true}
              />
            </div>
          ))}
        </div>
      </ContainerTile>
      {!hasViewOnlyAccessGroup2(roleName) ? (
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
    </>
  );
};

export default Affordability;
