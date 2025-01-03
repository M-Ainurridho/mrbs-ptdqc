/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import Container from "../../components/container";
import Layout from "../../layout";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ButtonBack, { ButtonDeleteItem } from "../../components/buttons";
import { UserContext } from "../../lib/context";
import { setTitle } from "../../lib/utils";

const UserDetail = () => {
  setTitle("User Details");

  const { id } = useParams();
  const [user, setUser] = useState({});
  const data = useContext(UserContext);

  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/v1/users/${id}`);
      setUser(response.data.payload.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserById(id);
  }, []);

  return (
    <Layout>
      <Container className="my-4">
        <div className="row">
          <div className="col-6 mx-auto">
            <h4 className="display-6 text-center mb-4">User Details</h4>
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">Username</th>
                  <td colSpan={3}>{user?.username}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td colSpan={3}>{user?.email}</td>
                </tr>
                <tr>
                  <th scope="row">Role</th>
                  <td colSpan={3}>{user?.role}</td>
                </tr>
                <tr>
                  <th scope="row">Created</th>
                  <td colSpan={3}>{user?.createdAt}</td>
                </tr>
              </tbody>
            </table>

            <div className="d-flex justify-content-between">
              <ButtonBack
                style={{ width: "25%" }}
                text="Back"
                className="btn-secondary"
              />

              {!user ? null : data.user.id === id ? (
                <div className="d-flex gap-2">
                  <Link to={`/users/${id}/edit`} className="btn btn-primary">
                    Edit
                  </Link>
                </div>
              ) : (
                user?.role === "member" && (
                  <div className="d-flex gap-2">
                    <ButtonDeleteItem id={id} path="users" />
                    <Link to={`/users/${id}/edit`} className="btn btn-primary">
                      Edit
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default UserDetail;
