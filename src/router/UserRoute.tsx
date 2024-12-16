import Home from "pages/User/page/Home";
import NotFound from "pages/ErrorPage";
import { Route, Routes } from "react-router-dom";
import UserPage from "pages/User/page";
import City from "pages/User/page/City";
import Hotel from "pages/User/page/Hotel";
import SearchPage from "pages/User/page/SearchPage";

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<UserPage />}>
      <Route path="home" element={<Home />}></Route>
      <Route path="city" element={<City />}></Route>
      <Route path="hotel/:id" element={<Hotel />} />
      <Route path="search/data" element={<SearchPage />} />

      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default UserRoute;
