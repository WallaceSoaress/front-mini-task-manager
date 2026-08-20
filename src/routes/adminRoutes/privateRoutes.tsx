import { Route, Routes } from "react-router";
import Tasks from "../../pages/private/Tasks";
import Teams from "../../pages/private/Teams";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/teams" element={<Teams />} />
    </Routes>
  );
}
