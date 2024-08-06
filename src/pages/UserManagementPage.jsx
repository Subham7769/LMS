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
          "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/users/roles",
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
        setRolesData(formattedRoleData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRolesData();
  }, []);

  return <>{rolesData ? <UserManagement role={rolesData} /> : <Loader />}</>;
};

export default UserManagementPage;
