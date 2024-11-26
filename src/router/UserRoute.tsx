import Home from "pages/Home";
import NotFound from "pages/NotFound";
import { Route, Routes } from "react-router-dom";

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/*" element={<NotFound />}></Route>

    </Routes>
  );
};

export default UserRoute;
