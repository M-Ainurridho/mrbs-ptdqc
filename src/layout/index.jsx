import Modal from "../components/modals";
import Navbar from "../components/navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      {/* <Modal /> */}
    </>
  );
};

export default Layout;
