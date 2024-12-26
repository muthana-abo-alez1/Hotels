import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "../components/Header";

const UserPage = () => {
  return (
    <div>
      <UserHeader />
      <Outlet />
    </div>
  );
};

export default UserPage;