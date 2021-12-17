import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialAuthState = {
  _id: "",
  email: "",
  accessToken: "",
  firstName: "",
  lastName: "",
  favorites: "",
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", initialAuthState);

  const login = (authData) => {
    setUser(authData);
  };

  const logout = () => {
    setUser(initialAuthState);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: Boolean(user.email) }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
