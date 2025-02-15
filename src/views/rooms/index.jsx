/* eslint-disable no-unused-vars */
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
import { getAllRoomsWithLimit } from "../../lib/api";

const Room = () => {
  setTitle("Rooms");

  const [rooms, setRooms] = useState([]);
  const [totalData, setTotalData] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams?.get("page")) || 1;
  const query = searchParams?.get("query") || "";

  const fetchAllRoomsWithLimit = async (page, query) => {
    try {
      const { rooms, totalData, totalPages } = await getAllRoomsWithLimit(
        page,
        query
      );
      setRooms(rooms);
      setTotalData(totalData);
      setTotalPages(totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllRoomsWithLimit(page, query);
  }, [page, query]);

  return (
    <Layout>
      <Container className="my-4">
        <header className="d-flex justify-content-between align-items-center">
          <div className="col-6">
            <h4 className="display-6">All Rooms</h4>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-end gap-3">
              <Search
                placeholder="Search by title, room, etc"
                searchParams={searchParams}
              />
              <Link to="/rooms/create" className="btn btn-primary">
                Add Room
              </Link>
            </div>
          </div>
        </header>

        <Table className="mt-2">
          <TableHead fields={["Room", "Created"]} />
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id} path={`/rooms/${room.id}`}>
                <TableColumn>{room.room}</TableColumn>
                <TableColumn>{room.createdAt}</TableColumn>
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

export default Room;
