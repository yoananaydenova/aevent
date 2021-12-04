import { useHistory} from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import * as authService from "../../services/authService";

const Logout = () => {
  const { user, logout } = useContext(AuthContext);
  let history = useHistory();
  useEffect(() => {
    authService.logout(user.accessToken).then(() => {
      logout();
      history.push("/");
    });
  }, []);

  return null;
};
export default Logout;
