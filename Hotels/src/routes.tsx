import Home from "pages/User/page/Home";
import Login from "pages/Login";
import NotFound from "pages/ErrorPage";
import AdminRoute from "router/AdminRoute";
import UserRoute from "router/UserRoute";

interface Route {
  path: string;
  component: JSX.Element;
}

export const ROUTES: { [key: string]: Route } = {
  LOGIN: { path: "login", component: <Login /> },
  HOME: { path: "home", component: <Home /> },
  NOTFOUND: { path: "*", component: <NotFound /> },
  ADMIN: { path: "admin", component: <AdminRoute /> ,},
  USER: {path: "user", component: <UserRoute />,},
}as const
