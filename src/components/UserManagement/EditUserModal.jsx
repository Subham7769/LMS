import { useEffect } from "react";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import SelectInput from "../Common/DynamicSelect/DynamicSelect";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";
import {
  clearFormData,
  setFormData,
  setUserRole,
  updateUser,
} from "../../redux/Slices/userManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setValidationError,
  validateFormFields,
  validateUserRole,
} from "../../redux/Slices/validationSlice";

const EditUserModal = ({ isOpen, onClose, role, userDetails }) => {
  const dispatch = useDispatch();
  const { formData, userRole } = useSelector((state) => state.userManagement);
  const { validationError } = useSelector((state) => state.validation);
  const fields = ["firstname", "lastname"];

  useEffect(() => {
    dispatch(setFormData(userDetails));
    const formattedRoleData = userDetails?.roles.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
    dispatch(setUserRole(formattedRoleData));
  }, [userDetails, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleRoles = (selectedUserRole) => {
    dispatch(setUserRole(selectedUserRole));
  };

  // console.log(validationError);

  const updateData = async (e) => {
    e.preventDefault();
    const isValid = validateFormFields(fields, formData, dispatch);
    const isValid2 = validateUserRole(userRole, dispatch);
    if (isValid && isValid2) {
      try {
        await dispatch(
          updateUser({ userDetails, formData, userRole })
        ).unwrap();
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Success"}
            message={"User Details updated Successfully !!"}
          />
        ));
        onClose();
        dispatch(clearFormData());
      } catch (error) {
        console.log(error.message);
        toast.custom((t) => (
          <Failed t={t} toast={toast} title={"Error"} message={error.message} />
        ));
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white flex flex-col gap-7 p-5 rounded-lg shadow-lg w-4/5 ">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
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
            <SelectInput
              labelName="Roles"
              inputName="roles"
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
              buttonName={"Update"}
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

export default EditUserModal;
