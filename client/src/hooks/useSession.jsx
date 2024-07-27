import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContextProvider";

const useSession = () => {
  const session = useContext(SessionContext);
  return session;
}

export default useSession;
