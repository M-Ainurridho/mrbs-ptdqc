import { UserIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { LoginContext, NavLinksContext, UserContext } from "../lib/context";
import Cookies from "js-cookie";
import axios from "axios";
import clsx from "clsx";
import { adminLinks, memberLinks } from "../lib/data";
import { signInAuthentication } from "../lib/api";

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
  const { setNavLinks } = useContext(NavLinksContext);
  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { token, user } = await signInAuthentication(form);
      Cookies.set("token", token);
      setUser(user);
      setNavLinks(user.role === "admin" ? adminLinks : memberLinks);
      setLogin(true);

      const modal = document.querySelector("#loginModal");
      const modalBackdrops = Array.from(
        document.querySelectorAll(".modal-backdrop")
      );
      for (let backdrop of modalBackdrops) {
        backdrop.remove();
      }
      const body = document.querySelector("body");
      modal.classList.remove("show");
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

  const clearForm = () => {
    setErrors([]);
    setForm({ email: "", password: "" });
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
              onClick={clearForm}
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
                    name="email"
                    className={clsx(
                      "form-control",
                      errors.length > 0 &&
                        errors.map(
                          (error) => error.path == "email" && "is-invalid"
                        )
                    )}
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    onChange={handleValueChange}
                  />
                  {errors.length > 0 &&
                    errors.map(
                      (error, i) =>
                        error.path == "email" && (
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
