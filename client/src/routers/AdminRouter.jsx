import { Routes, Route } from "react-router-dom";

import Dashboard from "../views/admin/Dashboard";
import NotFound from "../views/NotFound";

function Router() {
  console.log("Admin Router");
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
