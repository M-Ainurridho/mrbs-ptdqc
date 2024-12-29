/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import Layout from "../../layout";
import Container from "../../components/container";
import InputText from "../../components/forms/input-text";
import ButtonBack, { ButtonSubmit } from "../../components/buttons";
// import SelectField, { SelectOption } from "../../../components/forms/selects";
import { createAlert, toCapitalize } from "../../lib/utils";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    roleId: "",
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
      const response = await axios.post(`http://localhost:3001/v1/users`, form);
      if (response.status === 200) {
        createAlert("Good job!", "Successfully add new user", "success");
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
      setForm({ ...form, roleId: roles[1].id });
      setRoles(roles);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllRoles();
  }, []);

  return (
    <Layout>
      <Container className="my-4">
        <div className="row">
          <div className="col-6 mx-auto">
            <h4 className="display-6 text-center mb-4">Create User</h4>

            <form onSubmit={handleSubmit}>
              <InputText
                text="Username"
                name="username"
                onValueChange={(e) => handleValueChange(e)}
                errors={errors}
              />

              <InputText
                text="Email"
                name="email"
                type="email"
                onValueChange={(e) => handleValueChange(e)}
                errors={errors}
              />

              <InputText
                text="Password"
                name="password"
                type="password"
                onValueChange={(e) => handleValueChange(e)}
                errors={errors}
              />

              <div className="mb-3">
                <div className="row">
                  <div className="col-3">
                    <label htmlFor="role" className="form-label fw-bold">
                      Role
                    </label>
                  </div>
                  <div className="col-9 d-flex gap-4">
                    {roles.map((role) => (
                      <div className="form-check" key={role.id}>
                        <input
                          defaultChecked={role.id == form.roleId}
                          className="form-check-input"
                          type="radio"
                          name="roleId"
                          id={role.role}
                          onChange={handleValueChange}
                          value={role.id}
                        />
                        <label className="form-check-label" htmlFor={role.role}>
                          {toCapitalize(role.role)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between gap-2">
                <ButtonBack style={{ width: "25%" }} />
                <ButtonSubmit
                  text="Create"
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

export default CreateUser;
