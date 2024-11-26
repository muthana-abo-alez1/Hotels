import ThemeSwitcher from "components/ThemeSwitcher";
import { useAuth } from "context/AuthContext";
import { Outlet } from "react-router-dom";
import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar, showWarningSnackbar } from "utils/snackbarUtils";

const Home = () => {
  const { logout } = useAuth();

  const handleSuccess = () => {
    showSuccessSnackbar("Success", "You have successfully logged in!");
  };
  
  const handleError = () => {
    showErrorSnackbar("Error", "There was an issue logging in. Please try again.");
  };
  
  const handleWarning = () => {
    showWarningSnackbar("Warning", "You are about to exceed the maximum limit.");
  };
  
  const handleInfo = () => {
    showInfoSnackbar("Information", "Your account will expire soon. Please renew.");
  };
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      Home
      <button onClick={handleLogout}>Logout</button>
      <div>
        <button onClick={handleSuccess}>Show Success Snackbar</button>
        <button onClick={handleError}>Show Error Snackbar</button>
        <button onClick={handleInfo}>Show Information Snackbar</button>
        <button onClick={handleWarning}>Show Warning Snackbar</button>
      </div>
      <ThemeSwitcher />
      <Outlet />
    </div>
  );
};

export default Home;
