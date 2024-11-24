import Home from "pages/Home";
import { Route, Routes } from "react-router-dom";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />}></Route>
    </Routes>
  );
};

export default AdminRoute;
