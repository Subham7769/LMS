import { useEffect } from "react";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import InputEmail from "../Common/InputEmail/InputEmail";
import InputPassword from "../Common/InputPassword/InputPassword";
import SelectInput from "../Common/DynamicSelect/DynamicSelect";
import { toast } from "react-toastify"
import {
  createUser,
  setFormData,
  setConfirmPassword,
  setUserRole,
  clearFormData,
} from "../../redux/Slices/userManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearValidationError,
  validateForm,
  validateUserRole,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";

const AddUserModal = ({ isOpen, onClose, role }) => {
  const dispatch = useDispatch();
  const { formData, confirmPassword, userRole } = useSelector(
    (state) => state.userManagement
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  useEffect(() => {
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleRoles = (selectedUserRole) => {
    dispatch(setUserRole(selectedUserRole));
  };

  const updateData = async (e) => {
    e.preventDefault();
    const dataToValidate = { ...formData, confirmPassword };
    await dispatch(validateForm(dataToValidate));
    const state = store.getState();
    const isValid = state.validation.isValid;
    const isValid2 = validateUserRole(userRole, dispatch);
    if (isValid && isValid2) {
      if (confirmPassword === formData.password) {
        await dispatch(createUser({ formData, userRole })).unwrap();
        dispatch(clearFormData());
        onClose();
      }
    } else {
      toast.warn("Password not matched!");
    }
  }


if (!isOpen) return null;

return (
  <>
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white flex flex-col gap-7 p-5 rounded-lg shadow-lg w-10/12 ">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <InputText
            labelName="User Name"
            inputName="username"
            inputValue={formData?.username}
            onChange={handleChange}
            required
            isValidation={true}
          />
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
          <InputEmail
            labelName="Email"
            inputName="email"
            inputValue={formData?.email}
            onChange={handleChange}
            required
            isValidation={true}
          />
          <InputPassword
            labelName="Password"
            inputName="password"
            inputValue={formData?.password}
            onChange={handleChange}
            required
            isValidation={true}
          />
          <InputPassword
            labelName="Confirm Password"
            inputName="confirmPassword"
            inputValue={confirmPassword}
            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
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
            onClick={() => {
              onClose();
              dispatch(clearFormData());
            }}
            className={" bg-gray-600 text-white hover:bg-gray-500 self-end"}
            rectangle={true}
          />
          <Button
            buttonName={"Create User"}
            onClick={updateData}
            rectangle={true}
            className={"self-end"}
          />
        </div>
      </div>
    </div>
  </>
);
};

export default AddUserModal;
