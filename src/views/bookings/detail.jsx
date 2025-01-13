/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import Container from "../../components/container";
import Layout from "../../layout";
import { useEffect, useState } from "react";
import {
  dateFormat,
  hourAndMinute,
  numberToDay,
  setTitle,
} from "../../lib/utils";
import ButtonBack, { ButtonDeleteItem } from "../../components/buttons";
import { getEventById } from "../../lib/api";

const BookingDetail = () => {
  setTitle("Event Details");

  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [statusCode, setStatusCode] = useState(0);

  const fetchBookingById = async (id) => {
    try {
      const { booking } = await getEventById(id);
      setStatusCode(200);
      setEvent(booking);
    } catch (err) {
      setStatusCode(err.status);
    }
  };

  useEffect(() => {
    fetchBookingById(id);
  }, []);

  return (
    <Layout>
      <Container className="my-4">
        {statusCode === 200 ? (
          <div className="row">
            <div className="col-6 mx-auto">
              <h4 className="display-6 text-center mb-4">Event Details</h4>
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Title</th>
                    <td colSpan={3}>{event?.title}</td>
                  </tr>
                  <tr>
                    <th scope="row">Description</th>
                    <td colSpan={3}>{event?.description || "-"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Room</th>
                    <td colSpan={3}>{event?.room}</td>
                  </tr>
                  <tr>
                    <th scope="row">Start</th>
                    <td colSpan={3}>{dateFormat(event?.startRecur)}</td>
                  </tr>
                  <tr>
                    <th scope="row">End</th>
                    <td colSpan={3}>{dateFormat(event?.endRecur)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Duration</th>
                    <td colSpan={3}>
                      {hourAndMinute(event?.startTime)} -{" "}
                      {hourAndMinute(event?.endTime)}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Created by</th>
                    <td colSpan={3}>{event?.username}</td>
                  </tr>
                  <tr>
                    <th scope="row">Recurring</th>
                    <td colSpan={3}>{event?.recurring ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Repeat</th>
                    <td colSpan={3}>
                      {event?.repeat}{" "}
                      {event?.repeat == "daily"
                        ? "(monday - friday)"
                        : event?.repeat == "weekly" &&
                          `(${event?.daysOfWeek
                            .split(",")
                            .sort()
                            .map((num) => numberToDay(Number(num)))
                            .join(", ")})`}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="d-flex justify-content-between">
                <ButtonBack
                  style={{ width: "25%" }}
                  text="Back"
                  className="btn-secondary"
                />

                <div className="d-flex gap-2">
                  <ButtonDeleteItem id={id} path="bookings" />
                  <Link to={`/bookings/${id}/edit`} className="btn btn-primary">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          statusCode === 404 && (
            <div className="alert alert-danger text-center" role="alert">
              Unknown Event
            </div>
          )
        )}
      </Container>
    </Layout>
  );
};

export default BookingDetail;
