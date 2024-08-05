import { useEffect, useState } from "react";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import SelectInput from "../Common/DynamicSelect/DynamicSelect";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";

const EditUserModal = ({ isOpen, onClose, role, getUser, userDetails }) => {
  const [formData, setFormData] = useState({
    active: true,
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    roles: [],
    username: "",
  });
  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    setFormData(userDetails);
    const formattedRoleData = userDetails?.roles.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
    setUserRole(formattedRoleData);
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRoles = (selectedUserRole) => {
    setUserRole(selectedUserRole);
  };

  const updateData = async (e) => {
    e.preventDefault();
    const selectedRoles = userRole.map((item) => ({
      id: item.value,
      name: item.label,
    }));
    const postData = {
      active: true,
      email: formData.email,
      firstname: formData.firstname,
      lastname: formData.lastname,
      password: formData.password,
      roles: selectedRoles,
      username: formData.username,
    };
    console.log(postData);
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/users/${userDetails.username}/edit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (data.status === 400) {
        const errorData = await data.json();
        console.log(errorData.message);
        toast.custom((t) => (
          <Failed
            t={t}
            toast={toast}
            title={"Failed"}
            message={errorData.message}
          />
        ));
        return; // Stop further execution
      }
      if (data.status === 200) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Success"}
            message={"User Details updated Successfully !!"}
          />
        ));
        getUser();
        clearFormData();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearFormData = () => {
    setFormData({
      active: true,
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      roles: [],
      username: "",
    });
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
              inputValue={formData.firstname}
              onChange={handleChange}
              required
            />
            <InputText
              labelName="Last Name"
              inputName="lastname"
              inputValue={formData.lastname}
              onChange={handleChange}
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
