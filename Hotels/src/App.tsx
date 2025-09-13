import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import { ProtectedRoute } from "./router/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN.path} element={ROUTES.LOGIN.component} />
      <Route
        path={`${ROUTES.ADMIN.path}/*`}
        element={<ProtectedRoute onlyAdmin>{ROUTES.ADMIN.component}</ProtectedRoute>}
      />
      <Route
        path={`${ROUTES.USER.path}/*`}
        element={<ProtectedRoute>{ROUTES.USER.component}</ProtectedRoute>}
      />
      <Route path={ROUTES.NOTFOUND.path} element={ROUTES.NOTFOUND.component} />
    </Routes>
  );
};
export default App;
