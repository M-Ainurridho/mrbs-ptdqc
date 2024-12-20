import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../views/home";
import Rooms from "../views/rooms";
import Booking from "../views/bookings";
import CreateBooking from "../views/bookings/create";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/rooms" element={<Rooms />}></Route>
        <Route path="/bookings" element={<Booking />}></Route>
        <Route path="/bookings/create" element={<CreateBooking />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
