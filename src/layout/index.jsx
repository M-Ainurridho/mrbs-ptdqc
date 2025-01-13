/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { LoginContext, NavLinksContext, UserContext } from "../lib/context";
import Navbar from "../components/navbar";
import Cookies from "js-cookie";
import axios from "axios";
import SweetAlert from "../components/alerts";
import { adminLinks, memberLinks } from "../lib/data";
import { useNavigate } from "react-router-dom";
import { getExchangeToken, getUserById } from "../lib/api";

const Layout = ({ children }) => {
  const { login, setLogin } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const { setNavLinks } = useContext(NavLinksContext);

  const navigate = useNavigate();
  const token = Cookies.get("token");

  const exchangeToken = async () => {
    if (!token && !login) {
      navigate("/");
    }

    if (token && !user?.id) {
      try {
        const { status, data } = await getExchangeToken(token);

        if (status === 200) {
          const { userId } = data.payload;

          const { user } = await getUserById(userId);
          setUser(user);
          setNavLinks(user?.role !== "admin" ? memberLinks : adminLinks);
          setLogin(true);
        } else {
          throw new Error();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    exchangeToken();
  }, []);

  return (
    <>
      <Navbar />
      {children}
      <SweetAlert />
    </>
  );
};

export default Layout;
