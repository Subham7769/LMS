import { useEffect } from "react";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import InputSelect from "../Common/InputSelect/InputSelect";
import {
  clearFormData,
  setFormData,
  setUserRole,
  updateUser,
} from "../../redux/Slices/userManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearValidationError,
  validateForm,
  validateUserRole,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { XMarkIcon } from "@heroicons/react/24/outline";

const EditUserModal = ({ isOpen, onClose, role, userDetails }) => {
  const dispatch = useDispatch();
  const { formData, userRole } = useSelector((state) => state.userManagement);

  useEffect(() => {
    dispatch(setFormData(userDetails));
    const formattedRoleData2 = {
      target: {
        label: userDetails?.roles[0]?.name,
        value: userDetails?.roles[0]?.id,
        name: "userRole",
      },
    };
    dispatch(setUserRole(formattedRoleData2));
    return () => {
      dispatch(clearValidationError());
    };
  }, [userDetails, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleRoles = (selectedUserRole) => {
    dispatch(setUserRole(selectedUserRole));
  };

  const updateData = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(formData));
    console.log(formData);
    const state = store.getState();
    const isValid = state.validation.isValid;
    const isValid2 = validateUserRole(userRole, dispatch);
    console.log(state.validation.fields);
    console.log(isValid + " ------ " + isValid2);
    if (isValid && isValid2) {
      await dispatch(updateUser({ userDetails, formData, userRole })).unwrap();
      onClose();
      dispatch(clearFormData());
    }
  };

  if (!isOpen) return null;
  console.log(userRole);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900/30 backdrop-blur-sm">
        <div className="relative bg-white dark:bg-gray-800 flex flex-col w-10/12 rounded-lg shadow-lg p-4">
          <XMarkIcon
            onClick={() => {
              onClose();
              // dispatch(clearFormData());
            }}
            className="absolute top-1 right-1 h-6 w-6 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          />
          <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-4">
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
            <InputSelect
              labelName="Roles"
              inputName="userRole"
              inputOptions={role}
              inputValue={userRole?.target?.value}
              onChange={handleRoles}
              isValidation={true}
            />
          </form>
          <div className="flex gap-3 justify-end">
            <Button
              buttonName={"Cancel"}
              onClick={() => {
                onClose();
                // dispatch(clearFormData());
              }}
              buttonType="tertiary"
            />
            <Button
              buttonName={"Update"}
              onClick={updateData}
              buttonType="secondary"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserModal;
