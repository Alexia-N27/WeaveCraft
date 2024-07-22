import UserRouter from "./routers/UserRouter";
import AdminRouter from "./routers/AdminRouter";

import useUser from "./hooks/UseUser";

function App() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <>
        <p>Chargement...</p>
      </>
    );
  }

  const isAdmin = user && user.isAdmin;

  if (isAdmin) {
    return <AdminRouter />;
  } else {
    return <UserRouter />;
  }
}

export default App;
