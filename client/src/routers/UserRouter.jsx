import { Routes, Route } from "react-router-dom";

import Header from "../views/partials/Header/Header.jsx";

import HomePage from "../views/user/HomePage";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import UserProfile from "../views/user/UserProfile";
import NotFound from "../views/NotFound";

function Router() {
  console.log("User Router");
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default Router;
