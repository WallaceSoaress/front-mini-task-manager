import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useAuth } from "../hooks/auth";
import { PrivateRoutes } from "./adminRoutes/privateRoutes";
import { PublicRoutes } from "./publicRoutes";

export function AppRoutes() {
  const { isAuthorized } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {isAuthorized ? (
          <>
            <Route path="/*" element={<PrivateRoutes />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<PublicRoutes />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
