import UserRouter from "./routers/UserRouter";
import AdminRouter from "./routers/AdminRouter";

import useSession from "./hooks/useSession";

function App() {
  const { session } = useSession();

  if (!session) {
    return (
      <>
        <p>Chargement...</p>
      </>
    );
  }

  const isAdmin = session?.user.roles_id === 1 ;

  if (isAdmin) {
    return <AdminRouter />;
  } else {
    return <UserRouter />;
  }
}

export default App;
