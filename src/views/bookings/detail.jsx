/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import Container from "../../components/container";
import Layout from "../../layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { dateFormat, numberToDay, setTitle } from "../../lib/utils";
import ButtonBack, { ButtonDeleteItem } from "../../components/buttons";

const BookingDetail = () => {
  setTitle("Event Details");

  const { id } = useParams();
  const [event, setEvent] = useState({});

  const fetchBookingById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/v1/bookings/${id}`
      );
      console.log(response.data.payload.booking);
      setEvent(response.data.payload.booking);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookingById(id);
  }, []);

  return (
    <Layout>
      <Container className="my-4">
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
                    {event?.startTime} - {event?.endTime}
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
      </Container>
    </Layout>
  );
};

export default BookingDetail;
