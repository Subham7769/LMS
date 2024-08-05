import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../components/Common/Loader/Loader";
import UserManagement from "../components/UserManagement/UserManagement";

const UserManagementPage = () => {
  const [rolesData, setRolesData] = useState([
    {
      id: "65be5acdef39ea00012e09ba",
      name: "ROLE_SUPERADMIN",
    },
    {
      id: "65be5acdef39ea00012e09bb",
      name: "ROLE_ADMIN",
    },
    {
      id: "65be5acdef39ea00012e09bc",
      name: "ROLE_CUSTOMER_CARE_USER",
    },
    {
      id: "65be5acdef39ea00012e09bd",
      name: "ROLE_CREDITOR_ADMIN",
    },
    {
      id: "65be5acdef39ea00012e09be",
      name: "ROLE_CUSTOMER_CARE_MANAGER",
    },
    {
      id: "65be5acdef39ea00012e09bf",
      name: "ROLE_TICKETING_USER",
    },
    {
      id: "65be5acdef39ea00012e09c0",
      name: "ROLE_TICKETING_SUPERVISOR",
    },
    {
      id: "65be5acdef39ea00012e09c1",
      name: "ROLE_TECHNICAL",
    },
  ]);

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
