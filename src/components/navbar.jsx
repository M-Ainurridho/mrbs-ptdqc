import Container from "./container";
import Logo from "../assets/ptdqc.png";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoginContext, UserContext } from "../lib/context";
import LoginButton from "./login";
import LogoutButton from "./logout";

const Navbar = () => {
  const { login, setLogin } = useContext(LoginContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.username && user?.password) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [user]);

  return (
    <nav className="navbar bg-body-tertiary">
      <Container>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={Logo}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top me-2"
          />
          PT. Duraquipt Cemerlang
        </Link>
        {login && (
          <div className="d-flex gap-4 align-items-center w-full">
            <Link to="/" className="nav-link active" aria-current="page">
              Home
            </Link>
            <Link to="/bookings" className="nav-link">
              Booking
            </Link>
            <Link to="" className="nav-link" href="/bookings">
              Report
            </Link>
          </div>
        )}
        <div>{login ? <LogoutButton /> : <LoginButton />}</div>
      </Container>
    </nav>
  );
};

export default Navbar;
