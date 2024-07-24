import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCartShopping, faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import useUser from "../../../hooks/UseUser";

import logo from "../../../assets/images/WeaveCraft.png";
import "./_header.scss";

function Header() {
  const { user, setUser } = useUser();
  const [showMenu, setShowMenu] = useState(false);
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
    }
  }

  function toggleMenu() {
    setShowMenu(prev => !prev);
  }

  function closeMenu() {
    setShowMenu(false);
  }

  return (
    <header>
      <nav>
        <button onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>

          <h1 className={"container-header-logo"}>
            <Link to={"/"}>
              <img
                src={logo}
                alt="Logo de la boutique WeaveCraft"
                className={"header-logo"}
              />
            </Link>
          </h1>

        <div className="nav-icons">
          <NavLink to={user ? "/profile" : "/login"}>
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
          <NavLink>
            <FontAwesomeIcon icon={faCartShopping} />
          </NavLink>
        </div>
      </nav>

      {/* Menu déroulé */}
      {showMenu && (
        <nav className="nav-menu">
          <button onClick={toggleMenu} className={"btn-faxmark"}>
						<FontAwesomeIcon icon={faXmark} />
					</button>

          <Link to={"/"} onClick={closeMenu}>Colliers</Link>
          <Link to={"/"} onClick={closeMenu}>Boucles</Link>
          <Link to={"/"} onClick={closeMenu}>Bracelets</Link>
          <Link to={"/"} onClick={closeMenu}>Manchette</Link>

          <br />

          <Link to={"/"} onClick={closeMenu}>Contact</Link>

          {/* Utilisateur connecté, affichage btn déconnexion */}
          {user && (
            <button onClick={() => { handleLogout(); closeMenu(); }}>
              Déconnexion
            </button>
          )}
        </nav>
      )}

      <form className="search-form">
        <div className="search-container">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            type="search"
            name=""
            id=""
            placeholder="Rechercher un produit"
            aria-label="Rechercher un produit"
          />
        </div>
      </form>
    </header>
  );
}

export default Header;
