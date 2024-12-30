/* eslint-disable react-hooks/exhaustive-deps */
import Container from "./container";
import Logo from "../assets/ptdqc.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoginContext, NavLinksContext, UserContext } from "../lib/context";
import LoginButton from "./login";
import LogoutButton from "./logout";
import clsx from "clsx";

const Navbar = () => {
  const { login } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  const { navLinks } = useContext(NavLinksContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname.startsWith("/users") ||
      location.pathname.startsWith("/rooms")
    ) {
      if (user?.role !== "admin") {
        navigate("/forbidden");
      }
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
        {login && (
          <div className="d-flex gap-4 align-items-center w-full">
            {navLinks.map((nav) => (
              <Link
                key={nav.nav}
                to={nav.path}
                className={clsx("nav-link", {
                  "active fw-semibold": nav.path == location.pathname,
                })}
                aria-current="page"
              >
                {nav.nav}
              </Link>
            ))}
          </div>
        )}
        <div>{login ? <LogoutButton /> : <LoginButton />}</div>
      </Container>
    </nav>
  );
};

export default Navbar;
