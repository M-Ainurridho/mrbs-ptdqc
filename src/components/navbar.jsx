import Container from "./container";
import Logo from "../assets/ptdqc.png";
import { Link } from "react-router-dom";
import LoginButton, { LogoutButton } from "./login";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

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
        {isLogin && (
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
        <div>{isLogin ? <LogoutButton /> : <LoginButton />}</div>
      </Container>
    </nav>
  );
};

export default Navbar;
