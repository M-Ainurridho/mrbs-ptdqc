/* eslint-disable no-unused-vars */
import axios from "axios";
import Container from "../../components/container";
import Layout from "../../layout";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Table, {
  TableBody,
  TableColumn,
  TableHead,
  TableRow,
} from "../../components/tables";
import Pagination from "../../components/pagination";
import Search from "../../components/forms/search";

const User = () => {
  const [users, setUsers] = useState([]);
  const [totalData, setTotalData] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams?.get("page")) || 1;
  const query = searchParams?.get("query") || "";

  const fetchAllUsers = async (page, query) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/v1/users?page=${page}&query=${query}`
      );
      setUsers(response.data.payload.users);
      setTotalData(response.data.payload.totalData);
      setTotalPages(response.data.payload.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllUsers(page, query);
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
      </Container>
    </Layout>
  );
};

export default User;
