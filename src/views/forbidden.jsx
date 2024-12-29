import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="text-center mt-4">
      <h6 className="display-4">403, Forbidden Access</h6>
      <Link to="/" className="text-decoration-none">
        Back to home
      </Link>
    </div>
  );
};

export default Forbidden;
