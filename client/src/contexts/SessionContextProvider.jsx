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

        console.log(response);

        if (!response.ok) {
          console.log("Non autorisé");
          return;
        }

        const data = await response.json();
        console.log(data);
        setSession(data);

      } catch (error) {
        console.log("Erreur de reseau", error)
      }
    }
    fetchAuth();
  },[]);

  return (
    <SessionContext.Provider value={{session, setSession}}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
