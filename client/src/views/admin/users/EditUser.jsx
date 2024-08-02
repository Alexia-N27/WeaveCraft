import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useSession from "../../../hooks/useSession";

import "./editUser.scss";

function EditUser() {
  document.title = "Back Office || Modification d'un utilisateur";
  const { userId } = useParams();
  const navigate = useNavigate();
  const { session, isLoading } = useSession();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    roles_id: "",
    roles_label: "",
    address_id: "",
    address_type: "",
  });

  const roles = [
    { id: 1, label: "Admin" },
    { id: 2, label: "User" },
  ];

  useEffect(() => {
    if (!session) return;

    async function fetchUser() {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/auth/admin/${userId}`,
          {
            method: "GET",
            headers: {
              "Accept" : "application/json",
            },
            credentials: "include"
          }
        );

        console.log(response);

        if (!response.ok) {
          console.log("Erreur lors de la récupération de l'utilisateur");
          return;
        }

        const data = await response.json();
        console.log("Données utilisateur récupérées:", data.response);
        const userData = data.response[0];
        setUser(userData);
        setFormData({
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          roles_id: userData.roles_id,
          roles_label: userData.roles_label,
          address_id: userData.address_id,
          address_type: userData.address_type,
        });
      } catch (error) {
        console.log("Erreur:", error);
      }
    }
    fetchUser();
  }, [session, userId]);

  async function handleEditUser(e) {
    e.preventDefault();
    console.log("FormData:", formData);
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/auth/edit${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.log("Erreur lors de la mise a jours de l'utilisateur");
        return;
      }

      console.log("Utilisateur mis à jour");
      navigate(`/admin/users/${userId}`);

    } catch (error) {
      console.log("Erreur:", error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  if (isLoading) {
    return (
      <main>
        <p>Chargement...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main>
        <p>Non autorisé</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <p>Utilisateur introuvable</p>
      </main>
    );
  }

  return (
    <main>
      <header>
        <h1>Modification de l&apos;utilisateur</h1>
      </header>
      <section>
        <form onSubmit={handleEditUser}>
          <label>
            Prénom
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </label>

          <label>
            Nom
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <fieldset>
            <legend>Rôle</legend>
            {roles.map(role => (
              <label key={role.id}>
                <input
                  type="radio"
                  name="roles_label"
                  value={role.label}
                  checked={formData.roles_label === role.label}
                  onChange={handleChange}
                />
                {role.label}
              </label>
            ))}
          </fieldset>
        </form>
      </section>
      <section>
      <h3>Modification de l&apos;adresse</h3>
      {user.address_id ? (
        <form onSubmit={handleEditUser}>
          <label>
            Type
            <input
              type="text"
              name="address_type"
              value={formData.address_type}
              onChange={handleChange}
            />
          </label>
        </form>
      ) : (
        <p>Aucune adresse renseignée</p>
      )}
      </section>
    </main>
  );
}

export default EditUser;
