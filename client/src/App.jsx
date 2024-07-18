import { useEffect, useState } from "react";

import UserRouter from "./routers/UserRouter";
import AdminRouter from "./routers/AdminRouter";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAuth() {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/auth",
          {
            credentials: "include",
          }
        );

        if(response.status === 401) {
          console.log("Non autorisé");
          return;
        }

        if(response.ok) {
          const data = await response.json();
          console.log("Fetched user:", data.user);
          setUser(data.user);
        } else {
          console.log(`Server error: ${response.status}`);
        }
      } catch (error) {
        console.log(`Fetch error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAuth();
  }, []);

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
