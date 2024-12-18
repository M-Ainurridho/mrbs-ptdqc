import Container from "./container";
import Logo from "../assets/ptdqc.png";

const Navbar = () => {
  return (
    <nav className="navbar  bg-body-tertiary">
      <Container>
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src={Logo}
            alt="Logo"
            width="35"
            height="35"
            className="d-inline-block align-text-top me-2"
          />
          PT. Duraquipt Cemerlang
        </a>
        <div className="d-flex gap-4 align-items-center">
          <span className="nav-link">Hello, Ridho</span>
          <a className="nav-link active" aria-current="page" href="/rooms">
            Rooms
          </a>
          <a className="nav-link" href="/bookings">
            Booking
          </a>
          <a className="nav-link" href="/bookings">
            Report
          </a>
          <button className="btn btn-sm btn-primary">Sign out</button>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
