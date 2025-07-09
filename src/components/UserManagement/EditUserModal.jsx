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
import Modal from "../Common/Modal/Modal";

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
      <Modal
        title={"Edit user details"}
        primaryButtonName="Update"
        primaryOnClick={updateData}
        secondaryOnClick={() => {
          onClose();
          // dispatch(clearFormData());
        }}
      >
        <form className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
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
      </Modal>
    </>
  );
};

export default EditUserModal;
