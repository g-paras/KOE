import { useContext } from "react";

import AuthContext from "../contexts/AuthContext";

const useAuth = () => {
  const { token } = useContext(AuthContext);
  return { token };
};

export default useAuth;
