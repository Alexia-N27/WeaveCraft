import { createContext, useState, useEffect} from "react";

export const SessionContext = createContext({
  user: {
    firstname: "",
    lastname: "",
    email: "",
    roles_id: ""
  }
});

const SessionProvider = ({children}) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAuth() {
      try{
        const response = await fetch(
          "http://localhost:9000/api/v1/auth",
          {
            method: "GET",
            headers: {
              "Accept" : "application/json"
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.log("Non autorisé");
          setIsLoading(false)
          return;
        }

        const data = await response.json();
        console.log(data);
        setSession(data);

      } catch (error) {
        console.log("Erreur de reseau", error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchAuth();
  },[]);

  return (
    <SessionContext.Provider value={{session, setSession, isLoading, setIsLoading}}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
