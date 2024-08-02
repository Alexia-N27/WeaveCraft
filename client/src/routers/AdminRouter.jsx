import { Routes, Route } from "react-router-dom";

import Header from "../views/partials/Header/Header.jsx";
import Footer from "../views/partials/Footer/Footer.jsx";

import Dashboard from "../views/admin/dashboard/Dashboard.jsx";
import Roles from "../views/admin/rôles/Roles.jsx";
import AdminUsers from "../views/admin/users/AdminUsers.jsx";
import UserDetails from "../views/admin/users/UserDetails.jsx";
import EditUser from "../views/admin/users/EditUser.jsx";
import Categories from "../views/admin/categories/Categories.jsx";
import Products from "../views/admin/products/Products.jsx";
import AddProduct from "../views/admin/products/AddProduct.jsx";
import EditProduct from "../views/admin/products/EditProduct.jsx";
import NotFound from "../views/NotFound";

function Router() {
  console.log("Admin Router");
  return (
    <>
    <Header />
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/roles" element={<Roles />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/users/:userId" element={<UserDetails />} />
      <Route path="/admin/edituser/:userId" element={<EditUser />} />
      <Route path="/admin/categories" element={<Categories />} />
      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/addproduct" element={<AddProduct />} />
      <Route path="/admin/editproduct/:id" element={<EditProduct />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    </>
  );
}

export default Router;
