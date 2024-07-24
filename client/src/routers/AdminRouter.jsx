import { Routes, Route } from "react-router-dom";

import Header from "../views/partials/Header/Header.jsx";
import Footer from "../views/partials/Footer/Footer.jsx";

import Dashboard from "../views/admin/Dashboard.jsx";
import Categories from "../views/admin/Categories.jsx";
import NotFound from "../views/NotFound";

function Router() {
  console.log("Admin Router");
  return (
    <>
    <Header />
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/categories" element={<Categories />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    </>
  );
}

export default Router;
