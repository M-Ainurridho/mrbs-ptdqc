import { useContext } from "react";
import { LoginContext, NavLinksContext, UserContext } from "../lib/context";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const LogoutButton = () => {
  const { setLogin } = useContext(LoginContext);
  const { setUser } = useContext(UserContext);
  const { setNavLinks } = useContext(NavLinksContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setUser({});
    setNavLinks([]);
    setLogin(false);
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <button type="button" className="btn btn-primary" onClick={handleClick}>
      Sign out
    </button>
  );
};

export default LogoutButton;
