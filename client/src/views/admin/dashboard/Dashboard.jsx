import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <main>
      <h1>Tableau de bord</h1>
      <section>
        <Link to={"/admin/roles"}>Gestion des rôles</Link>
        <Link to={"/admin/users"}>Gestion des utilisateurs</Link>
        <Link to={"/admin/products"}>Gestion des produits</Link>
        <Link to={"/admin/categories"}>Gestions des catégories</Link>
      </section>
    </main>
  );
}

export default Dashboard;
