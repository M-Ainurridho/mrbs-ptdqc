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
import { dateFormat, hourAndMinute, setTitle } from "../../lib/utils";
import Pagination from "../../components/pagination";
import Search from "../../components/forms/search";
import Cookies from "js-cookie";
import { UserContext } from "../../lib/context";
import { getAllEventsWithLimit, getExchangeToken } from "../../lib/api";

const Booking = () => {
  setTitle("Events");

  const [events, setEvents] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [alert, setAlert] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams?.get("page")) || 1;
  const query = searchParams?.get("query") || "";

  const token = Cookies.get("token");
  const { user } = useContext(UserContext);

  const fetchAllEventsWithLimit = async (page, query) => {
    try {
      const { status, data } = await getExchangeToken(token);

      if (status === 200) {
        const { userId } = data.payload;

        const { events, totalData, totalPages } = await getAllEventsWithLimit(
          userId,
          page,
          query
        );

        setEvents(events);
        setTotalData(totalData);
        setTotalPages(totalPages);
        setAlert(totalData === 0 && !alert);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllEventsWithLimit(page, query);
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
            There's no events!
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
                        {hourAndMinute(event.startTime)} -{" "}
                        {hourAndMinute(event.endTime)}
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
