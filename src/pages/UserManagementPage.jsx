import React from "react";
import { useEffect } from "react";
import LoadingState from "../components/LoadingState/LoadingState";
import UserManagement from "../components/UserManagement/UserManagement";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../redux/Slices/userManagementSlice";

const UserManagementPage = () => {
  const dispatch = useDispatch();
  const { roleData } = useSelector((state) => state.userManagement);

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  return (
    <>{roleData ? <UserManagement role={roleData} /> : <LoadingState />}</>
  );
};

export default UserManagementPage;
