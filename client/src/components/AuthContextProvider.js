import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TOKEN_NAME } from "../util/app.constant";

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const token = localStorage?.getItem(TOKEN_NAME);
    if (token) {
      const { user } = jwtDecode(token);
      setUser(user);
    } else navigate("/login");
  }, [pathname]);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
