import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setSelectedUserData,
  setIsModalOpen,
  clearFormData,
} from "../../redux/Slices/userManagementSlice";
import Button from "../Common/Button/Button";
import AddUserModal from "./AddUserModal";
import ActionOption from "./ActionOption";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const UserManagement = ({ role }) => {
  const dispatch = useDispatch();
  const { allUsersInfo, loading, selectedUserData, isModalOpen, error } =
    useSelector((state) => state.userManagement);

  useEffect(() => {
    dispatch(fetchUsers());
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
  return (
    <>
      <ContainerTile loading={loading} error={error}>
        <div className="flex justify-between mb-5 items-end">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users List
          </h1>
          <Button
            buttonName={"Add User"}
            onClick={handleAddUser}
            rectangle={true}
          />
        </div>
        <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="divide-y divide-gray-300 w-full">
            <thead className="bg-gray-50">
              <tr className="divide-x divide-gray-200">
                <th className="py-3.5 px-2 text-center text-gray-900">
                  User Name
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Status
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Creation Date
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {allUsersInfo?.map((item) => (
                <tr
                  key={item?.username}
                  className="divide-x divide-gray-200 text-center"
                >
                  <td className="p-4 text-gray-500">{item?.username}</td>
                  <td className="p-4 text-gray-500">
                    {item?.active ? "Active" : "Suspended"}
                  </td>
                  <td className="p-4 text-gray-500">
                    {new Intl.DateTimeFormat("en-GB", options).format(
                      item?.creationDate
                    )}
                  </td>
                  <td className="p-4 text-gray-500">
                    <div onClick={() => handleUserAction(item)}>
                      <ActionOption
                        userDataProp={selectedUserData}
                        role={role}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContainerTile>
      <AddUserModal isOpen={isModalOpen} onClose={closeModal} role={role} />
    </>
  );
};

export default UserManagement;
