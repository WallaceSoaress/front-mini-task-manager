import { Route, Routes } from "react-router";
import Login from "../pages/public/Login";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
