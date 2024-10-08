import { Link } from "react-router-dom";

import "./dashboard.scss";

function Dashboard() {
  return (
    <main id="dashboard">
      <section className="list-link">
        <Link to={"/admin/roles"}>Gestion des rôles</Link>
        <Link to={"/admin/users"}>Gestion des utilisateurs</Link>
        <Link to={"/admin/products"}>Gestion des produits</Link>
        <Link to={"/admin/categories"}>Gestion des catégories</Link>
        <Link to={"/admin/pictures"}>Gestion des images</Link>
        <Link to={"/admin/message"}>Gestion des messages</Link>
      </section>
    </main>
  );
}

export default Dashboard;
