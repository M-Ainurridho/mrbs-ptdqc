/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Layout from "../../layout";
import Container from "../../components/container";
import Table, {
  TableBody,
  TableColumn,
  TableHead,
  TableRow,
} from "../../components/tables";
import { Link, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { dateFormat } from "../../lib/utils";
import Pagination from "../../components/pagination";
import Search from "../../components/forms/search";
import Cookies from "js-cookie";
import { UserContext } from "../../lib/context";

const Booking = () => {
  const [events, setEvents] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [alert, setAlert] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams?.get("page")) || 1;
  const query = searchParams?.get("query") || "";

  const token = Cookies.get("token");
  const { user } = useContext(UserContext);

  const fetchAllEvents = async (page, query) => {
    try {
      const responseOne = await axios.post(
        `http://localhost:3001/v1/users/exchangetoken`,
        { token }
      );

      if (responseOne.status === 200) {
        const { userId } = responseOne.data.payload;

        const responseTwo = await axios.get(
          `http://localhost:3001/v1/bookings/events/${userId}?page=${page}&query=${query}`,
          {
            headers: {
              "Cache-Control": "no-store",
            },
          }
        );
        setEvents(responseTwo.data.payload.events);
        setTotalData(responseTwo.data.payload.totalData);
        setTotalPages(responseTwo.data.payload.totalPages);
        setAlert(responseTwo.data.payload.totalData === 0 ? true : false);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllEvents(page, query);
  }, [page, query]);

  return (
    <Layout>
      <Container className="my-4">
        <header className="row d-flex align-items-center">
          <div className="col-6">
            <h4 className="display-6">
              {user?.role !== "admin" ? "Your Events" : "All Events"}
            </h4>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-end gap-2">
              <Search
                placeholder="Search by event, room, etc"
                searchParams={searchParams}
              />
              <Link to="/bookings/create" className="btn btn-primary">
                Add Event
              </Link>
            </div>
          </div>
        </header>

        {alert ? (
          <div className="alert alert-danger text-center" role="alert">
            No events!
          </div>
        ) : (
          <>
            <Table className="mt-2">
              <TableHead
                fields={[
                  // "No",
                  "Event",
                  "Room",
                  "Start Date",
                  "End Date",
                  "Duration",
                  "Repeat",
                ]}
              />
              <TableBody>
                {events.map((event, i) => {
                  return (
                    <TableRow key={i} path={`/bookings/${event.id}`}>
                      <TableColumn
                        className="text-truncate"
                        style={{ maxWidth: "200px" }}
                      >
                        {event.title}
                      </TableColumn>
                      <TableColumn>{event.room}</TableColumn>
                      <TableColumn>{dateFormat(event.startRecur)}</TableColumn>
                      <TableColumn>{dateFormat(event.endRecur)}</TableColumn>
                      <TableColumn>
                        {event.startTime} - {event.endTime}
                      </TableColumn>
                      <TableColumn>
                        {event.repeat ? event.repeat : "none"}
                      </TableColumn>
                    </TableRow>
                  );
                })}
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

export default Booking;
