import { useState } from "react";
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

const AddUserModal = ({ isOpen, onClose, role }) => {
  const dispatch = useDispatch();
  const { formData, confirmPassword, userRole } = useSelector(
    (state) => state.userManagement
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleRoles = (selectedUserRole) => {
    dispatch(setUserRole(selectedUserRole));
  };

  const updateData = async (e) => {
    e.preventDefault();

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
          <Failed t={t} toast={toast} title={"Error"} message={error.message} />
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
            />
            <InputText
              labelName="First Name"
              inputName="firstname"
              inputValue={formData?.firstname}
              onChange={handleChange}
              required
            />
            <InputText
              labelName="Last Name"
              inputName="lastname"
              inputValue={formData?.lastname}
              onChange={handleChange}
              required
            />
            <InputEmail
              labelName="Email"
              inputName="email"
              inputValue={formData?.email}
              onChange={handleChange}
              required
            />
            <InputPassword
              labelName="Password"
              inputName="password"
              inputValue={formData?.password}
              onChange={handleChange}
              required
            />
            <InputPassword
              labelName="Confirm Password"
              inputName="confirmPassword"
              inputValue={confirmPassword}
              onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
              required
            />
            <SelectInput
              labelName="Roles"
              inputName="roles"
              inputOptions={role}
              isMulti={true}
              inputValue={userRole}
              onChange={handleRoles}
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
