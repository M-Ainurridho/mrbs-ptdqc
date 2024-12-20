import { useContext } from "react";
import { UserContext } from "../lib/context";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setUser({ username: "", password: "" });
    navigate("/");
  };

  return (
    <button type="button" className="btn btn-primary" onClick={handleClick}>
      Sign out
    </button>
  );
};

export default LogoutButton;
