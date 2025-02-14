import { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Button from "../Common/Button/Button";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setAddLoanapprovalData,
  handleAddRolesInput,
  handleDeleteRolesInput,
  handleLoanapprovalData,
  handleAddRolesInputExisting,
  handleDeleteRolesInputExisting,
  fetchName,
  updateLoanApprovalName,
  deleteLoanApproval,
  createClone,
  fetchData,
  addLoanApproveData,
  updateLoanApproveData,
  handleDeleteApprover,
} from "../../redux/Slices/loanApprovalSlice";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { hasViewOnlyAccessGroup2 } from "../../utils/roleUtils";
import { fetchRoles } from "../../redux/Slices/userManagementSlice";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import CloneModal from "../Common/CloneModal/CloneModal";
import { fetchLoanApprovalData } from "../../redux/Slices/sidebarSlice";
import { toast } from "react-toastify";

const LoanApproval = () => {
  const { approvalsConfigurationsTempId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemName, loanapprovalData, addLoanapprovalData, loading, error } =
    useSelector((state) => state.loanApproval);
  const { userData } = useSelector((state) => state.auth);
  const { roleData } = useSelector((state) => state.userManagement);
  const roleName = userData?.roles[0]?.name;
  const [roleOptions, setRoleOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchName(approvalsConfigurationsTempId));
    dispatch(fetchData(approvalsConfigurationsTempId));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, approvalsConfigurationsTempId]);

  useEffect(() => {
    const options =
      roleData?.map((role) => ({
        label: role.label,
        value: role.label, // Extracting last part of href
      })) || [];
    setRoleOptions(options);
  }, [roleData]);

  const handleNameUpdate = async (newName) => {
    await dispatch(
      updateLoanApprovalName({ approvalsConfigurationsTempId, newName })
    );
    dispatch(fetchName(approvalsConfigurationsTempId));
    dispatch(fetchLoanApprovalData());
  };

  const handleDelete = async () => {
    await dispatch(deleteLoanApproval(approvalsConfigurationsTempId)).unwrap();
    await dispatch(fetchLoanApprovalData());
    navigate("/loan/loan-approval");
  };

  const createCloneLoanApproval = async (cloneName) => {
    const Details = await dispatch(
      createClone({ approvalsConfigurationsTempId, cloneName })
    ).unwrap();
    dispatch(fetchLoanApprovalData());
    navigate("/loan/loan-approval/" + Details.approvalsConfigurationsTempId);
  };

  const handleClone = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e, index) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    dispatch(setAddLoanapprovalData({ name, value: fieldValue, index }));
  };

  const handleAddRoles = () => {
    dispatch(handleAddRolesInput());
  };

  const handleDeleteRoles = (index) => {
    dispatch(handleDeleteRolesInput(index));
  };

  const handleAdd = async () => {
    await dispatch(validateForm(addLoanapprovalData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      const isUpdate = loanapprovalData[0]?.approvalsConfigurationsRuleId
        ? true
        : false;
      if (isUpdate) {
        const updateLoanApproveDataPayload = {
          ...loanapprovalData[0],
          loanCriteriaRangeRolesList: [
            ...loanapprovalData[0]?.loanCriteriaRangeRolesList,
            addLoanapprovalData,
          ],
        };
        dispatch(updateLoanApproveData(updateLoanApproveDataPayload)).unwrap();
      } else {
        const addLoanApproveDataPayload = {
          approvalsConfigurationsTempId: approvalsConfigurationsTempId,
          loanCriteriaRangeRolesList: [addLoanapprovalData],
        };
        dispatch(addLoanApproveData(addLoanApproveDataPayload)).unwrap();
      }
    }
  };

  const handleChange = (e, index, idx) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    dispatch(handleLoanapprovalData({ name, value: fieldValue, index, idx }));
  };

  const handleAddRolesExisting = (index) => {
    dispatch(handleAddRolesInputExisting(index));
  };

  const handleDeleteRolesExisting = (index, idx) => {
    dispatch(handleDeleteRolesInputExisting({ index, idx }));
  };

  const handleUpdate = async () => {
    await dispatch(validateForm(loanapprovalData[0]));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(updateLoanApproveData(loanapprovalData[0])).unwrap();
    }
  };

  const deleteApprover = (index) => {
    dispatch(handleDeleteApprover(index));
    toast.warn("Please click on update to confirm removal of entry")
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
        onCreateClone={createCloneLoanApproval}
        initialName={itemName}
      />
      <div className="flex flex-col gap-5">
        {!hasViewOnlyAccessGroup2(roleName) ? (
          <ContainerTile
            loading={loading}
            // error={error}
          >
            <div className="grid grid-cols-[repeat(4,_minmax(0,_1fr))_120px] gap-4 items-end mb-4">
              <InputNumber
                labelName="Minimum"
                inputName="minimum"
                inputValue={addLoanapprovalData?.minimum}
                onChange={handleInputChange}
                placeHolder="0"
                isValidation={true}
              />
              <InputNumber
                labelName="Maximum"
                inputName="maximum"
                inputValue={addLoanapprovalData?.maximum}
                onChange={handleInputChange}
                placeHolder="10000"
                isValidation={true}
              />
              <Button
                buttonIcon={PlusIcon}
                onClick={handleAddRoles}
                circle={true}
                buttonType="secondary"
              />
            </div>
            {addLoanapprovalData.approvalRoles.map((addRole, index) => (
              <div
                key={index}
                className="grid grid-cols-[repeat(4,_minmax(0,_1fr))_120px] gap-4 items-end mb-2"
              >
                <InputSelect
                  labelName="Select Role"
                  inputOptions={roleOptions}
                  inputName="roleName"
                  inputValue={addRole?.roleName}
                  onChange={(e) => handleInputChange(e, index)}
                  isValidation={true}
                />
                <div className="flex gap-10 pb-2">
                  <InputCheckbox
                    labelName="Final Approve"
                    inputChecked={addRole?.finalApprove}
                    onChange={(e) => handleInputChange(e, index)}
                    inputName="finalApprove"
                  />
                  <InputCheckbox
                    labelName="Reject"
                    inputChecked={addRole?.reject}
                    onChange={(e) => handleInputChange(e, index)}
                    inputName="reject"
                  />
                </div>
                <Button
                  buttonIcon={TrashIcon}
                  onClick={() => handleDeleteRoles(index)}
                  circle={true}
                  buttonType="destructive"
                />
              </div>
            ))}
            <div className="text-right">
              <Button
                buttonIcon={CheckCircleIcon}
                buttonName="Add"
                onClick={handleAdd}
                rectangle={true}
              />
            </div>
          </ContainerTile>
        ) : (
          ""
        )}
        {loanapprovalData[0]?.loanCriteriaRangeRolesList?.map(
          (loanData, index) => (
            <ContainerTile
              className={"relative"}
              loading={loading}
              error={error}
              key={"Loan" + index}
            >
              <div className="absolute right-3 top-3 text-right">
                <Button
                  buttonIcon={TrashIcon}
                  onClick={() => deleteApprover(index)}
                  circle={true}
                  buttonType="destructive"
                />
              </div>
              <div className="grid grid-cols-[repeat(4,_minmax(0,_1fr))_120px] gap-4 items-end mb-4">
                <InputNumber
                  labelName="Minimum"
                  inputName="minimum"
                  inputValue={loanData?.minimum}
                  onChange={(e) => handleChange(e, index)}
                  placeHolder="0"
                  isValidation={true}
                />
                <InputNumber
                  labelName="Maximum"
                  inputName="maximum"
                  inputValue={loanData?.maximum}
                  onChange={(e) => handleChange(e, index)}
                  placeHolder="10000"
                  isValidation={true}
                />
                <Button
                  buttonIcon={PlusIcon}
                  onClick={() => handleAddRolesExisting(index)}
                  circle={true}
                  buttonType="secondary"
                />
              </div>
              {loanData.approvalRoles.map((addRole, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[repeat(4,_minmax(0,_1fr))_120px] gap-4 items-end mb-2"
                >
                  <InputSelect
                    labelName="Select Role"
                    inputOptions={roleOptions}
                    inputName="roleName"
                    inputValue={addRole?.roleName}
                    onChange={(e) => handleChange(e, index, idx)}
                    isValidation={true}
                  />
                  <div className="flex gap-10 pb-2">
                    <InputCheckbox
                      labelName="Final Approve"
                      inputChecked={addRole?.finalApprove}
                      onChange={(e) => handleChange(e, index, idx)}
                      inputName="finalApprove"
                    />
                    <InputCheckbox
                      labelName="Reject"
                      inputChecked={addRole?.reject}
                      onChange={(e) => handleChange(e, index, idx)}
                      inputName="reject"
                    />
                  </div>
                  <Button
                    buttonIcon={TrashIcon}
                    onClick={() => handleDeleteRolesExisting(index, idx)}
                    circle={true}
                    buttonType="destructive"
                  />
                </div>
              ))}
            </ContainerTile>
          )
        )}
        {!hasViewOnlyAccessGroup2(roleName) &&
          loanapprovalData[0]?.loanCriteriaRangeRolesList.length > 0 && (
            <div className="text-right">
              <Button
                buttonIcon={CheckCircleIcon}
                buttonName="Update"
                onClick={handleUpdate}
                rectangle={true}
              />
            </div>
          )}
      </div>
    </>
  );
};

export default LoanApproval;
