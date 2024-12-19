import { UserIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const LoginButton = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
      >
        Sign in
      </button>
      <LoginModal />
    </>
  );
};

export const LoginModal = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify(form);
    window.localStorage.setItem("user", data);
  };

  const handleValueChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Login User
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <UserIcon style={{ width: "20px" }} />
                  </span>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={handleValueChange}
                  />
                </div>
                {/* <small className="text-danger">Username isn't registered</small> */}
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <KeyIcon style={{ width: "20px" }} />
                  </span>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    onChange={handleValueChange}
                  />
                </div>
                {/* <small className="text-danger">Wrong password</small> */}
              </div>
              <button
                className="d-block btn btn-primary w-full"
                style={{ width: "100%" }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LogoutButton = () => {
  return (
    <button type="button" className="btn btn-primary">
      Sign out
    </button>
  );
};

export default LoginButton;
