import Admin from "pages/Admin";
import CitiesPage from "pages/Admin/pages/CitiesPage";
import HotelsPage from "pages/Admin/pages/HotelsPage";
import RoomsPage from "pages/Admin/pages/RoomsPage";
import NotFound from "pages/ErrorPage";
import { Route, Routes } from "react-router-dom";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />}>
      <Route path="cities" element={<CitiesPage />} />
      <Route path="rooms" element={<RoomsPage />} />
      <Route path="hotels" element={<HotelsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoute;
