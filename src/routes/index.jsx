import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../views/home";
import Rooms from "../views/rooms";
import Booking from "../views/bookings";
import CreateBooking from "../views/bookings/create";
import Admin from "../views/admin";
import NotFound from "../views/not-found";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/rooms" element={<Rooms />}></Route>
        <Route path="/bookings" element={<Booking />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/bookings/create" element={<CreateBooking />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
