import { useContext, useEffect } from "react";
import { LoginContext, UserContext } from "../lib/context";
import Navbar from "../components/navbar";
import Cookies from "js-cookie";
import axios from "axios";

const Layout = ({ children }) => {
  const { setLogin } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);

  const exchangeToken = async () => {
    const token = Cookies.get("token");

    if (token && !user?.id) {
      const response = await axios.post(
        `http://localhost:3001/v1/users/exchangetoken`,
        { token }
      );
      setUser(response.data.payload.user);
      setLogin(true);
    }
  };

  useEffect(() => {
    exchangeToken();
  }, []);
  return (
    <>
      <Navbar />
      {children}
      {/* <Modal /> */}
    </>
  );
};

export default Layout;
