import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import useUser from "../../../hooks/UseUser";

import "./_header.scss";

function Header() {
  const { user, setUser } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.ok) {
        setUser(null);
        navigate("/");
      } else {
        console.log("Erreur lors de la déconnexion.")
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    } finally {
      setShowDropdown(false);
    }
  }

  function handleUserIconClick() {
    if (!user) {
      navigate("/login");
    } else {
      setShowDropdown(prev => !prev);
    }
  }

  function handleMenuOptionClick() {
    setShowDropdown(false);
  }

  return (
    <header>
      <NavLink to={"/"}><h1>WeaveCraft</h1></NavLink>
      <nav>
        {!user && (
          <Link to={"/login"}>
            <FontAwesomeIcon
              icon={faUser}
              // className="user-icon"
            />
          </Link>
        )}

        {user && (
          <>
          {/* ajout d'une className"user-menu"? et une dropdown-menu pour la seconde div ?*/}
            <div >
              <FontAwesomeIcon
                icon={faUser}
                onClick={handleUserIconClick}
                // className="user-icon"
              />
              {showDropdown && (
                <div >
                  <NavLink to={"/profile"} onClick={handleMenuOptionClick}>
                    Mon compte
                  </NavLink>
                  <button onClick={handleLogout}>
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
