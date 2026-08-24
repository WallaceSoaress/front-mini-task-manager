import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useAuth } from "../hooks/auth";
import { PrivateRoutes } from "./adminRoutes/privateRoutes";
import { PublicRoutes } from "./publicRoutes";

export function AppRoutes() {
  const { isAuthorized, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        {isAuthorized ? (
          <>
            <Route path="/*" element={<PrivateRoutes />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<PublicRoutes />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
