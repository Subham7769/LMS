import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../components/Common/Loader/Loader";
import UserManagement from "../components/UserManagement/UserManagement";

const UserManagementPage = () => {
  const [rolesData, setRolesData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchRolesData = async () => {
      try {
        const fetchData = await axios.get(
          `${import.meta.env.VITE_USER_ROLES_READ}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const formattedRoleData = fetchData.data.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        const filteredRoles = formattedRoleData.filter(
          (item) => item.label != "ROLE_SUPERADMIN"
        );
        setRolesData(filteredRoles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRolesData();
  }, []);

  return <>{rolesData ? <UserManagement role={rolesData} /> : <Loader />}</>;
};

export default UserManagementPage;
