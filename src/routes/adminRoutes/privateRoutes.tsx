import { Route, Routes } from "react-router";
import Home from "../../pages/private/Home";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
