import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // needs additional webpack config!
import MyCalendar from "./components/calendar";
import Navbar from "./components/navbar";
import Container from "./components/container";

function App() {
  return (
    <>
      <Navbar />
      <Container className="my-4">
        <MyCalendar />
      </Container>
    </>
  );
}

export default App;
