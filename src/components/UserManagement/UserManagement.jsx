import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Button from "../Common/Button/Button";
import AddUserModal from "./AddUserModal";
import ActionOption from "./ActionOption";
import Loader from "../Common/Loader/Loader";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const UserManagement = ({ role }) => {
  // Data States
  const [allUsersInfo, setAllUsersInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/users?offset=0&limit=10",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === 400) {
        const errorData = await data.json();
        console.log(errorData.message);
        return; // Stop further execution
      }
      const json = await data.json();
      setAllUsersInfo(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserAction = (data) => {
    setSelectedUserData(data); // Set the selected installment data
  };

  const options = { day: "2-digit", month: "short", year: "numeric" };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {allUsersInfo.length > 0 ? (
        <ContainerTile>
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
                {allUsersInfo.map((item) => (
                  <tr className="divide-x divide-gray-200 text-center">
                    <td className="p-4 text-gray-500">{item.username}</td>
                    <td className="p-4 text-gray-500">
                      {item.active ? "Active" : "Suspended"}
                    </td>
                    <td className="p-4 text-gray-500">
                      {new Intl.DateTimeFormat("en-GB", options).format(
                        item.creationDate
                      )}
                    </td>
                    <td className="p-4 text-gray-500">
                      <div onClick={() => handleUserAction(item)}>
                        <ActionOption
                          userDataProp={selectedUserData}
                          getUser={getUser}
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
      ) : (
        <Loader />
      )}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        role={role}
        getUser={getUser}
      />
    </>
  );
};

export default UserManagement;
