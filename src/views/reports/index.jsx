import { Link } from "react-router-dom";

const Report = () => {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="text-center">
        <h1 className="display-6">Not available at this time</h1>
        <Link to="/" className="text-decoration-none">
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default Report;
