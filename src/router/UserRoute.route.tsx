import Home from "pages/Home";
import { Route, Routes } from "react-router-dom";

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  );
};

export default UserRoute;
