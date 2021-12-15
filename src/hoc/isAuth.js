import { useAuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";

export const isAuth = (Component) => {
  const WrapperComponent = (props) => {
    const { isAuthenticated } = useAuthContext();
    return isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />; 
  };

  return WrapperComponent;
};
