import React, { useEffect, useMemo, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import EditUserModal from "./EditUserModal";
import SuspendUserModal from "./SuspendUserModal";
import {
  activateUser,
  fetchUsers,
  generatePassword,
  deleteUser,
} from "../../redux/Slices/userManagementSlice";
import { useDispatch, useSelector } from "react-redux";

const ActionOption = ({ userDataProp, getUser, role }) => {
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
    toast.loading("Deleting...", {
      duration: 1000,
      position: "bottom-center",
    });
    await dispatch(deleteUser(userName)).unwrap();
    toast.custom((t) => (
      <Passed
        t={t}
        toast={toast}
        title="Delete Successful"
        message="The user was deleted successfully"
      />
    ));
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
    toast.loading("Activating...", {
      duration: 1000,
      position: "bottom-center",
    });
    await dispatch(activateUser(userDataProp.username)).unwrap();
    toast.custom((t) => (
      <Passed
        t={t}
        toast={toast}
        title="Activate Successful"
        message="The user was activated successfully"
      />
    ));
    dispatch(fetchUsers());
  };

  const handleGeneratePassword = async () => {
    toast.loading("Generating...", {
      duration: 1000,
      position: "bottom-center",
    });
    await dispatch(generatePassword(userDataProp.username)).unwrap();
    toast.custom((t) => (
      <Passed
        t={t}
        toast={toast}
        title="Successful"
        message="New Password generated successfully"
      />
    ));
    dispatch(fetchUsers());
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
      <Menu as="div" className="relative">
        <div className="flex items-center justify-center gap-2">
          <Menu.Button className="relative flex rounded-full p-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Options
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 h-5 w-5 text-gray-400"
            />
          </Menu.Button>
        </div>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {userNavigation.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    to={item.href}
                    className={`block px-4 py-2 text-sm ${
                      active ? "bg-gray-100 text-gray-700" : "text-gray-700"
                    }`}
                    onClick={item.action}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
      <EditUserModal
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

export default ActionOption;
