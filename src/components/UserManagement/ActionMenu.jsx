import React, { useEffect, useMemo, useState } from "react";
import EditUserModal from "./EditUserModal";
import SuspendUserModal from "./SuspendUserModal";
import {
  activateUser,
  fetchUsers,
  generatePassword,
  deleteUser,
  clearFormData,
} from "../../redux/Slices/userManagementSlice";
import { useDispatch } from "react-redux";
import ActionOptions from "../Common/ActionOptions/ActionOption";

const ActionMenu = ({ userDataProp, getUser, role }) => {
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserName(userDataProp?.username);
    setIsUserActive(userDataProp?.active);
  }, [userDataProp]);

  const handleDelete = async (userName) => {
    await dispatch(deleteUser(userName));
    dispatch(clearFormData());
  };

  const handleEditUser = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSuspendUser = () => {
    setIsSuspendModalOpen(true);
  };

  const handleActivateUser = async () => {
    await dispatch(activateUser(userDataProp.username)).unwrap();
    await dispatch(fetchUsers({ page: 0, size: 10 })).unwrap();
    dispatch(clearFormData());
  };

  const handleGeneratePassword = async () => {
    await dispatch(generatePassword(userDataProp.username));
    dispatch(clearFormData());
  };

  const closeSuspendModal = () => {
    setIsSuspendModalOpen(false);
  };

  const userNavigation = useMemo(
    () => [
      { name: "Edit User", href: "#", action: handleEditUser },
      {
        name: "Delete User",
        href: "#",
        action: () => handleDelete(userName),
      },
      {
        name: "Generate New Password",
        href: "#",
        action: handleGeneratePassword,
      },
      isUserActive
        ? { name: "Suspend User", href: "#", action: handleSuspendUser }
        : { name: "Activate User", href: "#", action: handleActivateUser },
      // { name: "Sign out", href: "/login", action: () => localStorage.clear() },
    ],
    [userName, isUserActive]
  );

  return (
    <>
      <ActionOptions userNavigation={userNavigation} align={"right"} />
      <EditUserModal
        title="Edit user details"
        isOpen={isModalOpen}
        onClose={closeModal}
        role={role}
        userDetails={userDataProp}
        getUser={getUser}
      />
      <SuspendUserModal
        isOpen={isSuspendModalOpen}
        onClose={closeSuspendModal}
        userDetails={userDataProp}
      />
    </>
  );
};

export default ActionMenu;
