import { useEffect } from "react";
import InputText from "../Common/InputText/InputText";
import InputEmail from "../Common/InputEmail/InputEmail";
import InputPassword from "../Common/InputPassword/InputPassword";
import InputSelect from "../Common/InputSelect/InputSelect";
import Modal from "../Common/Modal/Modal";
import { toast } from "react-toastify";
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
    console.log(selectedUserRole);
    dispatch(setUserRole(selectedUserRole));
  };

  const updateData = async (e) => {
    e.preventDefault();
    const dataToValidate = { ...formData, confirmPassword };
    console.log(formData);
    console.log(userRole);
    await dispatch(validateForm(dataToValidate));
    const state = store.getState();
    const isValid = state.validation.isValid;
    const isValid2 = validateUserRole(userRole, dispatch);
    if (isValid && isValid2) {
      if (confirmPassword === formData.password) {
        await dispatch(createUser({ formData, userRole: userRole })).unwrap();
        dispatch(clearFormData());
        onClose();
      }
    } else {
      toast.warn("Password not matched!");
    }
  };

  // console.log(userRole);

  if (!isOpen) return null;

  return (
    <>
      <Modal
        title={"Create a new user"}
        primaryButtonName="Add User"
        primaryOnClick={updateData}
        secondaryOnClick={() => {
          onClose();
          dispatch(clearFormData());
        }}
      >
        <form className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4 md:mb-0">
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
          <InputSelect
            labelName="Roles"
            inputName="userRole"
            inputOptions={role}
            inputValue={userRole?.target?.value}
            onChange={handleRoles}
            isValidation={true}
          />
        </form>
      </Modal>
    </>
  );
};

export default AddUserModal;
