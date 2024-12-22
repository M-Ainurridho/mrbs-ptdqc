// import { useContext, useEffect } from "react";
import Navbar from "../components/navbar";
// import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  // const location = useLocation();
  // const { login } = useContext();

  // useEffect(() => {}, []);
  return (
    <>
      <Navbar />
      {children}
      {/* <Modal /> */}
    </>
  );
};

export default Layout;
