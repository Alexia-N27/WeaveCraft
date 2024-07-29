import UserRouter from "./routers/UserRouter";
import AdminRouter from "./routers/AdminRouter";

import useSession from "./hooks/useSession";

function App() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <p>Chargement ...</p>;
  }

  if (session) {
    const isAdmin = session?.user.roles_id === 1 ;
    return isAdmin ? <AdminRouter /> : <UserRouter />;
  }
}

export default App;
