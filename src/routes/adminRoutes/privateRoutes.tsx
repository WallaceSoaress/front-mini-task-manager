import { Route, Routes } from "react-router";
import Tasks from "../../pages/private/Tasks";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
    </Routes>
  );
}
