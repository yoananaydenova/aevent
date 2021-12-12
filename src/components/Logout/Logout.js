import { useHistory} from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import * as authService from "../../services/authService";

const Logout = () => {
  const { user, logout } = useAuthContext();
  let history = useHistory();

  useEffect(() => {
    authService.logout(user.accessToken).then(() => {
      logout();
      history.push("/");
    });
  }, [history, logout, user.accessToken]);

  return null;
};
export default Logout;
