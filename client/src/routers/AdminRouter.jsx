import { Routes, Route } from "react-router-dom";

import Header from "../views/partials/Header/Header.jsx";
import Dashboard from "../views/admin/Dashboard";
import NotFound from "../views/NotFound";

function Router() {
  console.log("Admin Router");
  return (
    <>
    <Header />
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default Router;
