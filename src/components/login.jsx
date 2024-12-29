import { UserIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { LoginContext } from "../lib/context";
import Cookies from "js-cookie";
import axios from "axios";
import clsx from "clsx";

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
  const { setLogin } = useContext(LoginContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3001/v1/users/login`,
        form
      );
      const { token } = response.data.payload;
      Cookies.set("token", token);
      setLogin(true);

      const modal = document.querySelector("#loginModal");
      const modalBackdrop = document.querySelector(".modal-backdrop");
      const body = document.querySelector("body");
      modal.classList.remove("show");
      modalBackdrop.remove();
      body.setAttribute("class", "");
      body.setAttribute("style", "");
    } catch (err) {
      setErrors(err.response.data.errors);
    } finally {
      setIsLoading(false);
    }
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
                    className={clsx(
                      "form-control",
                      errors.length > 0 &&
                        errors.map(
                          (error) => error.path == "username" && "is-invalid"
                        )
                    )}
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={handleValueChange}
                  />
                  {errors.length > 0 &&
                    errors.map(
                      (error, i) =>
                        error.path == "username" && (
                          <div key={i} className="ms-5 invalid-feedback">
                            {error.msg}
                          </div>
                        )
                    )}
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <KeyIcon style={{ width: "20px" }} />
                  </span>
                  <input
                    type="password"
                    name="password"
                    className={clsx(
                      "form-control",
                      errors.length > 0 &&
                        errors.map(
                          (error) => error.path == "password" && "is-invalid"
                        )
                    )}
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    onChange={handleValueChange}
                  />
                  {errors.length > 0 &&
                    errors.map(
                      (error, i) =>
                        error.path == "password" && (
                          <div key={i} className="ms-5 invalid-feedback">
                            {error.msg}
                          </div>
                        )
                    )}
                </div>
              </div>
              <button
                type="submit"
                className={clsx("d-block btn w-full", {
                  "btn-primary": !isLoading,
                  "btn-secondary": isLoading,
                })}
                disabled={isLoading && "disabled"}
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

export default LoginButton;
