/* eslint-disable no-unused-vars */
import axios from "axios";
import Container from "../../components/container";
import Layout from "../../layout";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Table, {
  TableBody,
  TableColumn,
  TableHead,
  TableRow,
} from "../../components/tables";
import Pagination from "../../components/pagination";
import Search from "../../components/forms/search";
import { setTitle } from "../../lib/utils";
import { getAllUsersWithLimit } from "../../lib/api";

const User = () => {
  setTitle("Users");

  const [users, setUsers] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [alert, setAlert] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams?.get("page")) || 1;
  const query = searchParams?.get("query") || "";

  const fetchAllUsersWithLimit = async (page, query) => {
    try {
      const { users, totalData, totalPages } = await getAllUsersWithLimit(
        page,
        query
      );
      setUsers(users);
      setTotalData(totalData);
      setTotalPages(totalPages);
      setAlert(totalData === 0 && !alert);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllUsersWithLimit(page, query);
  }, [page, query]);

  return (
    <Layout>
      <Container className="my-4">
        <header className="d-flex justify-content-between align-items-center">
          <div className="col-6">
            <h4 className="display-6">All Users</h4>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-end gap-3">
              <Search
                placeholder="Search by username, email, etc"
                searchParams={searchParams}
              />
              <Link to="/users/create" className="btn btn-primary">
                Add User
              </Link>
            </div>
          </div>
        </header>

        {alert ? (
          <div className="alert alert-danger text-center" role="alert">
            There's no user!
          </div>
        ) : (
          <>
            <Table className="mt-2">
              <TableHead fields={["Username", "Email", "Role"]} />
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} path={`/users/${user.id}`}>
                    <TableColumn>{user.username}</TableColumn>
                    <TableColumn>{user.email}</TableColumn>
                    <TableColumn>{user.role}</TableColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              page={page}
              totalData={totalData}
              totalPages={totalPages}
              searchParams={searchParams}
            />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default User;
