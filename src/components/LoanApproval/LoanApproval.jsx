import { useEffect, useState } from "react";
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
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { fetchRoles } from "../../redux/Slices/userManagementSlice";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import CloneModal from "../Common/CloneModal/CloneModal";
import { fetchLoanApprovalData } from "../../redux/Slices/sidebarSlice";
import { toast } from "react-toastify";
import { AddIcon, CheckIcon, DeleteIcon } from "../../assets/icons";
import Banner2 from "../Common/Banner/Banner2";

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
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(handleLoanapprovalData({ name, value: fieldValue, index, idx }));
    }
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
    toast.warn("Please click on update to confirm removal of entry");
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
      <div className="flex flex-col">
        {!hasViewOnlyAccess(roleName) && (
          <ContainerTile
            loading={loading}
            className={"p-5 border-2 border-violet-400 dark:border-violet-500"}
            // error={error}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end mb-4">
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
              <div className="text-right col-span-2 md:col-span-1 md:text-left">
                <Button
                  buttonIcon={AddIcon}
                  onClick={handleAddRoles}
                  buttonType="secondary"
                />
              </div>
            </div>
            {addLoanapprovalData.approvalRoles.map((addRole, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-2"
              >
                <div className="">
                  <InputSelect
                    labelName="Select Role"
                    inputOptions={roleOptions}
                    inputName="roleName"
                    inputValue={addRole?.roleName}
                    onChange={(e) => handleInputChange(e, index)}
                    isValidation={true}
                  />
                </div>
                <div className="grid grid-cols-[40%_40%_20%] md:col-span-2 md:grid-cols-4 gap-4">
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
                  <div>
                    <Button
                      buttonIcon={DeleteIcon}
                      onClick={() => handleDeleteRoles(index)}
                      buttonType="destructive"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="text-right mt-5">
              <Button
                buttonIcon={CheckIcon}
                buttonName="Add"
                onClick={handleAdd}
                rectangle={true}
              />
            </div>
          </ContainerTile>
        )}
        {loanapprovalData[0]?.loanCriteriaRangeRolesList?.map(
          (loanData, index) => (
            <ContainerTile
              className={"relative p-5"}
              loading={loading}
              error={error}
              key={"Loan" + index}
            >
              <Banner2 open={true} className={"mb-4"}>
                The following roles can perform action on loans ranging from{" "}
                {loanData?.minimum} to {loanData?.maximum}
              </Banner2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end mb-4">
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
                {!hasViewOnlyAccess(roleName) && (
                  <div className="text-right col-span-2 md:col-span-1 md:text-left">
                    <Button
                      buttonIcon={AddIcon}
                      onClick={() => handleAddRolesExisting(index)}
                      buttonType="secondary"
                    />
                  </div>
                )}
              </div>
              {loanData.approvalRoles.map((addRole, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4 border-b border-dashed border-gray-200 dark:border-gray-700 pb-4 md:border-0 md:pb-0 md:mb-2"
                >
                  <InputSelect
                    labelName="Select Role"
                    inputOptions={roleOptions}
                    inputName="roleName"
                    inputValue={addRole?.roleName}
                    onChange={(e) => handleChange(e, index, idx)}
                    isValidation={true}
                  />
                  <div className="grid grid-cols-[40%_40%_20%] md:col-span-2 md:grid-cols-4 gap-4">
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
                    {!hasViewOnlyAccess(roleName) && (
                      <div>
                        <Button
                          buttonIcon={DeleteIcon}
                          onClick={() => handleDeleteRolesExisting(index, idx)}
                          buttonType="destructive"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="text-right mt-5">
                {!hasViewOnlyAccess(roleName) && (
                  <Button
                    buttonIcon={DeleteIcon}
                    buttonName="Delete Criteria"
                    onClick={() => deleteApprover(index)}
                    buttonType="destructive"
                  />
                )}
              </div>
            </ContainerTile>
          )
        )}
        {!hasViewOnlyAccess(roleName) &&
          loanapprovalData[0]?.loanCriteriaRangeRolesList.length > 0 && (
            <div className="text-right">
              <Button
                buttonIcon={CheckIcon}
                buttonName="Update"
                onClick={handleUpdate}
              />
            </div>
          )}
      </div>
    </>
  );
};

export default LoanApproval;
