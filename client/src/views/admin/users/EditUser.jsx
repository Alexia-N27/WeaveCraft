import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useSession from "../../../hooks/useSession";

import "./editUser.scss";

function EditUser() {
  document.title = "Back Office || Modification d'un utilisateur";

  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    roles_id: "",
    roles_label: "",
    address_id: "",
    address_type: "",
  });

  const { session, isLoading } = useSession();
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState([]);

  const roles = [
    { id: 1, label: "Admin" },
    { id: 2, label: "User" },
  ];

  const addressTypes = [
    { id: 1, label: "Livraison" },
    { id: 2, label: "Facturation" },
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
          password: userData.password,
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

  // Récupération des adresses associées à l'utilisateur
  useEffect(() => {
    async function fetchAddresses() {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/addresses/admin/${userId}`,
          {
            method: "GET",
            headers: {
              "Accept" : "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.log("Erreur lors de la récupérations des adresses");
          return;
        }

        const data = await response.json();
        console.log("Données brutes renvoyées par le backend :", data);
        if (data.response && data.response.length > 0) {
          setAddress(data.response);
        } else {
          console.log("Aucune adresse trouvée");
        }
      } catch (error) {
        console.log("Erreur réseaux", error);
      }
    }
    fetchAddresses();
  }, [userId]);

  async function handleEditUser(e) {
    e.preventDefault();
    console.log("FormData:", formData);

    try {
      // requète patch pour la mise a jour utilisateur
      const responseUser = await fetch(
        `http://localhost:9000/api/v1/auth/edit/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            password: formData.password,
            roles_id: formData.roles_id,
          }),
          credentials: "include",
        }
      );

      console.log("Response User:", responseUser);

      if (!responseUser.ok) {
        console.log("Erreur lors de la mise a jours de l'utilisateur");
        return;
      }

      console.log("Utilisateur mis à jour");

      // Requête patch pour la mise a jour de l'adresse
      if (formData.address_id) {
        console.log("Address Data:", {
          address_type: formData.address_type,
        });

        const responseAddress = await fetch(
          `http://localhost:9000/api/v1/addresses/${formData.address_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type" : "application/json",
            },
            body: JSON.stringify({
              address_type: formData.address_type,
              street: formData.street || "",
              complement: formData.complement || "",
              city: formData.city || "",
              zip_code: formData.zip_code || "",
              country: formData.country || "",
              users_id: userId,
            }),
            credentials: "include",
          }
        );

        if (!responseAddress.ok) {
          console.log("Erreur lors de la mise à jour de l'adresse");
          return;
        }

        console.log("Adresse mise à jour");
      }


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
                  name="roles_id"
                  value={role.id}
                  checked={formData.roles_id == role.id}
                  onChange={handleChange}
                />
                {role.label}
              </label>
            ))}
          </fieldset>
          <h3>Modification de l&apos;adresse</h3>
          {user.address_id ? (
              <fieldset>
                <legend>Type d&apos;adresse</legend>
                {addressTypes.map((type) => (
                  <label key={type.id}>
                    <input
                      type="radio"
                      name="address_type"
                      value={type.id}
                      checked={formData.address_type == type.id}
                      onChange={handleChange}
                    />
                    {type.label}
                  </label>
                ))}
              </fieldset>
          ) : (
            <p>Aucune adresse renseignée</p>
          )}
          <button type="submit">Modifier</button>
        </form>
        <Link to={`/admin/users/${userId}`}>Retour au détail de l&apos;utilisateur</Link>
      </section>
    </main>
  );
}

export default EditUser;
