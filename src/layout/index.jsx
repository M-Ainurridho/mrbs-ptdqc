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

const Layout = ({ children }) => {
  const { setLogin } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const { setNavLinks } = useContext(NavLinksContext);

  const navigate = useNavigate();
  const token = Cookies.get("token");

  const exchangeToken = async () => {
    if (!token) {
      navigate("/");
    }

    if (token && !user?.id) {
      try {
        const responseOne = await axios.post(
          `http://localhost:3001/v1/users/exchangetoken`,
          { token }
        );

        if (responseOne.status === 200) {
          const { userId } = responseOne.data.payload;

          const responseTwo = await axios.get(
            `http://localhost:3001/v1/users/${userId}`
          );
          setUser(responseTwo.data.payload.user);
          setNavLinks(
            responseTwo.data.payload.user?.role !== "admin"
              ? memberLinks
              : adminLinks
          );
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
