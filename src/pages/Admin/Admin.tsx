
import { useAuth } from "context/AuthContext";
import { Outlet } from "react-router-dom";
const Admin = () => {
  const {logout} = useAuth()

  const handleLogout = () => {
    logout()
  };
  return (
    <div>
      Admin
      <button onClick={handleLogout}>Logout</button>
      <Outlet/>
    </div>
  );
};

export default Admin;
