import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCartShopping, faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import useSession from "../../../hooks/useSession";

import logo from "../../../assets/images/WeaveCraft.png";
import "./_header.scss";

function Header() {
  const { session, setSession } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:9000/api/v1/categories", {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          setError("Erreur lors de la récupération des catégories");
          return;
        }

        const data = await response.json();
        setCategories(data.response);
      } catch (error) {
        setError("Erreur réseau", error);
      }
    }

    fetchCategories();
  }, []);

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
        setSession(null);
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

  function handleUserClick() {
    if (!session?.user.email) {
      navigate("/login");
    } else if (session.user.roles_id === 1) {
      navigate("/admin/dashboard");
    } else {
      navigate("/profile");
    }
  }

  return (
    <header>
      {error && <div className="error-message">{error}</div>}
      <nav>
        <button onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>

          <h1 className="container-header-logo">
            <Link to={"/"}>
              <img
                src={logo}
                alt="Logo de la boutique WeaveCraft"
                className={"header-logo"}
              />
            </Link>
          </h1>

        <div className="nav-icons">
            <FontAwesomeIcon icon={faUser} onClick={handleUserClick} />
            <FontAwesomeIcon icon={faCartShopping} />
        </div>
      </nav>

      {/* Menu déroulé */}
      {showMenu && (
        <nav className="nav-menu">
          <button onClick={toggleMenu} className={"btn-faxmark"}>
						<FontAwesomeIcon icon={faXmark} />
					</button>

          {categories.map(category => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              onClick={closeMenu}
            >
              {category.label}
            </Link>
          ))}

          <br />

          <Link to={"/contact"} onClick={closeMenu}>Contact</Link>

          {session?.user.email && (
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
