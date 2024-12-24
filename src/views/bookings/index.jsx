import Layout from "../../layout";
import Container from "../../components/container";
import Table, {
  TableBody,
  TableColumn,
  TableHead,
  TableRow,
} from "../../components/tables";
// import { events } from "../../lib/data";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { dateFormat } from "../../lib/utils";

const Booking = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/v1/bookings/events",
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
      setEvents(response.data.payload.events);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <Layout>
      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="display-6">Your Events</h4>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/bookings/create")}
          >
            Add Event
          </button>
        </div>

        <Table className="mt-3">
          <TableHead
            fields={[
              "No",
              // "Room",
              "Event",
              "Start Date",
              "End Date",
              "Duration",
              "Repeat",
            ]}
          />
          <TableBody>
            {events.map((data, i) => (
              <TableRow key={i}>
                <TableColumn>{i + 1}</TableColumn>
                {/* <TableColumn>{data.room}</TableColumn> */}
                <TableColumn
                  className="text-truncate"
                  style={{ maxWidth: "200px" }}
                >
                  {data.title}
                </TableColumn>
                <TableColumn>{dateFormat(data.startRecur)}</TableColumn>
                <TableColumn>{dateFormat(data.endRecur)}</TableColumn>
                <TableColumn>
                  {data.startTime} - {data.endTime}
                </TableColumn>
                <TableColumn>{data.repeat ? data.repeat : "none"}</TableColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Layout>
  );
};

export default Booking;
