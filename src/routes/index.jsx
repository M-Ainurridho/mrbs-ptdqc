import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../views/home";
import Booking from "../views/booking";
import Rooms from "../views/rooms";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/rooms" element={<Rooms />}></Route>
        <Route path="/bookings" element={<Booking />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
