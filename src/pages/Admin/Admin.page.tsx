import React from "react";
import { removeToken } from "utils/tokenUtils";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/Routing.constants";
const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate(ROUTES.LOGIN);
  };
  return (
    <div>
      Admin
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Admin;
