import { useEffect, useState } from "react";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import InputEmail from "../Common/InputEmail/InputEmail";
import InputPassword from "../Common/InputPassword/InputPassword";
import SelectInput from "../Common/DynamicSelect/DynamicSelect";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed, Warning } from "../Toasts";
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
  setValidationError,
  validateFormFields,
  validateUserRole,
} from "../../redux/Slices/validationSlice";

const AddUserModal = ({ isOpen, onClose, role }) => {
  const dispatch = useDispatch();
  const { formData, confirmPassword, userRole } = useSelector(
    (state) => state.userManagement
  );
  const { validationError } = useSelector((state) => state.validation);
  const fields = [
    "username",
    "firstname",
    "lastname",
    "email",
    "password",
    "confirmPassword",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  useEffect(() => {
    const initialValidationError = {};
    fields.forEach((field) => {
      initialValidationError[field] = false; // Set all fields to false initially
    });
    dispatch(setValidationError(initialValidationError));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleRoles = (selectedUserRole) => {
    dispatch(setUserRole(selectedUserRole));
  };

  console.log(userRole);
  console.log(validationError);

  const updateData = async (e) => {
    e.preventDefault();
    const isValid = validateFormFields(
      fields,
      { ...formData, confirmPassword },
      dispatch
    );
    const isValid2 = validateUserRole(userRole, dispatch);
    if (isValid && isValid2) {
      if (confirmPassword === formData.password) {
        try {
          await dispatch(createUser({ formData, userRole })).unwrap();
          toast.custom((t) => (
            <Passed
              t={t}
              toast={toast}
              title={"Success"}
              message={"User added Successfully !!"}
            />
          ));
          dispatch(clearFormData());
          onClose();
        } catch (error) {
          toast.custom((t) => (
            <Failed
              t={t}
              toast={toast}
              title={"Error"}
              message={error.message}
            />
          ));
        }
      } else {
        toast.custom((t) => (
          <Warning
            t={t}
            toast={toast}
            title={"Alert"}
            message={"Password not matched!!"}
          />
        ));
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white flex flex-col gap-7 p-5 rounded-lg shadow-lg w-10/12 ">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <InputText
              labelName="User Name"
              inputName="username"
              inputValue={formData?.username}
              onChange={handleChange}
              required
              showError={validationError?.username}
              onFocus={() =>
                dispatch(
                  setValidationError({ ...validationError, username: false })
                )
              }
            />
            <InputText
              labelName="First Name"
              inputName="firstname"
              inputValue={formData?.firstname}
              onChange={handleChange}
              required
              showError={validationError?.firstname}
              onFocus={() =>
                dispatch(
                  setValidationError({ ...validationError, firstname: false })
                )
              }
            />
            <InputText
              labelName="Last Name"
              inputName="lastname"
              inputValue={formData?.lastname}
              onChange={handleChange}
              required
              showError={validationError?.lastname}
              onFocus={() =>
                dispatch(
                  setValidationError({ ...validationError, lastname: false })
                )
              }
            />
            <InputEmail
              labelName="Email"
              inputName="email"
              inputValue={formData?.email}
              onChange={handleChange}
              required
              showError={validationError?.email}
              onFocus={() =>
                dispatch(
                  setValidationError({ ...validationError, email: false })
                )
              }
            />
            <InputPassword
              labelName="Password"
              inputName="password"
              inputValue={formData?.password}
              onChange={handleChange}
              required
              showError={validationError?.password}
              onFocus={() =>
                dispatch(
                  setValidationError({ ...validationError, password: false })
                )
              }
            />
            <InputPassword
              labelName="Confirm Password"
              inputName="confirmPassword"
              inputValue={confirmPassword}
              onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
              required
              showError={validationError?.confirmPassword}
              onFocus={() =>
                dispatch(
                  setValidationError({
                    ...validationError,
                    confirmPassword: false,
                  })
                )
              }
            />
            <SelectInput
              labelName="Roles"
              inputName="userRole"
              inputOptions={role}
              isMulti={true}
              inputValue={userRole}
              onChange={handleRoles}
              showError={validationError?.userRole}
              onFocus={() =>
                dispatch(
                  setValidationError({
                    ...validationError,
                    userRole: false,
                  })
                )
              }
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
