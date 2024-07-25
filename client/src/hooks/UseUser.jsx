import { useState, useEffect } from "react";

const useUser = () => {
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
          // console.log("Non autorisé");
          return;
        }

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched user:", data.user);
          setUser(data.user);
        } else {
          console.log(`server error: ${response.status}`);
        }
      } catch (error) {
        console.log(`Fetch error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAuth();
  }, []);
  return {user, isLoading, setUser };
}

export default useUser;
