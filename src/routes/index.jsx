import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../views/home";

import Booking from "../views/bookings";
import CreateBooking from "../views/bookings/create";
import BookingDetail from "../views/bookings/detail";
import EditBooking from "../views/bookings/edit";

import User from "../views/users";
import CreateUser from "../views/users/create";
import UserDetail from "../views/users/detail";
import EditUser from "../views/users/edit";

import Room from "../views/rooms";
import NotFound from "../views/not-found";
import Forbidden from "../views/forbidden";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/bookings" element={<Booking />}></Route>
        <Route path="/bookings/create" element={<CreateBooking />}></Route>
        <Route path="/bookings/:id" element={<BookingDetail />}></Route>
        <Route path="/bookings/:id/edit" element={<EditBooking />}></Route>

        <Route path="/users" element={<User />}></Route>
        <Route path="/users/create" element={<CreateUser />}></Route>
        <Route path="/users/:id" element={<UserDetail />}></Route>
        <Route path="/users/:id/edit" element={<EditUser />}></Route>

        <Route path="/rooms" element={<Room />}></Route>

        <Route path="/forbidden" element={<Forbidden />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
