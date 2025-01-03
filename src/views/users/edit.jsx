/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import Layout from "../../layout";
import Container from "../../components/container";
import InputText, { InputHidden } from "../../components/forms/input-text";
import ButtonBack, { ButtonSubmit } from "../../components/buttons";
// import SelectField, { SelectOption } from "../../../components/forms/selects";
import { createAlert, setTitle, toCapitalize } from "../../lib/utils";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  setTitle("Edit User");

  const { id } = useParams();

  const [form, setForm] = useState({
    username: "",
    email: "",
    oldEmail: "",
    roleId: "",
    role: "",
  });

  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleValueChange = debounce((e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }, 300);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.patch(
        `http://localhost:3001/v1/users/${id}`,
        form
      );

      if (response.data.ok) {
        createAlert("Amazing!", "Successfully update user", "success");
        navigate("/users");
      }
    } catch (err) {
      setErrors(err.response.data.errors);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllRoles = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/v1/users/roles`);
      const { roles } = response.data.payload;
      setRoles(roles);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/v1/users/${id}`);
      const { username, email, roleId, role } = response.data.payload.user;
      setForm({ ...form, username, email, oldEmail: email, roleId, role });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllRoles();
    fetchUserById(id);
  }, []);

  return (
    <Layout>
      <Container className="my-4">
        <div className="row">
          <div className="col-6 mx-auto">
            <h4 className="display-6 text-center mb-4">Edit User</h4>

            <form onSubmit={handleSubmit}>
              <InputText
                text="Username"
                name="username"
                type="text"
                onValueChange={(e) => handleValueChange(e)}
                errors={errors}
                defaultValue={form?.username}
              />

              <InputText
                text="Email"
                name="email"
                type="email"
                onValueChange={(e) => handleValueChange(e)}
                errors={errors}
                defaultValue={form?.email}
              />

              <InputHidden defaultValue={form?.email} />

              {form?.role !== "admin" && (
                <div className="mb-3">
                  <div className="row">
                    <div className="col-3">
                      <label className="form-label fw-bold">Role</label>
                    </div>
                    <div className="col-9 d-flex gap-4">
                      {roles.map((role, i) => (
                        <div className="form-check" key={role.id}>
                          <input
                            defaultChecked={i === 1}
                            className="form-check-input"
                            type="radio"
                            name="roleId"
                            id={role.role}
                            onClick={handleValueChange}
                            value={role.id}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={role.role}
                          >
                            {toCapitalize(role.role)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-between gap-2">
                <ButtonBack style={{ width: "25%" }} />
                <ButtonSubmit
                  text="Save"
                  className={clsx({
                    "btn-primary": !isLoading,
                    "btn-secondary disabled": isLoading,
                  })}
                  style={{ width: "25%" }}
                />
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default EditUser;
