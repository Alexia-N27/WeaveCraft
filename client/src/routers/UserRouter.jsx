import { Routes, Route } from "react-router-dom";

import Header from "../views/partials/Header/Header.jsx";
import Footer from "../views/partials/Footer/Footer.jsx";

import HomePage from "../views/user/homepage/HomePage.jsx";
import Login from "../views/auth/login/Login.jsx";
import Register from "../views/auth/register/Register.jsx";
import UserProfile from "../views/user/UserProfile";
import Contact from "../views/user/contact/Contact.jsx";
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
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    </>
  )
}

export default Router;
