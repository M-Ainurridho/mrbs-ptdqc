/* eslint-disable react-hooks/exhaustive-deps */
import Container from "./container";
import Logo from "../assets/ptdqc.png";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { LoginContext, UserContext } from "../lib/context";
import LoginButton from "./login";
import LogoutButton from "./logout";
import clsx from "clsx";
import { navLinks } from "../lib/data";

const Navbar = () => {
  const { login } = useContext(LoginContext);

  const location = useLocation();

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
