import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-4">
      <h6 className="display-4">404, Not Found</h6>
      <Link to="/" className="text-decoration-none">
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
