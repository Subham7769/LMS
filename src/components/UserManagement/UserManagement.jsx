import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setSelectedUserData,
  setIsModalOpen,
  clearFormData,
} from "../../redux/Slices/userManagementSlice";
import Button from "../Common/Button/Button";
import AddUserModal from "./AddUserModal";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { clearValidationError } from "../../redux/Slices/validationSlice";
import ListTableClassic from "../Common/ListTable/ListTableClassic";
import ActionMenu from "./ActionMenu";
import { AddIcon } from "../../assets/icons";

const UserManagement = ({ role }) => {
  const dispatch = useDispatch();
  const { allUsersInfo, loading, selectedUserData, isModalOpen, error } =
    useSelector((state) => state.userManagement);

  useEffect(() => {
    dispatch(fetchUsers());
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(setIsModalOpen(true));
    dispatch(clearFormData());
  };

  const closeModal = () => {
    dispatch(setIsModalOpen(false));
  };

  const handleUserAction = (data) => {
    dispatch(setSelectedUserData(data));
  };

  // console.log(selectedUserData);

  const options = { day: "2-digit", month: "short", year: "numeric" };
  let ListHeader = [
    { name: "User Name", sortKey: null },
    { name: "Role", sortKey: null },
    { name: "Creation Date", sortKey: null },
    { name: "Status", sortKey: null },
    { name: "Action", sortKey: null },
  ];
  return (
    <>
      <ContainerTile loading={loading} className={"px-5 pt-5 pb-0.5"}>
        <div className="block md:flex justify-between items-center mb-4 md:mb-0">
          <h2 className="mb-6">
            <b className="text-xl font-semibold">User Management</b>
            <div className="text-gray-600 text-sm">
              Manage users and their roles
            </div>
          </h2>
          <div className="text-right">
            <Button
              buttonIcon={AddIcon}
              buttonName={"Add User"}
              onClick={handleAddUser}
              buttonType="primary"
            />
          </div>
        </div>
        <ListTableClassic
          ListName="List of Users"
          ListNameLength={allUsersInfo?.length}
          ListHeader={ListHeader}
        >
          {allUsersInfo?.map((item) => (
            <tr key={item?.username}>
              <td className="p-4">{item?.username}</td>
              <td className="p-4">{item?.roles[0]?.name}</td>
              <td className="p-4">
                {new Intl.DateTimeFormat("en-GB", options).format(
                  item?.creationDate
                )}
              </td>
              <td className="p-4">
                <span
                  className={`inline-block min-w-24 rounded-full font-medium py-0.5 text-center ${
                    item?.active
                      ? "bg-green-500/20 text-green-700 px-2"
                      : "bg-red-500/20 text-red-700 px-2"
                  } `}
                >
                  {item?.active ? "Active" : "Suspended"}
                </span>
              </td>

              <td className="p-4">
                <div onClick={() => handleUserAction(item)}>
                  <ActionMenu userDataProp={selectedUserData} role={role} />
                </div>
              </td>
            </tr>
          ))}
        </ListTableClassic>
      </ContainerTile>
      <AddUserModal isOpen={isModalOpen} onClose={closeModal} role={role} />
    </>
  );
};

export default UserManagement;
