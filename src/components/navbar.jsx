/* eslint-disable react-hooks/exhaustive-deps */
import Container from "./container";
import Logo from "../assets/ptdqc.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoginContext, NavLinksContext } from "../lib/context";
import LoginButton from "./login";
import LogoutButton from "./logout";
import clsx from "clsx";
import axios from "axios";
import Cookies from "js-cookie";
import { getExchangeToken, getUserById } from "../lib/api";

const Navbar = () => {
  const { login } = useContext(LoginContext);
  const { navLinks } = useContext(NavLinksContext);

  const location = useLocation();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const menuAuthorize = async () => {
    if (
      location.pathname.startsWith("/users") ||
      location.pathname.startsWith("/rooms")
    ) {
      try {
        const { status, data } = await getExchangeToken(token);

        if (status === 200) {
          const { userId } = data.payload;

          const { user } = await getUserById(userId);
          const { role } = user;

          if (role !== "admin") {
            navigate("/forbidden");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    menuAuthorize();
  }, []);

  return (
    <nav className="navbar bg-body-tertiary">
      <Container>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={Logo}
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block align-text-top me-2"
          />
          <span className="fw-semibold">DQC Meeting Schedule</span>
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
        <div className="d-flex align-items-center gap-2">
          {login ? <LogoutButton /> : <LoginButton />}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
