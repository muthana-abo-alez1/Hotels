import Admin from "pages/Admin";
import NotFound from "pages/NotFound";
import { Route, Routes } from "react-router-dom";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<Admin />}></Route>
      <Route path="/search" element={<Admin />}></Route>
      <Route path="/test" element={<Admin />}></Route>
      <Route path="/*" element={<NotFound />}></Route>

    </Routes>
  );
};

export default AdminRoute;
