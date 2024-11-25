import { useEffect, useMemo } from "react";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import SelectInput from "../Common/DynamicSelect/DynamicSelect";
import {
  clearFormData,
  setFormData,
  setUserRole,
  updateUser,
} from "../../redux/Slices/userManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  validateForm,
  validateUserRole,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";

const EditUserModal = ({ isOpen, onClose, role, userDetails }) => {
  const dispatch = useDispatch();
  const { formData, userRole } = useSelector((state) => state.userManagement);

  // Memoize the formatted role data
  const formattedRoleData = useMemo(() => {
    return userDetails?.roles.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
  }, [userDetails?.roles]);

  useEffect(() => {
    if (userDetails) {
      dispatch(setFormData(userDetails));
      dispatch(setUserRole(formattedRoleData));
    }
  }, [userDetails, formattedRoleData, dispatch]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleRoles = (selectedUserRole) => {
    dispatch(setUserRole(selectedUserRole));
  };

  const updateData = async (e) => {
    e.preventDefault();

    // Validate form data
    await dispatch(validateForm(formData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    const isValidRoles = validateUserRole(userRole, dispatch);

    if (isValid && isValidRoles) {
      await dispatch(updateUser({ userDetails, formData, userRole })).unwrap();
      onClose();
      dispatch(clearFormData());
    }
  };

  // Clear form data on close
  const handleCancel = () => {
    onClose();
    dispatch(clearFormData());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white flex flex-col gap-7 p-5 rounded-lg shadow-lg w-4/5">
        <form className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          <InputText
            labelName="First Name"
            inputName="firstname"
            inputValue={formData?.firstname}
            onChange={handleChange}
            required
            isValidation={true}
          />
          <InputText
            labelName="Last Name"
            inputName="lastname"
            inputValue={formData?.lastname}
            onChange={handleChange}
            required
            isValidation={true}
          />
          <SelectInput
            labelName="Roles"
            inputName="userRole"
            inputOptions={role}
            isMulti={true}
            inputValue={userRole}
            onChange={handleRoles}
            isValidation={true}
          />
        </form>
        <div className="flex gap-3 justify-center md:justify-end">
          <Button
            buttonName={"Cancel"}
            onClick={handleCancel}
            className={"bg-gray-600 text-white hover:bg-gray-500 self-end"}
            rectangle={true}
          />
          <Button
            buttonName={"Update"}
            onClick={updateData}
            rectangle={true}
            className={"self-end"}
          />
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
